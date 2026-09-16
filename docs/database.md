# Base de datos

Esquema destino para el modelo definido por [ADR 0001](adr/0001-stock-sin-costeo-fifo.md)
y [domain-model.md](domain-model.md): **stock sin costeo**.

El código todavía contiene `purchases`, costo FIFO y ganancia por venta. Este
documento describe la base a la que tiene que llegar la implementación.

## Principios

- Una migración Flyway aplicada no se edita. El esquema inicial vive en
  `V1__init.sql`; los cambios empiezan en `V3__`.
- El producto no guarda costo.
- Los movimientos de stock no guardan importes.
- Las ventas guardan el precio vendido, no costo ni ganancia.
- La rentabilidad se calcula como ventas del período menos gastos del período.

## Esquema destino

### `products`

Catálogo del usuario. Conserva el stock actual y el precio de venta vigente.

| Columna | Tipo | Nulo | Clave / índice | Notas |
|---|---:|---:|---|---|
| `id` | `bigint` | No | PK | `AUTO_INCREMENT` |
| `user_id` | `bigint` | No | FK `usuarios(id)`, `idx_products_user` | Dueño del producto |
| `brand_id` | `bigint` | Sí | FK `brands(id)`, `idx_products_brand` | Marca opcional |
| `code` | `varchar(50)` | Sí | UNIQUE `uq_products_code` | Código de barras opcional |
| `name` | `varchar(100)` | No | `idx_products_name` | Nombre visible |
| `description` | `varchar(255)` | Sí |  | Descripción opcional |
| `category` | `varchar(100)` | Sí |  | Categoría libre del catálogo |
| `sale_price` | `decimal(10,2)` | No |  | Precio de venta vigente |
| `stock` | `decimal(10,3)` | No |  | Stock actual |
| `min_stock` | `decimal(38,2)` | Sí |  | `CHECK (min_stock >= 0)` |
| `state` | `bit` | Sí | `idx_products_state` | Activo/inactivo |
| `registration_date` | `date` | Sí |  | Fecha de alta |
| `updated_date` | `date` | Sí |  | Fecha de última edición |
| `last_price_update` | `date` | Sí |  | Fecha del último cambio de precio |

Se elimina `previous_sale_price`. El historial no vive en la fila del producto.

`code` pasa a ser nullable. La unicidad se mantiene con un `UNIQUE` normal sobre
`code`: en MySQL 8 eso permite múltiples `NULL`, así que muchos productos pueden
no tener código de barras y los productos con código siguen sin duplicarse.

### `product_sale_prices`

Historial de precios de venta por vigencia.

| Columna | Tipo | Nulo | Clave / índice | Notas |
|---|---:|---:|---|---|
| `id` | `bigint` | No | PK | `AUTO_INCREMENT` |
| `product_id` | `bigint` | No | FK `products(id)` | Producto |
| `sale_price` | `decimal(10,2)` | No |  | Precio vigente desde la fecha indicada |
| `effective_from` | `date` | No | `idx_product_sale_prices_product_effective_from` | Fecha de vigencia |
| `created_at` | `timestamp` | No |  | `DEFAULT CURRENT_TIMESTAMP` |

Índices y restricciones:

- `uq_product_sale_prices_product_effective_from` sobre
  (`product_id`, `effective_from`).
- `idx_product_sale_prices_product_effective_from` sobre
  (`product_id`, `effective_from`).

La venta no recalcula importes desde esta tabla. Esta tabla explica qué precio
estaba vigente cuando se consultan cambios históricos del catálogo.

### `stock_movements`

Todo cambio de stock que no es una venta.

| Columna | Tipo | Nulo | Clave / índice | Notas |
|---|---:|---:|---|---|
| `id` | `bigint` | No | PK | `AUTO_INCREMENT` |
| `product_id` | `bigint` | No | FK `products(id)`, `idx_stock_movements_product_date` | Producto movido |
| `provider_id` | `bigint` | Sí | FK `providers(id)`, `idx_stock_movements_provider` | Proveedor opcional |
| `registered_by` | `bigint` | No | FK `usuarios(id)`, `idx_stock_movements_user_date` | Usuario que registró el movimiento |
| `quantity` | `decimal(38,2)` | No |  | Cantidad del movimiento |
| `movement_date` | `date` | No | `idx_stock_movements_product_date`, `idx_stock_movements_user_date` | Fecha del movimiento |
| `reason` | `enum('INGRESO','AJUSTE','PERDIDA','DEVOLUCION')` | No | `idx_stock_movements_reason` | Motivo |
| `note` | `varchar(500)` | Sí |  | Nota opcional |
| `created_at` | `timestamp` | No |  | `DEFAULT CURRENT_TIMESTAMP` |

No hay columnas de importe, costo unitario, costo total ni ganancia.

`INGRESO` y `DEVOLUCION` suman stock. `PERDIDA` resta stock. `AJUSTE` representa
la diferencia necesaria para llegar al stock contado.

### `expenses`

Gastos del negocio. La categoría pasa de texto libre a enum fijo.

| Columna | Tipo | Nulo | Clave / índice | Notas |
|---|---:|---:|---|---|
| `id` | `bigint` | No | PK | `AUTO_INCREMENT` |
| `user_id` | `bigint` | No | FK `usuarios(id)`, `idx_expenses_user_date` | Usuario |
| `category` | `enum('PROVEEDORES','EMPLEADOS','ALQUILER','SERVICIOS','IMPUESTOS','OTROS')` | No | `idx_expenses_category` | Categoría fija |
| `description` | `varchar(255)` | Sí |  | Nota o descripción |
| `amount` | `decimal(10,2)` | No |  | Monto del gasto |
| `payment_method` | `varchar(50)` | No |  | Medio de pago |
| `date` | `date` | No | `idx_expenses_user_date` | Fecha del gasto |

Se elimina `expense_type`. Agregar una categoría requiere código y migración.

### `sale`

Cabecera de venta. Conserva totales comerciales, no rentabilidad.

| Columna | Tipo | Nulo | Clave / índice | Notas |
|---|---:|---:|---|---|
| `id` | `bigint` | No | PK | `AUTO_INCREMENT` |
| `user_id` | `bigint` | No | FK `usuarios(id)`, `idx_sale_user_date` | Usuario |
| `customer_id` | `bigint` | Sí | FK `clients(id)`, `idx_sale_customer` | Cliente opcional |
| `sale_date` | `date` | No | `idx_sale_user_date` | Fecha |
| `payment_method` | `enum('BANK_TRANSFER','CASH','CREDIT_CARD','DEBIT_CARD','OTHER')` | No |  | Medio de pago |
| `status` | `enum('CANCELED','CONFIRMED','PENDING')` | No | `idx_sale_status` | Estado |
| `total_sale` | `decimal(38,2)` | No |  | Total cobrado |
| `discount_applied` | `decimal(38,2)` | No |  | Descuento |
| `extra_charge_percentage` | `decimal(38,2)` | No |  | Recargo |

Se eliminan `total_cost`, `gross_profit` y `net_profit`.

### `sale_detail`

Ítems de venta. En el lenguaje de dominio son los ítems de venta.

| Columna | Tipo | Nulo | Clave / índice | Notas |
|---|---:|---:|---|---|
| `id` | `bigint` | No | PK | `AUTO_INCREMENT` |
| `sale_id` | `bigint` | No | FK `sale(id)`, `idx_sale_detail_sale` | Venta |
| `product_id` | `bigint` | No | FK `products(id)`, `idx_sale_detail_product` | Producto |
| `quantity` | `decimal(38,2)` | No |  | Cantidad vendida |
| `sale_price` | `decimal(38,2)` | No |  | Precio unitario vendido |
| `subtotal` | `decimal(38,2)` | No |  | `sale_price * quantity` |

Se elimina `cost_price`.

### `purchases`

La tabla `purchases` era el lote de compra usado para FIFO. Se elimina después de
migrar sus filas a `stock_movements`.

No se reemplaza por otra tabla de compras. La compra de mercadería, cuando hay
plata saliendo de caja, se registra como `expenses.category = 'PROVEEDORES'`.

## Migraciones Flyway

Las migraciones nuevas empiezan después de `V2__expense_amount_decimal.sql`.

1. `V3__stock_movements_and_price_history.sql`
   - Crea `stock_movements`.
   - Crea `product_sale_prices`.
   - Agrega índices de consulta para ambas tablas.
   - Puede correr con el código viejo porque no elimina ni cambia columnas usadas.

2. `V4__seed_stock_movements_from_purchases.sql`
   - Inserta un movimiento `INGRESO` por cada fila existente de `purchases`.
   - Inserta el precio actual de cada producto en `product_sale_prices`.
   - Puede correr con el código viejo porque solo agrega datos en tablas nuevas.

3. `V5__nullable_product_code.sql`
   - Cambia `products.code` a nullable.
   - Convierte códigos vacíos en `NULL`.
   - Crea `uq_products_code`.
   - Puede correr con el código viejo si no hay códigos repetidos no nulos.

4. `V6__expense_category_backfill.sql`
   - Agrega `expenses.category` con enum fijo y nullable.
   - Migra los valores existentes de `expenses.expense_type` a `category`.
   - Puede correr con el código viejo porque `expense_type` sigue existiendo.

5. `V7__expense_category_required.sql`
   - Cambia `expenses.category` a `NOT NULL`.
   - Elimina `expenses.expense_type`.
   - Requiere que el código nuevo ya escriba `expenses.category`.

6. `V8__drop_cost_and_profit_columns.sql`
   - Elimina `products.previous_sale_price`.
   - Elimina `sale.total_cost`, `sale.gross_profit`, `sale.net_profit`.
   - Elimina `sale_detail.cost_price`.
   - Requiere que el código nuevo ya no lea ni escriba esas columnas.

7. `V9__drop_purchases.sql`
   - Elimina `purchases`.
   - Requiere que el código nuevo ya no use el módulo `purchases`.

## Migración de datos

### Lotes de compra a movimientos de stock

Cada fila de `purchases` se convierte en una fila de `stock_movements`:

| Origen `purchases` | Destino `stock_movements` |
|---|---|
| `product_id` | `product_id` |
| `provider_id` | `provider_id` |
| `registred_by` | `registered_by` |
| `quantity` | `quantity` |
| `purchase_date` | `movement_date` |
| constante | `reason = 'INGRESO'` |
| `notes` | `note` |

Solo se migran como movimientos los lotes con `state = true`. Los lotes anulados
no deben volver a mover stock.

`purchase_price` y `remaining_stock` no se migran. El movimiento registra que
entró mercadería, no cuánto costó ni cuánto queda de ese lote.

### Precio de venta inicial

Cada producto conserva su `products.sale_price` actual como precio vigente.

Además se crea una fila inicial en `product_sale_prices`:

- `product_id`: producto.
- `sale_price`: `products.sale_price`.
- `effective_from`: `products.last_price_update` si existe; si no existe,
  `products.updated_date`; si no existe, `products.registration_date`; si no
  existe, la fecha de ejecución de la migración.

A partir del despliegue del código nuevo, cada cambio de precio inserta una nueva
fila en `product_sale_prices` y actualiza `products.sale_price`.

### Categoría inicial de gastos

Los gastos existentes reciben una categoría por mapeo explícito de
`expenses.expense_type`. Los valores conocidos que no puedan mapearse con certeza
van a `OTROS`.

La migración no inventa categorías nuevas. El enum cerrado es parte del modelo.

### Información que se pierde

- Costo unitario de cada compra (`purchases.purchase_price`).
- Stock restante por lote (`purchases.remaining_stock`).
- Capacidad de reconstruir FIFO histórico.
- Costo de cada ítem vendido (`sale_detail.cost_price`).
- Costo total de cada venta (`sale.total_cost`).
- Ganancia bruta y neta grabada por venta (`sale.gross_profit`, `sale.net_profit`).
- Tipo de gasto libre original cuando se elimine `expenses.expense_type`.
- Precio de venta anterior guardado en `products.previous_sale_price`.

Después de esta migración no se puede calcular margen por producto ni valuación de
inventario a costo desde la base.

## Orden de despliegue

1. Ejecutar `V3__stock_movements_and_price_history.sql`.
2. Ejecutar `V4__seed_stock_movements_from_purchases.sql`.
3. Ejecutar `V5__nullable_product_code.sql`.
4. Ejecutar `V6__expense_category_backfill.sql`.
5. Desplegar el código nuevo que:
   - usa `stock_movements` para ingresos, ajustes, pérdidas y devoluciones;
   - escribe `expenses.category`;
   - deja de leer y escribir costos y ganancias en ventas;
   - deja de usar `purchases`.
6. Ejecutar `V7__expense_category_required.sql`.
7. Ejecutar `V8__drop_cost_and_profit_columns.sql`.
8. Ejecutar `V9__drop_purchases.sql`.

`V3`, `V4`, `V5` y `V6` son compatibles hacia atrás. Pueden correr antes del
cambio de código.

`V5` solo puede crear el índice único si no existen códigos repetidos no nulos. Si
aparecen duplicados, la migración debe fallar y los datos se corrigen antes de
seguir; no se elige automáticamente cuál producto conserva el código.

`V7`, `V8` y `V9` requieren el código nuevo desplegado. Si corren con el código
viejo, el sistema deja de arrancar o falla al vender, reportar gastos o consultar
compras.

## Documentos relacionados

- [ADR 0001](adr/0001-stock-sin-costeo-fifo.md) — decisión de negocio y pérdidas aceptadas
- [Modelo de dominio](domain-model.md) — entidades y reglas
- [Arquitectura](architecture.md) — módulos vigentes y limitaciones conocidas
