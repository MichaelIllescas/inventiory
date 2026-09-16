package com.imperial_net.inventioryApp.reports.dto;

import com.imperial_net.inventioryApp.expenses.dto.ExpenseResponseDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@Data
@AllArgsConstructor
public class ExpenseAnalysisResponse {
    private BigDecimal total;
    private Map<String, BigDecimal> byCategory;
    private Map<String, BigDecimal> byPaymentMethod;
    private List<ExpenseResponseDTO> details;
}
