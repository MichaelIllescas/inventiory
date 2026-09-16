# Architecture Decision Records (ADR)

Cada archivo registra **una** decisión: su contexto, las alternativas evaluadas,
la decisión tomada y sus consecuencias.

## Reglas

- Nombre de archivo: `NNNN-titulo-en-kebab-case.md` (ej. `0001-costo-de-producto-vs-compras.md`).
- Un ADR **no se edita** una vez aceptado. Si la decisión cambia, se escribe un ADR nuevo que reemplaza al anterior y se marca el viejo como `Reemplazado por NNNN`.
- Estados posibles: `Propuesto`, `Aceptado`, `Rechazado`, `Reemplazado por NNNN`.

## Plantilla

```markdown
# NNNN - Título de la decisión

- **Estado:** Propuesto | Aceptado | Rechazado | Reemplazado por NNNN
- **Fecha:** AAAA-MM-DD

## Contexto
Qué problema existe y por qué hay que decidir algo ahora.

## Alternativas evaluadas
Las opciones reales que se consideraron, con sus ventajas y desventajas.

## Decisión
Qué se eligió y por qué.

## Consecuencias
Qué se gana, qué se pierde y qué queda pendiente como resultado.
```

## Índice

| ADR | Título | Estado |
|---|---|---|
| — | _Sin decisiones registradas todavía_ | — |
