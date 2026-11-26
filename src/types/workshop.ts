export type StationId = 'overview' | 'projects' | 'about' | 'tech' | 'contact';

export type ProjectStatus =
  | 'Live Product'
  | 'Active Development'
  | 'Desktop MVP'
  | 'Concept & Prototype';

export type ProjectKey =
  | 'victoria-university-navigator'
  | 'codesound-sync'
  | 'tap-report'
  | 'nexus'
  | 'musomi-manager';

export interface ProjectScreenTheme {
  accent: string;
  secondary: string;
  badge: string;
  headline: string;
  previewImageUrl?: string;
  facts: { label: string; value: string }[];
  modules: string[];
}

export interface ProjectRecord {
  id: ProjectKey;
  index: string;
  name: string;
  featuredBadge?: string;
  tagline: string;
  status: ProjectStatus;
  category: string;
  description: string;
  problemSolved: string;
  architectureHighlights: string[];
  technologies: string[];
  previewImageUrl?: string;
  previewImageAlt?: string;
  repository: {
    url: string | null;
    visibility: 'Public' | 'Private';
    label: string;
  };
  liveDemoUrl: string | null;
  liveDemoNote: string;
  screenTheme: ProjectScreenTheme;
}

export interface YouTubeVideoItem {
  id: string;
  title: string;
  url: string;
  thumbnailUrl: string;
  topic: string;
}

export interface WorkflowPillar {
  id: string;
  code: string;
  title: string;
  summary: string;
  focusPoints: string[];
}

export type TechCategory =
  | 'All'
  | 'Languages'
  | 'Frontend & 3D'
  | 'Backend & Data'
  | 'Media, Testing & Tooling';

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
  educationAndSecurity: { title: string; detail: string }[];
  creativeBackground: {
    title: string;
    summary: string;
    highlights: string[];
  };
  principles: { title: string; detail: string }[];
  youtubeEducation: {
    sectionTitle: string;
    seriesTitle: string;
    summary: string;
    channelUrl: string | null;
    videos: YouTubeVideoItem[];
  };
  links: {
    github: string | null;
    youtube: string | null;
    email: string | null;
    linkedin: string | null;
    x: string | null;
    tiktok: string | null;
  };
}
