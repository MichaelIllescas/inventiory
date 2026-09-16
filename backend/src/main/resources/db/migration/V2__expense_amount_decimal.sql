-- =====================================================================
-- V2 - El monto de los gastos pasa de float a decimal
--
-- `expenses.amount` era el unico monto del sistema guardado como punto
-- flotante. El punto flotante no representa valores decimales de forma
-- exacta, asi que sumar gastos arrastraba errores de centavos hacia los
-- reportes de ganancia.
--
-- El resto de los montos (sale_price, purchase_price, total_sale) ya
-- usaban decimal; esta migracion alinea a expenses con ese criterio.
-- =====================================================================

ALTER TABLE expenses
    MODIFY amount decimal(10,2) NOT NULL;
