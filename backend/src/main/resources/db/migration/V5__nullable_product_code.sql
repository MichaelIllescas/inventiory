-- =====================================================================
-- V5 - El codigo de barras pasa a ser opcional y unico
--
-- MySQL 8 permite multiples NULL en un indice UNIQUE. Los codigos no nulos
-- siguen siendo unicos.
-- =====================================================================

UPDATE products
SET code = NULL
WHERE code = '';

ALTER TABLE products
    MODIFY code varchar(50) NULL;

ALTER TABLE products
    ADD CONSTRAINT uq_products_code UNIQUE (code);
