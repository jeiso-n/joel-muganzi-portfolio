# Joel's Digital Workshop — Interactive 3D Developer Portfolio

An immersive, interactive 3D engineering studio portfolio for **Joel Muganzi** (`@jeiso-n`), built with React, TypeScript, Vite, Three.js, and GSAP.

Instead of a conventional scrolling résumé page, visitors step into an architectural late-night engineering studio in Kampala featuring four purposeful interactive stations, dynamic live-rendered 3D monitors, custom GLSL shaders, smooth camera choreography, keyboard shortcuts, optional Web Audio feedback, and a responsive 2D fallback mode.

## Interactive Stations

| Station | 3D Hero Object | Purpose |
| :--- | :--- | :--- |
| **00 · Studio Overview** | Full floating workshop diorama | Bounded orbital camera exploration with spatial hotspot pins |
| **01 · Workstation** | Dual monitors + walnut engineering desk | Live-synced project showcase for **Musomi Manager**, **CodeSound Sync**, **TAP Report**, and **Nexus** |
| **02 · Field Notebook** | Open engineering sketchbook, brass pen & steaming coffee mug | Joel's professional story, Kampala / Victoria University background, and engineering philosophy |
| **03 · Systems Wall** | Illuminated server rack + GLSL holographic blueprint core | Filterable explorer of verified technologies cross-linked directly to active projects |
| **04 · Comms Console** | Live signal waveform terminal + broadcast microphone rig | Verified GitHub & YouTube profiles, configurable email/LinkedIn links, and Collaboration Brief Composer |

## Architecture

```text
src/
├── main.tsx                        # React entrypoint
├── App.tsx                         # Station state, keyboard shortcuts, lazy 3D mount, WebGL fallback
├── types/workshop.ts               # Shared TypeScript interfaces
├── data/portfolio.ts               # Verified profile, projects, technologies, and station camera specs
├── styles/
│   ├── tokens.css                  # Design tokens (obsidian, warm amber, signal emerald, cobalt, typography)
│   └── global.css                  # Responsive HUD, editorial drawers, intro curtain, and 2D studio styles
├── experience/
│   ├── WorkshopExperience.ts       # Three.js renderer, camera rig, GSAP transitions, raycasting, hotspot projection
│   ├── workshopWorld.ts            # Procedural architectural 3D studio, lighting rig, interactive objects
│   ├── textures.ts                 # Procedural walnut, terrazzo, rug, notebook, skyline & live canvas displays
│   ├── shaders.ts                  # Custom GLSL hologram core & rising coffee steam shaders
│   └── soundEngine.ts              # Zero-asset Web Audio tactile feedback & optional studio ambience
└── components/
    ├── WorkshopCanvas.tsx          # Lazy-loaded Three.js canvas + direct-DOM spatial hotspot pins
    ├── IntroOverlay.tsx            # Cinematic loading sequence with Start Experience & Skip Intro
    ├── StudioHud.tsx               # Minimal top bar + bottom station dock
    ├── StationDrawer.tsx           # Accessible slide-in editorial panel
    ├── FallbackStudioView.tsx      # Responsive 2D Studio Mode (automatic if WebGL unavailable)
    └── sections/                   # ProjectsSection, AboutSection, TechSection, ContactSection
```

## Local Development

### Prerequisites

- Node.js 20+ (verified on Node.js 26.13.0)
- npm 10+

### Install & Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (default `http://127.0.0.1:5173`).

### Configure Optional Contact Details

Verified public profiles (`GitHub` and `YouTube`) are enabled by default. Email, LinkedIn, and X are intentionally left unset rather than invented. To publish them, copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

```env
VITE_CONTACT_EMAIL=you@example.com
VITE_LINKEDIN_URL=https://www.linkedin.com/in/your-handle
VITE_X_URL=
```

Never commit `.env` files containing private addresses or secrets if you prefer to keep them out of Git.

## Scripts & Verification

```bash
npm run typecheck   # Strict TypeScript check (tsc --noEmit)
npm run build       # Typecheck + optimized Vite production bundle
npm run preview     # Preview production build locally
npm run test:e2e    # Run Playwright end-to-end browser verification
```

## Deployment

The project outputs a pure static bundle in `dist/` with split vendor chunks (`three`, `gsap`, application code) and works out of the box on **Vercel**, **Netlify**, **Cloudflare Pages**, or **GitHub Pages**:

1. Build command: `npm run build`
2. Output directory: `dist`
3. Optional environment variables: `VITE_CONTACT_EMAIL`, `VITE_LINKEDIN_URL`, `VITE_X_URL`
