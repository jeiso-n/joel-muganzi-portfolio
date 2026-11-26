import {
  Box,
  Compass,
  Cpu,
  Eye,
  EyeOff,
  FileText,
  Layers,
  Monitor,
  Radio,
  Volume2,
  VolumeX,
  Youtube,
} from 'lucide-react';
import { PROFILE, STATIONS } from '../data/portfolio';
import type { StationId } from '../types/workshop';

interface StudioHudProps {
  activeStation: StationId;
  soundEnabled: boolean;
  showHotspots: boolean;
  use3D: boolean;
  webglAvailable: boolean;
  onSelectStation: (station: StationId) => void;
  onToggleSound: () => void;
  onToggleHotspots: () => void;
  onToggleRenderMode: () => void;
}

const DOCK_ITEMS: { id: StationId; icon: typeof Compass }[] = [
  { id: 'overview', icon: Compass },
  { id: 'projects', icon: Monitor },
  { id: 'about', icon: FileText },
  { id: 'tech', icon: Cpu },
  { id: 'youtube', icon: Youtube },
  { id: 'contact', icon: Radio },
];

export function StudioHud({
  activeStation,
  soundEnabled,
  showHotspots,
  use3D,
  webglAvailable,
  onSelectStation,
  onToggleSound,
  onToggleHotspots,
  onToggleRenderMode,
}: StudioHudProps) {
  return (
    <>
      <header className="hud-top">
        <div className="hud-brand">
          <button
            type="button"
            className="hud-brand-btn"
            onClick={() => onSelectStation('overview')}
            aria-label="Return to Studio Overview"
          >
            <span className="hud-monogram" aria-hidden="true">
              JM
            </span>
            <span>
              <span className="hud-brand-name">{PROFILE.fullName}</span>
              <span className="hud-brand-sub">Digital Workshop · {PROFILE.handle}</span>
            </span>
          </button>
        </div>

        <div className="hud-controls">
          {use3D && (
            <button
              type="button"
              className={`hud-icon-btn ${showHotspots ? 'is-active' : ''}`}
              aria-pressed={showHotspots}
              onClick={onToggleHotspots}
              title="Toggle 3D station markers"
            >
              {showHotspots ? <Eye size={14} /> : <EyeOff size={14} />}
              <span>Pins</span>
            </button>
          )}

          <button
            type="button"
            className={`hud-icon-btn ${soundEnabled ? 'is-active' : ''}`}
            aria-pressed={soundEnabled}
            onClick={onToggleSound}
            title="Toggle chill ambient studio music and audio feedback"
          >
            {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{soundEnabled ? 'Music On' : 'Music Off'}</span>
          </button>

          {webglAvailable && (
            <button
              type="button"
              className="hud-icon-btn"
              onClick={onToggleRenderMode}
              title={use3D ? 'Switch to lightweight 2D Studio View' : 'Return to Interactive 3D Workshop'}
            >
              {use3D ? <Layers size={14} /> : <Box size={14} />}
              <span>{use3D ? '2D View' : '3D View'}</span>
            </button>
          )}
        </div>
      </header>

      {use3D && activeStation === 'overview' && (
        <div className="hud-hint" aria-hidden="true">
          Drag to orbit · Scroll to zoom · Click any station or press 1–5
        </div>
      )}

      <nav className="hud-dock" aria-label="Workshop station navigation">
        {DOCK_ITEMS.map(({ id, icon: Icon }) => {
          const station = STATIONS[id];
          const isActive = activeStation === id;
          return (
            <button
              key={id}
              type="button"
              className={`dock-item ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onSelectStation(id)}
            >
              <Icon size={14} aria-hidden="true" />
              <span className="dock-code">{station.code}</span>
              <span>{station.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
