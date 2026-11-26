import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import { STATIONS } from '../data/portfolio';
import type { StationId } from '../types/workshop';

interface StationDrawerProps {
  stationId: Exclude<StationId, 'overview'>;
  onClose: () => void;
  children: ReactNode;
}

export function StationDrawer({ stationId, onClose, children }: StationDrawerProps) {
  const station = STATIONS[stationId];

  return (
    <aside
      className="station-drawer"
      aria-labelledby="station-drawer-title"
      role="region"
    >
      <div className="drawer-header">
        <div>
          <span className="drawer-kicker">
            Station {station.code} · {station.objectLabel}
          </span>
          <h2 id="station-drawer-title" className="drawer-title">
            {station.label}
          </h2>
        </div>

        <button
          type="button"
          className="drawer-close-btn"
          onClick={onClose}
          aria-label="Return to Workshop Overview"
        >
          <ArrowLeft size={13} />
          <span>Workshop</span>
        </button>
      </div>

      <div className="drawer-body">{children}</div>
    </aside>
  );
}
