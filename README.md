# 🎫 Sistema de Tickets de Soporte Interno

Un sistema moderno y elegante de gestión de tickets de soporte técnico desarrollado con Next.js, React y TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?style=for-the-badge&logo=tailwind-css)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-336791?style=for-the-badge&logo=postgresql)

## ✨ Características

- **🔐 Autenticación Segura**: Sistema de registro y login con bcrypt
- **👥 Gestión de Usuarios**: Roles de usuario y administrador
- **🎫 Gestión de Tickets**: Crear, editar y gestionar tickets de soporte
- **💬 Sistema de Comentarios**: Conversaciones en tiempo real en cada ticket
- **📊 Dashboard Intuitivo**: Vista general de tickets y estadísticas
- **🎨 UI Moderna**: Diseño elegante con Radix UI y Tailwind CSS
- **📱 Responsive**: Funciona perfectamente en móviles y escritorio
- **🔍 Filtros y Búsqueda**: Encuentra tickets rápidamente
- **⚡ Performance**: Optimizado con Next.js 14

## 🚀 Demo

Puedes probar la aplicación usando estas credenciales:

- **Email**: `test@test.com`
- **Contraseña**: `password123`

Este usuario de prueba tiene múltiples tickets con comentarios para explorar todas las funcionalidades.

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 14** - Framework de React con App Router
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utilitario
- **Radix UI** - Componentes accesibles y sin estilos
- **Lucide React** - Iconos modernos

### Backend
- **Next.js API Routes** - Endpoints del servidor
- **PostgreSQL** - Base de datos relacional
- **Supabase** - Backend como servicio
- **bcrypt** - Hashing de contraseñas
- **pg** - Cliente de PostgreSQL para Node.js

## 📦 Instalación

### Prerrequisitos

- Node.js 18+ 
- pnpm (recomendado) o npm
- Cuenta en Supabase

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/sistema-tickets.git
   cd sistema-tickets
   ```

2. **Instala las dependencias**
   ```bash
   pnpm install
   # o
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env.local
   ```
   
   Edita `.env.local` con tus credenciales de Supabase:
   ```env
   PGHOST=tu-host.pooler.supabase.com
   PGDATABASE=postgres
   PGUSER=postgres.tu-project-id
   PGPASSWORD=tu-password
   PGPORT=5432
   ```

4. **Ejecuta las migraciones de base de datos**
   
   Ejecuta los scripts SQL en tu proyecto de Supabase para crear las tablas:
   - `users` - Información básica de usuarios
   - `profiles` - Perfiles con autenticación
   - `tickets` - Tickets de soporte
   - `ticket_comments` - Comentarios en tickets

5. **Inicia el servidor de desarrollo**
   ```bash
   pnpm dev
   # o
   npm run dev
   ```

6. **Abre la aplicación**
   
   Visita [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🗄️ Estructura de la Base de Datos

### Tabla `users`
- `id` (UUID) - Identificador único
- `created_at` - Fecha de creación

### Tabla `profiles`
- `id` (UUID) - Referencia a users.id
- `full_name` (TEXT) - Nombre completo
- `email` (TEXT) - Email único
- `password_hash` (TEXT) - Contraseña hasheada
- `role` (TEXT) - 'user' o 'admin'
- `created_at`, `updated_at` - Timestamps

### Tabla `tickets`
- `id` (UUID) - Identificador único
- `user_id` (UUID) - Referencia a profiles.id
- `title` (TEXT) - Título del ticket
- `description` (TEXT) - Descripción detallada
- `category` (TEXT) - Categoría (software, hardware, network)
- `priority` (TEXT) - Prioridad (baja, media, alta)
- `status` (TEXT) - Estado (abierto, en_proceso, resuelto)
- `created_at` - Fecha de creación

### Tabla `ticket_comments`
- `id` (UUID) - Identificador único
- `ticket_id` (UUID) - Referencia a tickets.id
- `user_id` (UUID) - Referencia a profiles.id
- `comment` (TEXT) - Contenido del comentario
- `created_at` - Fecha de creación

## 🔧 Scripts Disponibles

```bash
# Desarrollo
pnpm dev          # Inicia el servidor de desarrollo

# Producción
pnpm build        # Construye la aplicación para producción
pnpm start        # Inicia el servidor de producción

# Calidad de código
pnpm lint         # Ejecuta ESLint
```

## 🚀 Despliegue

### Vercel (Recomendado)

1. **Conecta tu repositorio a Vercel**
2. **Configura las variables de entorno** en el dashboard de Vercel
3. **Despliega automáticamente** con cada push a main

### Variables de entorno para producción

Asegúrate de configurar estas variables en tu plataforma de despliegue:

```env
PGHOST=tu-host-produccion.pooler.supabase.com
PGDATABASE=postgres
PGUSER=postgres.tu-project-id
PGPASSWORD=tu-password-seguro
PGPORT=5432
```

## 👥 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🤝 Soporte

Si tienes alguna pregunta o problema:

1. Revisa la documentación
2. Busca en los issues existentes
3. Crea un nuevo issue con detalles del problema

## 🙏 Agradecimientos

- [Next.js](https://nextjs.org/) por el framework
- [Radix UI](https://www.radix-ui.com/) por los componentes
- [Tailwind CSS](https://tailwindcss.com/) por los estilos
- [Supabase](https://supabase.com/) por el backend
- [Lucide](https://lucide.dev/) por los iconos

---

Desarrollado con ❤️ usando Next.js y TypeScript
