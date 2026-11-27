import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import { INTERACTIVE_STATION_ORDER, PROJECTS, STATIONS } from '../data/portfolio';
import type { HotspotProjection, MonitorDisplayPayload, StationId } from '../types/workshop';
import { SoundEngine } from './soundEngine';
import { buildWorkshopWorld, type WorkshopWorldHandles } from './workshopWorld';

export interface ExperienceCallbacks {
  onReady: () => void;
  onStationSelect: (station: StationId) => void;
  onStationHover: (station: Exclude<StationId, 'overview'> | null) => void;
  onHotspotsUpdate: (projections: HotspotProjection[]) => void;
  onYouTubeSignClick?: () => void;
}

export function detectWebGLSupport(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    return Boolean(gl);
  } catch {
    return false;
  }
}

export class WorkshopExperience {
  private readonly container: HTMLElement;
  private readonly callbacks: ExperienceCallbacks;
  private readonly scene: THREE.Scene;
  private readonly camera: THREE.PerspectiveCamera;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly controls: OrbitControls;
  private readonly world: WorkshopWorldHandles;
  private readonly raycaster = new THREE.Raycaster();
  private readonly pointer = new THREE.Vector2(-10, -10);
  private readonly clock = new THREE.Clock();
  private readonly sound: SoundEngine;
  private readonly reducedMotion: boolean;

  private rafId = 0;
  private activeStation: StationId = 'overview';
  private hoveredStation: Exclude<StationId, 'overview'> | null = null;
  private isTransitioning = false;
  private hasEntered = false;
  private pointerDownPos = { x: 0, y: 0 };
  private isDisposed = false;
  private readonly lookTarget = new THREE.Vector3(0, 1.35, -0.2);

  private readonly anchorVectors: Record<Exclude<StationId, 'overview'>, THREE.Vector3> = {
    projects: new THREE.Vector3(...(STATIONS.projects.hotspotAnchor ?? [0, 2, -1])),
    about: new THREE.Vector3(...(STATIONS.about.hotspotAnchor ?? [-2, 1.5, 0])),
    tech: new THREE.Vector3(...(STATIONS.tech.hotspotAnchor ?? [2.5, 2.2, -1.5])),
    youtube: new THREE.Vector3(...(STATIONS.youtube.hotspotAnchor ?? [-3.48, 3.05, 2.12])),
    contact: new THREE.Vector3(...(STATIONS.contact.hotspotAnchor ?? [2.5, 1.8, 1.2])),
  };

  constructor(container: HTMLElement, sound: SoundEngine, callbacks: ExperienceCallbacks) {
    this.container = container;
    this.sound = sound;
    this.callbacks = callbacks;
    this.reducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#0b0e14');
    this.scene.fog = new THREE.FogExp2('#0b0e14', 0.044);

    this.camera = new THREE.PerspectiveCamera(44, width / height, 0.2, 60);
    // High establishing intro viewpoint before user clicks Start Experience
    this.camera.position.set(11.4, 8.8, 12.2);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.12;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.06;
    this.controls.enablePan = false;
    this.controls.rotateSpeed = 0.65;
    this.controls.zoomSpeed = 0.75;
    this.controls.minDistance = 4.6;
    this.controls.maxDistance = 14.5;
    this.controls.minPolarAngle = Math.PI * 0.16;
    this.controls.maxPolarAngle = Math.PI * 0.48;
    this.controls.minAzimuthAngle = -Math.PI * 0.28;
    this.controls.maxAzimuthAngle = Math.PI * 0.62;
    this.controls.target.set(0, 1.35, -0.2);
    this.controls.enabled = false;

    this.world = buildWorkshopWorld(PROJECTS[0]);
    this.scene.add(this.world.root);

    this.bindEvents();
    this.animate();
    this.callbacks.onReady();
  }

  private bindEvents(): void {
    window.addEventListener('resize', this.handleResize);
    this.renderer.domElement.addEventListener('pointermove', this.handlePointerMove);
    this.renderer.domElement.addEventListener('pointerdown', this.handlePointerDown);
    this.renderer.domElement.addEventListener('pointerup', this.handlePointerUp);
    this.renderer.domElement.addEventListener('pointerleave', this.handlePointerLeave);
  }

  private handleResize = (): void => {
    if (this.isDisposed) return;
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  };

  private updateNormalizedPointer(event: PointerEvent): void {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
  }

  private pickObject(): { stationId: Exclude<StationId, 'overview'>; action?: string } | null {
    this.raycaster.setFromCamera(this.pointer, this.camera);
    const hits = this.raycaster.intersectObjects(this.world.interactiveMeshes, false);
    if (hits.length === 0) return null;
    const stationId = hits[0].object.userData.stationId as Exclude<StationId, 'overview'> | undefined;
    if (!stationId) return null;
    const action = hits[0].object.userData.action as string | undefined;
    return { stationId, action };
  }

  private handlePointerMove = (event: PointerEvent): void => {
    if (!this.hasEntered || this.isTransitioning) return;
    this.updateNormalizedPointer(event);
    const hit = this.pickObject()?.stationId ?? null;
    if (hit !== this.hoveredStation) {
      this.hoveredStation = hit;
      this.renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
      if (hit) {
        this.sound.playHover();
      }
      this.callbacks.onStationHover(hit);
    }
  };

  private handlePointerDown = (event: PointerEvent): void => {
    this.pointerDownPos = { x: event.clientX, y: event.clientY };
    if (this.hasEntered && !this.hoveredStation) {
      this.renderer.domElement.style.cursor = 'grabbing';
    }
  };

  private handlePointerUp = (event: PointerEvent): void => {
    if (!this.hasEntered) return;
    this.renderer.domElement.style.cursor = this.hoveredStation ? 'pointer' : 'grab';
    const dist = Math.hypot(
      event.clientX - this.pointerDownPos.x,
      event.clientY - this.pointerDownPos.y,
    );
    // Ignore drag-to-orbit gestures
    if (dist > 7 || this.isTransitioning) return;

    this.updateNormalizedPointer(event);
    const picked = this.pickObject();
    if (picked) {
      this.sound.playSelect();
      if (picked.action === 'open-youtube-channel') {
        this.callbacks.onYouTubeSignClick?.();
      }
      this.callbacks.onStationSelect(picked.stationId);
    }
  };

  private handlePointerLeave = (): void => {
    if (this.hoveredStation !== null) {
      this.hoveredStation = null;
      this.callbacks.onStationHover(null);
    }
    this.renderer.domElement.style.cursor = 'default';
  };

  public enterWorkshop(skipAnimation = false): void {
    this.hasEntered = true;
    const duration = skipAnimation || this.reducedMotion ? 0.05 : 1.65;
    this.flyToStation('overview', duration);
  }

  public setMonitorContent(payload: MonitorDisplayPayload): void {
    this.world.monitorDisplay.setDisplayContent(payload);
  }

  public setExternalHover(station: Exclude<StationId, 'overview'> | null): void {
    this.hoveredStation = station;
  }

  public flyToStation(stationId: StationId, customDuration?: number): void {
    const config = STATIONS[stationId];
    this.activeStation = stationId;
    this.isTransitioning = true;
    this.controls.enabled = false;

    const isPortrait = this.container.clientWidth < 840;
    const pos = new THREE.Vector3(...config.cameraPosition);
    const target = new THREE.Vector3(...config.cameraTarget);

    // Pull camera back slightly on narrower viewports so the full station fits comfortably
    if (isPortrait) {
      const offset = pos.clone().sub(target).multiplyScalar(1.26);
      pos.copy(target).add(offset);
    } else if (stationId !== 'overview') {
      // Shift look target slightly right on desktop so the focused 3D object frames neatly left of the editorial drawer
      target.x += 0.52;
    }

    const duration = customDuration ?? (this.reducedMotion ? 0.05 : 1.2);
    if (duration > 0.2) {
      this.sound.playWhoosh();
    }

    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.controls.target);
    gsap.killTweensOf(this.lookTarget);

    this.lookTarget.copy(this.controls.target);

    gsap.to(this.camera.position, {
      x: pos.x,
      y: pos.y,
      z: pos.z,
      duration,
      ease: 'power3.inOut',
    });

    gsap.to(this.lookTarget, {
      x: target.x,
      y: target.y,
      z: target.z,
      duration,
      ease: 'power3.inOut',
      onUpdate: () => {
        this.controls.target.copy(this.lookTarget);
      },
      onComplete: () => {
        this.controls.target.copy(target);
        this.isTransitioning = false;
        this.controls.enabled = stationId === 'overview';
      },
    });
  }

  private projectHotspots(): void {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    const projections: HotspotProjection[] = INTERACTIVE_STATION_ORDER.map((id) => {
      const projected = this.anchorVectors[id].clone().project(this.camera);
      const visible =
        projected.z > -1 &&
        projected.z < 1 &&
        projected.x >= -1.05 &&
        projected.x <= 1.05 &&
        projected.y >= -1.05 &&
        projected.y <= 1.05;
      return {
        id,
        x: (projected.x * 0.5 + 0.5) * width,
        y: (-projected.y * 0.5 + 0.5) * height,
        visible,
      };
    });

    this.callbacks.onHotspotsUpdate(projections);
  }

  private animate = (): void => {
    if (this.isDisposed) return;
    this.rafId = window.requestAnimationFrame(this.animate);

    const delta = Math.min(this.clock.getDelta(), 0.05);
    const elapsed = this.clock.elapsedTime;

    // Gentle orbital breathing before intro completes
    if (!this.hasEntered && !this.reducedMotion) {
      this.camera.position.x = 11.2 + Math.sin(elapsed * 0.22) * 0.85;
      this.camera.position.z = 12.0 + Math.cos(elapsed * 0.22) * 0.85;
      this.camera.lookAt(0, 1.35, -0.2);
    } else if (this.controls.enabled) {
      this.controls.update();
    } else {
      this.camera.lookAt(this.lookTarget);
    }

    this.world.update(elapsed, delta, this.hoveredStation);
    this.renderer.render(this.scene, this.camera);

    if (this.hasEntered && this.activeStation === 'overview') {
      this.projectHotspots();
    }
  };

  public dispose(): void {
    this.isDisposed = true;
    window.cancelAnimationFrame(this.rafId);
    gsap.killTweensOf(this.camera.position);
    gsap.killTweensOf(this.controls.target);

    window.removeEventListener('resize', this.handleResize);
    this.renderer.domElement.removeEventListener('pointermove', this.handlePointerMove);
    this.renderer.domElement.removeEventListener('pointerdown', this.handlePointerDown);
    this.renderer.domElement.removeEventListener('pointerup', this.handlePointerUp);
    this.renderer.domElement.removeEventListener('pointerleave', this.handlePointerLeave);

    this.controls.dispose();
    this.world.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
