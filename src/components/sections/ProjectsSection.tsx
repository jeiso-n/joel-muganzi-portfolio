import { ExternalLink, GitBranch, Lock, MonitorPlay } from 'lucide-react';
import { PROJECTS } from '../../data/portfolio';
import type { ProjectKey, ProjectRecord, ProjectStatus } from '../../types/workshop';

interface ProjectsSectionProps {
  selectedProjectId: ProjectKey;
  onSelectProject: (id: ProjectKey) => void;
}

function getStatusClass(status: ProjectStatus): string {
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
          return (
            <button
              key={project.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`project-tab ${isSelected ? 'is-selected' : ''}`}
              onClick={() => onSelectProject(project.id)}
            >
              <span className="project-tab-meta">
                <span>{project.index}</span>
                <span>{project.status}</span>
              </span>
              <span className="project-tab-name">{project.name}</span>
            </button>
          );
        })}
      </div>

      <article className="dossier-card" aria-label={`${activeProject.name} project details`}>
        <div className="dossier-heading">
          <div>
            <h3>{activeProject.name}</h3>
            <p className="meta-note">{activeProject.category}</p>
          </div>
          <span className={getStatusClass(activeProject.status)}>{activeProject.status}</span>
        </div>

        <p className="dossier-text">{activeProject.description}</p>

        {/* Visual schematic synchronized with the 3D workstation monitor */}
        <div className="schematic-monitor" aria-label="System schematic preview">
          <div className="schematic-header">
            <span style={{ color: activeProject.screenTheme.accent }}>
              <MonitorPlay size={12} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              {activeProject.screenTheme.headline}
            </span>
            <span>SYNCED TO 3D MONITOR</span>
          </div>

          <div className="schematic-metrics">
            {activeProject.screenTheme.metrics.map((m) => (
              <div key={m.label} className="schematic-metric-box">
                <span className="schematic-metric-label">{m.label}</span>
                <span className="schematic-metric-value">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="schematic-terminal">
            {activeProject.screenTheme.codeSnippet.map((line) => (
              <div key={line}>{line}</div>
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
            {activeProject.repository.url ? (
              <a
                href={activeProject.repository.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                <GitBranch size={14} />
                <span>View GitHub Repo</span>
                <ExternalLink size={12} />
              </a>
            ) : (
              <span className="btn-secondary" style={{ opacity: 0.72, cursor: 'default' }}>
                <Lock size={14} />
                <span>{activeProject.repository.label}</span>
              </span>
            )}

            {activeProject.liveDemoUrl && (
              <a
                href={activeProject.liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
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
