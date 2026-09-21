# Proyecto Final — Admisiones Universidad de Antioquia

Sistema de inscripción a programas académicos según el puntaje del examen de admisión (escala 0-100).

## Estructura

```
PROYECTO_FINAL/
├── backend/          Node.js + Express + MySQL (XAMPP)
│   └── src/
│       ├── config/         credentials.js, database.js
│       ├── controllers/    authController, userController, programController, applicationController
│       ├── database/       schema.sql, initDb.js, seed.js, migrate.js
│       ├── middleware/      authMiddleware.js
│       ├── models/         User, Program, Application
│       ├── repositories/   acceso a datos (SQL)
│       ├── routes/         definición de endpoints
│       └── services/       reglas de negocio
└── frontend/         React + Vite
    └── src/
        ├── components/     Navbar, Sidebar, Layout, Card, Button, Modal, ProtectedRoute
        ├── context/         AuthContext.jsx
        ├── pages/           Login, Registro, Dashboard (puntaje + inscripción), EstadoProceso
        └── services/        api.js
```

## Funcionalidades

1. **Login** (`/login`) y **Registro** (`/registro`).
2. **Dashboard** (`/dashboard`): saludo "Bienvenido, {nombre}", formulario para el puntaje del examen de admisión (**escala 0-100**) y, justo debajo, la sección de inscripción: muestra las carreras a las que puedes aplicar según tu puntaje, con formulario de confirmación y el mensaje "Estás inscrito en la carrera X".
3. **Estado del proceso** (`/estado-proceso`): muestra la carrera, universidad y estado de la inscripción actual.
4. Tema visual en **verde oscuro** en toda la aplicación.

> Se quitaron las secciones de **Convocatorias** y **Documentos** a pedido, y la inscripción ya no es una página aparte: vive dentro del Dashboard, debajo del puntaje.

## Cómo ejecutarlo

### 1. Backend (usa MySQL de XAMPP)

1. Abre el **Panel de control de XAMPP** y dale **Start** al módulo **MySQL**.
2. Revisa `backend/.env` (por defecto `DB_USER=root`, `DB_PASSWORD=` vacía, que son los valores por defecto de XAMPP).

```bash
cd backend
npm install
npm run initdb   # crea la base de datos y las tablas (solo la primera vez)
npm run seed     # inserta las carreras de ejemplo (solo la primera vez)
npm run dev      # inicia el servidor en http://localhost:4000
```

**¿Ya habías creado la base de datos con una versión anterior de este proyecto?**
(la que tenía Convocatorias, Documentos y puntaje sobre 500). Ejecuta una sola vez:
```bash
npm run migrate
```
Esto actualiza las carreras a la escala 0-100, reinicia el puntaje de usuarios que quedó fuera de rango, y elimina las tablas de convocatorias/documentos que ya no se usan. Después, vuelve a ingresar tu puntaje (0-100) desde el Dashboard.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev      # inicia en http://localhost:5173
```

## Carreras de ejemplo (seed.js) — escala 0 a 100

| Programa | Puntaje mínimo |
|---|---|
| Medicina | 92 |
| Ingeniería de Sistemas | 75 |
| Ingeniería Civil | 72 |
| Derecho | 68 |
| Bacteriología | 68 |
| Psicología | 65 |
| Enfermería | 63 |
| Comunicación Social - Periodismo | 60 |
| Contaduría Pública | 58 |
| Administración de Empresas | 55 |

Puedes editar `backend/src/database/seed.js` (o `migrate.js` si ya tenías datos) para ajustar las carreras y los puntajes mínimos.
