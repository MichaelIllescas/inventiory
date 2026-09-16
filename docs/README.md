# Documentación de Inventiory

Índice general de la documentación técnica y de producto del proyecto.
Toda la documentación vive en el repositorio, en Markdown, y se versiona junto al código.

## Producto

| Documento | Contenido | Estado |
|---|---|---|
| [product-vision.md](product-vision.md) | Qué problema resuelve, para quién, qué NO es | ⏳ Pendiente |
| [user-flows.md](user-flows.md) | Recorridos reales del usuario, paso a paso | ⏳ Pendiente |
| [roadmap.md](roadmap.md) | Qué viene y en qué orden | ⏳ Pendiente |

## Técnica

| Documento | Contenido | Estado |
|---|---|---|
| [architecture.md](architecture.md) | Stack, módulos, estructura de carpetas | ✅ Escrito |
| [domain-model.md](domain-model.md) | Entidades, relaciones y reglas de negocio | ⏳ Pendiente |
| [api-reference.md](api-reference.md) | Endpoints del backend | ⏳ Pendiente |
| [database.md](database.md) | Esquema, índices y migraciones | ⏳ Pendiente |
| [setup.md](setup.md) | Cómo levantar el proyecto localmente | ⏳ Pendiente |

## Decisiones

| Documento | Contenido | Estado |
|---|---|---|
| [adr/](adr/) | Registro de decisiones de arquitectura (ADR) | ⏳ Pendiente |

## Proceso

| Documento | Contenido | Estado |
|---|---|---|
| [contributing.md](contributing.md) | Flujo de Git, convenciones de commits y PRs | ⏳ Pendiente |
| [testing.md](testing.md) | Estrategia de testing | ⏳ Pendiente |
| [deployment.md](deployment.md) | Despliegue y entornos | ⏳ Pendiente |

---

## Convenciones

- Un documento refleja **el estado actual** del sistema, no su historia. La historia vive en los ADR y en Git.
- Si el código cambia y el documento queda viejo, el documento se actualiza en el mismo PR.
- Los documentos en `DOCUMENTATION/` (Word y PDF) son material heredado: se van migrando a esta carpeta y luego se archivan.
