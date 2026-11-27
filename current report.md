# Joel Muganzi — Digital Workshop Portfolio (`current report.md`)

- **Date:** 2026-11-27
- **Repository:** `D:\Projects\joel-muganzi-portfolio` (`main`)
- **Remote:** `https://github.com/jeiso-n/joel-muganzi-portfolio.git`
- **Live Site (GitHub Pages):** `https://jeiso-n.github.io/joel-muganzi-portfolio/` *(automated GitHub Pages deployment triggered on push to `origin/main`)*
- **Status:** Incremental expansion implemented, verified with `npm run build` (`4.24s`), `3/3` Playwright E2E tests (`0` console/page errors), and visual QA screenshots; approved by owner and pushed to `origin/main` for automated GitHub Pages deployment. Awaiting independent ChatGPT review.

---

## 1. What the Portfolio Is, Purpose & Intended Audience

**Joel's Digital Workshop** is an interactive 3D personal developer portfolio built for **Joel Muganzi** (`@jeiso-n`). Its purpose is to present Joel's engineering identity, live software products, AI-assisted development workflow, learning journey, creative perspective, and educational YouTube content inside a cohesive architectural 3D studio—rather than a conventional scrolling résumé template.

**Intended audience:** potential employers, technical collaborators, product founders, university peers, developer community organizers, and learners discovering Joel's tutorials and open-source repositories.

---

## 2. Architecture & Technologies

- **Core Stack:** React 19, TypeScript (strict), Vite 6, Three.js (`r174`), GSAP 3, Lucide React, Modern CSS (`src/styles/tokens.css`, `src/styles/global.css`), Playwright (`@playwright/test`).
- **3D Workshop Engine (`src/experience/`):**
  - `WorkshopExperience.ts`: `WebGLRenderer` (`ACESFilmicToneMapping`, `PCFSoftShadowMap`), bounded `OrbitControls` in overview, GSAP `lookTarget` camera choreography across stations without OrbitControls clamping, raycasted object selection, direct-DOM 3D hotspot projection, WebGL capability detection, and full GPU disposal.
  - `workshopWorld.ts`: Procedural floating dark-terrazzo workshop studio with walnut acoustic slats, Kampala twilight skyline window, central dual-monitor walnut desk, open field notebook & steaming coffee mug wing, modular systems wall with rotating holographic blueprint core, comms console with broadcast microphone boom arm, and warm architectural lighting.
  - `textures.ts`: Procedural canvas textures plus live-loaded real preview screenshot (`public/previews/vu-navigator-3d.png`) displayed directly on the 3D Workstation's primary monitor when **Victoria University Navigator** is active, clean AI engineering workflow steps on the side monitor (zero fabricated terminal output), and live comms waveform display.
  - `shaders.ts` & `soundEngine.ts`: Custom GLSL hologram/steam shaders and zero-asset Web Audio API feedback.
- **Responsive & Accessible Shell (`src/components/`):** Lazy-loaded `WorkshopCanvas`, `IntroOverlay` (with Start Experience & Skip Intro), `StudioHud` (Pins, Audio, 2D/3D View, bottom Station Dock), `StationDrawer` (`Esc` / `0`–`4` shortcuts), `FallbackStudioView` (automatic 2D fallback when WebGL is unavailable), and modular section panels (`ProjectsSection`, `AboutSection`, `TechSection`, `ContactSection`).

---

## 3. Major Sections & Exact Project Hierarchy

### 3.1 Project Hierarchy (Strictly Preserved Order)

1. **01 — Victoria University Navigator (`PRIMARY FEATURE PROJECT` · `Live Product`)**
   - Live Demo: `https://jeiso-n.github.io/victoria-university-navigator/` (verified HTTP `200`, live 3D dark-mode preview captured into `public/previews/vu-navigator-3d.png`)
   - Source: `https://github.com/jeiso-n/victoria-university-navigator`
   - Verified scope: Unified 2D SVG + procedural Three.js 3D indoor navigation across 12 levels (`B2`–`Floor 9`) of Victoria University, Market Plaza Tower, 138 mapped spaces, multi-floor A* elevator/stairs routing, `campus.blend` reference asset, and 19 Node + 8 Chrome E2E checks. Dual prominent actions: **Explore Live Project** and **View Source Code**.
2. **02 — CodeSound Sync (`Desktop MVP`)**
   - Source: `https://github.com/jeiso-n/CodeSoundSync`
   - Verified scope: Local-first Windows desktop application (Python, PySide6, FFmpeg/FFprobe, 109 pytest/pytest-qt tests) automating keyboard/mouse sound synchronization for sped-up coding tutorials via a 4-step workflow and 44.1 kHz PCM WAV export.
3. **03 — TAP Report (`Active Development` · Private Repository)**
   - Verified scope: Privacy-first road-safety incident reporting platform in active pre-pilot development for Kampala (Flutter offline-first Android app with SHA-256 capture integrity, on-device ML Kit OCR, SQLite outbox; React/TypeScript reviewer dashboard with Playwright E2E; Fastify/TypeScript/PostgreSQL modular monolith API). Honestly presented as private with no invented public URL.
4. **04 — Nexus (`Concept & Prototype`)**
   - Source: `https://github.com/jeiso-n/Nexus`
   - Verified scope: Local-first personal productivity, rule-based scheduling, and learning coach PWA prototype built with React, TypeScript, Vite, IndexedDB (`idb`), Zod, and Vitest.
5. **05 — Musomi Manager (`Active Development` · Last in Featured List)**
   - Source: `https://github.com/jeiso-n/musomi-manager`
   - Verified scope: Multi-client Ugandan secondary school learning-record system (Java 21, Spring Boot 4, JavaFX 21 desktop client, Thymeleaf student portal, PostgreSQL 16, Flyway migrations, PDF report cards). Positioned last per directive.

### 3.1b Expanded Workstation Categories (`src/data/expandedWork.ts`, `src/components/sections/ProjectsSection.tsx`)

All three new categories integrate inside **Station 01 · Workstation** via a 4-tab switcher (`Software (5)`, `Websites (3)`, `Workflows (1)`, `In Dev (1)`), dynamically updating the 3D Workstation primary monitor (`MonitorDisplayPayload`) and exposed via direct category shortcuts in **2D Fallback Mode**:

- **Websites & Digital Experiences (`Websites` tab):**
  1. **Enjo Constructions** (`https://enjocontructions.netlify.app/`, verified source `https://github.com/jeiso-n/enjo_constructions`, real screenshot `public/previews/enjo-constructions.png`) — Ugandan residential house designs, floor plans, and building tips site.
  2. **Vee Creations** (`https://jeiso-n.github.io/vee-creations/`, verified source `https://github.com/jeiso-n/vee-creations`, real screenshot `public/previews/vee-creations.png`) — Kampala floral, handcrafted décor, and bespoke gift hampers showcase.
  3. **T&T Junior School** (`https://tandtjuniorschool.com/`, real screenshot `public/previews/tt-junior-school.png`, no unverified GitHub repo invented) — Official web presence for T & T Nursery and Junior School in Kasenge, Wakiso, Uganda.
- **Creative Production Workflows (`Workflows` tab):**
  - **BlenderAIStudio** (`https://github.com/jeiso-n/BlenderAIStudio`) — Explicitly presented as an AI-directed 3D production workflow / reference repository (NOT a standalone app), detailing its 5-stage pipeline (Creative Brief → Live Blender 5.3 via BlendRelay MCP → Eevee Preview → FFprobe Verification → Hybrid Audio Post-Production Standard), verified integration smoke test, and in-review *Pole Drift* preview.
- **Currently in Development (`In Dev` tab):**
  - **Surgeventa** (`https://github.com/jeiso-n/surgeventa` — note: `https://github.com/jeiso-n/surgevent` returned `404`; inspected local `D:\Projects\surgeventa` and verified the live public GitHub repo `jeiso-n/surgeventa`, reflecting official brand update in commit `aeda0fd`) — Zero-spend unified social media publishing workspace (`Next.js 16`, `React 19`, `TypeScript`, `Neon PostgreSQL`, `Drizzle ORM`, `Better Auth`), honestly labeled **In Development · Milestone 2 Verified** with verified progress and upcoming milestones (no invented live demo).

### 3.2 Identity, Education, AI Engineering, Cybersecurity Learning, Blender & YouTube

- **Professional & Educational Positioning (`Field Notebook`):** Software Developer, AI-assisted Software Builder, Product Developer, Technology Enthusiast, Aspiring Technology Entrepreneur, Developer Community Organizer, Technical Content Creator, and 3D Animation & Digital Creativity Enthusiast; pursuing a **Software Engineering certificate at Victoria University** (no fabricated graduation date).
- **AI-Powered Engineering (`Systems Wall` — *Building With AI. Engineering With Discipline.*):** Interactive 6-pillar workflow explorer covering AI-Assisted Implementation, Secure Agent Workflows, Cybersecurity Fundamentals (Learning), Verification & Quality Control, Multi-Agent Source of Truth, and Professional Git & Delivery.
- **Cybersecurity Learning Journey:** Honestly framed as independent self-directed fundamentals study alongside Software Engineering coursework (application security basics, credential hygiene, input/URL validation, least-privilege agent boundaries)—zero fabricated certifications or security-expert claims.
- **Creative Technology — Blender & 3D Animation (`Field Notebook`):** Dedicated subsection explaining honestly how Joel's background exploring 3D animation in Blender inspired the Digital Workshop concept and spatial presentation (and noting the `campus.blend` reference asset in Victoria University Navigator without fabricating a 3D art portfolio).
- **The Learning Lab & Station 04 · YouTube Wall (`src/data/youtube.ts`, `src/components/sections/YouTubeSection.tsx`, `src/experience/workshopWorld.ts`):**
  - **Physical 3D Glowing YouTube Wall Sign:** Sculpted metallic housing with brass wall standoffs, rounded-rectangle red 3D play emblem, illuminated white play triangle, neon crimson perimeter frame, illuminated `YOUTUBE • @JEISON_MUGANZI` nameplate, and synced local crimson wall-wash `PointLight` mounted on the unobstructed left architectural wall bay above the botanical plant. Smoothly cycles ON and OFF (~4.4s eased wave) inside the existing `workshopWorld.update()` loop with hover boost, pointer cursor, and direct click opening `https://www.youtube.com/@jeison_muganzi` in a new tab (plus accessible glowing wall sign link in 2D Fallback Mode).
  - **Data-Driven Workshop Media Station (`04 · YouTube Wall`, shortcut `4`):** Filterable across `All`, `3D Animation`, `Cybersecurity`, `Linux`, and `Database Tutorials`, with real YouTube oEmbed-verified thumbnails, **click-to-play privacy-enhanced YouTube embeds (`youtube-nocookie.com`, zero autoplay)**, graceful direct YouTube fallback links, and a featured creative highlight for **Blender 3D Animation — Four Months Behind One Minute** (`https://youtu.be/o4-yHdBj5II`), alongside **John the Ripper Password Cracking Demonstration** (`https://youtu.be/JQ5HfuUe6pg`), **Introduction to Kali Linux** (`https://youtu.be/ZTe_zz4czzg`), and all **3 verified MySQL Workbench tutorials** (`SOe3XJszoKc`, `TO9nwUG8cFA`, `mHTPVD2xers`).

---

## 4. Environment Configuration & Contact Channels

Centralized in `src/config/publicEnv.ts` reading all 9 `VITE_PUBLIC_*` public browser variables (`VITE_PUBLIC_NAME`, `VITE_PUBLIC_EMAIL`, `VITE_PUBLIC_GITHUB_URL`, `VITE_PUBLIC_X_URL`, `VITE_PUBLIC_LINKEDIN_URL`, `VITE_PUBLIC_YOUTUBE_URL`, `VITE_PUBLIC_TIKTOK_URL`, `VITE_PUBLIC_NAVIGATOR_GITHUB_URL`, `VITE_PUBLIC_NAVIGATOR_DEMO_URL`):
- Validates every external URL strictly to `http:`/`https:` (rejecting `javascript:`, `data:`, and malformed URLs; normalizing bare hosts such as `tiktok.com/@jeiso_n`) and validates email format before rendering `mailto:`.
- Provides sensible public fallbacks if an optional variable is missing.
- `.env.example` updated with safe placeholder values; local `.env` verified ignored by `.gitignore:8:.env` and never staged or committed.
- **Comms Console** renders all 6 verified channels: Email (`mailto:jeisonmuganzi255@gmail.com`), GitHub, X, LinkedIn, YouTube, and TikTok, plus the Collaboration Brief Composer.

---

## 5. Verification Performed & Actual Outcomes

| Check | Command | Actual Outcome |
| :--- | :--- | :--- |
| TypeScript strict check + Vite production build | `npm run build` | **PASS** — `tsc --noEmit` exit `0`; Vite built in `4.38s` (`dist/assets/three-*.js` 121.03 kB gzip, `gsap` 27.95 kB gzip, app 105.64 kB gzip, CSS 4.60 kB gzip) |
| Public env & URL validation unit test | `npm run test:e2e` (Test 1) | **PASS** (`13ms`) — verified `http:`/`https:` validation, `tiktok.com/@jeiso_n` normalization, rejection of `javascript:`/`data:`/invalid URLs, email validation, and empty-env fallback defaults |
| Desktop E2E (`1440×900`, WebGL) | `npm run test:e2e` (Test 2) | **PASS** (`34.2s`) — verified intro, 3D canvas, hotspots, exact 5-project order (`Victoria University Navigator` #1 with `PRIMARY FEATURE PROJECT`, decoded live preview image, `Explore Live Project` & `View Source Code` -> `CodeSound Sync` -> `TAP Report` -> `Nexus` -> `Musomi Manager` #5), Field Notebook (Victoria University studies, cybersecurity learning, Blender story, verified MySQL Workbench YouTube videos & channel link), Systems Wall (AI Engineering pillars + verified stack + cross-jump), all 6 Comms Console links (`mailto:`, GitHub, X, LinkedIn, YouTube, TikTok), `Esc` overview return, 2D/3D toggle, **`0` console errors**, **`0` page errors** |
| Mobile responsive E2E (`390×844`) | `npm run test:e2e` (Test 3) | **PASS** (`10.0s`) — verified Skip Intro, bottom station dock, Workstation displaying Victoria University Navigator & Explore Live Project CTA, return to overview, **`0` page errors** |
| Visual QA Inspection | Inspected rendered screenshots of Workstation, AI Systems Wall, Field Notebook / Blender section, and captured live VU Navigator 3D dark-mode preview | **PASS** — Caught and fixed a 3D monitor title clipping edge (`VICTORIA UNIVERSITY NAVIGATOR` scaled cleanly to fit left column), hardened `resolvePublicEnv` for non-Vite Node runtimes, and confirmed zero fabricated terminal output |
| Secret & Gitignore Check | `git check-ignore -v .env` & staged diff audit | **PASS** — `.gitignore:8:.env` confirmed; zero `.env`, secrets, or credentials committed |

---

## 6. Milestone Commits Pushed to GitHub (`origin/main`)

1. `7d95348` — `feat(portfolio): build Joel's Digital Workshop 3D interactive portfolio`
2. `875c066` — `feat(workshop): prioritize Victoria University Navigator, AI workflow, Blender story, YouTube lab, and env-driven socials`
3. `bc133b7` — `test(workshop): verify 5-project hierarchy, env validation, and polish 3D monitor framing`
4. `764bfad` — `docs: update README and current report for Digital Workshop revision`
5. `c25aaa2` — `feat(audio): add chill calm generative ambient studio background music` (verified with `npm run build` + `3/3` Playwright E2E tests including `Music On / Music Off` toggle and `0` console errors; pushed & verified via `git ls-remote origin main`)
6. `dd32edf` — `ci(pages): configure relative asset paths and GitHub Pages deployment workflow`
7. `7756d06` — `docs(pages): remove PAT-only enablement flag and document GitHub Pages setup`
8. `6084aeb` — `docs: record verified live GitHub Pages deployment in current report`
9. `d3f8b25` — `feat(youtube): add glowing ON/OFF 3D YouTube wall sign and Workshop Media Station` (pushed to `origin/main`; GitHub Actions run `45814102352` succeeded; live verified on GitHub Pages).
10. `feat(portfolio): add Websites, BlenderAIStudio workflow, and Surgeventa in-development categories` — approved by owner and pushed directly to `origin/main`, triggering `.github/workflows/deploy-pages.yml` to deploy to `https://jeiso-n.github.io/joel-muganzi-portfolio/`.

---

## 7. Outstanding Items & Recommended Next Steps

- **Independent ChatGPT Review:** Ready for review against all acceptance criteria.
