import {
  Cpu,
  ExternalLink,
  GitBranch,
  Globe,
  Hammer,
  Layers,
  Lock,
  Star,
  Workflow,
} from 'lucide-react';
import {
  CREATIVE_WORKFLOWS,
  IN_DEVELOPMENT_PROJECTS,
  WEBSITE_SHOWCASE,
} from '../../data/expandedWork';
import { PROJECTS } from '../../data/portfolio';
import type {
  ProjectKey,
  ProjectRecord,
  ProjectStatus,
  WorkstationCategory,
} from '../../types/workshop';

interface ProjectsSectionProps {
  activeCategory: WorkstationCategory;
  onSelectCategory: (category: WorkstationCategory) => void;
  selectedProjectId: ProjectKey;
  onSelectProject: (id: ProjectKey) => void;
  selectedWebsiteId: string;
  onSelectWebsite: (id: string) => void;
}

const CATEGORY_TABS: {
  id: WorkstationCategory;
  label: string;
  count: number;
  icon: typeof Cpu;
}[] = [
  { id: 'software', label: 'Software', count: PROJECTS.length, icon: Cpu },
  { id: 'websites', label: 'Websites', count: WEBSITE_SHOWCASE.length, icon: Globe },
  { id: 'workflows', label: 'Workflows', count: CREATIVE_WORKFLOWS.length, icon: Workflow },
  { id: 'in-development', label: 'In Dev', count: IN_DEVELOPMENT_PROJECTS.length, icon: Hammer },
];

function getStatusClass(status: ProjectStatus): string {
  if (status === 'Live Product') return 'status-badge status-badge--live';
  if (status === 'Active Development') return 'status-badge status-badge--active';
  if (status === 'Desktop MVP') return 'status-badge status-badge--mvp';
  return 'status-badge status-badge--concept';
}

export function ProjectsSection({
  activeCategory,
  onSelectCategory,
  selectedProjectId,
  onSelectProject,
  selectedWebsiteId,
  onSelectWebsite,
}: ProjectsSectionProps) {
  const activeProject: ProjectRecord =
    PROJECTS.find((p) => p.id === selectedProjectId) ?? PROJECTS[0];
  const activeWebsite =
    WEBSITE_SHOWCASE.find((w) => w.id === selectedWebsiteId) ?? WEBSITE_SHOWCASE[0];

  return (
    <>
      <div
        className="workstation-category-bar"
        role="tablist"
        aria-label="Workstation portfolio categories"
      >
        {CATEGORY_TABS.map(({ id, label, count, icon: Icon }) => {
          const isSelected = activeCategory === id;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              className={`workstation-cat-btn ${isSelected ? 'is-active' : ''}`}
              onClick={() => onSelectCategory(id)}
            >
              <Icon size={13} aria-hidden="true" />
              <span>{label}</span>
              <span className="workstation-cat-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* ==================== A. FEATURED SOFTWARE PROJECTS (EXACT 5-PROJECT PRIORITY) ==================== */}
      {activeCategory === 'software' && (
        <>
          <div
            className="project-selector-grid"
            role="tablist"
            aria-label="Select a software project"
          >
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
      )}

      {/* ==================== B. WEBSITES & DIGITAL EXPERIENCES ==================== */}
      {activeCategory === 'websites' && (
        <>
          <div className="dossier-card">
            <h4 className="dossier-section-label">
              <Globe size={12} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              Websites &amp; Digital Experiences
            </h4>
            <p className="dossier-text">
              Selected live websites I have worked on across Ugandan residential design, Kampala
              floral and gift curation, and school web presence. Select any website below to inspect
              its live preview on the 3D workstation monitor.
            </p>
            <div
              className="website-selector-grid"
              role="tablist"
              aria-label="Select a website showcase"
            >
              {WEBSITE_SHOWCASE.map((site) => {
                const isSelected = site.id === activeWebsite.id;
                return (
                  <button
                    key={site.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`project-tab ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => onSelectWebsite(site.id)}
                  >
                    <span className="project-tab-meta">
                      <span>{site.index}</span>
                      <span>Live Website</span>
                    </span>
                    <span className="project-tab-name">{site.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <article className="dossier-card" aria-label={`${activeWebsite.name} website details`}>
            <div className="dossier-heading">
              <div>
                <h3>{activeWebsite.name}</h3>
                <p className="meta-note">{activeWebsite.category}</p>
              </div>
              <span className="status-badge status-badge--live">Live Website</span>
            </div>

            <figure className="project-preview-frame">
              <img
                src={activeWebsite.previewImageUrl}
                alt={activeWebsite.previewImageAlt}
                className="project-preview-img"
              />
              <figcaption className="project-preview-caption">
                <span>Live Website Preview</span>
                <span>Synced to 3D Workstation Monitor</span>
              </figcaption>
            </figure>

            <p className="dossier-text">{activeWebsite.description}</p>

            <div>
              <h4 className="dossier-section-label">Observed Site Highlights</h4>
              <ul className="dossier-list">
                {activeWebsite.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="link-row">
              <a
                href={activeWebsite.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <Globe size={15} />
                <span>Visit Website</span>
                <ExternalLink size={13} />
              </a>

              {activeWebsite.repositoryUrl && (
                <a
                  href={activeWebsite.repositoryUrl}
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
          </article>
        </>
      )}

      {/* ==================== C. CREATIVE PRODUCTION WORKFLOWS ==================== */}
      {activeCategory === 'workflows' && (
        <>
          {CREATIVE_WORKFLOWS.map((workflow) => (
            <article key={workflow.id} className="dossier-card" aria-label={workflow.name}>
              <div className="featured-banner">
                <Workflow size={13} />
                <span>{workflow.badge}</span>
              </div>

              <div className="dossier-heading">
                <div>
                  <h3>{workflow.name}</h3>
                  <p className="meta-note">AI-Assisted Creative Production Workflow</p>
                </div>
                <span className="status-badge status-badge--mvp">Reference Workflow</span>
              </div>

              <p className="dossier-text">{workflow.summary}</p>
              <p className="meta-note" style={{ color: 'var(--ink-primary)' }}>
                {workflow.clarification}
              </p>

              <div>
                <h4 className="dossier-section-label">
                  <Layers size={12} style={{ verticalAlign: '-2px', marginRight: 6 }} />
                  Production Pipeline Stages
                </h4>
                <ol className="workflow-pipeline">
                  {workflow.stages.map((stage) => (
                    <li key={stage.step} className="workflow-stage-item">
                      <span className="workflow-stage-step">{stage.step}</span>
                      <div>
                        <div className="workflow-stage-title">{stage.title}</div>
                        <p className="dossier-text">{stage.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="dossier-section-label">Verified Progress &amp; Experimental Status</h4>
                <ul className="dossier-list">
                  {workflow.verifiedProgress.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="meta-note" style={{ marginTop: '0.5rem' }}>
                  {workflow.experimentalNote}
                </p>
              </div>

              <div>
                <h4 className="dossier-section-label">Verified Workflow Tools</h4>
                <div className="tag-list">
                  {workflow.tools.map((tool) => (
                    <span key={tool} className="tag-pill">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div className="link-row">
                <a
                  href={workflow.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <GitBranch size={15} />
                  <span>View Workflow Repository</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </>
      )}

      {/* ==================== D. CURRENTLY IN DEVELOPMENT ==================== */}
      {activeCategory === 'in-development' && (
        <>
          <div className="dossier-card">
            <h4 className="dossier-section-label">
              <Hammer size={12} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              In The Workshop · Currently In Development
            </h4>
            <p className="dossier-text">
              Active software builds currently progressing through early engineering milestones.
              Shown honestly with verified repository progress and zero invented deployment claims.
            </p>
          </div>

          {IN_DEVELOPMENT_PROJECTS.map((item) => (
            <article key={item.id} className="dossier-card" aria-label={item.name}>
              <div className="dossier-heading">
                <div>
                  <h3>{item.name}</h3>
                  <p className="meta-note">{item.category}</p>
                </div>
                <span className="status-badge status-badge--concept">{item.statusLabel}</span>
              </div>

              <p className="dossier-text">{item.description}</p>

              <div>
                <h4 className="dossier-section-label">Verified Engineering Progress</h4>
                <ul className="dossier-list">
                  {item.currentProgress.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="dossier-section-label">Current Stage &amp; Upcoming Work</h4>
                <p className="dossier-text">{item.upcomingScope}</p>
              </div>

              <div>
                <h4 className="dossier-section-label">Verified Stack</h4>
                <div className="tag-list">
                  {item.technologies.map((tech) => (
                    <span key={tech} className="tag-pill">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="link-row">
                <a
                  href={item.repositoryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <GitBranch size={15} />
                  <span>View GitHub Repository</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </article>
          ))}
        </>
      )}
    </>
  );
}
