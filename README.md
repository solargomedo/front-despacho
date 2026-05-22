# Frontend Innovatech - Despachos

Frontend React + Vite para gestionar ventas y despachos. Consume dos APIs backend:

- API ventas: `VITE_API_VENTAS`
- API despachos: `VITE_API_DESPACHOS`

## Estructura DevOps

```text
front-despacho/
|-- Dockerfile
|-- nginx.conf
|-- docker-compose.yml
|-- docker-compose.prod.yml
|-- .env.example
|-- .github/workflows/deploy.yml
|-- package.json
`-- src/
```

## Variables

Para ejecución local se puede copiar `.env.example` a `.env`:

```env
FRONTEND_PORT=8082
VITE_API_VENTAS=http://localhost:8083
VITE_API_DESPACHOS=http://localhost:8081
```

En Vite, las variables `VITE_*` se incorporan durante el build. Por eso el workflow de CI/CD las entrega como `build-args` al construir la imagen Docker.

## Despliegue Actual En AWS

Instancia EC2 frontend:

```text
IP publica: 54.234.84.72
DNS publico: ec2-54-234-84-72.compute-1.amazonaws.com
IP privada: 172.31.21.92
```

URL publica del frontend:

```text
http://54.234.84.72
```

Instancia EC2 backend consumida por el frontend:

```text
IP publica backend: 44.198.166.184
Ventas API: http://44.198.166.184:8083
Despachos API: http://44.198.166.184:8081
```

Secrets actuales requeridos en GitHub Actions:

```text
FRONTEND_EC2_HOST=54.234.84.72
FRONTEND_PORT=80
VITE_API_VENTAS=http://44.198.166.184:8083
VITE_API_DESPACHOS=http://44.198.166.184:8081
```

Si AWS Academy detiene e inicia el laboratorio, las IP publicas pueden cambiar. Cuando eso ocurra se deben actualizar `FRONTEND_EC2_HOST`, `VITE_API_VENTAS` y `VITE_API_DESPACHOS`, y luego volver a ejecutar el workflow de despliegue del frontend porque Vite compila esas URLs dentro del bundle.

## Ejecución Local

Instalar dependencias:

```powershell
npm install
```

Modo desarrollo:

```powershell
npm run dev
```

Build productivo:

```powershell
npm run build
```

## Ejecución Con Docker

Desde la raíz del repositorio:

```powershell
docker compose up --build -d
```

El frontend queda disponible en:

```text
http://localhost:8082
```

## Dockerfile

El Dockerfile usa multi-stage:

1. Etapa `builder`: instala dependencias con `npm ci`, recibe las URLs de backend y genera `dist`.
2. Etapa final: usa Nginx Alpine para servir los archivos estáticos.

Nginx escucha en `8080` dentro del contenedor para poder ejecutarse con usuario no root.

## CI/CD

El workflow `.github/workflows/deploy.yml` se activa con push a la rama `deploy`.

Flujo:

1. Descarga el repositorio.
2. Inicia Docker Buildx.
3. Autentica en Docker Hub.
4. Construye la imagen con las variables `VITE_API_*`.
5. Publica:
   - `${DOCKERHUB_USERNAME}/front-despacho:${GITHUB_SHA}`
   - `${DOCKERHUB_USERNAME}/front-despacho:latest`
6. Copia `docker-compose.prod.yml` a la instancia EC2 frontend.
7. Ejecuta `docker compose pull` y `docker compose up -d`.

## GitHub Secrets Requeridos

| Secret | Uso |
|---|---|
| `DOCKERHUB_USERNAME` | Usuario del registro Docker Hub. |
| `DOCKERHUB_TOKEN` | Token de acceso Docker Hub. |
| `FRONTEND_EC2_HOST` | IP pública o DNS de la instancia EC2 frontend. |
| `EC2_USER` | Usuario SSH de EC2, por ejemplo `ubuntu` o `ec2-user`. |
| `EC2_SSH_KEY` | Llave privada SSH para acceder a EC2. |
| `FRONTEND_PORT` | Puerto público del frontend, normalmente `80`. |
| `VITE_API_VENTAS` | URL pública usada por el navegador para consumir ventas. |
| `VITE_API_DESPACHOS` | URL pública usada por el navegador para consumir despachos. |

## Integración Frontend Backend

Las llamadas HTTP se centralizan en `src/config/api.js`:

```js
export const API_VENTAS = import.meta.env.VITE_API_VENTAS;
export const API_DESPACHOS = import.meta.env.VITE_API_DESPACHOS;
```

Esto permite cambiar entre entorno local, Docker y EC2 configurando variables, sin modificar componentes React.

## Nota De Seguridad

En producción solo el frontend debería quedar expuesto a Internet. El backend puede quedar restringido por Security Groups y ser accesible únicamente desde la instancia frontend o desde reglas definidas por la arquitectura AWS del proyecto.
