# 0001 - Stock sin costeo: el precio es de venta y la rentabilidad es del negocio

- **Estado:** Aceptado
- **Fecha:** 2026-09-16

## Contexto

El sistema nació con un módulo de **compras a proveedores**: el dueño cargaba una
compra con proveedor, ítems y costo unitario, y cada compra generaba un **lote
FIFO** con su propio precio de costo y su stock restante. Cada venta consumía los
lotes más antiguos primero, y de esa diferencia salía la ganancia por producto.

Ese diseño resuelve bien la rentabilidad por producto, pero le cobra al usuario un
precio alto todos los días:

- Obliga a registrar una **compra** —un concepto administrativo— cuando lo que
  realmente pasó es que entró mercadería.
- Obliga a conocer y cargar el **costo unitario** en cada ingreso.
- Mezcla el movimiento de mercadería con el movimiento de dinero, que en el
  comercio chico casi nunca ocurren el mismo día.

El usuario objetivo no lleva costos: viene del cuaderno, y el competidor real del
producto es ese cuaderno. Un flujo que le pide más datos que anotar a mano es un
flujo que se abandona.

Hay que decidir ahora porque el costeo FIFO es una decisión estructural vigente
(decisión 4 de [architecture.md](../architecture.md)) y todo el módulo de reportes
de ganancia se apoya en ella.

## Alternativas evaluadas

**A. Mantener compras y FIFO tal como están.**
Da rentabilidad exacta por producto. Pero conserva el módulo de compras completo y
el costo unitario obligatorio: el costo de UX que motivó esta decisión.

**B. Conservar el lote de costo, pero esconderlo detrás de un formulario simple de
"ingreso de stock".**
Elimina la compra multi-ítem y mantiene la rentabilidad por producto. Sigue
exigiendo el costo unitario en cada ingreso, que es el dato que el dueño no tiene
a mano.

**C. Eliminar el costeo. El producto tiene precio de venta; la rentabilidad sale de
ventas menos gastos.**
El ingreso de stock queda sin plata: cantidad, fecha y proveedor opcional. La
rentabilidad deja de existir por producto y pasa a ser del negocio. Es el flujo más
cercano al cuaderno, y el gasto en mercadería se declara como gasto.

## Decisión

Se elige **C**.

- El producto tiene **precio de venta** y ningún costo. Es el precio al que se
  vende, con historial por fecha de vigencia para que una venta vieja no se
  recalcule con el precio de hoy.
- **Se elimina el costeo FIFO y el módulo de compras.** En su lugar hay
  **movimientos de stock**: producto, cantidad, fecha, proveedor opcional y motivo
  (`INGRESO`, `AJUSTE`, `PERDIDA`, `DEVOLUCION`). Sin importes. La venta descuenta
  stock directo.
- **El dinero va por gastos**, con **categoría de un enum fijo** (`PROVEEDORES`,
  `EMPLEADOS`, `ALQUILER`, `SERVICIOS`, `IMPUESTOS`, `OTROS`). La categoría no es
  una entidad administrable por el usuario.
- **La rentabilidad es a nivel negocio:** ventas del período menos gastos del
  período.
- El **código de barras es opcional**. La búsqueda de producto resuelve por código
  o por nombre en un mismo campo.

El motivo de fondo: el dato exacto que el usuario no carga no vale nada. Un costo
inventado produce una rentabilidad por producto falsa, que es peor que no tenerla.
Ventas menos gastos es menos preciso por producto y mucho más parecido a cómo el
dueño piensa su negocio.

## Consecuencias

**Se gana**

- El ingreso de mercadería es una pantalla de un paso, sin datos que el dueño tenga
  que averiguar.
- El motivo del movimiento cubre casos que antes no tenían lugar: ajuste por
  conteo, rotura y devolución.
- Los gastos segmentados por categoría habilitan el análisis que antes no existía
  (cuánto se lleva el alquiler, los sueldos, los proveedores).
- El código opcional permite rubros sin código de barras, como indumentaria, sin
  obligar al usuario a inventar un identificador.

**Se pierde**

- **No hay rentabilidad ni margen por producto.** Por producto solo se puede
  informar rotación y facturación.
- No hay valuación del inventario a costo.
- El gasto en mercadería depende de que el dueño lo declare como gasto: ya no se
  deriva automáticamente de una compra.

**Queda pendiente**

- Eliminar el módulo `purchases` del backend y la feature `buys` del frontend.
- Reescribir el cálculo de los reportes de ganancia existentes
  (`ProfitabilityDTO`, `DailyProfitDTO`, `QuarterlyProfitDTO`): las pantallas se
  mantienen, la fuente pasa a ser ventas menos gastos.
- Agregar el reporte de gastos: total del período, desglose por categoría y
  comparación mes contra mes.
- Migración de datos: los lotes de compra existentes deben convertirse en
  movimientos de stock de motivo `INGRESO`, descartando el costo.
- Agregar una categoría de gasto es un cambio de código más migración, no
  configuración del usuario. Si eso se vuelve una limitación real, se decide en un
  ADR nuevo.

Esta decisión **deroga la decisión estructural 4** de
[architecture.md](../architecture.md).
