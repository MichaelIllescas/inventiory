package com.imperial_net.inventioryApp.reports.service;

import com.imperial_net.inventioryApp.auth.service.CookieService;
import com.imperial_net.inventioryApp.products.models.Brand;
import com.imperial_net.inventioryApp.products.models.Product;
import com.imperial_net.inventioryApp.products.repository.ProductRepository;
import com.imperial_net.inventioryApp.reports.dto.InventoryAbcSegmentDTO;
import com.imperial_net.inventioryApp.reports.dto.InventoryAnalysisResponse;
import com.imperial_net.inventioryApp.reports.dto.InventoryGroupDTO;
import com.imperial_net.inventioryApp.sales.repository.SaleDetailRepository;
import com.imperial_net.inventioryApp.users.model.User;
import jakarta.servlet.http.HttpServletRequest;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class InventoryAnalysisServiceTest {

    private static final Long USER_ID = 7L;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private SaleDetailRepository saleDetailRepository;

    @Mock
    private CookieService cookieService;

    @Mock
    private HttpServletRequest request;

    private InventoryAnalysisService service;

    @BeforeEach
    void setUp() {
        service = new InventoryAnalysisService(productRepository, saleDetailRepository, cookieService);

        User user = new User();
        user.setId(USER_ID);
        when(cookieService.getUserFromCookie(request)).thenReturn(Optional.of(user));
    }

    @Test
    void valorizaElInventarioAPrecioDeVenta() {
        Product remera = product(1L, "Remera Aloha", "Remeras", "Pettit Papillon",
                BigDecimal.valueOf(3), BigDecimal.valueOf(16500));
        Product malla = product(2L, "Malla Verano", "Mallas", "Topitos",
                BigDecimal.valueOf(2), BigDecimal.valueOf(10000));

        when(productRepository.findActiveProductsWithBrandByUser(USER_ID)).thenReturn(List.of(remera, malla));
        when(saleDetailRepository.findSalesSummaryByProduct(any(), any(), eq(USER_ID)))
                .thenReturn(List.<Object[]>of(new Object[]{1L, BigDecimal.valueOf(6), BigDecimal.valueOf(99000), LocalDate.now()}));
        when(saleDetailRepository.findLastSaleDateByProduct(USER_ID))
                .thenReturn(List.<Object[]>of(new Object[]{1L, LocalDate.now().minusDays(10)}));

        InventoryAnalysisResponse response = service.getInventoryAnalysis(6, request);

        // 3 * 16500 + 2 * 10000 = 69500
        assertEquals(new BigDecimal("69500.00"), response.getSummary().getTotalValueAtSalePrice());
        assertEquals(new BigDecimal("5.00"), response.getSummary().getTotalUnits());
        // 69500 / 5 = 13900
        assertEquals(new BigDecimal("13900.00"), response.getSummary().getAverageUnitPrice());
        assertEquals(new BigDecimal("99000.00"), response.getSummary().getRevenueInPeriod());
        assertEquals(2, response.getSummary().getTotalProducts());
    }

    @Test
    void detectaElStockInmovilizadoDelPeriodo() {
        Product conVentas = product(1L, "Remera Aloha", "Remeras", "Pettit Papillon",
                BigDecimal.valueOf(3), BigDecimal.valueOf(16500));
        Product sinVentas = product(2L, "Malla Verano", "Mallas", "Topitos",
                BigDecimal.valueOf(2), BigDecimal.valueOf(10000));

        when(productRepository.findActiveProductsWithBrandByUser(USER_ID)).thenReturn(List.of(conVentas, sinVentas));
        when(saleDetailRepository.findSalesSummaryByProduct(any(), any(), eq(USER_ID)))
                .thenReturn(List.<Object[]>of(new Object[]{1L, BigDecimal.valueOf(6), BigDecimal.valueOf(99000), LocalDate.now()}));
        when(saleDetailRepository.findLastSaleDateByProduct(USER_ID)).thenReturn(List.of());

        InventoryAnalysisResponse response = service.getInventoryAnalysis(6, request);

        assertEquals(1, response.getSummary().getSlowMovingProducts());
        // 2 * 10000 inmovilizados sobre un inventario de 69500
        assertEquals(new BigDecimal("20000.00"), response.getSummary().getSlowMovingValue());
        assertEquals(new BigDecimal("28.78"), response.getSummary().getSlowMovingPercentage());
        assertEquals(1, response.getSlowMovingProducts().size());
        assertEquals("Malla Verano", response.getSlowMovingProducts().get(0).getProductName());
        assertNull(response.getSlowMovingProducts().get(0).getLastSaleDate());
    }

    @Test
    void agrupaPorCategoriaYClasificaConElMetodoAbc() {
        Product caro = product(1L, "Mobiliario Vitrina", "Mobiliario", "Genérica",
                BigDecimal.valueOf(1), BigDecimal.valueOf(90000));
        Product barato = product(2L, "Medias", "Medias", "Genérica",
                BigDecimal.valueOf(1), BigDecimal.valueOf(10000));

        when(productRepository.findActiveProductsWithBrandByUser(USER_ID)).thenReturn(List.of(caro, barato));
        when(saleDetailRepository.findSalesSummaryByProduct(any(), any(), eq(USER_ID))).thenReturn(List.of());
        when(saleDetailRepository.findLastSaleDateByProduct(USER_ID)).thenReturn(List.of());

        InventoryAnalysisResponse response = service.getInventoryAnalysis(null, request);

        InventoryGroupDTO primeraCategoria = response.getByCategory().get(0);
        assertEquals("Mobiliario", primeraCategoria.getName());
        assertEquals(new BigDecimal("90.00"), primeraCategoria.getSharePercentage());

        InventoryAbcSegmentDTO segmentoA = response.getAbcAnalysis().get(0);
        assertEquals("A", segmentoA.getSegment());
        assertEquals(1, segmentoA.getProductCount());
        assertEquals(new BigDecimal("90.00"), segmentoA.getValuePercentage());

        InventoryAbcSegmentDTO segmentoB = response.getAbcAnalysis().get(1);
        assertEquals("B", segmentoB.getSegment());
        assertEquals(1, segmentoB.getProductCount());

        // Sin ventas en el período la cobertura de stock es indeterminada.
        assertNull(response.getSummary().getDaysOfStockCoverage());

    }

    private Product product(Long id, String name, String category, String brandName,
                            BigDecimal stock, BigDecimal salePrice) {
        Brand brand = new Brand();
        brand.setName(brandName);

        Product product = new Product();
        product.setId(id);
        product.setName(name);
        product.setCategory(category);
        product.setBrand(brand);
        product.setStock(stock);
        product.setSalePrice(salePrice);
        return product;
    }
}
