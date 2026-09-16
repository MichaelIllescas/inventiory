package com.imperial_net.inventioryApp.stock.dto;

import com.imperial_net.inventioryApp.stock.model.StockMovementReason;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class StockMovementRequestDTO {

    @NotNull(message = "La cantidad del movimiento es obligatoria.")
    private BigDecimal quantity;

    @NotNull(message = "La fecha del movimiento es obligatoria.")
    @PastOrPresent(message = "La fecha del movimiento no puede ser futura.")
    private LocalDate movementDate;

    @NotNull(message = "El motivo del movimiento es obligatorio.")
    private StockMovementReason reason;

    private Long providerId;

    @Size(max = 500, message = "La nota no puede superar los 500 caracteres.")
    private String note;
}
