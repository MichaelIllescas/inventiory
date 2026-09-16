package com.imperial_net.inventioryApp.stock.model;

import com.imperial_net.inventioryApp.products.models.Product;
import com.imperial_net.inventioryApp.providers.model.Provider;
import com.imperial_net.inventioryApp.users.model.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "stock_movements", indexes = {
        @Index(name = "idx_stock_movements_product_date", columnList = "product_id,movement_date"),
        @Index(name = "idx_stock_movements_provider", columnList = "provider_id"),
        @Index(name = "idx_stock_movements_user_date", columnList = "registered_by,movement_date"),
        @Index(name = "idx_stock_movements_reason", columnList = "reason")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockMovement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "provider_id")
    private Provider provider;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "registered_by", nullable = false)
    private User registeredBy;

    @NotNull
    @Column(nullable = false, precision = 38, scale = 2)
    private BigDecimal quantity;

    @NotNull
    @Column(name = "movement_date", nullable = false)
    private LocalDate movementDate;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, columnDefinition = "enum('INGRESO','AJUSTE','PERDIDA','DEVOLUCION')")
    private StockMovementReason reason;

    @Size(max = 500)
    @Column(length = 500)
    private String note;

    @NotNull
    @Column(nullable = false, updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = java.time.LocalDateTime.now();
        }
    }
}
