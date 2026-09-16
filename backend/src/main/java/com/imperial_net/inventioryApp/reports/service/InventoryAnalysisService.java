package com.imperial_net.inventioryApp.reports.service;

import com.imperial_net.inventioryApp.auth.service.CookieService;
import com.imperial_net.inventioryApp.exceptions.ProductException;
import com.imperial_net.inventioryApp.products.models.Product;
import com.imperial_net.inventioryApp.products.repository.ProductRepository;
import com.imperial_net.inventioryApp.reports.dto.InventoryAbcSegmentDTO;
import com.imperial_net.inventioryApp.reports.dto.InventoryAnalysisResponse;
import com.imperial_net.inventioryApp.reports.dto.InventoryGroupDTO;
import com.imperial_net.inventioryApp.reports.dto.InventoryProductDTO;
import com.imperial_net.inventioryApp.reports.dto.InventorySummaryDTO;
import com.imperial_net.inventioryApp.sales.repository.SaleDetailRepository;
import com.imperial_net.inventioryApp.users.model.User;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.function.Function;

/**
 * Servicio que genera el reporte de análisis de inventario.
 * Valoriza el stock a precio de venta, lo abre por categoría y marca, lo clasifica con el método ABC
 * y detecta el stock inmovilizado, el de mayor rotación y el que está por debajo del mínimo.
 *
 * <p>El producto no tiene costo: según el ADR 0001 se eliminó el costeo por lotes de compra,
 * por lo que este reporte informa valorización a precio de venta, rotación y facturación,
 * nunca margen ni ganancia por producto.</p>
 */
@RequiredArgsConstructor
@Service
public class InventoryAnalysisService {

    /**
     * Cantidad de meses hacia atrás que se analizan cuando el pedido no indica un período.
     */
    private static final int DEFAULT_PERIOD_MONTHS = 6;

    /**
     * Cantidad máxima de meses que se puede analizar en un mismo reporte.
     */
    private static final int MAX_PERIOD_MONTHS = 60;

    /**
     * Cantidad de productos que se devuelven en cada listado de detalle.
     */
    private static final int DETAIL_LIST_SIZE = 20;

    /**
     * Porcentaje acumulado que delimita el segmento A del análisis ABC.
     */
    private static final BigDecimal ABC_A_THRESHOLD = BigDecimal.valueOf(80);

    /**
     * Porcentaje acumulado que delimita el segmento B del análisis ABC.
     */
    private static final BigDecimal ABC_B_THRESHOLD = BigDecimal.valueOf(95);

    private static final String UNCLASSIFIED = "Sin clasificar";
    private static final String NO_BRAND = "Sin marca";

    private final ProductRepository productRepository;
    private final SaleDetailRepository saleDetailRepository;
    private final CookieService cookieService;

    /**
     * Genera el análisis de inventario del usuario autenticado.
     *
     * @param months  cantidad de meses hacia atrás que se usan para medir la rotación.
     *                Si es null se usan seis meses.
     * @param request solicitud HTTP de la que se obtiene el usuario autenticado.
     * @return el reporte completo de análisis de inventario.
     */
    public InventoryAnalysisResponse getInventoryAnalysis(Integer months, HttpServletRequest request) {
        User user = getUserFromCookie(request);

        int periodMonths = normalizePeriodMonths(months);
        LocalDate periodEnd = LocalDate.now();
        LocalDate periodStart = periodEnd.minusMonths(periodMonths);

        List<Product> products = productRepository.findActiveProductsWithBrandByUser(user.getId());
        Map<Long, BigDecimal[]> salesByProduct = mapSalesByProduct(periodStart, periodEnd, user.getId());
        Map<Long, LocalDate> lastSaleByProduct = mapLastSaleDateByProduct(user.getId());

        List<InventoryProductDTO> detailedProducts = products.stream()
                .map(product -> toInventoryProduct(product, salesByProduct, lastSaleByProduct, periodEnd))
                .toList();

        long periodDays = Math.max(1, ChronoUnit.DAYS.between(periodStart, periodEnd));
        InventorySummaryDTO summary = buildSummary(products, detailedProducts, periodDays);

        return new InventoryAnalysisResponse(
                periodStart,
                periodEnd,
                summary,
                buildGroups(detailedProducts, InventoryProductDTO::getCategory, summary.getTotalValueAtSalePrice()),
                buildGroups(detailedProducts, InventoryProductDTO::getBrand, summary.getTotalValueAtSalePrice()),
                buildAbcAnalysis(detailedProducts, summary.getTotalValueAtSalePrice()),
                buildSlowMovingProducts(detailedProducts),
                buildFastMovingProducts(detailedProducts),
                buildLowStockProducts(products, detailedProducts)
        );
    }

    /**
     * Acota la cantidad de meses solicitada al rango admitido por el reporte.
     */
    private int normalizePeriodMonths(Integer months) {
        if (months == null || months < 1) {
            return DEFAULT_PERIOD_MONTHS;
        }
        return Math.min(months, MAX_PERIOD_MONTHS);
    }

    /**
     * Arma, por producto, las unidades vendidas y la facturación dentro del período analizado.
     *
     * @return mapa de id de producto a un par [unidadesVendidas, facturación].
     */
    private Map<Long, BigDecimal[]> mapSalesByProduct(LocalDate startDate, LocalDate endDate, Long userId) {
        Map<Long, BigDecimal[]> sales = new HashMap<>();
        for (Object[] row : saleDetailRepository.findSalesSummaryByProduct(startDate, endDate, userId)) {
            sales.put(((Number) row[0]).longValue(), new BigDecimal[]{toBigDecimal(row[1]), toBigDecimal(row[2])});
        }
        return sales;
    }

    /**
     * Arma la fecha de la última venta confirmada de cada producto.
     */
    private Map<Long, LocalDate> mapLastSaleDateByProduct(Long userId) {
        Map<Long, LocalDate> lastSales = new HashMap<>();
        for (Object[] row : saleDetailRepository.findLastSaleDateByProduct(userId)) {
            if (row[1] != null) {
                lastSales.put(((Number) row[0]).longValue(), (LocalDate) row[1]);
            }
        }
        return lastSales;
    }

    /**
     * Construye el detalle de inventario de un producto combinando stock y ventas del período.
     */
    private InventoryProductDTO toInventoryProduct(Product product,
                                                   Map<Long, BigDecimal[]> salesByProduct,
                                                   Map<Long, LocalDate> lastSaleByProduct,
                                                   LocalDate referenceDate) {
        BigDecimal stock = orZero(product.getStock());
        BigDecimal salePrice = orZero(product.getSalePrice());
        BigDecimal[] sales = salesByProduct.get(product.getId());
        BigDecimal unitsSold = sales != null ? sales[0] : BigDecimal.ZERO;
        BigDecimal revenue = sales != null ? sales[1] : BigDecimal.ZERO;
        LocalDate lastSaleDate = lastSaleByProduct.get(product.getId());

        return new InventoryProductDTO(
                product.getId(),
                product.getCode(),
                product.getName(),
                blankToDefault(product.getCategory(), UNCLASSIFIED),
                product.getBrand() != null ? blankToDefault(product.getBrand().getName(), NO_BRAND) : NO_BRAND,
                scale(stock, 2),
                scale(salePrice, 2),
                scale(stock.multiply(salePrice), 2),
                scale(unitsSold, 2),
                scale(revenue, 2),
                turnoverRatio(unitsSold, stock),
                lastSaleDate,
                lastSaleDate != null ? ChronoUnit.DAYS.between(lastSaleDate, referenceDate) : null
        );
    }

    /**
     * Calcula los indicadores generales del inventario.
     */
    private InventorySummaryDTO buildSummary(List<Product> products,
                                             List<InventoryProductDTO> detailedProducts,
                                             long periodDays) {
        BigDecimal totalUnits = BigDecimal.ZERO;
        BigDecimal totalValueAtSalePrice = BigDecimal.ZERO;
        BigDecimal slowMovingValue = BigDecimal.ZERO;
        BigDecimal unitsSoldInPeriod = BigDecimal.ZERO;
        BigDecimal revenueInPeriod = BigDecimal.ZERO;
        long productsInStock = 0;
        long productsOutOfStock = 0;
        long slowMovingProducts = 0;

        for (InventoryProductDTO item : detailedProducts) {
            boolean hasStock = item.getStock().compareTo(BigDecimal.ZERO) > 0;
            boolean withoutSales = item.getUnitsSoldInPeriod().compareTo(BigDecimal.ZERO) == 0;

            totalUnits = totalUnits.add(item.getStock());
            totalValueAtSalePrice = totalValueAtSalePrice.add(item.getValueAtSalePrice());
            unitsSoldInPeriod = unitsSoldInPeriod.add(item.getUnitsSoldInPeriod());
            revenueInPeriod = revenueInPeriod.add(item.getRevenueInPeriod());

            if (hasStock) {
                productsInStock++;
            } else {
                productsOutOfStock++;
            }
            if (hasStock && withoutSales) {
                slowMovingProducts++;
                slowMovingValue = slowMovingValue.add(item.getValueAtSalePrice());
            }
        }

        return new InventorySummaryDTO(
                products.size(),
                productsInStock,
                productsOutOfStock,
                countLowStock(products),
                slowMovingProducts,
                scale(totalUnits, 2),
                scale(totalValueAtSalePrice, 2),
                averageUnitPrice(totalValueAtSalePrice, totalUnits),
                scale(slowMovingValue, 2),
                percentage(slowMovingValue, totalValueAtSalePrice),
                scale(unitsSoldInPeriod, 2),
                scale(revenueInPeriod, 2),
                turnoverRatio(unitsSoldInPeriod, totalUnits),
                daysOfStockCoverage(totalUnits, unitsSoldInPeriod, periodDays)
        );
    }

    /**
     * Cuenta los productos cuyo stock está en o por debajo del stock mínimo definido.
     */
    private long countLowStock(List<Product> products) {
        return products.stream()
                .filter(product -> product.getMinStock() != null)
                .filter(product -> orZero(product.getStock()).compareTo(product.getMinStock()) <= 0)
                .count();
    }

    /**
     * Agrupa el inventario por una dimensión (categoría o marca) y lo ordena por valorización descendente.
     */
    private List<InventoryGroupDTO> buildGroups(List<InventoryProductDTO> detailedProducts,
                                                Function<InventoryProductDTO, String> classifier,
                                                BigDecimal totalValueAtSalePrice) {
        Map<String, List<InventoryProductDTO>> grouped = new LinkedHashMap<>();
        for (InventoryProductDTO item : detailedProducts) {
            grouped.computeIfAbsent(classifier.apply(item), key -> new ArrayList<>()).add(item);
        }

        List<InventoryGroupDTO> groups = new ArrayList<>();
        grouped.forEach((name, items) -> {
            BigDecimal units = BigDecimal.ZERO;
            BigDecimal valueAtSalePrice = BigDecimal.ZERO;
            BigDecimal unitsSold = BigDecimal.ZERO;
            BigDecimal revenue = BigDecimal.ZERO;
            long outOfStockCount = 0;

            for (InventoryProductDTO item : items) {
                units = units.add(item.getStock());
                valueAtSalePrice = valueAtSalePrice.add(item.getValueAtSalePrice());
                unitsSold = unitsSold.add(item.getUnitsSoldInPeriod());
                revenue = revenue.add(item.getRevenueInPeriod());
                if (item.getStock().compareTo(BigDecimal.ZERO) == 0) {
                    outOfStockCount++;
                }
            }

            groups.add(new InventoryGroupDTO(
                    name,
                    items.size(),
                    outOfStockCount,
                    scale(units, 2),
                    scale(valueAtSalePrice, 2),
                    percentage(valueAtSalePrice, totalValueAtSalePrice),
                    scale(unitsSold, 2),
                    scale(revenue, 2),
                    turnoverRatio(unitsSold, units)
            ));
        });

        groups.sort(Comparator.comparing(InventoryGroupDTO::getValueAtSalePrice).reversed());
        return groups;
    }

    /**
     * Clasifica el inventario con el método ABC según la valorización acumulada a precio de venta.
     * El segmento A concentra hasta el 80% del valor, el B hasta el 95% y el C el resto.
     */
    private List<InventoryAbcSegmentDTO> buildAbcAnalysis(List<InventoryProductDTO> detailedProducts,
                                                          BigDecimal totalValueAtSalePrice) {
        List<InventoryProductDTO> sorted = new ArrayList<>(detailedProducts);
        sorted.sort(Comparator.comparing(InventoryProductDTO::getValueAtSalePrice).reversed());

        Map<String, Long> productCounts = new LinkedHashMap<>();
        Map<String, BigDecimal> segmentValues = new LinkedHashMap<>();
        for (String segment : List.of("A", "B", "C")) {
            productCounts.put(segment, 0L);
            segmentValues.put(segment, BigDecimal.ZERO);
        }

        BigDecimal accumulated = BigDecimal.ZERO;
        for (InventoryProductDTO item : sorted) {
            String segment = resolveAbcSegment(percentage(accumulated, totalValueAtSalePrice));
            productCounts.merge(segment, 1L, Long::sum);
            segmentValues.merge(segment, item.getValueAtSalePrice(), BigDecimal::add);
            accumulated = accumulated.add(item.getValueAtSalePrice());
        }

        BigDecimal totalProducts = BigDecimal.valueOf(sorted.size());
        List<InventoryAbcSegmentDTO> segments = new ArrayList<>();
        productCounts.forEach((segment, count) -> segments.add(new InventoryAbcSegmentDTO(
                segment,
                count,
                percentage(BigDecimal.valueOf(count), totalProducts),
                scale(segmentValues.get(segment), 2),
                percentage(segmentValues.get(segment), totalValueAtSalePrice)
        )));
        return segments;
    }

    /**
     * Determina el segmento ABC que corresponde a un porcentaje de valor acumulado.
     */
    private String resolveAbcSegment(BigDecimal accumulatedPercentage) {
        if (accumulatedPercentage.compareTo(ABC_A_THRESHOLD) < 0) {
            return "A";
        }
        return accumulatedPercentage.compareTo(ABC_B_THRESHOLD) < 0 ? "B" : "C";
    }

    /**
     * Devuelve los productos con stock que no registran ventas en el período,
     * ordenados por el valor que tienen inmovilizado.
     */
    private List<InventoryProductDTO> buildSlowMovingProducts(List<InventoryProductDTO> detailedProducts) {
        return detailedProducts.stream()
                .filter(item -> item.getStock().compareTo(BigDecimal.ZERO) > 0)
                .filter(item -> item.getUnitsSoldInPeriod().compareTo(BigDecimal.ZERO) == 0)
                .sorted(Comparator.comparing(InventoryProductDTO::getValueAtSalePrice).reversed())
                .limit(DETAIL_LIST_SIZE)
                .toList();
    }

    /**
     * Devuelve los productos con mayor rotación dentro del período analizado.
     */
    private List<InventoryProductDTO> buildFastMovingProducts(List<InventoryProductDTO> detailedProducts) {
        return detailedProducts.stream()
                .filter(item -> item.getUnitsSoldInPeriod().compareTo(BigDecimal.ZERO) > 0)
                .sorted(Comparator.comparing(InventoryProductDTO::getUnitsSoldInPeriod).reversed())
                .limit(DETAIL_LIST_SIZE)
                .toList();
    }

    /**
     * Devuelve los productos cuyo stock está en o por debajo del mínimo definido.
     */
    private List<InventoryProductDTO> buildLowStockProducts(List<Product> products,
                                                            List<InventoryProductDTO> detailedProducts) {
        Map<Long, InventoryProductDTO> detailById = new HashMap<>();
        detailedProducts.forEach(item -> detailById.put(item.getProductId(), item));

        return products.stream()
                .filter(product -> product.getMinStock() != null)
                .filter(product -> orZero(product.getStock()).compareTo(product.getMinStock()) <= 0)
                .map(product -> detailById.get(product.getId()))
                .filter(Objects::nonNull)
                .sorted(Comparator.comparing(InventoryProductDTO::getStock))
                .limit(DETAIL_LIST_SIZE)
                .toList();
    }

    /**
     * Calcula el precio de venta promedio por unidad en stock.
     */
    private BigDecimal averageUnitPrice(BigDecimal totalValueAtSalePrice, BigDecimal totalUnits) {
        if (totalUnits.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }
        return totalValueAtSalePrice.divide(totalUnits, 2, RoundingMode.HALF_UP);
    }

    /**
     * Calcula el índice de rotación como unidades vendidas sobre unidades en stock.
     */
    private BigDecimal turnoverRatio(BigDecimal unitsSold, BigDecimal stock) {
        if (stock.compareTo(BigDecimal.ZERO) <= 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }
        return unitsSold.divide(stock, 2, RoundingMode.HALF_UP);
    }

    /**
     * Estima cuántos días alcanza el stock actual al ritmo de venta del período.
     * Devuelve null cuando no hubo ventas y por lo tanto la cobertura es indeterminada.
     */
    private BigDecimal daysOfStockCoverage(BigDecimal totalUnits, BigDecimal unitsSold, long periodDays) {
        if (unitsSold.compareTo(BigDecimal.ZERO) <= 0) {
            return null;
        }
        return totalUnits.multiply(BigDecimal.valueOf(periodDays))
                .divide(unitsSold, 1, RoundingMode.HALF_UP);
    }

    /**
     * Calcula qué porcentaje representa una parte sobre un total, devolviendo cero si el total es cero.
     */
    private BigDecimal percentage(BigDecimal part, BigDecimal total) {
        if (total == null || total.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
        }
        return part.multiply(BigDecimal.valueOf(100)).divide(total, 2, RoundingMode.HALF_UP);
    }

    /**
     * Normaliza la escala decimal de un importe.
     */
    private BigDecimal scale(BigDecimal value, int scale) {
        return orZero(value).setScale(scale, RoundingMode.HALF_UP);
    }

    /**
     * Devuelve el valor recibido o cero cuando es null.
     */
    private BigDecimal orZero(BigDecimal value) {
        return value != null ? value : BigDecimal.ZERO;
    }

    /**
     * Convierte a BigDecimal un valor numérico devuelto por una consulta JPQL.
     */
    private BigDecimal toBigDecimal(Object value) {
        if (value == null) {
            return BigDecimal.ZERO;
        }
        if (value instanceof BigDecimal decimal) {
            return decimal;
        }
        return BigDecimal.valueOf(((Number) value).doubleValue());
    }

    /**
     * Reemplaza los textos vacíos por una etiqueta por defecto.
     */
    private String blankToDefault(String value, String defaultValue) {
        return value == null || value.isBlank() ? defaultValue : value;
    }

    /**
     * Obtiene el usuario autenticado desde la cookie.
     */
    private User getUserFromCookie(HttpServletRequest request) {
        return cookieService.getUserFromCookie(request)
                .orElseThrow(() -> new ProductException("Usuario no autenticado. No se puede procesar la solicitud."));
    }
}
