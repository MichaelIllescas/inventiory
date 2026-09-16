package com.imperial_net.inventioryApp.products.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "product_sale_prices", uniqueConstraints = {
        @UniqueConstraint(name = "uq_product_sale_prices_product_effective_from", columnNames = {"product_id", "effective_from"})
}, indexes = {
        @Index(name = "idx_product_sale_prices_product_effective_from", columnList = "product_id,effective_from")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProductSalePrice {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @NotNull
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal salePrice;

    @NotNull
    @Column(name = "effective_from", nullable = false)
    private LocalDate effectiveFrom;

    @NotNull
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) {
            createdAt = LocalDateTime.now();
        }
    }
}
