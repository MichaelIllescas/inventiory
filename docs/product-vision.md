# Visión de producto

## El problema

El comercio chico —una tienda de barrio, un kiosco, una ferretería— funciona hoy
sin ningún control formal del stock. En el mejor de los casos hay un cuaderno con
anotaciones; en el peor, todo vive en la cabeza del dueño.

Eso produce tres problemas concretos, todos los días:

- **No se sabe qué hay.** Para saber si queda un producto hay que ir a mirar. El
  conteo real solo existe cuando alguien lo cuenta.
- **No se sabe si el mes cerró bien.** Entra plata por las ventas y sale por los
  proveedores, los sueldos, el alquiler y los servicios, pero nadie suma las dos
  columnas. El resultado del mes es una sensación.
- **Se pierde venta.** Los productos que más rotan se terminan sin aviso. El dueño
  se entera cuando el cliente ya se fue.

El papel no falla por falta de disciplina: falla porque no suma, no avisa y no se
puede consultar. Cada consulta cuesta tiempo manual.

## Para quién es

Comercios chicos que hoy **no tienen ningún sistema**: tiendas, kioscos,
ferreterías, despensas y similares.

Perfil del usuario:

- El **dueño** es el usuario principal. Opera el negocio, no es técnico y no tiene
  formación contable.
- No hay área de sistemas ni quien capacite a nadie.
- El tiempo es el recurso escaso: si cargar una venta tarda más que anotarla en el
  cuaderno, el sistema se abandona.

Esto define el estándar de Inventiory: **el competidor real no es otro software,
es el cuaderno.** Cada pantalla tiene que ser más rápida y más clara que anotar a
mano, y usable sin capacitación previa.

## Qué NO es

Estos límites son deliberados. Mantenerlos es lo que permite que el producto sea
simple para quien recién deja el papel.

- **No es facturación electrónica.** Inventiory no emite comprobantes fiscales ni
  se integra con AFIP.
- **No es un sistema contable.** No lleva balances, libro diario ni liquidación de
  impuestos.
- **No es e-commerce.** No hay tienda online, catálogo público ni pasarela de pago.
- **No es multi-sucursal.** Un comercio, un depósito.
- **No es un ERP.** Nada de RRHH, producción, ni CRM.

Cuando aparezca el pedido de alguna de estas cosas, la respuesta por defecto es
no. Cambiarlo requiere un ADR que explique por qué.

## Cómo sabemos que funciona

Inventiory es un éxito a seis meses si, en los comercios que lo usan:

- El dueño **sabe cuánto stock tiene sin ir a contarlo** al depósito.
- El dueño **sabe si el negocio dio resultado** en el mes: cuánto vendió, cuánto
  gastó y en qué se le fue la plata.
- El dueño **sabe qué productos vende** y cuáles no se mueven.
- **Dejó de quedarse sin los productos que más vende**, porque el sistema avisa
  antes.
- **Abandonó el cuaderno.** No lo usa "además del sistema": lo dejó de usar.

El último es el indicador que manda. Un comercio que mantiene el papel en paralelo
es un comercio donde el producto falló, aunque todas las pantallas funcionen.

## Flujos centrales

Los tres recorridos que el producto tiene que resolver bien. Si alguno falla, el
comercio vuelve al papel.

### Registrar una venta

El cliente deja productos en el mostrador. El dueño abre la venta, agrega cada
producto **escaneando el código de barras o buscándolo por nombre** —el mismo
campo de búsqueda resuelve las dos cosas—, el total se calcula solo, cobra y
confirma. El stock de esos productos baja automáticamente.

Lo que tiene que estar resuelto:

- Si el producto **no está cargado**, el dueño lo crea en el momento, sin salir de
  la venta ni perder lo que ya agregó.
- El **código de barras es opcional**. Hay rubros que no lo tienen —indumentaria,
  sobre todo— y obligar a inventar un código es obligar a ensuciar los datos. El
  único dato de identidad obligatorio es el nombre.
- Si **no hay stock suficiente**, el sistema avisa pero **no bloquea**: la venta
  real ya ocurrió y el papel nunca le habría impedido venderla.
- Sacar o corregir un ítem antes de confirmar tiene que ser inmediato.

### Actualizar el stock

Llega mercadería del proveedor. El dueño busca cada producto y carga la cantidad
que entró, con la fecha y el proveedor si quiere anotarlo. El stock sube. **No se
carga plata en este paso**: lo que se pagó, si se pagó, se registra como gasto.

Lo que tiene que estar resuelto:

- El mismo flujo cubre todo lo que mueve el stock sin ser una venta: **entrada de
  mercadería, ajuste por conteo, rotura o pérdida y devolución**. Cada movimiento
  queda con su motivo, así el historial explica por qué el número es el que es.
- El producto tiene **un solo precio, el de venta**. No se le pide al dueño un
  costo que no tiene a mano, y el precio se puede actualizar cuando cambia sin que
  eso altere las ventas ya registradas.

### Saber qué se está por acabar

El dueño entra y ve, sin buscar nada, qué productos están por debajo de su mínimo.
Es la pantalla que reemplaza al "me parece que se está terminando".

Lo que tiene que estar resuelto:

- Cada producto tiene un **mínimo** definido por el dueño, no calculado por el
  sistema.

### Saber si el mes cerró bien

El dueño registra lo que paga —proveedores, sueldos, alquiler, servicios,
impuestos— eligiendo una **categoría de una lista fija**, y el sistema le muestra
el resultado del período: cuánto vendió, cuánto gastó y en qué categoría se le fue
la plata.

Lo que tiene que estar resuelto:

- La rentabilidad es **del negocio, no del producto**: ventas del período menos
  gastos del período. Deliberadamente no hay margen por producto, porque exigiría
  cargar el costo de cada unidad que entra.
- Las categorías las define el sistema, no el usuario. Una lista corta y estable es
  lo que permite comparar un mes contra otro; si cada comercio inventa las suyas,
  el análisis deja de tener sentido.

## Roles

Hay exactamente **dos roles**, y no hay más por ahora:

- **Administrador de plataforma.** Es el equipo de Inventiory. Administra el
  sistema completo: da de alta los comercios y sus usuarios, y es el único que ve
  información a nivel plataforma.
- **Usuario.** Es el dueño del comercio. Opera su propio comercio y solo ve sus
  propios datos: productos, stock, ventas y reportes.

Consecuencias de esta decisión:

- **El dueño del comercio no administra usuarios.** No crea cuentas, no asigna
  permisos, no invita a nadie. El alta de cada comercio y de su usuario la hace el
  administrador de plataforma.
- **No hay roles de empleado.** Si el comercio tiene empleados, comparten el
  usuario del dueño. No existe un permiso más acotado para "solo cargar ventas".
- **No hay pantalla de registro pública.** Nadie se crea una cuenta solo. El
  acceso siempre nace de un alta hecha por el administrador.

Si más adelante hiciera falta separar al empleado del dueño, es una decisión
nueva y va en un ADR.
