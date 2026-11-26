export type StationId = 'overview' | 'projects' | 'about' | 'tech' | 'contact';

export type ProjectStatus = 'Active Development' | 'Desktop MVP' | 'Concept & Prototype';

export type ProjectKey = 'musomi-manager' | 'codesound-sync' | 'tap-report' | 'nexus';

export interface ProjectScreenTheme {
  accent: string;
  secondary: string;
  badge: string;
  headline: string;
  metrics: { label: string; value: string }[];
  modules: string[];
  codeSnippet: string[];
}

export interface ProjectRecord {
  id: ProjectKey;
  index: string;
  name: string;
  tagline: string;
  status: ProjectStatus;
  category: string;
  description: string;
  problemSolved: string;
  architectureHighlights: string[];
  technologies: string[];
  repository: {
    url: string | null;
    visibility: 'Public' | 'Private';
    label: string;
  };
  liveDemoUrl: string | null;
  liveDemoNote: string;
  screenTheme: ProjectScreenTheme;
}

export type TechCategory =
  | 'All'
  | 'Languages'
  | 'Frontend & Client'
  | 'Backend & Data'
  | 'Media, AI & Quality';

export interface TechnologyItem {
  id: string;
  name: string;
  category: Exclude<TechCategory, 'All'>;
  role: string;
  projects: ProjectKey[];
}

export interface StationConfig {
  id: StationId;
  code: string;
  label: string;
  objectLabel: string;
  subtitle: string;
  shortcut: string;
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  hotspotAnchor?: [number, number, number];
}

export interface HotspotProjection {
  id: Exclude<StationId, 'overview'>;
  x: number;
  y: number;
  visible: boolean;
}

export interface ProfileConfig {
  fullName: string;
  handle: string;
  location: string;
  headline: string;
  roles: string[];
  philosophy: string;
  storyParagraphs: string[];
  principles: { title: string; detail: string }[];
  communityAndCreator: { title: string; detail: string }[];
  links: {
    github: string;
    youtube: string;
    email: string | null;
    linkedin: string | null;
    x: string | null;
  };
}
