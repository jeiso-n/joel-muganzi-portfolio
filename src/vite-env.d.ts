/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PUBLIC_NAME?: string;
  readonly VITE_PUBLIC_EMAIL?: string;
  readonly VITE_PUBLIC_GITHUB_URL?: string;
  readonly VITE_PUBLIC_X_URL?: string;
  readonly VITE_PUBLIC_LINKEDIN_URL?: string;
  readonly VITE_PUBLIC_YOUTUBE_URL?: string;
  readonly VITE_PUBLIC_TIKTOK_URL?: string;
  readonly VITE_PUBLIC_NAVIGATOR_GITHUB_URL?: string;
  readonly VITE_PUBLIC_NAVIGATOR_DEMO_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
