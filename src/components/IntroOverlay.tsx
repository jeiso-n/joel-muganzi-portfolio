import { ArrowRight, FastForward } from 'lucide-react';
import { PROFILE } from '../data/portfolio';

interface IntroOverlayProps {
  visible: boolean;
  progress: number;
  statusText: string;
  sceneReady: boolean;
  webglAvailable: boolean;
  onStart: () => void;
  onSkip: () => void;
}

export function IntroOverlay({
  visible,
  progress,
  statusText,
  sceneReady,
  webglAvailable,
  onStart,
  onSkip,
}: IntroOverlayProps) {
  return (
    <section
      className={`intro-overlay ${visible ? '' : 'is-hidden'}`}
      aria-label="Portfolio Introduction"
      aria-hidden={!visible}
    >
      <div className="intro-top-bar">
        <span className="intro-status-dot">
          JOEL&apos;S DIGITAL WORKSHOP · {PROFILE.location}
        </span>
        <button
          type="button"
          className="intro-skip-btn"
          onClick={onSkip}
        >
          <FastForward size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          Skip intro
        </button>
      </div>

      <div className="intro-center">
        <p className="intro-eyebrow">Interactive Engineering Studio</p>
        <h1 className="intro-title">{PROFILE.fullName}</h1>
        <p className="intro-subtitle">{PROFILE.headline}</p>

        <div className="intro-role-strip" aria-label="Professional roles">
          {PROFILE.roles.map((role) => (
            <span key={role} className="intro-role-chip">
              {role}
            </span>
          ))}
        </div>

        <div className="intro-actions">
          <button
            type="button"
            className="btn-primary"
            disabled={webglAvailable && !sceneReady}
            onClick={onStart}
          >
            <span>{webglAvailable && !sceneReady ? 'Preparing Workshop...' : 'Start Experience'}</span>
            <ArrowRight size={16} />
          </button>

          <button type="button" className="btn-secondary" onClick={onSkip}>
            Enter Immediately
          </button>
        </div>
      </div>

      <div className="intro-loader-bar">
        <div className="intro-loader-meta">
          <span>{webglAvailable ? statusText : '2D STUDIO MODE READY'}</span>
          <span>{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="intro-progress-track" role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
          <div className="intro-progress-fill" style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      </div>
    </section>
  );
}
