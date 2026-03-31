# TFBS UI

React frontend for the TFBS application, built with Vite and TypeScript. Designed to be served as a Progressive Web App (PWA) backed by a Rust API server.

## Development

```bash
npm install
npm run dev
```

During development, API requests to `/api/*` are proxied to `http://localhost:3000` (the Rust backend).

## Build

```bash
npm run build
npm run preview  # preview the production build locally
```

## Stack

- React 19
- TypeScript
- Vite
- PWA via vite-plugin-pwa (auto-updating service worker, offline caching)
- ESLint
