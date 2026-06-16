# CYRA — Your Intelligent Guide to the Universe

> An immersive AI-powered solar system exploration platform

![CYRA](https://img.shields.io/badge/CYRA-v1.0-00E5FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0iIzAwRTVGRiIvPjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-R167-black?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square)

## Overview

CYRA is an interactive 3D solar system exploration platform powered by an AI cosmic guide. It combines scientific accuracy, cinematic visuals, and educational content to create an immersive astronomy experience.

## Features

- **Interactive 3D Solar System** — All 8 planets with realistic textures, orbital mechanics, and smooth camera controls
- **CYRA AI Guide** — Intelligent assistant providing contextual narration for each planet
- **Planet Detail Panels** — 7 tabs per planet: Overview, Stats, Atmosphere, Moons, Missions, Facts, Habitability
- **Planet Comparison** — Side-by-side comparison of any two planets across key metrics
- **Learning Mode** — Three levels (Beginner, Student, Enthusiast) with curated astronomy content
- **Global Search** — Find planets, moons, and missions instantly
- **Keyboard Navigation** — Full keyboard support (/, C, L, O, Arrow keys)
- **Responsive Design** — Desktop, tablet, and mobile support
- **Reduced Motion** — Respects `prefers-reduced-motion` system setting

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| TypeScript | 5.2 | Type safety |
| Vite | 5.3 | Build tool |
| React Three Fiber | 8.17 | 3D React renderer |
| Three.js | 0.167 | 3D graphics |
| Framer Motion | 11.3 | Animations |
| Zustand | 4.5 | State management |
| React Query | 5.51 | Data fetching |
| Tailwind CSS | 3.4 | Styling |
| React Router | 6.26 | Routing |

## Quick Start

```bash
# Clone
git clone https://github.com/your-username/cyra.git
cd cyra

# Install
npm install

# Develop
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## Project Structure

```
cyra/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── canvas/         # Three.js / R3F components
│   │   │   ├── SolarSystem.tsx
│   │   │   ├── Planet.tsx
│   │   │   ├── Sun.tsx
│   │   │   ├── OrbitRing.tsx
│   │   │   ├── SaturnRings.tsx
│   │   │   ├── Starfield.tsx
│   │   │   ├── SceneLighting.tsx
│   │   │   └── CameraController.tsx
│   │   ├── layout/         # App shell
│   │   │   ├── AppLayout.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── panels/         # Information panels
│   │   │   ├── PlanetPanel.tsx
│   │   │   ├── ComparePanel.tsx
│   │   │   ├── LearnPanel.tsx
│   │   │   └── tabs/
│   │   └── ui/             # Shared UI components
│   │       ├── CyraGuide.tsx
│   │       ├── SearchBar.tsx
│   │       ├── PlanetPills.tsx
│   │       ├── LoadingScreen.tsx
│   │       ├── Button.tsx
│   │       └── Badge.tsx
│   ├── data/               # Planet data, CYRA messages, learning content
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route pages
│   ├── routes/             # Router configuration
│   ├── services/           # Business logic (search, etc.)
│   ├── store/              # Zustand state management
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── render.yaml
```

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` or `F` | Open search |
| `C` | Toggle compare mode |
| `L` | Toggle learning mode |
| `O` | Return to overview |
| `←` `→` | Navigate between planets |
| `Esc` | Close panels |
| `Enter` | Begin exploration (landing) |

## Deployment

### Render (recommended)

1. Connect your GitHub repository to [Render](https://render.com)
2. The `render.yaml` is pre-configured for static site deployment
3. Set build command: `npm install && npm run build`
4. Set publish directory: `./dist`

### Manual

```bash
npm run build
# Upload ./dist to any static host (Netlify, Vercel, Cloudflare Pages, etc.)
```

## Planet Data

All 8 planets include complete scientific datasets:
- Physical characteristics (diameter, mass, gravity, temperature)
- Atmospheric composition and layer descriptions
- Natural satellites with descriptions
- Historical and current space missions
- Interesting astronomical facts
- Habitability analysis
- Three learning levels per planet

## Performance

- 60 FPS target with optimised Three.js rendering
- Code splitting with React lazy loading
- Efficient canvas-based planet textures (generated procedurally)
- `dpr={[1, 2]}` pixel ratio cap for mobile
- ACESFilmic tone mapping for cinematic look

## License

MIT © CYRA Project

---

*"The cosmos is within us. We are made of star-stuff."* — Carl Sagan
