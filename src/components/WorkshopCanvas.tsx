import { useEffect, useRef } from 'react';
import { INTERACTIVE_STATION_ORDER, STATIONS } from '../data/portfolio';
import { WorkshopExperience } from '../experience/WorkshopExperience';
import type { SoundEngine } from '../experience/soundEngine';
import type { HotspotProjection, ProjectRecord, StationId } from '../types/workshop';

interface WorkshopCanvasProps {
  sound: SoundEngine;
  entered: boolean;
  skipIntroMotion: boolean;
  activeStation: StationId;
  activeProject: ProjectRecord;
  showHotspots: boolean;
  hoveredStation: Exclude<StationId, 'overview'> | null;
  onReady: () => void;
  onSelectStation: (station: StationId) => void;
  onHoverStation: (station: Exclude<StationId, 'overview'> | null) => void;
}

export default function WorkshopCanvas({
  sound,
  entered,
  skipIntroMotion,
  activeStation,
  activeProject,
  showHotspots,
  hoveredStation,
  onReady,
  onSelectStation,
  onHoverStation,
}: WorkshopCanvasProps) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const experienceRef = useRef<WorkshopExperience | null>(null);
  const hotspotRefs = useRef<Record<Exclude<StationId, 'overview'>, HTMLButtonElement | null>>({
    projects: null,
    about: null,
    tech: null,
    contact: null,
  });

  // Stable callback refs so the 3D engine is only instantiated once
  const callbacksRef = useRef({ onReady, onSelectStation, onHoverStation });
  callbacksRef.current = { onReady, onSelectStation, onHoverStation };

  useEffect(() => {
    const container = hostRef.current;
    if (!container) return;

    const handleHotspots = (projections: HotspotProjection[]) => {
      projections.forEach((item) => {
        const el = hotspotRefs.current[item.id];
        if (!el) return;
        if (item.visible) {
          el.style.opacity = '1';
          el.style.pointerEvents = 'auto';
          el.style.transform = `translate3d(${item.x.toFixed(1)}px, ${item.y.toFixed(1)}px, 0) translate(-50%, -50%)`;
        } else {
          el.style.opacity = '0';
          el.style.pointerEvents = 'none';
        }
      });
    };

    const experience = new WorkshopExperience(container, sound, {
      onReady: () => callbacksRef.current.onReady(),
      onStationSelect: (station) => callbacksRef.current.onSelectStation(station),
      onStationHover: (station) => callbacksRef.current.onHoverStation(station),
      onHotspotsUpdate: handleHotspots,
    });

    experienceRef.current = experience;
    return () => {
      experience.dispose();
      experienceRef.current = null;
    };
  }, [sound]);

  useEffect(() => {
    if (entered && experienceRef.current) {
      experienceRef.current.enterWorkshop(skipIntroMotion);
    }
  }, [entered, skipIntroMotion]);

  useEffect(() => {
    if (entered && experienceRef.current) {
      experienceRef.current.flyToStation(activeStation);
    }
  }, [activeStation, entered]);

  useEffect(() => {
    experienceRef.current?.setActiveProject(activeProject);
  }, [activeProject]);

  useEffect(() => {
    experienceRef.current?.setExternalHover(hoveredStation);
  }, [hoveredStation]);

  const hotspotsVisible = entered && showHotspots && activeStation === 'overview';

  return (
    <>
      <div
        ref={hostRef}
        className="workshop-canvas-host"
        aria-label="Interactive 3D Digital Workshop scene"
      />
      <div className="workshop-vignette" aria-hidden="true" />
      {hotspotsVisible && (
        <div className="hotspots-layer" aria-label="Workshop interactive stations">
          {INTERACTIVE_STATION_ORDER.map((id) => {
            const station = STATIONS[id];
            return (
              <button
                key={id}
                ref={(el) => {
                  hotspotRefs.current[id] = el;
                }}
                type="button"
                className={`hotspot-pin ${hoveredStation === id ? 'is-hovered' : ''}`}
                style={{ opacity: 0 }}
                onMouseEnter={() => {
                  onHoverStation(id);
                  sound.playHover();
                }}
                onMouseLeave={() => onHoverStation(null)}
                onClick={() => {
                  sound.playSelect();
                  onSelectStation(id);
                }}
                aria-label={`Inspect ${station.label}: ${station.objectLabel}`}
              >
                <span className="hotspot-dot">{station.code}</span>
                <span>{station.objectLabel}</span>
              </button>
            );
          })}
        </div>
      )}
    </>
  );
}
