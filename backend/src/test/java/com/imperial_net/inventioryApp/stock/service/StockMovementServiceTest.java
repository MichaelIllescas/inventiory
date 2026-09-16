package com.imperial_net.inventioryApp.stock.service;

import com.imperial_net.inventioryApp.products.models.Product;
import com.imperial_net.inventioryApp.products.repository.ProductRepository;
import com.imperial_net.inventioryApp.stock.model.StockMovement;
import com.imperial_net.inventioryApp.stock.model.StockMovementReason;
import com.imperial_net.inventioryApp.stock.repository.StockMovementRepository;
import com.imperial_net.inventioryApp.users.model.User;
import com.imperial_net.inventioryApp.providers.repository.ProviderRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StockMovementServiceTest {

    @Mock
    private StockMovementRepository stockMovementRepository;

    @Mock
    private ProductRepository productRepository;

    @Mock
    private ProviderRepository providerRepository;

    @Test
    void calculatesStockApplyingTheReasonSign() {
        Product product = new Product();
        product.setId(1L);

        StockMovement ingreso = movement(product, BigDecimal.TEN, StockMovementReason.INGRESO);
        StockMovement perdida = movement(product, BigDecimal.valueOf(3), StockMovementReason.PERDIDA);

        when(stockMovementRepository.findAllByProduct_IdOrderByMovementDateAscIdAsc(1L))
                .thenReturn(List.of(ingreso, perdida));

        StockMovementService service = new StockMovementService(stockMovementRepository, productRepository, providerRepository);

        assertEquals(BigDecimal.valueOf(7), service.calculateStock(1L));
    }

    private StockMovement movement(Product product, BigDecimal quantity, StockMovementReason reason) {
        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setQuantity(quantity);
        movement.setReason(reason);
        return movement;
    }
}
