# Joel's Digital Workshop — Interactive 3D Developer Portfolio

An interactive 3D engineering studio portfolio for **Joel Muganzi** (`@jeiso-n`), built with React, TypeScript, Vite, Three.js, and GSAP.

The portfolio communicates one clear engineering identity: building useful software, exploring AI-assisted development through structured and secure workflows, studying Software Engineering at Victoria University alongside independent cybersecurity fundamentals learning, bringing a Blender-inspired 3D creative sensibility to interactive web experiences, and helping beginners learn technology on YouTube.

## Interactive Stations

| Station | 3D Focus | What Visitors Explore |
| :--- | :--- | :--- |
| **00 · Studio Overview** | Full architectural floating workshop diorama | Bounded orbital exploration, spatial hotspot pins, and quick keyboard navigation (`0`–`4`, `Esc`) |
| **01 · Workstation** | Dual-monitor walnut engineering desk | Live-synced showcase of 5 verified projects led by **Victoria University Navigator** (`PRIMARY FEATURE PROJECT`) |
| **02 · Field Notebook** | Open sketchbook, brass pen & steaming coffee mug | Joel's story, Victoria University Software Engineering studies, independent cybersecurity learning, **Blender & 3D Creativity**, and **The Learning Lab** (MySQL Workbench YouTube tutorials) |
| **03 · Systems Wall** | Modular systems rack & GLSL holographic core | **Building With AI. Engineering With Discipline.** interactive workflow control center + filterable verified tech stack |
| **04 · Comms Console** | Signal waveform terminal & broadcast microphone rig | Environment-driven, URL-validated links for Email (`mailto:`), GitHub, X, LinkedIn, YouTube, and TikTok + Collaboration Brief Composer |

## Featured Project Hierarchy

The portfolio strictly preserves this five-project priority order:

1. **Victoria University Navigator** *(PRIMARY FEATURE PROJECT — Live Product)* — Unified 2D + 3D indoor campus navigation across 12 levels (`B2`–`Floor 9`) of Victoria University, Market Plaza Tower with 138 mapped spaces and multi-floor A* pathfinding ([Live Site](https://jeiso-n.github.io/victoria-university-navigator/) · [Source](https://github.com/jeiso-n/victoria-university-navigator)).
2. **CodeSound Sync** *(Desktop MVP)* — Local-first Windows desktop app adding realistic keyboard typing and mouse-click audio to sped-up coding tutorials ([Source](https://github.com/jeiso-n/CodeSoundSync)).
3. **TAP Report** *(Active Development — Private Repository)* — Privacy-first road-safety incident reporting platform in active development for a Kampala pilot.
4. **Nexus** *(Concept & Prototype)* — Local-first personal productivity, scheduling, and learning coach PWA prototype ([Source](https://github.com/jeiso-n/Nexus)).
5. **Musomi Manager** *(Active Development)* — Education management platform for Ugandan secondary school administration and term report cards ([Source](https://github.com/jeiso-n/musomi-manager)).

## Architecture

```text
public/
├── favicon.svg
└── previews/vu-navigator-3d.png    # Captured live 3D preview of Victoria University Navigator
src/
├── main.tsx                        # React entrypoint
├── App.tsx                         # Station state, shortcuts, lazy 3D mount, 2D fallback
├── config/publicEnv.ts             # VITE_PUBLIC_* loader, HTTP(S) URL & email validation, fallbacks
├── types/workshop.ts               # Shared TypeScript interfaces
├── data/portfolio.ts               # Verified identity, 5 projects, AI workflow pillars, videos, stack
├── styles/
│   ├── tokens.css                  # Design tokens & typography
│   └── global.css                  # Responsive HUD, editorial drawers, intro & 2D Studio Mode
├── experience/
│   ├── WorkshopExperience.ts       # Three.js renderer, OrbitControls, GSAP camera rig, raycasting
│   ├── workshopWorld.ts            # Procedural architectural 3D studio & lighting rig
│   ├── textures.ts                 # Procedural studio textures + live VU Navigator 3D monitor canvas
│   ├── shaders.ts                  # Custom GLSL hologram core & rising coffee steam shaders
│   └── soundEngine.ts              # Zero-asset Web Audio tactile feedback & opt-in ambience
└── components/
    ├── WorkshopCanvas.tsx          # Lazy-loaded Three.js canvas + spatial hotspot pins
    ├── IntroOverlay.tsx            # Cinematic loading sequence with Start Experience & Skip Intro
    ├── StudioHud.tsx               # Top controls (Pins, Audio, 2D/3D View) + bottom Station Dock
    ├── StationDrawer.tsx           # Accessible slide-in editorial panel
    ├── FallbackStudioView.tsx      # Lightweight 2D Studio Mode (automatic if WebGL unavailable)
    └── sections/                   # ProjectsSection, AboutSection, TechSection, ContactSection
e2e/
└── workshop.spec.ts                # Playwright E2E + URL/env validation verification suite
```

## Public Environment Configuration

Public portfolio metadata is read centrally from `src/config/publicEnv.ts` using Vite `VITE_PUBLIC_*` environment variables. Because Vite exposes `VITE_*` values in the client bundle, **use these strictly for public profile links and contact addresses—never store private credentials, API keys, or secrets here.**

1. Copy `.env.example` to `.env` for local overrides (`.env` is gitignored and must never be committed):

   ```bash
   cp .env.example .env
   ```

2. Supported variables:
   - `VITE_PUBLIC_NAME`
   - `VITE_PUBLIC_EMAIL`
   - `VITE_PUBLIC_GITHUB_URL`
   - `VITE_PUBLIC_X_URL`
   - `VITE_PUBLIC_LINKEDIN_URL`
   - `VITE_PUBLIC_YOUTUBE_URL`
   - `VITE_PUBLIC_TIKTOK_URL`
   - `VITE_PUBLIC_NAVIGATOR_GITHUB_URL`
   - `VITE_PUBLIC_NAVIGATOR_DEMO_URL`

All external URLs are validated to allow only `http:`/`https:` destinations before rendering clickable links, and sensible public fallbacks are applied if an optional variable is omitted.

## Local Development & Verification

### Prerequisites

- Node.js 20+ (verified on Node.js 26.13.0)
- npm 10+

### Commands

```bash
npm install         # Install dependencies
npm run dev         # Start local Vite dev server
npm run typecheck   # Strict TypeScript check (tsc --noEmit)
npm run build       # Typecheck + optimized Vite production bundle
npm run preview     # Preview production build locally
npm run test:e2e    # Run Playwright E2E + publicEnv validation suite
```

## Deployment

`npm run build` outputs a static bundle to `dist/` with split vendor chunks (`three`, `gsap`, application code), ready for **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**:

1. Build command: `npm run build`
2. Output directory: `dist`
3. Configure any desired `VITE_PUBLIC_*` overrides in your hosting provider's environment settings.
