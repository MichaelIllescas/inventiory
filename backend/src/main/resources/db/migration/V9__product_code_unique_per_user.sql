-- =====================================================================
-- V9 - El codigo de producto es unico solo dentro del usuario
--
-- Permite que distintos usuarios registren productos con el mismo codigo.
-- Los codigos vacios se normalizan a NULL para permitir productos sin codigo.
-- =====================================================================

UPDATE products
SET code = NULL
WHERE code = '';

ALTER TABLE products
    DROP INDEX uq_products_code;

ALTER TABLE products
    ADD CONSTRAINT uq_products_user_code UNIQUE (user_id, code);
