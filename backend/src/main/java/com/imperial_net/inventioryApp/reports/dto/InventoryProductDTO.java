package com.imperial_net.inventioryApp.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO con el detalle de un producto dentro del análisis de inventario.
 * Se utiliza tanto para los listados de stock inmovilizado como para los de mayor rotación o valor.
 */
@Data
@AllArgsConstructor
public class InventoryProductDTO {

    /**
     * Identificador del producto.
     */
    private Long productId;

    /**
     * Código del producto.
     */
    private String productCode;

    /**
     * Nombre del producto.
     */
    private String productName;

    /**
     * Categoría del producto.
     */
    private String category;

    /**
     * Marca del producto.
     */
    private String brand;

    /**
     * Unidades disponibles en stock.
     */
    private BigDecimal stock;

    /**
     * Precio de venta unitario vigente.
     */
    private BigDecimal salePrice;

    /**
     * Valorización del stock del producto a precio de venta.
     */
    private BigDecimal valueAtSalePrice;

    /**
     * Unidades vendidas durante el período analizado.
     */
    private BigDecimal unitsSoldInPeriod;

    /**
     * Facturación generada por el producto durante el período analizado.
     */
    private BigDecimal revenueInPeriod;

    /**
     * Índice de rotación: unidades vendidas sobre unidades en stock.
     */
    private BigDecimal turnoverRatio;

    /**
     * Fecha de la última venta registrada, o null si el producto nunca se vendió.
     */
    private LocalDate lastSaleDate;

    /**
     * Días transcurridos desde la última venta, o null si el producto nunca se vendió.
     */
    private Long daysWithoutSales;
}
