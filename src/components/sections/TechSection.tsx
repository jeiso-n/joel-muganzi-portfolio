import { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import { AI_ENGINEERING_PILLARS, PROJECTS, TECHNOLOGIES } from '../../data/portfolio';
import type { ProjectKey, TechCategory } from '../../types/workshop';

interface TechSectionProps {
  onOpenProject: (projectId: ProjectKey) => void;
}

const CATEGORIES: TechCategory[] = [
  'All',
  'Languages',
  'Frontend & 3D',
  'Backend & Data',
  'Media, Testing & Tooling',
];

const PROJECT_NAME_MAP: Record<ProjectKey, string> = PROJECTS.reduce(
  (acc, item) => {
    acc[item.id] = item.name;
    return acc;
  },
  {} as Record<ProjectKey, string>,
);

export function TechSection({ onOpenProject }: TechSectionProps) {
  const [selectedPillarId, setSelectedPillarId] = useState(AI_ENGINEERING_PILLARS[0].id);
  const [category, setCategory] = useState<TechCategory>('All');

  const activePillar =
    AI_ENGINEERING_PILLARS.find((p) => p.id === selectedPillarId) ?? AI_ENGINEERING_PILLARS[0];

  const visibleTech =
    category === 'All'
      ? TECHNOLOGIES
      : TECHNOLOGIES.filter((item) => item.category === category);

  return (
    <>
      {/* Prominent AI-Powered Engineering & Secure Workflows Control Station */}
      <div className="dossier-card">
        <div className="dossier-heading">
          <div>
            <h4 className="dossier-section-label" style={{ marginBottom: '0.2rem' }}>
              <ShieldCheck size={13} style={{ verticalAlign: '-2px', marginRight: 6 }} />
              AI-Powered Engineering
            </h4>
            <h3>Building With AI. Engineering With Discipline.</h3>
          </div>
          <span className="status-badge status-badge--active">Core Focus</span>
        </div>

        <p className="dossier-text">
          I want to move beyond simply asking AI to generate code. My focus is exploring how AI
          agents can assist real-world software building inside structured, secure, verifiable
          engineering workflows—guided by human oversight and ongoing cybersecurity fundamentals
          study.
        </p>

        <div className="pillar-selector" role="tablist" aria-label="AI engineering workflow pillars">
          {AI_ENGINEERING_PILLARS.map((pillar) => {
            const isSelected = pillar.id === activePillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`pillar-chip ${isSelected ? 'is-selected' : ''}`}
                onClick={() => setSelectedPillarId(pillar.id)}
              >
                <span className="pillar-code">{pillar.code}</span>
                <span>{pillar.title}</span>
              </button>
            );
          })}
        </div>

        <div className="pillar-detail-box" role="tabpanel" aria-label={activePillar.title}>
          <div className="subcard-title">
            {activePillar.code} · {activePillar.title}
          </div>
          <p className="dossier-text">{activePillar.summary}</p>
          <ul className="dossier-list">
            {activePillar.focusPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Verified Technologies Explorer */}
      <div className="dossier-card">
        <h4 className="dossier-section-label">Verified Engineering Stack</h4>
        <p className="dossier-text">
          Technologies below reflect hands-on usage across my actual repositories, coursework,
          and technical tutorials. Select a project chip to inspect that build on the
          Workstation.
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
