import { useState } from 'react';
import { ExternalLink, Film, Play, Sparkles, X, Youtube } from 'lucide-react';
import {
  YOUTUBE_CATEGORIES,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_SHOWCASE_VIDEOS,
  type YouTubeCategory,
  type YouTubeShowcaseVideo,
} from '../../data/youtube';

export function YouTubeSection() {
  const [selectedCategory, setSelectedCategory] = useState<YouTubeCategory>('All');
  const [playingId, setPlayingId] = useState<string | null>(null);

  const visibleVideos =
    selectedCategory === 'All'
      ? YOUTUBE_SHOWCASE_VIDEOS
      : YOUTUBE_SHOWCASE_VIDEOS.filter((video) => video.category === selectedCategory);

  const renderVideoCard = (video: YouTubeShowcaseVideo) => {
    const isPlaying = playingId === video.id;
    const isFeatured = Boolean(video.featured);

    return (
      <article
        key={video.id}
        className={`yt-showcase-card ${isFeatured ? 'yt-showcase-card--featured' : ''}`}
      >
        {isFeatured && video.featuredNote && (
          <div className="yt-featured-pill">
            <Sparkles size={12} />
            <span>{video.featuredNote}</span>
          </div>
        )}

        <div className="yt-media-stage">
          {isPlaying ? (
            <div className="yt-embed-container">
              <iframe
                src={video.embedUrl}
                title={video.title}
                className="yt-embed-iframe"
                loading="lazy"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div className="yt-embed-footer">
                <span>Embedded via YouTube · Playback trouble?</span>
                <div className="yt-embed-footer-actions">
                  <a
                    href={video.watchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="yt-inline-link"
                  >
                    Open on YouTube
                  </a>
                  <button
                    type="button"
                    className="yt-close-embed-btn"
                    onClick={() => setPlayingId(null)}
                    aria-label={`Close embedded player for ${video.title}`}
                  >
                    <X size={13} />
                    <span>Close</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="yt-thumb-trigger"
              onClick={() => setPlayingId(video.id)}
              aria-label={`Load embedded YouTube preview for ${video.title}`}
            >
              <img
                src={video.thumbnailUrl}
                alt={`YouTube thumbnail for ${video.title}`}
                className="yt-showcase-thumb"
                loading="lazy"
              />
              <span className="yt-play-overlay" aria-hidden="true">
                <span className="yt-play-disc">
                  <Play size={18} fill="currentColor" />
                </span>
                <span className="yt-play-label">Click to Load Player</span>
              </span>
            </button>
          )}
        </div>

        <div className="yt-card-content">
          <div className="yt-card-topline">
            <span className="yt-category-tag">{video.category}</span>
            {video.originalTitle && (
              <span className="yt-original-title" title={`Original YouTube title: ${video.originalTitle}`}>
                YT: {video.originalTitle}
              </span>
            )}
          </div>

          <h3 className="yt-card-title">{video.title}</h3>
          <p className="dossier-text">{video.description}</p>

          <div className="link-row">
            <a
              href={video.watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={isFeatured ? 'btn-primary' : 'btn-secondary'}
            >
              <Youtube size={14} />
              <span>Watch on YouTube</span>
              <ExternalLink size={12} />
            </a>

            {!isPlaying && (
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setPlayingId(video.id)}
              >
                <Play size={13} />
                <span>Play Here</span>
              </button>
            )}
          </div>
        </div>
      </article>
    );
  };

  return (
    <>
      <div className="dossier-card">
        <div className="dossier-heading">
          <div>
            <h4 className="dossier-section-label" style={{ marginBottom: '0.2rem' }}>
              <Film size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Workshop Media Station
            </h4>
            <h3>YouTube &amp; Technical Storytelling</h3>
          </div>
          <span className="yt-live-sign-badge">WALL SIGN ACTIVE</span>
        </div>

        <p className="dossier-text">
          Beyond writing software, I share practical learning videos on YouTube spanning
          cybersecurity awareness, Kali Linux fundamentals, Blender 3D animation, and
          beginner MySQL Workbench tutorials. Everything here reflects my personal learning
          journey and creative experimentation—not claims of being a security specialist or
          professional animator.
        </p>

        {YOUTUBE_CHANNEL_URL && (
          <div className="link-row">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Youtube size={15} />
              <span>Visit YouTube Channel (@jeison_muganzi)</span>
              <ExternalLink size={13} />
            </a>
          </div>
        )}

        <div className="filter-bar" role="tablist" aria-label="Filter YouTube videos by category">
          {YOUTUBE_CATEGORIES.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={selectedCategory === category}
              className={`filter-pill ${selectedCategory === category ? 'is-active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                setPlayingId(null);
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="yt-showcase-list">{visibleVideos.map(renderVideoCard)}</div>
    </>
  );
}
