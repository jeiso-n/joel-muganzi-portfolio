/**
 * Public portfolio configuration loaded from Vite `VITE_PUBLIC_*` environment variables.
 * Vite exposes `VITE_*` variables to the client bundle, so only public portfolio metadata
 * belongs here—never private credentials, tokens, or secrets.
 */

export interface PublicPortfolioEnv {
  name: string;
  email: string | null;
  githubUrl: string | null;
  xUrl: string | null;
  linkedinUrl: string | null;
  youtubeUrl: string | null;
  tiktokUrl: string | null;
  navigatorGithubUrl: string | null;
  navigatorDemoUrl: string | null;
}

const DEFAULT_PUBLIC_VALUES = {
  name: 'Joel Muganzi',
  email: 'jeisonmuganzi255@gmail.com',
  githubUrl: 'https://github.com/jeiso-n',
  xUrl: 'https://x.com/jeison_muganzi',
  linkedinUrl: 'https://linkedin.com/in/joel-muganzi-baa824451',
  youtubeUrl: 'https://www.youtube.com/@jeison_muganzi',
  tiktokUrl: 'https://www.tiktok.com/@jeiso_n',
  navigatorGithubUrl: 'https://github.com/jeiso-n/victoria-university-navigator',
  navigatorDemoUrl: 'https://jeiso-n.github.io/victoria-university-navigator/',
} as const;

const SIMPLE_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates and normalizes an external HTTP(S) URL.
 * Bare hostnames such as `tiktok.com/@jeiso_n` are upgraded to `https://`.
 * Rejects non-HTTP schemes (`javascript:`, `data:`, etc.) and malformed strings.
 */
export function validateExternalUrl(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed) return null;

  // Reject explicit non-http(s) schemes immediately
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(trimmed) && !/^https?:\/\//i.test(trimmed)) {
    return null;
  }

  const candidate = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }
    if (!parsed.hostname || !parsed.hostname.includes('.')) {
      return null;
    }
    return parsed.toString();
  } catch {
    return null;
  }
}

export function validateEmailAddress(raw: string | undefined | null): string | null {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (!trimmed || !SIMPLE_EMAIL_PATTERN.test(trimmed)) {
    return null;
  }
  return trimmed;
}

export function resolvePublicEnv(
  source: Partial<Record<string, string | undefined>> = import.meta.env,
): PublicPortfolioEnv {
  const readWithFallback = (key: string, fallback: string): string => {
    const value = source[key]?.trim();
    return value && value.length > 0 ? value : fallback;
  };

  return {
    name: readWithFallback('VITE_PUBLIC_NAME', DEFAULT_PUBLIC_VALUES.name),
    email: validateEmailAddress(readWithFallback('VITE_PUBLIC_EMAIL', DEFAULT_PUBLIC_VALUES.email)),
    githubUrl: validateExternalUrl(
      readWithFallback('VITE_PUBLIC_GITHUB_URL', DEFAULT_PUBLIC_VALUES.githubUrl),
    ),
    xUrl: validateExternalUrl(readWithFallback('VITE_PUBLIC_X_URL', DEFAULT_PUBLIC_VALUES.xUrl)),
    linkedinUrl: validateExternalUrl(
      readWithFallback('VITE_PUBLIC_LINKEDIN_URL', DEFAULT_PUBLIC_VALUES.linkedinUrl),
    ),
    youtubeUrl: validateExternalUrl(
      readWithFallback('VITE_PUBLIC_YOUTUBE_URL', DEFAULT_PUBLIC_VALUES.youtubeUrl),
    ),
    tiktokUrl: validateExternalUrl(
      readWithFallback('VITE_PUBLIC_TIKTOK_URL', DEFAULT_PUBLIC_VALUES.tiktokUrl),
    ),
    navigatorGithubUrl: validateExternalUrl(
      readWithFallback(
        'VITE_PUBLIC_NAVIGATOR_GITHUB_URL',
        DEFAULT_PUBLIC_VALUES.navigatorGithubUrl,
      ),
    ),
    navigatorDemoUrl: validateExternalUrl(
      readWithFallback('VITE_PUBLIC_NAVIGATOR_DEMO_URL', DEFAULT_PUBLIC_VALUES.navigatorDemoUrl),
    ),
  };
}

export const PUBLIC_ENV: PublicPortfolioEnv = resolvePublicEnv();
