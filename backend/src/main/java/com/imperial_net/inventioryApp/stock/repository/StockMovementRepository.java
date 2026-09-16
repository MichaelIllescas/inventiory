package com.imperial_net.inventioryApp.stock.repository;

import com.imperial_net.inventioryApp.stock.model.StockMovement;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockMovementRepository extends JpaRepository<StockMovement, Long> {

    List<StockMovement> findAllByProduct_IdOrderByMovementDateAscIdAsc(Long productId);

    List<StockMovement> findAllByProduct_IdAndMovementDateBetweenOrderByMovementDateAscIdAsc(
            Long productId, java.time.LocalDate from, java.time.LocalDate to);
}
