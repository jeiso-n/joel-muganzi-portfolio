import { Suspense, lazy, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FallbackStudioView } from './components/FallbackStudioView';
import { IntroOverlay } from './components/IntroOverlay';
import { StationDrawer } from './components/StationDrawer';
import { StudioHud } from './components/StudioHud';
import { AboutSection } from './components/sections/AboutSection';
import { ContactSection } from './components/sections/ContactSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { TechSection } from './components/sections/TechSection';
import { YouTubeSection } from './components/sections/YouTubeSection';
import { PROJECTS } from './data/portfolio';
import { YOUTUBE_CHANNEL_URL } from './data/youtube';
import { SoundEngine } from './experience/soundEngine';
import { detectWebGLSupport } from './experience/WorkshopExperience';
import type { ProjectKey, StationId } from './types/workshop';

const WorkshopCanvas = lazy(() => import('./components/WorkshopCanvas'));

export function App() {
  const webglAvailable = useMemo(() => detectWebGLSupport(), []);
  const soundRef = useRef<SoundEngine | null>(null);
  if (!soundRef.current) {
    soundRef.current = new SoundEngine();
  }

  const [use3D, setUse3D] = useState(webglAvailable);
  const [sceneReady, setSceneReady] = useState(!webglAvailable);
  const [loadProgress, setLoadProgress] = useState(webglAvailable ? 24 : 100);
  const [entered, setEntered] = useState(false);
  const [skipIntroMotion, setSkipIntroMotion] = useState(false);

  const [activeStation, setActiveStation] = useState<StationId>('overview');
  const [selectedProjectId, setSelectedProjectId] = useState<ProjectKey>(
    'victoria-university-navigator',
  );
  const [hoveredStation, setHoveredStation] = useState<Exclude<StationId, 'overview'> | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const activeProject = useMemo(
    () => PROJECTS.find((p) => p.id === selectedProjectId) ?? PROJECTS[0],
    [selectedProjectId],
  );

  // Smooth staged loader progress while the 3D workshop initializes
  useEffect(() => {
    if (!use3D) {
      setSceneReady(true);
      setLoadProgress(100);
      return;
    }
    if (sceneReady) {
      setLoadProgress(100);
      return;
    }
    const timer = window.setInterval(() => {
      setLoadProgress((prev) => (prev < 88 ? prev + 14 : prev));
    }, 110);
    return () => window.clearInterval(timer);
  }, [sceneReady, use3D]);

  useEffect(() => {
    const sound = soundRef.current;
    return () => {
      sound?.dispose();
    };
  }, []);

  const handleSelectStation = useCallback((station: StationId) => {
    setActiveStation(station);
    setHoveredStation(null);
  }, []);

  const handleOpenProjectFromTech = useCallback((projectId: ProjectKey) => {
    setSelectedProjectId(projectId);
    setActiveStation('projects');
  }, []);

  const handleStartExperience = useCallback(() => {
    setSkipIntroMotion(false);
    setEntered(true);
    setSoundEnabled(true);
    soundRef.current?.setEnabled(true, false);
  }, []);

  const handleSkipIntro = useCallback(() => {
    setSkipIntroMotion(true);
    setEntered(true);
  }, []);

  const handleYouTubeSignClick = useCallback(() => {
    if (YOUTUBE_CHANNEL_URL) {
      window.open(YOUTUBE_CHANNEL_URL, '_blank', 'noopener,noreferrer');
    }
  }, []);

  const handleToggleSound = useCallback(() => {
    setSoundEnabled((prev) => {
      const next = !prev;
      soundRef.current?.setEnabled(next);
      return next;
    });
  }, []);

  // Keyboard navigation shortcuts once inside the workshop
  useEffect(() => {
    if (!entered) return;
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT')
      ) {
        return;
      }

      if (event.key === 'Escape' || event.key === '0') {
        handleSelectStation('overview');
      } else if (event.key === '1') {
        handleSelectStation('projects');
      } else if (event.key === '2') {
        handleSelectStation('about');
      } else if (event.key === '3') {
        handleSelectStation('tech');
      } else if (event.key === '4') {
        handleSelectStation('youtube');
      } else if (event.key === '5') {
        handleSelectStation('contact');
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [entered, handleSelectStation]);

  const statusText = sceneReady
    ? 'WORKSHOP READY · CLICK START TO ENTER'
    : loadProgress < 55
      ? 'CALIBRATING STUDIO LIGHTING'
      : 'ASSEMBLING WORKSTATION & DISPLAYS';

  return (
    <div className="workshop-shell">
      {use3D ? (
        <Suspense fallback={null}>
          <WorkshopCanvas
            sound={soundRef.current}
            entered={entered}
            skipIntroMotion={skipIntroMotion}
            activeStation={activeStation}
            activeProject={activeProject}
            showHotspots={showHotspots}
            hoveredStation={hoveredStation}
            onReady={() => setSceneReady(true)}
            onSelectStation={handleSelectStation}
            onHoverStation={setHoveredStation}
            onYouTubeSignClick={handleYouTubeSignClick}
          />
        </Suspense>
      ) : (
        <FallbackStudioView
          webglAvailable={webglAvailable}
          onSelectStation={handleSelectStation}
          onEnable3D={() => {
            setSceneReady(false);
            setUse3D(true);
          }}
        />
      )}

      <IntroOverlay
        visible={!entered}
        progress={loadProgress}
        statusText={statusText}
        sceneReady={sceneReady}
        webglAvailable={webglAvailable}
        onStart={handleStartExperience}
        onSkip={handleSkipIntro}
      />

      {entered && (
        <StudioHud
          activeStation={activeStation}
          soundEnabled={soundEnabled}
          showHotspots={showHotspots}
          use3D={use3D}
          webglAvailable={webglAvailable}
          onSelectStation={handleSelectStation}
          onToggleSound={handleToggleSound}
          onToggleHotspots={() => setShowHotspots((v) => !v)}
          onToggleRenderMode={() => {
            setActiveStation('overview');
            setUse3D((prev) => !prev);
          }}
        />
      )}

      {entered && activeStation !== 'overview' && (
        <StationDrawer
          stationId={activeStation}
          onClose={() => handleSelectStation('overview')}
        >
          {activeStation === 'projects' && (
            <ProjectsSection
              selectedProjectId={selectedProjectId}
              onSelectProject={(id) => {
                soundRef.current?.playSelect();
                setSelectedProjectId(id);
              }}
            />
          )}
          {activeStation === 'about' && <AboutSection />}
          {activeStation === 'tech' && (
            <TechSection onOpenProject={handleOpenProjectFromTech} />
          )}
          {activeStation === 'youtube' && <YouTubeSection />}
          {activeStation === 'contact' && <ContactSection />}
        </StationDrawer>
      )}
    </div>
  );
}

export default App;
