import { ExternalLink, GitBranch, Globe, Lock, Star } from 'lucide-react';
import { PROJECTS } from '../../data/portfolio';
import type { ProjectKey, ProjectRecord, ProjectStatus } from '../../types/workshop';

interface ProjectsSectionProps {
  selectedProjectId: ProjectKey;
  onSelectProject: (id: ProjectKey) => void;
}

function getStatusClass(status: ProjectStatus): string {
  if (status === 'Live Product') return 'status-badge status-badge--live';
  if (status === 'Active Development') return 'status-badge status-badge--active';
  if (status === 'Desktop MVP') return 'status-badge status-badge--mvp';
  return 'status-badge status-badge--concept';
}

export function ProjectsSection({
  selectedProjectId,
  onSelectProject,
}: ProjectsSectionProps) {
  const activeProject: ProjectRecord =
    PROJECTS.find((p) => p.id === selectedProjectId) ?? PROJECTS[0];

  return (
    <>
      <div className="project-selector-grid" role="tablist" aria-label="Select a software project">
        {PROJECTS.map((project) => {
          const isSelected = project.id === activeProject.id;
          const isPrimary = Boolean(project.featuredBadge);
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`project-tab ${isPrimary ? 'project-tab--featured' : ''} ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectProject(project.id)}
            >
              <span className="project-tab-meta">
                <span>
                  {project.index}
                  {isPrimary ? ' · PRIMARY FEATURE' : ''}
                </span>
                <span>{project.status}</span>
              </span>
              <span className="project-tab-name">{project.name}</span>
            </button>
          );
        })}
      </div>

      <article className="dossier-card" aria-label={`${activeProject.name} project details`}>
        {activeProject.featuredBadge && (
          <div className="featured-banner">
            <Star size={13} />
            <span>{activeProject.featuredBadge}</span>
          </div>
        )}

        <div className="dossier-heading">
          <div>
            <h3>{activeProject.name}</h3>
            <p className="meta-note">{activeProject.category}</p>
          </div>
          <span className={getStatusClass(activeProject.status)}>{activeProject.status}</span>
        </div>

        <p className="dossier-text">{activeProject.description}</p>

        {/* Real visual preview when available, synced with the 3D workstation monitor */}
        {activeProject.previewImageUrl && (
          <figure className="project-preview-frame">
            <img
              src={activeProject.previewImageUrl}
              alt={activeProject.previewImageAlt ?? `${activeProject.name} interface preview`}
              className="project-preview-img"
            />
            <figcaption className="project-preview-caption">
              <span>Live 3D Campus Interface Preview</span>
              <span>Synced to 3D Workstation Monitor</span>
            </figcaption>
          </figure>
        )}

        {/* Clear action buttons right below preview for the primary project */}
        {activeProject.liveDemoUrl && (
          <div className="link-row">
            <a
              href={activeProject.liveDemoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Globe size={15} />
              <span>Explore Live Project</span>
              <ExternalLink size={13} />
            </a>

            {activeProject.repository.url && (
              <a
                href={activeProject.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GitBranch size={14} />
                <span>View Source Code</span>
                <ExternalLink size={12} />
              </a>
            )}
          </div>
        )}

        {/* Verified Architectural Summary Cards (no fabricated terminal logs or analytics) */}
        <div className="schematic-monitor" aria-label="Verified project overview">
          <div className="schematic-header">
            <span style={{ color: activeProject.screenTheme.accent }}>
              {activeProject.screenTheme.headline}
            </span>
          </div>

          <div className="schematic-metrics">
            {activeProject.screenTheme.facts.map((fact) => (
              <div key={fact.label} className="schematic-metric-box">
                <span className="schematic-metric-label">{fact.label}</span>
                <span className="schematic-metric-value">{fact.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="dossier-section-label">Problem Being Solved</h4>
          <p className="dossier-text">{activeProject.problemSolved}</p>
        </div>

        <div>
          <h4 className="dossier-section-label">Verified Implementation &amp; Scope</h4>
          <ul className="dossier-list">
            {activeProject.architectureHighlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="dossier-section-label">Technologies Used</h4>
          <div className="tag-list">
            {activeProject.technologies.map((tech) => (
              <span key={tech} className="tag-pill">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="dossier-section-label">Repository &amp; Availability</h4>
          <div className="link-row">
            {activeProject.liveDemoUrl && (
              <a
                href={activeProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Globe size={14} />
                <span>Explore Live Project</span>
                <ExternalLink size={13} />
              </a>
            )}

            {activeProject.repository.url ? (
              <a
                href={activeProject.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GitBranch size={14} />
                <span>View Source Code</span>
                <ExternalLink size={12} />
              </a>
            ) : (
              <span className="btn-secondary" style={{ opacity: 0.76, cursor: 'default' }}>
                <Lock size={14} />
                <span>{activeProject.repository.label}</span>
              </span>
            )}
          </div>
          <p className="meta-note" style={{ marginTop: '0.55rem' }}>
            {activeProject.liveDemoNote}
          </p>
        </div>
      </article>
    </>
  );
}
