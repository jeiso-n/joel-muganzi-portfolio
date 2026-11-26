import { PUBLIC_ENV } from '../config/publicEnv';
import type {
  ProfileConfig,
  ProjectRecord,
  StationConfig,
  StationId,
  TechnologyItem,
  WorkflowPillar,
} from '../types/workshop';

/**
 * Verified portfolio identity, positioning, education, creative background,
 * educational content, and environment-driven public profile links.
 */
export const PROFILE: ProfileConfig = {
  fullName: PUBLIC_ENV.name,
  handle: '@jeiso-n',
  location: 'Kampala, Uganda',
  headline:
    'Building useful software through AI-assisted engineering, secure development workflows, and interactive 3D digital craft.',
  roles: [
    'Software Developer',
    'AI-assisted Software Builder',
    'Product Developer',
    'Technology Enthusiast',
    'Aspiring Technology Entrepreneur',
    'Developer Community Organizer',
    'Technical Content Creator',
    '3D Animation & Digital Creativity Enthusiast',
  ],
  philosophy:
    'I build useful software, explore AI-assisted engineering with structured human oversight, care about secure development practices, and bring a creative visual perspective to the products I build.',
  storyParagraphs: [
    'I am a software developer and product builder based in Kampala, Uganda, currently pursuing a Software Engineering certificate at Victoria University. I focus on turning practical everyday problems into real, accessible software—from indoor campus navigation to offline desktop tools for creators and civic workflows.',
    'A central theme of my work is moving beyond casually prompting AI to generate snippets. I am actively exploring how AI agents can accelerate real-world software engineering while maintaining strict human oversight, clear requirements, secure permissions, automated testing, and disciplined Git delivery.',
    'Alongside my studies and product builds, I organize within developer communities, independently study cybersecurity fundamentals to build safer software, and teach beginner-friendly database concepts through technical videos on YouTube.',
  ],
  educationAndSecurity: [
    {
      title: 'Software Engineering Studies — Victoria University',
      detail:
        'Pursuing a Software Engineering certificate at Victoria University in Kampala, applying coursework directly to practical software systems such as the Victoria University Tower Navigator.',
    },
    {
      title: 'Independent Cybersecurity Fundamentals Learning',
      detail:
        'Self-directed study alongside my engineering coursework—learning application security basics, how common vulnerabilities arise, credential hygiene, least-privilege agent permissions, and safer development habits. Presented honestly as ongoing learning rather than professional security certification.',
    },
    {
      title: 'Continuous Builder-Led Learning',
      detail:
        'Testing concepts in real repositories with reproducible environments, version control, automated test suites, and documented decision records.',
    },
  ],
  creativeBackground: {
    title: '3D & Digital Creativity — Blender and Visual Storytelling',
    summary:
      'Before focusing heavily on full-stack and AI-assisted software engineering, I explored 3D animation and digital modeling with Blender. While I am a software developer first rather than a professional 3D artist, that creative exposure directly inspired this Digital Workshop portfolio and my interest in spatial interfaces.',
    highlights: [
      'Inspired the decision to build an interactive 3D Digital Workshop instead of a conventional scrolling résumé.',
      'Directly informed spatial composition, lighting mood, and architectural layout across both this portfolio and the Victoria University Navigator 3D building (which includes a campus.blend reference asset in its repository).',
      'Brings software engineering, Three.js web graphics, and visual storytelling together to make technical work inviting and memorable.',
    ],
  },
  principles: [
    {
      title: 'Useful Software Over Hype',
      detail:
        'Start from real friction—like finding a room across 12 floors or syncing keyboard audio for a sped-up coding video—and ship tools people can actually use.',
    },
    {
      title: 'Disciplined AI-Assisted Engineering',
      detail:
        'Use AI agents inside structured workflows with explicit scope, controlled repository/tool permissions, independent review, and automated verification.',
    },
    {
      title: 'Security-Conscious Design Habits',
      detail:
        'Keep secrets out of Git, separate public browser configuration from private credentials, validate untrusted URLs/inputs, and respect user privacy boundaries.',
    },
    {
      title: 'Share What You Learn',
      detail:
        'Break down approachable fundamentals—such as MySQL Workbench for database beginners—so newer learners can build confidence faster.',
    },
  ],
  youtubeEducation: {
    sectionTitle: 'The Learning Lab — YouTube & Technical Education',
    seriesTitle: 'MySQL Workbench Beginner Tutorial Series',
    summary:
      'I run a technical YouTube channel helping beginners get comfortable with core software and database tools. A key focus on the channel is a practical MySQL Workbench series introducing new learners to relational database concepts step by step.',
    channelUrl: PUBLIC_ENV.youtubeUrl,
    videos: [
      {
        id: 'SOe3XJszoKc',
        title: 'How To Use Primary Keys In MySQL Workbench',
        url: 'https://www.youtube.com/watch?v=SOe3XJszoKc',
        thumbnailUrl: 'https://i.ytimg.com/vi/SOe3XJszoKc/hqdefault.jpg',
        topic: 'Database Keys & Table Integrity',
      },
      {
        id: 'TO9nwUG8cFA',
        title: 'How To Use Commit, Rollback And Autocommit in MySQL Workbench',
        url: 'https://www.youtube.com/watch?v=TO9nwUG8cFA',
        thumbnailUrl: 'https://i.ytimg.com/vi/TO9nwUG8cFA/hqdefault.jpg',
        topic: 'Transactions & Safe Data Changes',
      },
      {
        id: 'mHTPVD2xers',
        title: 'How To Use The Delete Statement in MySQL Workbench',
        url: 'https://www.youtube.com/watch?v=mHTPVD2xers',
        thumbnailUrl: 'https://i.ytimg.com/vi/mHTPVD2xers/hqdefault.jpg',
        topic: 'SQL CRUD Fundamentals',
      },
    ],
  },
  links: {
    github: PUBLIC_ENV.githubUrl,
    youtube: PUBLIC_ENV.youtubeUrl,
    email: PUBLIC_ENV.email,
    linkedin: PUBLIC_ENV.linkedinUrl,
    x: PUBLIC_ENV.xUrl,
    tiktok: PUBLIC_ENV.tiktokUrl,
  },
};

export const AI_ENGINEERING_PILLARS: WorkflowPillar[] = [
  {
    id: 'ai-assisted-dev',
    code: '01',
    title: 'AI-Assisted Implementation',
    summary:
      'Using AI coding agents to accelerate scaffolding, debugging, refactoring, test generation, and documentation from clear written specifications.',
    focusPoints: [
      'Inspect existing code and architecture before editing',
      'Define bounded scope and acceptance criteria upfront',
      'Keep changes modular, readable, and maintainable',
    ],
  },
  {
    id: 'secure-workflows',
    code: '02',
    title: 'Secure Agent Workflows',
    summary:
      'Applying intentional boundaries around permissions, secrets, environment configuration, and repository access when working with AI tools.',
    focusPoints: [
      'Separate public client config (VITE_*) from private credentials',
      'Keep .env files, tokens, and keys strictly out of Git history',
      'Review diffs carefully before committing or pushing changes',
    ],
  },
  {
    id: 'cybersecurity-learning',
    code: '03',
    title: 'Cybersecurity Fundamentals (Learning)',
    summary:
      'Independently studying core application security concepts alongside my Software Engineering certificate to build more resilient software.',
    focusPoints: [
      'Input and URL validation to prevent unsafe links or injection',
      'Role isolation, least privilege, and safe authentication flows',
      'Understanding how common vulnerabilities arise in web and API apps',
    ],
  },
  {
    id: 'quality-control',
    code: '04',
    title: 'Verification & Quality Control',
    summary:
      'Treating generated code as untrusted until verified through typechecking, automated tests, browser checks, and manual inspection.',
    focusPoints: [
      'Automated unit, integration, and Playwright E2E checks',
      'Testing edge cases, empty states, and fallbacks honestly',
      'Avoiding unnecessary bloat or speculative features',
    ],
  },
  {
    id: 'multi-agent-discipline',
    code: '05',
    title: 'Multi-Agent Source of Truth',
    summary:
      'Exploring structured collaboration across planning, building, and review tools while keeping implementation truth anchored in repository documentation.',
    focusPoints: [
      'Repository-root reports and clear handoff records',
      'Distinct responsibilities between planning, coding, and review',
      'Human oversight and accountability on every release decision',
    ],
  },
  {
    id: 'professional-delivery',
    code: '06',
    title: 'Professional Git & Delivery',
    summary:
      'Turning working prototypes into dependable software through small milestone commits, remote backups, clean READMEs, and static or packaged releases.',
    focusPoints: [
      'Conventional milestone commits pushed cleanly to GitHub',
      'Accurate README setup and environment documentation',
      'Honest distinction between live products, MVPs, and prototypes',
    ],
  },
];

/**
 * Exact project priority order (preserved strictly—never auto-sorted):
 * 01. Victoria University Navigator (PRIMARY FEATURE PROJECT)
 * 02. CodeSound Sync
 * 03. TAP Report
 * 04. Nexus
 * 05. Musomi Manager (LAST)
 */
export const PROJECTS: ProjectRecord[] = [
  {
    id: 'victoria-university-navigator',
    index: '01',
    name: 'Victoria University Navigator',
    featuredBadge: 'PRIMARY FEATURE PROJECT',
    tagline:
      'Unified 2D + 3D indoor campus navigation web app for Victoria University, Market Plaza Tower in Kampala.',
    status: 'Live Product',
    category: 'Interactive 2D + 3D Web Navigation',
    description:
      'A responsive static 2D and 3D indoor navigation experience covering all 12 levels (Basement 2 through Floor 9) of Victoria University, Market Plaza Tower. It unifies interactive SVG floor plans and room directories with a procedural Three.js multistorey building and multi-floor A* indoor pathfinding.',
    problemSolved:
      'New students, visitors, and staff navigating a 12-storey vertical university tower can easily get disoriented between lecture rooms, labs, offices, elevators, and directional staircases. Victoria University Navigator gives anyone instant browser access to searchable rooms, clear floor maps, and step-by-step multi-floor indoor directions.',
    architectureHighlights: [
      'Unified 2D SVG map and procedural Three.js 3D tower with synchronized floor, room, and search state plus Full Building, Isolate Floor, Exploded, and Map camera views.',
      '138 mapped rooms, laboratories, offices, restrooms, and Ground Floor entrance/exit portals across 12 levels (11 SVG floor plans + explicit Floor 4 renovation shell).',
      'Multi-floor A* indoor pathfinding supporting both dual-elevator and directional staircase routing, 3D route tubes, and turn-by-turn guided walkthrough.',
      'Zero-build static deployment on GitHub Pages, verified with 19 automated architecture/pathfinding checks and 8 headless Chrome WebGL E2E checks.',
    ],
    technologies: [
      'JavaScript',
      'Three.js',
      'HTML & CSS',
      'SVG Floor Plans',
      'A* Pathfinding',
      'Python',
      'Blender (Reference Asset)',
      'GitHub Pages',
    ],
    previewImageUrl: './previews/vu-navigator-3d.png',
    previewImageAlt:
      'Live 3D indoor building view of Victoria University Tower Navigator showing multistorey floor selection and navigation controls',
    repository: {
      url: PUBLIC_ENV.navigatorGithubUrl,
      visibility: 'Public',
      label: 'github.com/jeiso-n/victoria-university-navigator',
    },
    liveDemoUrl: PUBLIC_ENV.navigatorDemoUrl,
    liveDemoNote:
      'Live static web application deployed on GitHub Pages with graceful 2D fallback when WebGL is unavailable.',
    screenTheme: {
      accent: '#f0a352',
      secondary: '#38d9a9',
      badge: 'PRIMARY FEATURE PROJECT // LIVE',
      headline: 'VICTORIA UNIVERSITY NAVIGATOR — 2D + 3D CAMPUS MAP',
      previewImageUrl: './previews/vu-navigator-3d.png',
      facts: [
        { label: 'COVERAGE', value: '12 Levels (B2–F9)' },
        { label: 'MAPPED SPACES', value: '138 Rooms & Labs' },
        { label: 'ROUTING', value: 'Multi-Floor A*' },
      ],
      modules: [
        'Unified 2D SVG Plans & Procedural Three.js Tower',
        'Dual-Elevator & Directional Staircase Routing',
        'Alias & Typo-Tolerant Room & Restroom Search',
        'Live Static Deployment on GitHub Pages',
      ],
    },
  },
  {
    id: 'codesound-sync',
    index: '02',
    name: 'CodeSound Sync',
    tagline:
      'Offline Windows desktop app that adds realistic keyboard and mouse sounds to sped-up coding tutorials.',
    status: 'Desktop MVP',
    category: 'Creator Tooling · Windows Desktop App',
    description:
      'A local-first Windows desktop application designed for programming tutorial creators. It analyzes screen recordings—including sped-up coding footage—and synthesizes natural, editor-ready keyboard typing and mouse-click WAV tracks without requiring cloud accounts or API keys.',
    problemSolved:
      'Sped-up or silently recorded coding videos lose tactile keyboard and mouse cues, forcing creators to manually place sound effects across a timeline in video editors. CodeSound Sync automates visual activity detection and realistic audio generation locally on Windows.',
    architectureHighlights: [
      '4-step creator interface: 1. Video -> 2. Review -> 3. Sound -> 4. Export.',
      'Local FFmpeg/FFprobe frame previews paired with heuristic visual activity detection and a non-destructive interactive timeline where users can adjust or reclassify markers.',
      'Customizable sound profiles (Crisp Mechanical, Soft Laptop, Podcast Studio) with natural human variation and 44.1 kHz 16-bit PCM WAV export for Premiere Pro, DaVinci Resolve, and CapCut.',
      'Verified with 109 automated pytest and pytest-qt tests; heuristic visual detection still lets users manually refine uncertain markers.',
    ],
    technologies: ['Python', 'PySide6 (Qt)', 'FFmpeg / FFprobe', 'pytest'],
    repository: {
      url: 'https://github.com/jeiso-n/CodeSoundSync',
      visibility: 'Public',
      label: 'github.com/jeiso-n/CodeSoundSync',
    },
    liveDemoUrl: null,
    liveDemoNote:
      'Offline Windows desktop application run locally via Python virtual environment (no web demo).',
    screenTheme: {
      accent: '#38d9a9',
      secondary: '#6384ff',
      badge: 'DESKTOP MVP // WINDOWS',
      headline: 'CODESOUND SYNC — AUTOMATED TUTORIAL AUDIO',
      facts: [
        { label: 'WORKFLOW', value: '4-Step Desktop UI' },
        { label: 'AUDIO EXPORT', value: '44.1kHz PCM WAV' },
        { label: 'RUNTIME', value: 'Python + FFmpeg' },
      ],
      modules: [
        'Video Import & Sped-Up Visual Activity Detection',
        'Non-Destructive Timeline Review & Manual Markers',
        'Mechanical, Laptop & Studio Sound Presets',
        'Offline WAV Export for Video Editors',
      ],
    },
  },
  {
    id: 'tap-report',
    index: '03',
    name: 'TAP Report',
    tagline:
      'Privacy-first road-safety incident reporting platform in active development for a Kampala pilot.',
    status: 'Active Development',
    category: 'Civic Safety Platform · Multi-App MVP',
    description:
      'A structured road-safety incident reporting platform where citizens submit observations with in-app camera evidence and authorized human reviewers assess reports through an audited, privacy-preserving workflow. Not an official enforcement authority—built strictly around human review.',
    problemSolved:
      'Unstructured social-media reporting lacks verifiable capture context and privacy safeguards. TAP Report focuses on a controlled, auditable intake-to-review architecture with explicit human outcomes, role isolation, and append-only audit trails.',
    architectureHighlights: [
      'Offline-first Flutter Android citizen app with in-app camera-only capture, SHA-256 byte verification, derived-copy on-device ML Kit OCR, and a resumable SQLite outbox (APK build pending Android SDK).',
      'React + TypeScript reviewer dashboard verified with Playwright end-to-end tests enforcing zero-leakage privacy boundaries.',
      'Fastify + TypeScript + PostgreSQL modular monolith API featuring idempotent report submission, transactional row locking, clarification loops, and append-only status and audit logs.',
    ],
    technologies: [
      'TypeScript',
      'Node.js',
      'Fastify',
      'PostgreSQL',
      'React',
      'Vite',
      'Flutter',
      'Dart',
      'SQLite',
      'Playwright',
    ],
    repository: {
      url: null,
      visibility: 'Private',
      label: 'Private repository (pre-pilot development)',
    },
    liveDemoUrl: null,
    liveDemoNote:
      'Private repository in active pre-pilot development; not publicly deployed pending legal and pilot readiness.',
    screenTheme: {
      accent: '#6384ff',
      secondary: '#f0a352',
      badge: 'ACTIVE DEVELOPMENT // PRIVATE',
      headline: 'TAP REPORT — PRIVACY-FIRST INCIDENT WORKFLOW',
      facts: [
        { label: 'MOBILE CLIENT', value: 'Flutter Offline' },
        { label: 'BACKEND', value: 'Fastify + PG' },
        { label: 'REVIEW UI', value: 'React + TS' },
      ],
      modules: [
        'In-App Camera Capture & SHA-256 Integrity',
        'SQLite Offline Drafts & Resumable Sync Outbox',
        'Assigned-Reviewer Queue & Clarification Loop',
        'Role Isolation & Append-Only Audit History',
      ],
    },
  },
  {
    id: 'nexus',
    index: '04',
    name: 'Nexus',
    tagline:
      'Local-first personal productivity, task scheduling, and learning coach PWA prototype.',
    status: 'Concept & Prototype',
    category: 'Productivity Progressive Web App Concept',
    description:
      'A personal productivity application concept built as an installable Progressive Web App for developers, students, and content creators balancing coursework, engineering work, and publishing schedules—with complete local data ownership.',
    problemSolved:
      'Juggling study commitments, coding projects, and content creation across separate cloud tools creates friction and fragmentation. Nexus explores a single offline-first workspace combining commitment management, rule-based scheduling, and daily focus coaching.',
    architectureHighlights: [
      'Dashboard command center for active priorities, recurring commitments, and daily schedules.',
      'Rule-based smart scheduler balancing work windows, breaks, and deadlines with urgency coaching prompts.',
      'Local-first persistence using IndexedDB (idb) with JSON backup export/import and Zod validation.',
      'Presented honestly as an early concept and working prototype rather than a finished commercial product.',
    ],
    technologies: ['React', 'TypeScript', 'Vite', 'IndexedDB', 'PWA', 'Zod', 'Vitest'],
    repository: {
      url: 'https://github.com/jeiso-n/Nexus',
      visibility: 'Public',
      label: 'github.com/jeiso-n/Nexus',
    },
    liveDemoUrl: null,
    liveDemoNote:
      'Working concept prototype available on GitHub; runs locally with Vite dev/preview server.',
    screenTheme: {
      accent: '#e8795e',
      secondary: '#38d9a9',
      badge: 'CONCEPT & PROTOTYPE',
      headline: 'NEXUS — PERSONAL PRODUCTIVITY PWA CONCEPT',
      facts: [
        { label: 'TYPE', value: 'Installable PWA' },
        { label: 'STORAGE', value: 'IndexedDB + JSON' },
        { label: 'STAGE', value: 'Prototype' },
      ],
      modules: [
        'Command Center & Priority Commitment Queue',
        'Rule-Based Focus & Break Scheduler',
        'Daily Urgency & Learning Coach Prompts',
        'Offline Local Persistence with JSON Export',
      ],
    },
  },
  {
    id: 'musomi-manager',
    index: '05',
    name: 'Musomi Manager',
    tagline:
      'Education management system for Ugandan secondary school administration and term report cards.',
    status: 'Active Development',
    category: 'Education Management Platform · V1 Operations',
    description:
      'A multi-client school learning-record system designed around secondary school administration and academic workflows—covering school setup, student records, teacher assignments, topic-tagged assessments, mark entry, publication workflows, and term PDF report cards.',
    problemSolved:
      'Schools managing student records and term results across spreadsheets face manual aggregation errors and academic-year/term mismatches. Musomi Manager unifies role-based administration, teacher mark entry, and student result access with auditability.',
    architectureHighlights: [
      'JavaFX 21 desktop application for administrators and teachers, packagable as a portable Windows runtime image.',
      'Responsive Thymeleaf student web portal for published marks, results, and generated PDF report cards.',
      'Spring Boot 4 backend with PostgreSQL 16, Flyway migrations, and automated desktop and backend verification suites (some whole-class teacher roster endpoints remain in active progress).',
    ],
    technologies: [
      'Java 21',
      'Spring Boot 4',
      'JavaFX 21',
      'PostgreSQL',
      'Thymeleaf',
      'Maven',
      'Docker Compose',
    ],
    repository: {
      url: 'https://github.com/jeiso-n/musomi-manager',
      visibility: 'Public',
      label: 'github.com/jeiso-n/musomi-manager',
    },
    liveDemoUrl: null,
    liveDemoNote:
      'Self-hosted school server plus portable Windows desktop client (no public hosted demo).',
    screenTheme: {
      accent: '#d89b56',
      secondary: '#38d9a9',
      badge: 'V1 CORE OPERATIONS',
      headline: 'MUSOMI MANAGER — SCHOOL ACADEMIC RECORDS',
      facts: [
        { label: 'CLIENTS', value: 'JavaFX + Web' },
        { label: 'BACKEND', value: 'Java 21 / SB4' },
        { label: 'DATABASE', value: 'PostgreSQL 16' },
      ],
      modules: [
        'Role-Based Access (Admin, Teacher & Student)',
        'Academic Years, Terms, Streams & Assessments',
        'Validated Mark Entry & Partial-Mark Ranking Rules',
        'Individual & Class PDF Term Report Cards',
      ],
    },
  },
];

export const TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'javascript',
    name: 'JavaScript',
    category: 'Languages',
    role: 'ES modules powering Victoria University Navigator 2D/3D indoor navigation and A* pathfinding.',
    projects: ['victoria-university-navigator'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Languages',
    role: 'Typed web interfaces, Fastify APIs, Playwright suites, and this Digital Workshop.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    role: 'Desktop audio synthesis, SVG geometry extraction scripts, and media tooling.',
    projects: ['codesound-sync', 'victoria-university-navigator'],
  },
  {
    id: 'java',
    name: 'Java 21',
    category: 'Languages',
    role: 'Backend services and desktop software in Musomi Manager.',
    projects: ['musomi-manager'],
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'Languages',
    role: 'Offline-first Android client engineering for TAP Report.',
    projects: ['tap-report'],
  },
  {
    id: 'sql',
    name: 'SQL & MySQL Workbench',
    category: 'Languages',
    role: 'Relational schema design, transactions, migrations, and beginner SQL tutorials on YouTube.',
    projects: ['tap-report', 'musomi-manager'],
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'Frontend & 3D',
    role: 'Procedural 12-storey campus building rendering and this interactive 3D Digital Workshop.',
    projects: ['victoria-university-navigator'],
  },
  {
    id: 'react',
    name: 'React & Vite',
    category: 'Frontend & 3D',
    role: 'Modern component architectures for web dashboards, PWAs, and this portfolio.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'svg-html-css',
    name: 'HTML, CSS & SVG',
    category: 'Frontend & 3D',
    role: 'Responsive interfaces and architectural SVG floor-plan normalization.',
    projects: ['victoria-university-navigator'],
  },
  {
    id: 'blender',
    name: 'Blender (Creative Background)',
    category: 'Frontend & 3D',
    role: '3D animation and spatial design foundation inspiring my interactive web experiences and campus reference model.',
    projects: ['victoria-university-navigator'],
  },
  {
    id: 'pyside6',
    name: 'PySide6 (Qt)',
    category: 'Frontend & 3D',
    role: 'Windows desktop studio workflow and interactive timeline UI in CodeSound Sync.',
    projects: ['codesound-sync'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Frontend & 3D',
    role: 'Offline-first Android mobile capture, local storage, and sync workflows.',
    projects: ['tap-report'],
  },
  {
    id: 'javafx',
    name: 'JavaFX 21',
    category: 'Frontend & 3D',
    role: 'Desktop client interface for school administrators and teachers.',
    projects: ['musomi-manager'],
  },
  {
    id: 'fastify',
    name: 'Node.js & Fastify',
    category: 'Backend & Data',
    role: 'Structured TypeScript REST APIs with Zod validation, JWT auth, and rate limiting.',
    projects: ['tap-report'],
  },
  {
    id: 'springboot',
    name: 'Spring Boot 4',
    category: 'Backend & Data',
    role: 'REST API, Thymeleaf portal, Flyway migrations, and PDF report generation.',
    projects: ['musomi-manager'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Backend & Data',
    role: 'Transactional relational databases with migrations and append-only audit logs.',
    projects: ['tap-report', 'musomi-manager'],
  },
  {
    id: 'sqlite-idb',
    name: 'SQLite & IndexedDB',
    category: 'Backend & Data',
    role: 'Offline-first local persistence for Android outboxes and installable PWAs.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'ffmpeg',
    name: 'FFmpeg & FFprobe',
    category: 'Media, Testing & Tooling',
    role: 'Local video probing, frame preview extraction, and desktop media workflows.',
    projects: ['codesound-sync'],
  },
  {
    id: 'playwright',
    name: 'Playwright & Vitest',
    category: 'Media, Testing & Tooling',
    role: 'Automated browser end-to-end testing, visual verification, and unit test suites.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'pytest-git',
    name: 'pytest, Git & GitHub Pages',
    category: 'Media, Testing & Tooling',
    role: 'Repeatable automated checks, disciplined milestone commits, and static web deployment.',
    projects: ['victoria-university-navigator', 'codesound-sync', 'musomi-manager'],
  },
];

export const STATIONS: Record<StationId, StationConfig> = {
  overview: {
    id: 'overview',
    code: '00',
    label: 'Studio Overview',
    objectLabel: 'Workshop Floor',
    subtitle: 'Orbit and inspect interactive stations across the studio',
    shortcut: '0',
    cameraPosition: [7.6, 5.4, 8.2],
    cameraTarget: [0.0, 1.35, -0.2],
  },
  projects: {
    id: 'projects',
    code: '01',
    label: 'Workstation',
    objectLabel: 'Project Monitors',
    subtitle: 'Victoria University Navigator first, plus 4 verified software builds',
    shortcut: '1',
    cameraPosition: [0.85, 2.25, 2.55],
    cameraTarget: [-0.25, 1.68, -1.78],
    hotspotAnchor: [-0.35, 2.55, -1.6],
  },
  about: {
    id: 'about',
    code: '02',
    label: 'Field Notebook',
    objectLabel: 'Story & Learning Lab',
    subtitle: 'Victoria University studies, Blender 3D story, cybersecurity learning & YouTube',
    shortcut: '2',
    cameraPosition: [-0.45, 2.38, 1.95],
    cameraTarget: [-2.45, 1.25, -0.15],
    hotspotAnchor: [-2.45, 1.72, -0.35],
  },
  tech: {
    id: 'tech',
    code: '03',
    label: 'Systems Wall',
    objectLabel: 'AI Workflow & Tech',
    subtitle: 'Building with AI & engineering discipline, plus verified stack',
    shortcut: '3',
    cameraPosition: [1.95, 2.45, 2.05],
    cameraTarget: [2.62, 1.88, -1.65],
    hotspotAnchor: [2.75, 2.7, -1.5],
  },
  contact: {
    id: 'contact',
    code: '04',
    label: 'Comms Console',
    objectLabel: 'Contact & Socials',
    subtitle: 'Direct email, GitHub, X, LinkedIn, YouTube, TikTok & collaboration brief',
    shortcut: '4',
    cameraPosition: [0.35, 2.12, 3.35],
    cameraTarget: [2.52, 1.35, 1.18],
    hotspotAnchor: [2.55, 2.1, 1.15],
  },
};

export const INTERACTIVE_STATION_ORDER: Exclude<StationId, 'overview'>[] = [
  'projects',
  'about',
  'tech',
  'contact',
];
