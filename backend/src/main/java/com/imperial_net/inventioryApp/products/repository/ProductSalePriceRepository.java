package com.imperial_net.inventioryApp.products.repository;

import com.imperial_net.inventioryApp.products.models.ProductSalePrice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductSalePriceRepository extends JpaRepository<ProductSalePrice, Long> {

    List<ProductSalePrice> findAllByProduct_IdOrderByEffectiveFromAsc(Long productId);

    Optional<ProductSalePrice> findFirstByProduct_IdAndEffectiveFromLessThanEqualOrderByEffectiveFromDesc(
            Long productId, LocalDate date);
}
