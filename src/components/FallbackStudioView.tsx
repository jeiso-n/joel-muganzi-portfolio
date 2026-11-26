import { ArrowUpRight, ExternalLink, Youtube } from 'lucide-react';
import { INTERACTIVE_STATION_ORDER, PROFILE, STATIONS } from '../data/portfolio';
import { YOUTUBE_CHANNEL_URL } from '../data/youtube';
import type { StationId } from '../types/workshop';

interface FallbackStudioViewProps {
  webglAvailable: boolean;
  onSelectStation: (station: StationId) => void;
  onEnable3D: () => void;
}

export function FallbackStudioView({
  webglAvailable,
  onSelectStation,
  onEnable3D,
}: FallbackStudioViewProps) {
  return (
    <main className="fallback-studio" aria-label="2D Digital Workshop directory">
      <section className="fallback-hero">
        <p className="intro-eyebrow" style={{ marginBottom: '0.55rem' }}>
          Joel&apos;s Digital Workshop · 2D Architectural Mode
        </p>
        <h1
          style={{
            margin: '0 0 0.65rem',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
          }}
        >
          {PROFILE.fullName}
        </h1>
        <p className="dossier-text" style={{ maxWidth: 680, marginBottom: '1rem' }}>
          {PROFILE.philosophy}
        </p>
        <div className="link-row">
          {webglAvailable ? (
            <button type="button" className="btn-primary" onClick={onEnable3D}>
              Switch Back to Interactive 3D Studio
            </button>
          ) : (
            <span className="meta-note">
              WebGL is unavailable on this device/browser; running full-featured 2D studio mode.
            </span>
          )}

          {YOUTUBE_CHANNEL_URL && (
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="yt-fallback-sign"
              aria-label="Open Joel Muganzi's YouTube channel in a new tab"
            >
              <Youtube size={16} />
              <span>YouTube Wall Sign · @jeison_muganzi</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </section>

      <section className="fallback-grid" aria-label="Workshop stations">
        {INTERACTIVE_STATION_ORDER.map((id) => {
          const station = STATIONS[id];
          return (
            <button
              key={id}
              type="button"
              className="fallback-station-card"
              onClick={() => onSelectStation(id)}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  color: 'var(--accent-amber)',
                }}
              >
                <span>STATION {station.code}</span>
                <ArrowUpRight size={15} />
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.25rem',
                  fontWeight: 700,
                }}
              >
                {station.label} — {station.objectLabel}
              </div>
              <p className="dossier-text">{station.subtitle}</p>
            </button>
          );
        })}
      </section>
    </main>
  );
}
