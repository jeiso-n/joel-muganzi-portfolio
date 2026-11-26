import { Box, Compass, ExternalLink, GraduationCap, MapPin, PlayCircle, Youtube } from 'lucide-react';
import { PROFILE } from '../../data/portfolio';

export function AboutSection() {
  const { youtubeEducation, creativeBackground } = PROFILE;

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
          <span className="status-badge status-badge--mvp">AI-Assisted Builder</span>
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

      {/* Education & Independent Cybersecurity Learning */}
      <div className="dossier-card">
        <h4 className="dossier-section-label">
          <GraduationCap size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          Education &amp; Cybersecurity Learning Journey
        </h4>
        <div className="stack-list">
          {PROFILE.educationAndSecurity.map((item) => (
            <div key={item.title}>
              <div className="subcard-title">{item.title}</div>
              <p className="dossier-text">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Creative Technology — Blender & 3D Animation */}
      <div className="dossier-card">
        <h4 className="dossier-section-label">
          <Box size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          {creativeBackground.title}
        </h4>
        <p className="dossier-text">{creativeBackground.summary}</p>
        <ul className="dossier-list">
          {creativeBackground.highlights.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      {/* The Learning Lab — YouTube & MySQL Workbench Series */}
      <div className="dossier-card">
        <div className="dossier-heading">
          <div>
            <h4 className="dossier-section-label" style={{ marginBottom: '0.2rem' }}>
              <Youtube size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              {youtubeEducation.sectionTitle}
            </h4>
            <div className="subcard-title">{youtubeEducation.seriesTitle}</div>
          </div>
        </div>

        <p className="dossier-text">{youtubeEducation.summary}</p>

        <div className="video-grid">
          {youtubeEducation.videos.map((video) => (
            <a
              key={video.id}
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="video-card"
            >
              <div className="video-thumb-wrap">
                <img
                  src={video.thumbnailUrl}
                  alt={`YouTube thumbnail: ${video.title}`}
                  className="video-thumb"
                  loading="lazy"
                />
                <span className="video-play-badge" aria-hidden="true">
                  <PlayCircle size={18} />
                </span>
              </div>
              <div className="video-meta">
                <span className="video-topic">{video.topic}</span>
                <span className="video-title">{video.title}</span>
              </div>
            </a>
          ))}
        </div>

        {youtubeEducation.channelUrl && (
          <div className="link-row">
            <a
              href={youtubeEducation.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Youtube size={15} />
              <span>Visit YouTube Channel</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}
      </div>

      {/* Guiding Principles */}
      <div className="dossier-card">
        <h4 className="dossier-section-label">
          <Compass size={12} style={{ verticalAlign: '-2px', marginRight: 6 }} />
          Engineering Principles
        </h4>
        <div className="stack-list">
          {PROFILE.principles.map((item) => (
            <div key={item.title}>
              <div className="subcard-title">{item.title}</div>
              <p className="dossier-text">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
