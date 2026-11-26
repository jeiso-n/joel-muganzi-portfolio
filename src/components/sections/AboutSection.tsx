import { Compass, MapPin } from 'lucide-react';
import { PROFILE } from '../../data/portfolio';

export function AboutSection() {
  return (
    <>
      <div className="dossier-card">
        <div className="dossier-heading">
          <div>
            <h3>{PROFILE.fullName}</h3>
            <p className="meta-note">
              <MapPin size={12} style={{ verticalAlign: '-2px', marginRight: 4 }} />
              {PROFILE.location} · {PROFILE.handle}
            </p>
          </div>
          <span className="status-badge status-badge--mvp">Product Builder</span>
        </div>

        <p className="dossier-text" style={{ color: 'var(--ink-primary)', fontWeight: 500 }}>
          {PROFILE.philosophy}
        </p>

        {PROFILE.storyParagraphs.map((paragraph) => (
          <p key={paragraph} className="dossier-text">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="dossier-card">
        <h4 className="dossier-section-label">
          <Compass size={12} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          Engineering Principles
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {PROFILE.principles.map((item) => (
            <div key={item.title}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.96rem',
                  marginBottom: '0.2rem',
                }}
              >
                {item.title}
              </div>
              <p className="dossier-text">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="dossier-card">
        <h4 className="dossier-section-label">Community, Content &amp; Security Craft</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {PROFILE.communityAndCreator.map((item) => (
            <div key={item.title}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: '0.96rem',
                  marginBottom: '0.2rem',
                }}
              >
                {item.title}
              </div>
              <p className="dossier-text">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
