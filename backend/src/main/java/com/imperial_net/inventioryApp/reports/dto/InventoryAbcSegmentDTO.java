package com.imperial_net.inventioryApp.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO que representa un segmento del análisis ABC del inventario.
 * El segmento A concentra el 80% del valor, el B el 15% siguiente y el C el 5% restante.
 */
@Data
@AllArgsConstructor
public class InventoryAbcSegmentDTO {

    /**
     * Letra del segmento (A, B o C).
     */
    private String segment;

    /**
     * Cantidad de productos que integran el segmento.
     */
    private long productCount;

    /**
     * Participación del segmento sobre la cantidad total de productos, en porcentaje.
     */
    private BigDecimal productPercentage;

    /**
     * Valorización del segmento a precio de venta.
     */
    private BigDecimal valueAtSalePrice;

    /**
     * Participación del segmento sobre el valor total del inventario, en porcentaje.
     */
    private BigDecimal valuePercentage;
}
