import type { MonitorDisplayPayload } from '../types/workshop';

export interface WebsiteShowcaseItem {
  id: string;
  index: string;
  name: string;
  category: string;
  liveUrl: string;
  repositoryUrl: string | null;
  previewImageUrl: string;
  previewImageAlt: string;
  description: string;
  highlights: string[];
  monitorPayload: MonitorDisplayPayload;
}

export interface CreativeWorkflowItem {
  id: string;
  name: string;
  badge: string;
  repositoryUrl: string;
  summary: string;
  clarification: string;
  stages: { step: string; title: string; detail: string }[];
  tools: string[];
  verifiedProgress: string[];
  experimentalNote: string;
  monitorPayload: MonitorDisplayPayload;
}

export interface InDevelopmentProject {
  id: string;
  name: string;
  statusLabel: string;
  category: string;
  repositoryUrl: string;
  description: string;
  currentProgress: string[];
  upcomingScope: string;
  technologies: string[];
  monitorPayload: MonitorDisplayPayload;
}

/**
 * Websites & Digital Experiences Joel has worked on.
 * Descriptions are strictly grounded in inspected live websites without inventing
 * business claims, client arrangements, or unverified individual contributions.
 */
export const WEBSITE_SHOWCASE: WebsiteShowcaseItem[] = [
  {
    id: 'enjo-constructions',
    index: '01',
    name: 'Enjo Constructions',
    category: 'Construction & Home Designs Website',
    liveUrl: 'https://enjocontructions.netlify.app/',
    repositoryUrl: 'https://github.com/jeiso-n/enjo_constructions',
    previewImageUrl: './previews/enjo-constructions.png',
    previewImageAlt:
      'Homepage preview of Enjo Constructions showing Ugandan home designs, floor plans, and construction tips navigation',
    description:
      'A web experience focused on affordable Ugandan residential house designs, floor plans, and practical building guidance, organizing Home, Floor Plans, Tips & Blog, About, Contact, and quote inquiry pathways.',
    highlights: [
      'Presents residential floor plans alongside practical construction knowledge for Ugandan homeowners and builders.',
      'Includes direct calls to action for viewing floor plans, reading building tips, and requesting a quote.',
      'Deployed live on Netlify with responsive navigation across informational pages.',
    ],
    monitorPayload: {
      index: 'W1',
      totalLabel: 'WEBSITE 01 OF 03',
      name: 'Enjo Constructions',
      tagline: 'Ugandan home designs, floor plans & building tips.',
      accent: '#f0a352',
      secondary: '#38d9a9',
      badge: 'WEBSITES & DIGITAL EXPERIENCES',
      previewImageUrl: './previews/enjo-constructions.png',
      facts: [
        { label: 'FOCUS', value: 'Home Floor Plans' },
        { label: 'SECTIONS', value: 'Plans, Blog, Quote' },
        { label: 'HOSTING', value: 'Netlify (Live)' },
      ],
      modules: [
        'House Design & Floor Plan Showcase',
        'Practical Construction Tips & Quote Navigation',
      ],
    },
  },
  {
    id: 'vee-creations',
    index: '02',
    name: 'Vee Creations',
    category: 'Floral, Décor & Gift Hampers Website',
    liveUrl: 'https://jeiso-n.github.io/vee-creations/',
    repositoryUrl: 'https://github.com/jeiso-n/vee-creations',
    previewImageUrl: './previews/vee-creations.png',
    previewImageAlt:
      'Homepage preview of Vee Creations Kampala floral, handcrafted décor, and bespoke gift hampers studio',
    description:
      'A warm editorial storefront presentation for a Kampala floral, décor, and bespoke gift hamper studio, highlighting signature collections, services, reviews, contact details, and occasion ordering.',
    highlights: [
      'Clean visual presentation tailored to flowers, vases, handcrafted décor, and gift hampers in Kampala.',
      'Structured sections for Services, Signature Collections, Reviews, Contact, and Order Now actions.',
      'Published as a static web experience on GitHub Pages.',
    ],
    monitorPayload: {
      index: 'W2',
      totalLabel: 'WEBSITE 02 OF 03',
      name: 'Vee Creations',
      tagline: 'Flowers, handcrafted décor & bespoke gift hampers in Kampala.',
      accent: '#f0a352',
      secondary: '#e8795e',
      badge: 'WEBSITES & DIGITAL EXPERIENCES',
      previewImageUrl: './previews/vee-creations.png',
      facts: [
        { label: 'LOCATION', value: 'Kampala Studio' },
        { label: 'SECTIONS', value: 'Services & Reviews' },
        { label: 'HOSTING', value: 'GitHub Pages' },
      ],
      modules: [
        'Signature Collections & Floral Décor Showcase',
        'Services, Customer Reviews & Order Actions',
      ],
    },
  },
  {
    id: 'tt-junior-school',
    index: '03',
    name: 'T&T Junior School',
    category: 'School & Admissions Website',
    liveUrl: 'https://tandtjuniorschool.com/',
    repositoryUrl: null,
    previewImageUrl: './previews/tt-junior-school.png',
    previewImageAlt:
      'Homepage preview of T & T Nursery and Junior School in Kasenge, Wakiso, Uganda',
    description:
      'Official web presence for T & T Nursery and Junior School in Kasenge, Wakiso, Uganda—presenting nursery, kindergarten, pre-primary, and primary day and boarding programs alongside admissions, academics, student life, and media hub pages.',
    highlights: [
      'Structured multi-section navigation covering Why Us, Academics, Student Life, Admissions, Media Hub, and Contact Us.',
      'Clear parent-focused entry points including Apply Today, featured school programs, rector welcome, and school news.',
      'Live institutional website serving prospective and current school families.',
    ],
    monitorPayload: {
      index: 'W3',
      totalLabel: 'WEBSITE 03 OF 03',
      name: 'T&T Junior School',
      tagline: 'Nursery, pre-primary & primary school site in Wakiso, Uganda.',
      accent: '#6384ff',
      secondary: '#f0a352',
      badge: 'WEBSITES & DIGITAL EXPERIENCES',
      previewImageUrl: './previews/tt-junior-school.png',
      facts: [
        { label: 'AUDIENCE', value: 'Parents & Families' },
        { label: 'PROGRAMS', value: 'Nursery to P7' },
        { label: 'DOMAIN', value: 'tandtjuniorschool.com' },
      ],
      modules: [
        'Academics, Student Life & Admissions Hub',
        'Featured Programs, News & Parent Contact',
      ],
    },
  },
];

/**
 * Creative Production Workflows (distinct from standalone software products or websites).
 */
export const CREATIVE_WORKFLOWS: CreativeWorkflowItem[] = [
  {
    id: 'blender-ai-studio',
    name: 'BlenderAIStudio',
    badge: 'PRODUCTION WORKFLOW · NOT A STANDALONE APP',
    repositoryUrl: 'https://github.com/jeiso-n/BlenderAIStudio',
    summary:
      'An AI-directed 3D animation production workflow and reference repository built around Blender and coordinated AI agents. Rather than generating black-box AI video, it turns structured creative briefs into real editable .blend scenes and rendered H.264 exports.',
    clarification:
      'This is a structured creative production pipeline and working reference repository—not a deployed web application or finished consumer product.',
    stages: [
      {
        step: '01',
        title: 'Creative Brief & Planning',
        detail:
          'Creative direction defined by the owner and structured into verifiable production specs and quality gates.',
      },
      {
        step: '02',
        title: 'Live Blender Scene Build',
        detail:
          'Antigravity drives Blender 5.3 via BlendRelay MCP to model, light, animate, and save editable .blend project files.',
      },
      {
        step: '03',
        title: 'Eevee Preview Rendering',
        detail:
          'Hardware-conscious Eevee previews (portrait/landscape test renders) generated alongside workflow screen recordings.',
      },
      {
        step: '04',
        title: 'Technical & Visual Verification',
        detail:
          'Keyframe readbacks and FFprobe stream checks verify frame count, resolution, and codec before independent visual review.',
      },
      {
        step: '05',
        title: 'Audio Post-Production Standard',
        detail:
          'Documented hybrid sound design & music post-production workflow preserving silent visual masters and license tracking.',
      },
    ],
    tools: [
      'Blender 5.3',
      'BlendRelay MCP',
      'Python',
      'Eevee Render Engine',
      'FFmpeg / FFprobe',
      'Coordinated AI Agents',
    ],
    verifiedProgress: [
      'Integration smoke test passed end-to-end: editable .blend scene, still preview, 5s H.264 render, and matching screen recording verified on GitHub.',
      'First production animation preview (Pole Drift — 15s nighttime drift scene) rendered and technically verified; currently in visual refinement before final render.',
    ],
    experimentalNote:
      'Active experimental workflow: reusable docs/, agents/, scripts/, and templates/ scaffolding remain in progress, and Pole Drift preview awaits visual polish before final approval.',
    monitorPayload: {
      index: 'WF',
      totalLabel: 'CREATIVE WORKFLOW',
      name: 'BlenderAIStudio',
      tagline: 'AI-directed Blender 3D animation production pipeline (real .blend scenes).',
      accent: '#e8795e',
      secondary: '#38d9a9',
      badge: 'CREATIVE PRODUCTION WORKFLOW',
      facts: [
        { label: 'ENGINE', value: 'Blender 5.3 + Eevee' },
        { label: 'BRIDGE', value: 'BlendRelay MCP' },
        { label: 'OUTPUT', value: 'Editable .blend + MP4' },
      ],
      modules: [
        'Real Editable 3D Scenes (Not AI Video Gen)',
        'Integration Smoke Test Passed & Verified',
        'Pole Drift Preview Under Visual Review',
        'Documented Audio Post-Production Standard',
      ],
    },
  },
];

/**
 * Software projects currently in active early development.
 * Verified repository: https://github.com/jeiso-n/surgeventa (official product name: Surgeventa).
 */
export const IN_DEVELOPMENT_PROJECTS: InDevelopmentProject[] = [
  {
    id: 'surgeventa',
    name: 'Surgeventa',
    statusLabel: 'In Development · Milestone 2 Verified',
    category: 'Unified Social Media Publishing Workspace',
    repositoryUrl: 'https://github.com/jeiso-n/surgeventa',
    description:
      'A self-controlled, zero-spending unified social media publishing workspace inspired by Buffer-style workflows, engineered for full PostgreSQL and hosting portability with a shared backend API designed for both its Next.js web workspace and a planned future Flutter Android app.',
    currentProgress: [
      'Milestone 2 (Authentication & User Settings) completed and verified: Better Auth with scrypt password hashing, revocable database sessions, and bearer token support.',
      'Neon Lakebase PostgreSQL database live with additive Drizzle ORM migrations across 9 core tables and AES-256-GCM server-side OAuth token encryption utilities.',
      'Protected workspace shell, timezone-aware publishing preferences, and versioned /api/v1/* endpoints verified with 21 Vitest tests and 3 Playwright Chromium E2E tests.',
    ],
    upcomingScope:
      'Early active development—not yet publicly deployed. Multi-platform post composition, scheduling queues, OAuth platform connectors, Assisted Publishing handoffs, and the planned Flutter Android client are scheduled for upcoming milestones.',
    technologies: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS 4',
      'Neon PostgreSQL',
      'Drizzle ORM',
      'Better Auth',
      'Zod',
      'Vitest',
      'Playwright',
    ],
    monitorPayload: {
      index: 'DEV',
      totalLabel: 'IN DEVELOPMENT',
      name: 'Surgeventa',
      tagline: 'Zero-spend unified social publishing workspace (Next.js + Neon Postgres).',
      accent: '#6384ff',
      secondary: '#38d9a9',
      badge: 'CURRENTLY IN DEVELOPMENT',
      facts: [
        { label: 'MILESTONE', value: 'M2 Auth & Settings' },
        { label: 'STACK', value: 'Next.js 16 + Drizzle' },
        { label: 'DATABASE', value: 'Neon Postgres (9 tbl)' },
      ],
      modules: [
        'Better Auth Sessions + Bearer API Readiness',
        'AES-256-GCM OAuth Token Encryption Ready',
        '21 Vitest + 3 Playwright E2E Checks Passing',
        'Composer, Scheduling & Android Planned Next',
      ],
    },
  },
];
