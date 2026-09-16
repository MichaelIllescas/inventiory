package com.imperial_net.inventioryApp.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO con los indicadores generales del inventario en el momento de la consulta.
 * Según la decisión registrada en el ADR 0001, el producto no tiene costo:
 * todo el inventario se valoriza a precio de venta.
 */
@Data
@AllArgsConstructor
public class InventorySummaryDTO {

    /**
     * Cantidad de productos activos registrados.
     */
    private long totalProducts;

    /**
     * Cantidad de productos activos que tienen stock disponible.
     */
    private long productsInStock;

    /**
     * Cantidad de productos activos sin stock (quiebre).
     */
    private long productsOutOfStock;

    /**
     * Cantidad de productos cuyo stock está en o por debajo del stock mínimo.
     */
    private long lowStockProducts;

    /**
     * Cantidad de productos con stock que no registran ventas en el período analizado.
     */
    private long slowMovingProducts;

    /**
     * Unidades totales disponibles en stock.
     */
    private BigDecimal totalUnits;

    /**
     * Valorización del inventario a precio de venta.
     */
    private BigDecimal totalValueAtSalePrice;

    /**
     * Precio de venta promedio por unidad en stock.
     */
    private BigDecimal averageUnitPrice;

    /**
     * Valorización a precio de venta de los productos sin ventas en el período.
     */
    private BigDecimal slowMovingValue;

    /**
     * Participación del stock inmovilizado sobre el valor total del inventario, en porcentaje.
     */
    private BigDecimal slowMovingPercentage;

    /**
     * Unidades vendidas durante el período analizado.
     */
    private BigDecimal unitsSoldInPeriod;

    /**
     * Facturación generada durante el período analizado.
     */
    private BigDecimal revenueInPeriod;

    /**
     * Índice de rotación del período: unidades vendidas sobre unidades en stock.
     */
    private BigDecimal turnoverRatio;

    /**
     * Días estimados de cobertura del stock actual según el ritmo de venta del período.
     */
    private BigDecimal daysOfStockCoverage;
}
