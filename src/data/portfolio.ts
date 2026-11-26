import type {
  ProfileConfig,
  ProjectRecord,
  StationConfig,
  StationId,
  TechnologyItem,
} from '../types/workshop';

function readOptionalEnv(value: string | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

/**
 * Contact and profile configuration.
 * Verified public links are active by default; optional personal links
 * (email, LinkedIn, X) can be configured via `.env` without editing UI code.
 */
export const PROFILE: ProfileConfig = {
  fullName: 'Joel Muganzi',
  handle: '@jeiso-n',
  location: 'Kampala, Uganda',
  headline: 'Building practical software products from first sketch to real-world deployment.',
  roles: [
    'Software Developer',
    'AI & Technology Enthusiast',
    'Product Builder',
    'Aspiring Technology Entrepreneur',
    'Developer Community Organizer',
    'Ugandan Tech YouTuber',
  ],
  philosophy:
    'Useful software starts with real people and concrete friction. My approach is to frame the problem clearly, validate assumptions early, engineer reliable tools, deploy them where they matter, and keep refining from real usage.',
  storyParagraphs: [
    'I am a software developer and product builder based in Kampala, Uganda, trained through Victoria University and hands-on system building. Rather than treating code as an academic exercise, I gravitate toward software that solves tangible operational, creative, and civic challenges around me.',
    'Across school administration platforms, offline desktop audio tools for video creators, privacy-first civic reporting workflows, and personal productivity systems, I enjoy owning the full arc — architecture, interfaces, testing discipline, and practical deployment.',
    'Outside product engineering, I organize within developer communities, explore cybersecurity in my personal Kali Linux lab, and share technical lessons and builder journeys on YouTube to help fellow developers grow.',
  ],
  principles: [
    {
      title: 'Problem Before Stack',
      detail:
        'Choose the runtime that fits the user environment — whether that is a portable JavaFX desktop bundle for schools, an offline Python + FFmpeg tool for creators, or an offline-first Flutter mobile client.',
    },
    {
      title: 'Verification Over Guesswork',
      detail:
        'Pair product iteration with automated unit, integration, and end-to-end tests so core workflows remain dependable as features expand.',
    },
    {
      title: 'Respect User Context & Privacy',
      detail:
        'Design for unreliable connectivity, local data ownership, explicit human review, and strict security boundaries rather than assuming always-online cloud setups.',
    },
    {
      title: 'Ship, Observe, Refine',
      detail:
        'Validate ideas through working prototypes and MVPs, gather honest feedback, and iterate deliberately until the software earns daily trust.',
    },
  ],
  communityAndCreator: [
    {
      title: 'Ugandan Tech YouTuber (@jeiso_n)',
      detail:
        'Creating technical videos and tutorials that share software engineering concepts, tooling workflows, and practical lessons openly with learners and builders.',
    },
    {
      title: 'Developer Community Organizer',
      detail:
        'Connecting student engineers and local builders around collaborative projects, practical tooling, and peer learning in Uganda.',
    },
    {
      title: 'Security-Minded Builder',
      detail:
        'Studying offensive and defensive cybersecurity concepts in a dedicated Kali Linux lab to carry stronger security habits into production software.',
    },
  ],
  links: {
    github: 'https://github.com/jeiso-n',
    youtube: 'https://www.youtube.com/@jeiso_n',
    email: readOptionalEnv(import.meta.env.VITE_CONTACT_EMAIL),
    linkedin: readOptionalEnv(import.meta.env.VITE_LINKEDIN_URL),
    x: readOptionalEnv(import.meta.env.VITE_X_URL),
  },
};

export const PROJECTS: ProjectRecord[] = [
  {
    id: 'musomi-manager',
    index: '01',
    name: 'Musomi Manager',
    tagline: 'School learning-record and report-card platform built for Ugandan secondary schools.',
    status: 'Active Development',
    category: 'Education Management Platform',
    description:
      'A multi-client school management system covering academic years, terms, class levels, streams, subjects, topic-tagged assessments, mark entry, publication workflows, and term PDF report cards.',
    problemSolved:
      'Secondary schools frequently rely on disconnected spreadsheets and manual calculation for term marks and report cards, leading to errors across streams and delayed student feedback. Musomi Manager enforces academic-year and term integrity, role-based access, and auditable mark records.',
    architectureHighlights: [
      'JavaFX 21 desktop application for administrators and teachers, packaged as a portable Windows runtime image.',
      'Responsive Thymeleaf web portal for students to view published marks, results, and generated report cards.',
      'Spring Boot 4 REST API backed by PostgreSQL 16 with Flyway migrations and server-side PDF report generation.',
      'Automated backend and desktop regression suites covering settings integrity, assessment contracts, and partial-mark ranking rules.',
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
    liveDemoNote: 'Self-hosted school backend + portable Windows desktop client (no public hosted demo).',
    screenTheme: {
      accent: '#f0a352',
      secondary: '#38d9a9',
      badge: 'V1 CORE OPERATIONS',
      headline: 'MUSOMI MANAGER // ACADEMIC RECORD ENGINE',
      metrics: [
        { label: 'CLIENTS', value: 'JavaFX + Web' },
        { label: 'RUNTIME', value: 'Java 21 / SB4' },
        { label: 'STORAGE', value: 'PostgreSQL 16' },
      ],
      modules: [
        'Role-Based Auth (Admin / Teacher / Student)',
        'Academic Years, Streams & Topic Assessments',
        'Audited Mark Entry & Partial Ranking Rules',
        'Individual & Class PDF Report Cards',
      ],
      codeSnippet: [
        'GET  /api/v1/teacher/assessments?termId=2026-T2',
        'POST /api/v1/reports/generate --mode=complete-cohort',
        'OK   57 desktop checks passing | PDF ready',
      ],
    },
  },
  {
    id: 'codesound-sync',
    index: '02',
    name: 'CodeSound Sync',
    tagline: 'Offline Windows desktop tool that adds natural keyboard and mouse audio to coding tutorials.',
    status: 'Desktop MVP',
    category: 'Creator Tooling / Desktop Media App',
    description:
      'A local-first Windows desktop application designed for programming tutorial creators. It analyzes coding screen recordings—including sped-up footage—and generates synchronized, natural typing and mouse-click WAV tracks ready for Premiere Pro, DaVinci Resolve, or CapCut.',
    problemSolved:
      'Muted or sped-up coding screencasts lose tactile keyboard and click cues, forcing video editors to manually place hundreds of sound effects by hand. CodeSound Sync automates visual activity detection and realistic audio synthesis completely offline without cloud accounts or API keys.',
    architectureHighlights: [
      'Creator-focused 4-step workflow: 1. Video -> 2. Review -> 3. Sound -> 4. Export.',
      'Local FFmpeg/FFprobe frame previews paired with heuristic visual activity detection and non-destructive timeline editing.',
      'Synthesized keyboard and mouse presets (Crisp Mechanical, Soft Laptop, Podcast Studio) with natural human variation.',
      'Verified with 109 automated pytest and pytest-qt tests covering detection, merge preservation, audio synthesis, and 44.1 kHz PCM WAV export.',
    ],
    technologies: ['Python', 'PySide6 (Qt)', 'FFmpeg / FFprobe', 'pytest'],
    repository: {
      url: 'https://github.com/jeiso-n/CodeSoundSync',
      visibility: 'Public',
      label: 'github.com/jeiso-n/CodeSoundSync',
    },
    liveDemoUrl: null,
    liveDemoNote: 'Offline Windows desktop application distributed via source / local Python environment.',
    screenTheme: {
      accent: '#38d9a9',
      secondary: '#6384ff',
      badge: 'DESKTOP MVP // 109 TESTS',
      headline: 'CODESOUND SYNC // TIMELINE AUDIO SYNTHESIS',
      metrics: [
        { label: 'WORKFLOW', value: '4-Step Studio' },
        { label: 'OUTPUT', value: '44.1kHz WAV' },
        { label: 'ENGINE', value: 'Python + FFmpeg' },
      ],
      modules: [
        '1. Video Import & Sped-Up Activity Detection',
        '2. Non-Destructive Marker Timeline Review',
        '3. Mechanical / Laptop / Studio Sound Profiles',
        '4. Editor-Ready 16-Bit PCM WAV Export',
      ],
      codeSnippet: [
        'ffprobe -v error -show_streams tutorial_4x.mp4',
        'detect_activity(mode="detailed_sped_up") -> 142 events',
        'export_wav("mix_44100hz_pcm16.wav") // READY',
      ],
    },
  },
  {
    id: 'tap-report',
    index: '03',
    name: 'TAP Report',
    tagline: 'Privacy-first road-safety incident reporting platform designed for a Kampala, Uganda pilot.',
    status: 'Active Development',
    category: 'Civic Safety Platform (Multi-App)',
    description:
      'A structured road-safety reporting system where citizens submit observations with in-app camera evidence and authorized human reviewers evaluate submissions through an audited, privacy-preserving workflow.',
    problemSolved:
      'Road-safety reporting often falls into unstructured social media callouts or unreliable submissions lacking capture context. TAP Report establishes a controlled intake-to-review architecture with human-only outcomes, strict role isolation, and append-only audit trails—explicitly avoiding automated enforcement or public blacklists.',
    architectureHighlights: [
      'Offline-first Flutter Android citizen app with camera-only capture, SHA-256 byte integrity, derived-copy on-device ML Kit OCR, and a resumable SQLite outbox.',
      'React + TypeScript reviewer dashboard verified with automated Playwright end-to-end tests and strict zero-leakage assertions.',
      'Fastify + TypeScript + PostgreSQL modular monolith API with transactional row locking, idempotency keys, clarification loops, and append-only audit logs.',
      'Built around explicit safety and privacy boundaries ahead of formal legal and pilot-readiness review.',
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
      'Google ML Kit',
      'Playwright',
      'Vitest',
    ],
    repository: {
      url: null,
      visibility: 'Private',
      label: 'Private repository (pre-pilot development)',
    },
    liveDemoUrl: null,
    liveDemoNote: 'Private pre-pilot platform; not publicly deployed pending legal and pilot readiness.',
    screenTheme: {
      accent: '#6384ff',
      secondary: '#f0a352',
      badge: 'ACTIVE // KAMPALA PILOT MVP',
      headline: 'TAP REPORT // AUDITED INTAKE & REVIEW',
      metrics: [
        { label: 'MOBILE', value: 'Flutter Offline' },
        { label: 'API', value: 'Fastify + PG' },
        { label: 'SECURITY', value: 'Append-Only' },
      ],
      modules: [
        'In-App Camera Capture + SHA-256 Verification',
        'On-Device ML Kit OCR + SQLite Resumable Outbox',
        'Assigned-Reviewer Queue & Clarification Loop',
        'Privacy-Preserving Audit & Role Isolation',
      ],
      codeSnippet: [
        'POST /api/v1/reports --idempotency-key=uuid-v4',
        'LOCK FOR SHARE OF assignment, user, role',
        'PASS 18 Flutter + 24 API + 4 Playwright E2E checks',
      ],
    },
  },
  {
    id: 'nexus',
    index: '04',
    name: 'Nexus',
    tagline: 'Local-first personal productivity, smart scheduling, and learning coach PWA.',
    status: 'Concept & Prototype',
    category: 'Productivity Progressive Web App',
    description:
      'A personal productivity command center and rule-based scheduling prototype crafted for developers, students, and content creators balancing coursework, engineering sprints, and publishing schedules.',
    problemSolved:
      'Builders juggling multiple roles often split tasks across rigid calendars and cloud tools they do not own. Nexus explores an offline-first workspace that combines commitment tracking, rule-based work/break balancing, and urgency coaching with complete local data ownership.',
    architectureHighlights: [
      'Command-center dashboard uniting active priorities, recurring commitments, and daily schedules.',
      'Rule-based smart scheduling engine balancing focus blocks, breaks, and upcoming deadlines.',
      'Local-first persistence powered by IndexedDB (idb) with full JSON export/import backup support.',
      'Configured as an installable Vite Progressive Web App with Zod schema validation and Vitest testing.',
    ],
    technologies: [
      'React',
      'TypeScript',
      'Vite',
      'IndexedDB',
      'PWA',
      'Zod',
      'Vitest',
    ],
    repository: {
      url: 'https://github.com/jeiso-n/Nexus',
      visibility: 'Public',
      label: 'github.com/jeiso-n/Nexus',
    },
    liveDemoUrl: null,
    liveDemoNote: 'Prototype repository; runs locally via Vite dev/preview server.',
    screenTheme: {
      accent: '#e8795e',
      secondary: '#38d9a9',
      badge: 'CONCEPT & PROTOTYPE',
      headline: 'NEXUS // LOCAL-FIRST FOCUS & SCHEDULER',
      metrics: [
        { label: 'FORMAT', value: 'Installable PWA' },
        { label: 'STORAGE', value: 'IndexedDB + JSON' },
        { label: 'STACK', value: 'React 18 + TS' },
      ],
      modules: [
        'Daily Command Center & Priority Queue',
        'Recurring Commitments & Focus Windows',
        'Rule-Based Scheduling & Urgency Coach',
        'Zero-Cloud Local Persistence + JSON Backup',
      ],
      codeSnippet: [
        'scheduleCommitments({ workWindow, breakMin: 15 })',
        'idb.put("commitments", validatedTask) // Zod OK',
        'coach.recommendNextFocus() -> Deep Build Block',
      ],
    },
  },
];

export const TECHNOLOGIES: TechnologyItem[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    category: 'Languages',
    role: 'Primary language across web frontends, Fastify APIs, and this 3D studio.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'java',
    name: 'Java 21',
    category: 'Languages',
    role: 'Core runtime powering Musomi Manager backend services and desktop client.',
    projects: ['musomi-manager'],
  },
  {
    id: 'python',
    name: 'Python',
    category: 'Languages',
    role: 'Desktop audio synthesis, heuristic video analysis, and automation tooling.',
    projects: ['codesound-sync'],
  },
  {
    id: 'dart',
    name: 'Dart',
    category: 'Languages',
    role: 'Cross-platform mobile engineering for offline-first Android capture.',
    projects: ['tap-report'],
  },
  {
    id: 'sql',
    name: 'SQL',
    category: 'Languages',
    role: 'Relational modeling, transactional locks, migrations, and reporting queries.',
    projects: ['musomi-manager', 'tap-report'],
  },
  {
    id: 'react',
    name: 'React & Vite',
    category: 'Frontend & Client',
    role: 'Fast, typed web interfaces, dashboards, and progressive web applications.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'threejs',
    name: 'Three.js & WebGL',
    category: 'Frontend & Client',
    role: 'Interactive 3D environments, custom GLSL shaders, and camera choreography.',
    projects: [],
  },
  {
    id: 'javafx',
    name: 'JavaFX 21',
    category: 'Frontend & Client',
    role: 'Native desktop application UI packaged with bundled runtimes for schools.',
    projects: ['musomi-manager'],
  },
  {
    id: 'pyside6',
    name: 'PySide6 (Qt)',
    category: 'Frontend & Client',
    role: 'Windows desktop creative studio interfaces with interactive timelines.',
    projects: ['codesound-sync'],
  },
  {
    id: 'flutter',
    name: 'Flutter',
    category: 'Frontend & Client',
    role: 'Offline-first Android client with camera integration and local persistence.',
    projects: ['tap-report'],
  },
  {
    id: 'pwa-idb',
    name: 'PWA & IndexedDB',
    category: 'Frontend & Client',
    role: 'Installable web experiences with local-first data ownership and JSON backups.',
    projects: ['nexus'],
  },
  {
    id: 'springboot',
    name: 'Spring Boot 4',
    category: 'Backend & Data',
    role: 'Structured REST APIs, role security, Thymeleaf portals, and PDF generation.',
    projects: ['musomi-manager'],
  },
  {
    id: 'fastify',
    name: 'Node.js & Fastify',
    category: 'Backend & Data',
    role: 'High-integrity TypeScript APIs with rate limiting, JWT auth, and Zod validation.',
    projects: ['tap-report'],
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    category: 'Backend & Data',
    role: 'Transactional relational storage with Flyway/SQL migrations and audit trails.',
    projects: ['musomi-manager', 'tap-report'],
  },
  {
    id: 'sqlite',
    name: 'SQLite',
    category: 'Backend & Data',
    role: 'Durable on-device draft storage and resumable mobile sync outboxes.',
    projects: ['tap-report'],
  },
  {
    id: 'ffmpeg',
    name: 'FFmpeg & FFprobe',
    category: 'Media, AI & Quality',
    role: 'Local media probing, frame extraction, and audio/video processing pipelines.',
    projects: ['codesound-sync'],
  },
  {
    id: 'mlkit',
    name: 'Google ML Kit',
    category: 'Media, AI & Quality',
    role: 'Offline on-device text recognition without external cloud dependencies.',
    projects: ['tap-report'],
  },
  {
    id: 'playwright',
    name: 'Playwright & Vitest',
    category: 'Media, AI & Quality',
    role: 'Automated browser end-to-end verification and fast unit/integration suites.',
    projects: ['tap-report', 'nexus'],
  },
  {
    id: 'pytest',
    name: 'pytest & Docker',
    category: 'Media, AI & Quality',
    role: 'Repeatable desktop UI testing and reproducible local container environments.',
    projects: ['musomi-manager', 'codesound-sync'],
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
    subtitle: 'Active software products, MVPs, and architectural prototypes',
    shortcut: '1',
    cameraPosition: [0.85, 2.25, 2.55],
    cameraTarget: [-0.25, 1.68, -1.78],
    hotspotAnchor: [-0.35, 2.55, -1.6],
  },
  about: {
    id: 'about',
    code: '02',
    label: 'Field Notebook',
    objectLabel: 'About Joel',
    subtitle: 'Engineering philosophy, Kampala roots, and builder story',
    shortcut: '2',
    cameraPosition: [-0.45, 2.38, 1.95],
    cameraTarget: [-2.45, 1.25, -0.15],
    hotspotAnchor: [-2.45, 1.72, -0.35],
  },
  tech: {
    id: 'tech',
    code: '03',
    label: 'Systems Wall',
    objectLabel: 'Tech & Tools',
    subtitle: 'Verified languages, runtimes, media tools, and testing stack',
    shortcut: '3',
    cameraPosition: [1.95, 2.45, 2.05],
    cameraTarget: [2.62, 1.88, -1.65],
    hotspotAnchor: [2.75, 2.7, -1.5],
  },
  contact: {
    id: 'contact',
    code: '04',
    label: 'Comms Console',
    objectLabel: 'Contact & Collab',
    subtitle: 'GitHub, YouTube, configurable channels, and collaboration brief',
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
