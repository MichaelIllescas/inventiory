# Documentación de Inventiory

Índice general de la documentación técnica y de producto del proyecto.
Toda la documentación vive en el repositorio, en Markdown, y se versiona junto al código.

## Producto

| Documento | Contenido | Estado |
|---|---|---|
| [product-vision.md](product-vision.md) | Qué problema resuelve, para quién, qué NO es, roles | ✅ Escrito |

## Técnica

| Documento | Contenido | Estado |
|---|---|---|
| [architecture.md](architecture.md) | Stack, módulos, estructura de carpetas | ✅ Escrito |
| [domain-model.md](domain-model.md) | Entidades, relaciones y reglas de negocio | ✅ Escrito |
| [database.md](database.md) | Esquema, índices y migraciones | ⏳ Pendiente |
| [setup.md](setup.md) | Cómo levantar el proyecto localmente | ⏳ Pendiente |

## Decisiones

| Documento | Contenido | Estado |
|---|---|---|
| [adr/](adr/) | Registro de decisiones de arquitectura (ADR) | ✅ 1 decisión registrada |

---

## Convenciones

- Un documento refleja **el estado actual** del sistema, no su historia. La historia vive en los ADR y en Git.
- Si el código cambia y el documento queda viejo, el documento se actualiza en el mismo commit.
- Los documentos en [`legacy/`](legacy/) (Word y PDF) son material heredado: se migran a esta carpeta y luego se archivan.

## Qué NO se documenta acá

Decisiones tomadas para no mantener documentos que envejecen solos:

- **Referencia de API:** se genera desde el código con OpenAPI/Swagger, no se escribe a mano.
- **Roadmap:** el proyecto lo lleva una sola persona; la lista de tareas cumple esa función.
- **Flujos de usuario:** los tres flujos centrales viven en `product-vision.md`.
- **Testing y deployment:** se documentan cuando existan, no antes.
