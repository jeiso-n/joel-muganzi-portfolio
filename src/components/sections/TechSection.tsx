import { useState } from 'react';
import { PROJECTS, TECHNOLOGIES } from '../../data/portfolio';
import type { ProjectKey, TechCategory } from '../../types/workshop';

interface TechSectionProps {
  onOpenProject: (projectId: ProjectKey) => void;
}

const CATEGORIES: TechCategory[] = [
  'All',
  'Languages',
  'Frontend & Client',
  'Backend & Data',
  'Media, AI & Quality',
];

const PROJECT_NAME_MAP: Record<ProjectKey, string> = PROJECTS.reduce(
  (acc, item) => {
    acc[item.id] = item.name;
    return acc;
  },
  {} as Record<ProjectKey, string>,
);

export function TechSection({ onOpenProject }: TechSectionProps) {
  const [category, setCategory] = useState<TechCategory>('All');

  const visibleTech =
    category === 'All'
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((item) => item.category === category);

  return (
    <>
      <div className="dossier-card">
        <h4 className="dossier-section-label">Verified Engineering Stack</h4>
        <p className="dossier-text">
          Every language, framework, database, and testing tool below comes directly from
          Joel&apos;s verified software projects and this interactive workshop. Select a project
          chip to jump straight to that build on the workstation monitor.
        </p>

        <div className="filter-bar" role="tablist" aria-label="Filter technologies by category">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              role="tab"
              aria-selected={category === cat}
              className={`filter-pill ${category === cat ? 'is-active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="tech-grid">
        {visibleTech.map((tech) => (
          <div key={tech.id} className="tech-card">
            <div className="tech-card-head">
              <span className="tech-card-name">{tech.name}</span>
              <span className="tech-card-cat">{tech.category}</span>
            </div>
            <p className="tech-card-role">{tech.role}</p>
            <div className="tech-project-links">
              {tech.projects.length > 0 ? (
                tech.projects.map((projectId) => (
                  <button
                    key={projectId}
                    type="button"
                    className="tech-project-chip"
                    onClick={() => onOpenProject(projectId)}
                    title={`Inspect ${PROJECT_NAME_MAP[projectId]} on the workstation`}
                  >
                    {PROJECT_NAME_MAP[projectId]}
                  </button>
                ))
              ) : (
                <span className="tech-project-chip">This Digital Workshop</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
