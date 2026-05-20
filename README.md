
# Frontend - front_despacho

[![React](https://img.shields.io/badge/React-18.2.0-blue?logo=react)](https://reactjs.org/) [![Vite](https://img.shields.io/badge/Vite-5.2.0-brightgreen?logo=vite)](https://vitejs.dev/) [![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.3-skyblue?logo=tailwindcss)](https://tailwindcss.com/)

## 🎯 Objetivo

Este módulo entrega la interfaz de usuario para la gestión de órdenes de venta y despachos. Está construido con React, Vite y Tailwind para desarrollo rápido y experiencia responsive.

## 📦 Estructura del frontend

```
front_despacho/
├── .env
├── package.json
├── tailwind.config.js
├── vite.config.js
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── Routes/
│   │   └── AppRoutes.jsx
│   └── componentes/
│       ├── CrudAdmin.jsx
│       ├── CrudAdmin/
│       │   ├── CardComponent.jsx
│       │   ├── FormCierreDespacho.jsx
│       │   ├── FormDespacho.jsx
│       │   ├── Modal.jsx
│       │   ├── PruebaCards.jsx
│       │   ├── SearchBar.jsx
│       │   ├── TableCompras.jsx
│       │   ├── TableDespachos.jsx
│       │   └── ...
│       └── Layouts/
│           ├── Navbar.jsx
│           ├── Footer.jsx
│           └── Reviews.jsx
```

## 🛠️ Tecnologías y dependencias

- React 18
- Vite 5
- Tailwind CSS 3
- Axios
- React Router DOM
- React Hook Form
- SweetAlert2
- ESLint

## 🔧 Scripts disponibles

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## 🌐 Variables de entorno

El módulo incluye `.env` con las URLs locales esperadas:

```env
VITE_API_VENTAS=http://localhost:8080
VITE_API_DESPACHOS=http://localhost:8081
```

## 🔗 Configuración de proxy

`vite.config.js` define un proxy a un endpoint AWS:

```js
proxy: {
  '/api': {
    target: 'https://qic534o8o0.execute-api.us-east-1.amazonaws.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### Observación

El código frontend usa direcciones IP hardcodeadas en varios componentes. Esto es inconsistente con el uso de variables de entorno y la configuración de proxy. Se recomienda migrar todas las llamadas HTTP a `import.meta.env.VITE_API_VENTAS` y `VITE_API_DESPACHOS`.

## 📌 Endpoints detectados

| Archivo | Método | Endpoint | Propósito |
|---|---|---|---|
| `TableCompras.jsx` | GET | `http://192.168.30/api/v1/ventas` | Obtener ventas |
| `FormDespacho.jsx` | PUT | `http://192.168.30/api/v1/ventas/{id}` | Actualizar venta |
| `FormDespacho.jsx` | POST | `http://192.168.320/api/v1/despachos` | Crear despacho |
| `TableDespachos.jsx` | GET | `http://192.168.3.20/api/v1/despachos` | Obtener despachos |
| `FormCierreDespacho.jsx` | PUT | `http://192.168.320/api/v1/despachos/{id}` | Actualizar despacho |

## 🚀 Ejecución local

```bash
cd front_despacho
npm install
npm run dev
```

## 📦 Dockerización (recomendación)

No se detectó `Dockerfile` en este módulo. Para desarrollo DevOps, el frontend debería contener:

- Un `Dockerfile` basado en `node:18-alpine` para build.
- Un stage de producción que sirva archivos estáticos.
- Variables de entorno en build-time y runtime.

## ⚠️ Consideraciones DevOps

- El frontend no está alineado con el proxy de Vite y las variables `.env`.
- No hay workflow de GitHub Actions detectado.
- Se recomienda añadir pruebas de integración de UI.

## ✅ Recomendaciones

1. Normalizar todas las URLs en `.env`.
2. Usar `import.meta.env.VITE_API_*` en los componentes.
3. Añadir un `Dockerfile` para producción.
4. Crear un workflow en `.github/workflows` para build y test.

## 📌 Nota

Este README está diseñado para un entorno DevOps académico: documentación clara, separación de responsabilidades y preparación para despliegue contenedorizado.
=======
# front-despacho
>>>>>>> f5a1418acf9b366da3048e40914bc81f74f698e8
