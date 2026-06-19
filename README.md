# CYRA — Your Intelligent Guide to the Universe

> An immersive AI-powered solar system exploration platform

![CYRA](https://img.shields.io/badge/CYRA-v1.1-00E5FF?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iNCIgZmlsbD0iIzAwRTVGRiIvPjwvc3ZnPg==)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square)
![Three.js](https://img.shields.io/badge/Three.js-R167-black?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square)

## Overview

CYRA is an interactive 3D solar system exploration platform powered by an AI cosmic guide. It combines scientific accuracy, cinematic visuals, and educational content to create an immersive astronomy experience directly in the browser — no installs required.

**Live demo:** [cyra-uee5.onrender.com](https://cyra-uee5.onrender.com)

---

## What's New (v1.1)

A major visual and interaction overhaul was applied after the initial release:

- **Sun is now a proper glowing light source** — larger core, stronger emissive material, three layered glow/corona shells, and animated pulsing
- **All planets clearly visible on load** — sizes boosted, ambient lighting raised significantly, ACESFilmic tone mapping exposure corrected
- **Planets actually orbit** — fixed a core animation bug where planet positions were computed once at mount and never updated; orbital position is now driven every frame via a live shared angle reference
- **Clicking a planet works correctly** — fixed the camera focus flow so clicking a planet immediately locks the camera to it; no more chasing a moving planet to click it
- **Better default camera angle** — elevated 3/4 view (`y=70, z=120, fov=58`) so all 8 planets fit in frame on load
- **Orbit rings toned down** — rings are now secondary to the planets, not more visible than them
- **Planet sizes and orbit spacing tuned** — small planets (Mercury, Mars) are no longer sub-pixel specks; outer planets are spaced to stay within frame

---

## Features

- **Interactive 3D Solar System** — All 8 planets with procedural textures, real orbital mechanics, and live animation every frame
- **CYRA AI Guide** — Intelligent assistant providing contextual narration for each planet
- **Planet Detail Panels** — 7 tabs per planet: Overview, Stats, Atmosphere, Moons, Missions, Facts, Habitability
- **Camera Focus** — Click any planet to smoothly fly the camera to it; click Overview to return
- **Planet Comparison** — Side-by-side comparison of any two planets across key metrics
- **Learning Mode** — Three levels (Beginner, Student, Enthusiast) with curated astronomy content
- **Global Search** — Find planets, moons, and missions instantly
- **Keyboard Navigation** — Full keyboard support (see shortcuts below)
- **Responsive Design** — Desktop, tablet, and mobile support
- **Reduced Motion** — Respects `prefers-reduced-motion` system setting

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18.3 | UI framework |
| TypeScript | 5.2 | Type safety |
| Vite | 5.3 | Build tool |
| React Three Fiber | 8.17 | 3D React renderer |
| Three.js | 0.167 | 3D graphics engine |
| Framer Motion | 11.3 | UI animations |
| Zustand | 4.5 | State management |
| React Query | 5.51 | Data fetching |
| Tailwind CSS | 3.4 | Styling |
| React Router | 6.26 | Routing |

---

## Quick Start

```bash
# Clone
git clone https://github.com/ArunVijaykumarcsds/cyra.git
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

---

## Project Structure

```
cyra/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── canvas/             # Three.js / R3F scene components
│   │   │   ├── SolarSystem.tsx     # Canvas root, animation loop
│   │   │   ├── Planet.tsx          # Per-planet mesh + orbital animation
│   │   │   ├── Sun.tsx             # Sun core + glow + corona layers
│   │   │   ├── SceneLighting.tsx   # Point lights + ambient + hemisphere
│   │   │   ├── CameraController.tsx # OrbitControls + focus animation
│   │   │   ├── OrbitRing.tsx
│   │   │   ├── SaturnRings.tsx
│   │   │   └── Starfield.tsx
│   │   ├── layout/             # App shell
│   │   │   ├── AppLayout.tsx
│   │   │   ├── TopBar.tsx
│   │   │   └── MobileMenu.tsx
│   │   ├── panels/             # Information panels
│   │   │   ├── PlanetPanel.tsx
│   │   │   ├── ComparePanel.tsx
│   │   │   ├── LearnPanel.tsx
│   │   │   └── tabs/
│   │   └── ui/                 # Shared UI components
│   │       ├── CyraGuide.tsx
│   │       ├── SearchBar.tsx
│   │       ├── PlanetPills.tsx
│   │       ├── LoadingScreen.tsx
│   │       ├── Button.tsx
│   │       └── Badge.tsx
│   ├── data/               # Planet data and CYRA messages
│   ├── hooks/              # Custom React hooks
│   ├── pages/              # Route pages
│   ├── routes/             # Router configuration
│   ├── services/           # Search and business logic
│   ├── store/              # Zustand global state
│   ├── types/              # TypeScript type definitions
│   └── utils/              # Utility functions
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── render.yaml
```

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `/` or `F` | Open search |
| `C` | Toggle compare mode |
| `L` | Toggle learning mode |
| `O` | Return to overview |
| `←` `→` | Navigate between planets |
| `Esc` | Close panels |
| `Enter` | Begin exploration (landing screen) |

---

## Deployment

### Render (recommended)

1. Connect your GitHub repository to [Render](https://render.com)
2. The `render.yaml` is pre-configured for static site deployment
3. Build command: `npm install && npm run build`
4. Publish directory: `./dist`

Render auto-deploys on every push to `main`.

### Other static hosts

```bash
npm run build
# Upload the ./dist folder to Netlify, Vercel, Cloudflare Pages, or any static host
```

---

## Planet Data

All 8 planets include complete scientific datasets:

- Physical characteristics (diameter, mass, gravity, temperature)
- Atmospheric composition with layer descriptions
- Natural satellites with individual descriptions
- Historical and current space missions
- Astronomical facts
- Habitability analysis with score
- Three learning levels: Beginner, Student, Enthusiast

---

## How the 3D Scene Works

The solar system scene uses a shared angle reference (`planetAngles`) that is updated every frame by the main animation loop in `SolarSystem.tsx`. Each `Planet.tsx` component reads this reference inside its own `useFrame` hook and sets its group position directly — bypassing React's render cycle entirely for smooth 60 FPS orbital motion.

The Sun uses layered `MeshStandardMaterial` with high emissive intensity for the core, plus two `MeshBasicMaterial` shells (corona and outer glow) animated with subtle pulsing scale.

Lighting uses a primary point light at the Sun position (`intensity: 25, distance: 500`) plus a raised ambient (`intensity: 0.35`) to keep planet dark sides readable, balanced against ACESFilmic tone mapping at `exposure: 1.4`.

---

## Performance

- 60 FPS target with optimised Three.js rendering
- Orbital animation bypasses React state — runs entirely in `useFrame`
- Code splitting with React lazy loading
- Procedurally generated planet textures (no external image assets)
- `dpr={[1, 2]}` pixel ratio cap for mobile
- ACESFilmic tone mapping for cinematic look

---

## License

MIT © CYRA Project

---

*"The cosmos is within us. We are made of star-stuff."* — Carl Sagan
