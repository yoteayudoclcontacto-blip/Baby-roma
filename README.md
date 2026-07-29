# Baby Roma — Vídeos con Remotion

<p align="center">
  <a href="https://github.com/remotion-dev/logo">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-dark.apng">
      <img alt="Animated Remotion Logo" src="https://github.com/remotion-dev/logo/raw/main/animated-logo-banner-light.gif">
    </picture>
  </a>
</p>

Proyecto de [Remotion](https://www.remotion.dev) para crear y editar vídeos de forma automática con React + TypeScript.

## Requisitos previos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

## Puesta en marcha en tu ordenador

```console
git clone https://github.com/yoteayudoclcontacto-blip/baby-roma.git
cd baby-roma
git checkout claude/remotion-setup-config-yalyh1
npm install
```

La primera vez que renderices un vídeo, Remotion descargará automáticamente una copia de Chrome Headless Shell (necesaria para renderizar). Esto requiere acceso a internet sin restricciones; no ocurre en el entorno de desarrollo en la nube donde se creó este proyecto, pero funcionará sin problema en tu ordenador.

## Comandos

**Instalar dependencias**

```console
npm install
```

**Abrir el estudio de Remotion (editor visual con vista previa en vivo)**

```console
npm run dev
```

Esto abre Remotion Studio en el navegador, donde puedes ver y editar tus composiciones en tiempo real.

**Renderizar un vídeo**

```console
npx remotion render MyComp out/video.mp4
```

**Actualizar Remotion**

```console
npx remotion upgrade
```

## Estructura del proyecto

- `src/Root.tsx` — registro de todas las composiciones (vídeos) disponibles.
- `src/Composition.tsx` — composición de ejemplo (`MyComp`). Aquí se define la duración, resolución y fps del vídeo, y el componente React que se renderiza fotograma a fotograma.
- `src/index.ts` — punto de entrada que registra el root de Remotion.
- `public/` — assets estáticos (imágenes, audio, vídeo) que puedes usar dentro de tus composiciones.
- `remotion.config.ts` — configuración del CLI de Remotion (formato de imagen, Tailwind, etc.).

Para crear un nuevo vídeo, añade un nuevo componente y regístralo con `<Composition />` en `src/Root.tsx`.

## Docs

Guía de fundamentos: https://www.remotion.dev/docs/the-fundamentals

## Ayuda

Discord de Remotion: https://discord.gg/6VzzNDwUwV

## Licencia

Remotion es gratuito para equipos de hasta 3 personas. Para empresas más grandes puede requerir una licencia comercial: https://github.com/remotion-dev/remotion/blob/main/LICENSE.md
