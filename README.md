# Inventiory

Sistema de gestión de inventario, ventas y rentabilidad para pequeños comercios.

Monorepo con el backend (Spring Boot) y el frontend (React) del producto.

## Estructura

```
inventiory/
├── backend/     API REST en Spring Boot 3 + MySQL
├── frontend/    SPA en React + Vite
└── docs/        Documentación técnica y de producto
```

## Documentación

El índice completo está en [docs/README.md](docs/README.md). Puntos de entrada:

- [Visión de producto](docs/product-vision.md) — qué problema resuelve y para quién
- [Arquitectura](docs/architecture.md) — stack, módulos y decisiones estructurales
- [Modelo de dominio](docs/domain-model.md) — entidades y reglas de negocio
- [Decisiones (ADR)](docs/adr/) — por qué el sistema es como es

## Puesta en marcha

Requisitos: JDK 17, Node 18+, MySQL 8.

```bash
cp .env.example .env
```

Completar el `.env` con las credenciales antes de levantar nada.

### Backend

```bash
cd backend && ./mvnw spring-boot:run
```

Queda en `http://localhost:8080`, con Swagger en `/swagger-ui`.

### Frontend

```bash
cd frontend && npm install && npm run dev
```

## Configuración

| Perfil | Archivo | Versionado |
|---|---|---|
| Desarrollo | `backend/src/main/resources/application-dev.properties` | No (tiene credenciales) |
| Producción | `backend/src/main/resources/application-prod.properties` | Sí (usa variables de entorno) |
| Plantilla | `backend/src/main/resources/application-example.properties` | Sí |

Los valores sensibles nunca se escriben en un `.properties`: se inyectan como variables de entorno definidas en `.env`.
