package com.imperial_net.inventioryApp.stock.dto;

import com.imperial_net.inventioryApp.stock.model.StockMovementReason;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@AllArgsConstructor
public class StockMovementResponseDTO {
    private Long id;
    private Long productId;
    private BigDecimal quantity;
    private LocalDate movementDate;
    private StockMovementReason reason;
    private Long providerId;
    private String note;
    private BigDecimal currentStock;
}
