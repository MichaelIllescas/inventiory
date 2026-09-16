-- =====================================================================
-- V4 - Migra los lotes de compra a ingresos historicos
--
-- Se conserva la cantidad ingresada y su contexto. El costo y el remanente
-- por lote se descartan porque el nuevo modelo no los representa.
-- =====================================================================

INSERT INTO stock_movements (
    product_id,
    provider_id,
    registered_by,
    quantity,
    movement_date,
    reason,
    note
)
SELECT
    product_id,
    provider_id,
    registred_by,
    quantity,
    purchase_date,
    'INGRESO',
    notes
FROM purchases
WHERE state = b'1';

INSERT INTO product_sale_prices (
    product_id,
    sale_price,
    effective_from
)
SELECT
    id,
    sale_price,
    COALESCE(last_price_update, updated_date, registration_date, CURRENT_DATE)
FROM products;
