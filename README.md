# Podcast App · Landing Page

> Plataforma elegida para lanzar y monetizar podcasts con una experiencia visual moderna, mobile-first y optimizada.

![Mockup del landing](build/img/logo.svg)

## Tabla de contenidos

- [Resumen rápido](#resumen-rápido)
- [Tecnologías y stack](#tecnologías-y-stack)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Experiencia de usuario y diseño](#experiencia-de-usuario-y-diseño)
- [Responsive / Mobile First](#responsive--mobile-first)
- [Instalación y uso](#instalación-y-uso)
- [Flujo de desarrollo](#flujo-de-desarrollo)
- [Automatizaciones y utilidades](#automatizaciones-y-utilidades)
- [Próximos pasos sugeridos](#próximos-pasos-sugeridos)
- [Autor](#autor)

## Resumen rápido

- ✨ **Landing page premium** para presentar un servicio de publicación de podcasts.
- 🎨 **Paleta híbrida azul + negro** con acentos verde menta para alinear el branding existente.
- 💬 **Testimoniales persuasivos** con avatares reales y storytelling que transmite confianza.
- ⚙️ **Gulp 4 + SASS modular** con PostCSS, Autoprefixer y minificación automáticos.
- 🪄 **Componentes reutilizables** (botones, cards, badges) pensados para ampliar la aplicación.

## Tecnologías y stack

| Área | Herramienta |
|------|-------------|
| Lenguajes | HTML5, SASS (SCSS) |
| Automación CSS | Gulp 4, gulp-sass, gulp-postcss, autoprefixer, cssnano |
| Optimización de medios | gulp-imagemin, gulp-webp, gulp-avif |
| Gestión de dependencias | Node.js + npm |
| Fuentes | Google Fonts — Poppins |

## Estructura del proyecto

```
├── build/                  # Salida generada por Gulp (CSS + imágenes optimizadas)
├── src/
│   ├── scss/
│   │   ├── base/           # Variables, mixins, reset, utilidades
│   │   └── ui/             # Componentes y secciones
│   └── img/                # Assets originales de la interfaz
├── scripts/
│   └── generateMinifiedTxt.js # Utilidad para generar código minificado (referencia)
├── gulpfile.js             # Pipeline de construcción y tareas watch
├── package.json            # Metadatos y dependencias del proyecto
└── index.html              # Landing principal
```

## Experiencia de usuario y diseño

- **Tema oscuro elegante**: fondo `#0B1220` que hace resaltar tipografías y cards.
- **Colores principales**:
  - Azul primario `#2563EB` para CTAs y elementos clave.
  - Verde acento `#84D9BC` heredado del branding original.
  - Blanco `#FFFFFF` para contrastes y copy legible.
- **Testimoniales convertidores**: storytelling cuantificable + fotos reales.
- **Footer profesional** con enlace directo a GitHub (`@MaickR`).
- **Tipografía Poppins** con jerarquías claras (`h1` 4rem, `h2` con subrayado dinámico, etc.).

## Responsive / Mobile First

- El SCSS está organizado con un enfoque **mobile-first**, utilizando mixins `@include tablet` y `@include desktop` para escalar el diseño.
- Grillas y flexbox se adaptan automáticamente entre 1 y 5 columnas según breakpoint (`480px`, `768px`, `1024px`).
- Los componentes críticos (header, beneficios, testimoniales, planes) fueron verificados en viewport de 375px, 768px y 1440px.
- Imágenes optimizadas (`avif`, `webp`, `jpg`) con `picture` para cargar la mejor versión según el navegador.

## Instalación y uso

```powershell
# Instalar dependencias
npm install

# Compilar SASS + PostCSS una vez
npx gulp css

# Ejecutar pipeline completo con watcher (compila SASS e imágenes)
npx gulp
```

> El comando `npx gulp` queda a la escucha de cambios en `src/scss/**/*.scss` y regenerará `build/css/app.css` automáticamente.

## Flujo de desarrollo

1. **Editar SASS modular** dentro de `src/scss/base` y `src/scss/ui`.
2. Ejecutar `npx gulp css` para compilar rápidamente o `npx gulp` para modo watch.
3. Abrir `index.html` directamente (por ejemplo con `explorer.exe index.html`) para revisar la UI.
4. Optimizar imágenes soltándolas en `src/img/`; Gulp generará automáticamente versiones `webp` y `avif`.

## Automatizaciones y utilidades

- **Autoprefixer** asegura compatibilidad con los navegadores definidos en `browserslist`.
- **cssnano** minifica el CSS final para producción.
- **gulp-imagemin** optimiza SVG y raster para un performance óptimo.
- `scripts/generateMinifiedTxt.js` permite generar un archivo de código minificado de referencia (`codigo-minificado.txt`).

## Próximos pasos sugeridos

- Integrar un servidor local con live reload (por ejemplo `gulp-connect` o `vite`) para acelerar QA.
- Añadir pruebas de accesibilidad (Lighthouse/AXE) y ajustar contrastes si se detectan advertencias.
- Conectar el CTA "Crear Cuenta" con un formulario real o un flujo de sign-up.
- Incluir métricas reales en la sección de estadísticas cuando el backend esté disponible.

## Autor

Creado por **MaickR** · [github.com/MaickR](https://github.com/MaickR)

Si este proyecto te inspira, no dudes en compartirlo, abrir issues o proponer mejoras ✨
