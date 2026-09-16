package com.imperial_net.inventioryApp.stock.service;

import com.imperial_net.inventioryApp.products.models.Product;
import com.imperial_net.inventioryApp.products.repository.ProductRepository;
import com.imperial_net.inventioryApp.providers.model.Provider;
import com.imperial_net.inventioryApp.stock.model.StockMovement;
import com.imperial_net.inventioryApp.stock.model.StockMovementReason;
import com.imperial_net.inventioryApp.stock.repository.StockMovementRepository;
import com.imperial_net.inventioryApp.users.model.User;
import com.imperial_net.inventioryApp.exceptions.ProductException;
import com.imperial_net.inventioryApp.providers.repository.ProviderRepository;
import com.imperial_net.inventioryApp.stock.dto.StockMovementRequestDTO;
import com.imperial_net.inventioryApp.stock.dto.StockMovementResponseDTO;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StockMovementService {

    private static final BigDecimal ZERO = BigDecimal.ZERO;

    private final StockMovementRepository stockMovementRepository;
    private final ProductRepository productRepository;
    private final ProviderRepository providerRepository;

    @Transactional
    public StockMovementResponseDTO registerForUser(Long productId, StockMovementRequestDTO request, User user) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Producto no encontrado."));
        if (product.getRegistratedBy() == null || !product.getRegistratedBy().getId().equals(user.getId())) {
            throw new ProductException("El producto no pertenece al usuario autenticado.");
        }

        Provider provider = request.getProviderId() == null ? null : providerRepository.findById(request.getProviderId())
                .orElseThrow(() -> new ProductException("Proveedor no encontrado."));

        StockMovement movement = register(product, request.getQuantity(), request.getMovementDate(),
                request.getReason(), provider, user, request.getNote());

        return new StockMovementResponseDTO(
                movement.getId(), product.getId(), movement.getQuantity(), movement.getMovementDate(),
                movement.getReason(), provider == null ? null : provider.getId(), movement.getNote(), product.getStock());
    }

    @Transactional
    public StockMovement register(Product product, BigDecimal quantity, LocalDate movementDate,
                                  StockMovementReason reason, Provider provider, User registeredBy,
                                  String note) {
        validateQuantity(quantity);
        if (movementDate == null) {
            throw new IllegalArgumentException("La fecha del movimiento es obligatoria.");
        }
        if (reason == null) {
            throw new IllegalArgumentException("El motivo del movimiento es obligatorio.");
        }
        if (product == null || registeredBy == null) {
            throw new IllegalArgumentException("El producto y el usuario son obligatorios.");
        }
        StockMovement movement = new StockMovement();
        movement.setProduct(product);
        movement.setProvider(provider);
        movement.setRegisteredBy(registeredBy);
        movement.setQuantity(quantity);
        movement.setMovementDate(movementDate);
        movement.setReason(reason);
        movement.setNote(note);

        BigDecimal currentStock = product.getStock() == null ? ZERO : product.getStock();
        BigDecimal newStock = currentStock.add(signedQuantity(movement));
        if (newStock.compareTo(ZERO) < 0) {
            throw new IllegalStateException("El movimiento dejaría el stock en un valor negativo.");
        }

        StockMovement saved = stockMovementRepository.save(movement);
        product.setStock(newStock);
        productRepository.save(product);
        return saved;
    }

    @Transactional
    public BigDecimal calculateStock(Long productId) {
        if (productId == null) {
            throw new IllegalArgumentException("El producto es obligatorio.");
        }

        return stockMovementRepository.findAllByProduct_IdOrderByMovementDateAscIdAsc(productId)
                .stream()
                .map(this::signedQuantity)
                .reduce(ZERO, BigDecimal::add);
    }

    public List<StockMovement> findByProduct(Long productId) {
        return stockMovementRepository.findAllByProduct_IdOrderByMovementDateAscIdAsc(productId);
    }

    private BigDecimal signedQuantity(StockMovement movement) {
        if (movement.getReason() == StockMovementReason.PERDIDA) {
            return movement.getQuantity().negate();
        }
        return movement.getQuantity();
    }

    private void validateQuantity(BigDecimal quantity) {
        if (quantity == null || quantity.compareTo(ZERO) == 0) {
            throw new IllegalArgumentException("La cantidad del movimiento debe ser distinta de cero.");
        }
    }
}
