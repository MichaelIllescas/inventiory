package com.imperial_net.inventioryApp.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO que resume el inventario agrupado por una dimensión (categoría o marca).
 */
@Data
@AllArgsConstructor
public class InventoryGroupDTO {

    /**
     * Nombre del grupo (categoría o marca).
     */
    private String name;

    /**
     * Cantidad de productos activos dentro del grupo.
     */
    private long productCount;

    /**
     * Cantidad de productos del grupo sin stock disponible.
     */
    private long outOfStockCount;

    /**
     * Unidades disponibles en stock dentro del grupo.
     */
    private BigDecimal units;

    /**
     * Valorización del grupo a precio de venta.
     */
    private BigDecimal valueAtSalePrice;

    /**
     * Participación del grupo sobre el valor total del inventario, en porcentaje.
     */
    private BigDecimal sharePercentage;

    /**
     * Unidades del grupo vendidas durante el período analizado.
     */
    private BigDecimal unitsSoldInPeriod;

    /**
     * Facturación del grupo durante el período analizado.
     */
    private BigDecimal revenueInPeriod;

    /**
     * Índice de rotación del grupo: unidades vendidas sobre unidades en stock.
     */
    private BigDecimal turnoverRatio;
}
