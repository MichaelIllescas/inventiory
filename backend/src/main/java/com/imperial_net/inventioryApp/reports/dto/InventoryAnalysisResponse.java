package com.imperial_net.inventioryApp.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;
import java.util.List;

/**
 * DTO principal del reporte de análisis de inventario.
 * Agrupa los indicadores generales, la apertura por categoría y marca,
 * la clasificación ABC y los listados de productos críticos.
 */
@Data
@AllArgsConstructor
public class InventoryAnalysisResponse {

    /**
     * Fecha de inicio del período usado para medir rotación y ventas.
     */
    private LocalDate periodStart;

    /**
     * Fecha de fin del período usado para medir rotación y ventas.
     */
    private LocalDate periodEnd;

    /**
     * Indicadores generales del inventario.
     */
    private InventorySummaryDTO summary;

    /**
     * Inventario agrupado por categoría, ordenado por valorización descendente.
     */
    private List<InventoryGroupDTO> byCategory;

    /**
     * Inventario agrupado por marca, ordenado por valorización descendente.
     */
    private List<InventoryGroupDTO> byBrand;

    /**
     * Clasificación ABC del inventario por valorización.
     */
    private List<InventoryAbcSegmentDTO> abcAnalysis;

    /**
     * Productos con stock sin ventas en el período, ordenados por capital inmovilizado.
     */
    private List<InventoryProductDTO> slowMovingProducts;

    /**
     * Productos con mayor rotación en el período.
     */
    private List<InventoryProductDTO> fastMovingProducts;

    /**
     * Productos con stock en o por debajo del mínimo definido.
     */
    private List<InventoryProductDTO> lowStockProducts;
}
