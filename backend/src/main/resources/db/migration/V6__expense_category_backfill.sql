-- =====================================================================
-- V6 - Agrega la categoria fija de gastos y migra los valores existentes
--
-- expense_type se conserva temporalmente para que el codigo viejo siga
-- funcionando durante el despliegue gradual.
-- =====================================================================

ALTER TABLE expenses
    ADD COLUMN category enum('PROVEEDORES','EMPLEADOS','ALQUILER','SERVICIOS','IMPUESTOS','OTROS');

UPDATE expenses
SET category = CASE UPPER(TRIM(expense_type))
    WHEN 'PROVEEDORES' THEN 'PROVEEDORES'
    WHEN 'EMPLEADOS' THEN 'EMPLEADOS'
    WHEN 'ALQUILER' THEN 'ALQUILER'
    WHEN 'SERVICIOS' THEN 'SERVICIOS'
    WHEN 'IMPUESTOS' THEN 'IMPUESTOS'
    WHEN 'OTROS' THEN 'OTROS'
    ELSE 'OTROS'
END;

CREATE INDEX idx_expenses_category
    ON expenses (category);
