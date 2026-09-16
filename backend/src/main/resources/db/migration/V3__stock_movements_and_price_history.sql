-- =====================================================================
-- V3 - Movimientos de stock e historial de precios
--
-- Las tablas nuevas se crean antes de cambiar el codigo para permitir una
-- migracion de datos y un despliegue compatible hacia atras.
-- =====================================================================

CREATE TABLE stock_movements (
    id            bigint NOT NULL AUTO_INCREMENT,
    product_id    bigint NOT NULL,
    provider_id   bigint,
    registered_by bigint NOT NULL,
    quantity      decimal(38,2) NOT NULL,
    movement_date date NOT NULL,
    reason        enum('INGRESO','AJUSTE','PERDIDA','DEVOLUCION') NOT NULL,
    note          varchar(500),
    created_at    timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_stock_movements_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT fk_stock_movements_provider FOREIGN KEY (provider_id) REFERENCES providers (id),
    CONSTRAINT fk_stock_movements_user FOREIGN KEY (registered_by) REFERENCES usuarios (id),
    CONSTRAINT ck_stock_movements_quantity CHECK (quantity <> 0)
) ENGINE=InnoDB;

CREATE INDEX idx_stock_movements_product_date
    ON stock_movements (product_id, movement_date);

CREATE INDEX idx_stock_movements_provider
    ON stock_movements (provider_id);

CREATE INDEX idx_stock_movements_user_date
    ON stock_movements (registered_by, movement_date);

CREATE INDEX idx_stock_movements_reason
    ON stock_movements (reason);

CREATE TABLE product_sale_prices (
    id             bigint NOT NULL AUTO_INCREMENT,
    product_id     bigint NOT NULL,
    sale_price     decimal(10,2) NOT NULL,
    effective_from date NOT NULL,
    created_at     timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_product_sale_prices_product FOREIGN KEY (product_id) REFERENCES products (id),
    CONSTRAINT uq_product_sale_prices_product_effective_from UNIQUE (product_id, effective_from)
) ENGINE=InnoDB;

CREATE INDEX idx_product_sale_prices_product_effective_from
    ON product_sale_prices (product_id, effective_from);
