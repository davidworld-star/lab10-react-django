# Lab 10 - ReactJS + Django

Aplicación de laboratorio del curso **Desarrollo de Aplicaciones Empresariales** (Tecsup).
Incluye una API de productos con Django y un frontend React con Vite y MUI.

## Tecnologías

- Python 3.14.7
- Django 6.1.2
- django-cors-headers 4.9.0
- Node.js 26.9.0 / npm 11.19.1
- React 19.3.1 / React DOM 19.3.1
- Vite 8.3.5
- @mui/material 9.5.0
- @emotion/react 11.14.0
- @emotion/styled 11.14.1

## Backend (Django)

```powershell
cd backend
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install django==6.1.2 django-cors-headers==4.9.0
.\.venv\Scripts\python.exe manage.py migrate
.\.venv\Scripts\python.exe manage.py loaddata productos
.\.venv\Scripts\python.exe manage.py runserver 8000
```

La API queda en `http://localhost:8000/api/producto/`.

- `GET /api/producto/` devuelve la lista de productos.
- `POST /api/producto/` recibe `{"descripcion": "...", "precio": 2.50}` y crea un producto.

La fixture `productos.json` carga los productos iniciales, por eso `db.sqlite3` no se sube al repositorio.

## Frontend (React + Vite)

```powershell
cd frontend
npm install
npm run dev
```

Abrir `http://localhost:5173/`.

## Notas del laboratorio

- `CORS_ALLOW_ALL_ORIGINS = True` se usa solo para el laboratorio.
- `@csrf_exempt` se usa solo para el laboratorio.
- La `SECRET_KEY` es la generada por `django-admin startproject` con el prefijo `django-insecure-`; no debe usarse en producción.
