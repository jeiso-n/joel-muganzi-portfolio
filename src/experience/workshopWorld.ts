import * as THREE from 'three';
import type { ProjectRecord, StationId } from '../types/workshop';
import { createHologramMaterial, createSteamMaterial } from './shaders';
import {
  DynamicCommsDisplay,
  DynamicMonitorDisplay,
  createNotebookTexture,
  createPlaqueTexture,
  createRugTexture,
  createSideCodeTexture,
  createSkylineWindowTexture,
  createTerrazzoTexture,
  createWalnutTexture,
  createYouTubeSignLabelTexture,
} from './textures';

export interface WorkshopWorldHandles {
  root: THREE.Group;
  interactiveMeshes: THREE.Object3D[];
  stationGroups: Record<Exclude<StationId, 'overview'>, THREE.Group>;
  monitorDisplay: DynamicMonitorDisplay;
  commsDisplay: DynamicCommsDisplay;
  update: (elapsed: number, delta: number, hoveredStation: Exclude<StationId, 'overview'> | null) => void;
  dispose: () => void;
}

function tagInteractive(
  object: THREE.Object3D,
  stationId: Exclude<StationId, 'overview'>,
  collector: THREE.Object3D[],
  extraAction?: string,
): void {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.userData.stationId = stationId;
      if (extraAction) {
        child.userData.action = extraAction;
      }
      collector.push(child);
    }
  });
}

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();
  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);
  return shape;
}

export function buildWorkshopWorld(initialProject: ProjectRecord): WorkshopWorldHandles {
  const root = new THREE.Group();
  const interactiveMeshes: THREE.Object3D[] = [];
  const disposableTextures: THREE.Texture[] = [];

  // Procedural textures
  const walnutTex = createWalnutTexture();
  const terrazzoTex = createTerrazzoTexture();
  const rugTex = createRugTexture();
  const notebookTex = createNotebookTexture();
  const skylineTex = createSkylineWindowTexture();
  const plaqueTex = createPlaqueTexture();
  const sideCodeTex = createSideCodeTexture();
  const youtubeLabelTex = createYouTubeSignLabelTexture();
  disposableTextures.push(
    walnutTex,
    terrazzoTex,
    rugTex,
    notebookTex,
    skylineTex,
    plaqueTex,
    sideCodeTex,
    youtubeLabelTex,
  );

  const monitorDisplay = new DynamicMonitorDisplay(initialProject);
  const commsDisplay = new DynamicCommsDisplay();

  // Shared PBR Materials
  const floorMat = new THREE.MeshStandardMaterial({
    map: terrazzoTex,
    roughness: 0.42,
    metalness: 0.15,
  });
  const wallMat = new THREE.MeshStandardMaterial({
    color: '#1e2738',
    roughness: 0.82,
    metalness: 0.08,
  });
  const trimMat = new THREE.MeshStandardMaterial({
    color: '#232c3d',
    roughness: 0.48,
    metalness: 0.55,
  });
  const walnutMat = new THREE.MeshStandardMaterial({
    map: walnutTex,
    roughness: 0.52,
    metalness: 0.08,
  });
  const darkMetalMat = new THREE.MeshStandardMaterial({
    color: '#1b2230',
    roughness: 0.36,
    metalness: 0.72,
  });
  const brassMat = new THREE.MeshStandardMaterial({
    color: '#d89b56',
    roughness: 0.28,
    metalness: 0.85,
  });
  const amberGlowMat = new THREE.MeshStandardMaterial({
    color: '#f0a352',
    emissive: new THREE.Color('#f0a352'),
    emissiveIntensity: 1.5,
    roughness: 0.25,
  });
  const emeraldGlowMat = new THREE.MeshStandardMaterial({
    color: '#38d9a9',
    emissive: new THREE.Color('#38d9a9'),
    emissiveIntensity: 1.4,
    roughness: 0.25,
  });
  const cobaltGlowMat = new THREE.MeshStandardMaterial({
    color: '#6384ff',
    emissive: new THREE.Color('#6384ff'),
    emissiveIntensity: 1.25,
    roughness: 0.25,
  });

  // ==================== ARCHITECTURAL STAGE ====================
  const architecture = new THREE.Group();

  // Subtle dark mirror-feel stage shadow receiver beneath floating studio
  const groundStage = new THREE.Mesh(
    new THREE.CircleGeometry(14, 64),
    new THREE.MeshStandardMaterial({
      color: '#090c12',
      roughness: 0.65,
      metalness: 0.3,
    }),
  );
  groundStage.rotation.x = -Math.PI / 2;
  groundStage.position.y = -0.36;
  groundStage.receiveShadow = true;
  architecture.add(groundStage);

  // Main floating terrazzo slab
  const slab = new THREE.Mesh(new THREE.BoxGeometry(7.8, 0.34, 6.2), floorMat);
  slab.position.set(0, -0.17, 0);
  slab.receiveShadow = true;
  slab.castShadow = true;
  architecture.add(slab);

  // Recessed warm amber perimeter light strip around platform base
  const perimeterStrip = new THREE.Mesh(
    new THREE.BoxGeometry(7.86, 0.035, 6.26),
    new THREE.MeshStandardMaterial({
      color: '#f0a352',
      emissive: new THREE.Color('#f0a352'),
      emissiveIntensity: 0.9,
    }),
  );
  perimeterStrip.position.set(0, -0.02, 0);
  architecture.add(perimeterStrip);

  // Back wall
  const backWall = new THREE.Mesh(new THREE.BoxGeometry(7.8, 4.1, 0.24), wallMat);
  backWall.position.set(0, 2.05, -2.98);
  backWall.receiveShadow = true;
  architecture.add(backWall);

  // Left architectural wall with window frame cutout feel
  const leftWallBack = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.1, 2.1), wallMat);
  leftWallBack.position.set(-3.78, 2.05, -2.05);
  leftWallBack.receiveShadow = true;
  architecture.add(leftWallBack);

  const leftWallFront = new THREE.Mesh(new THREE.BoxGeometry(0.24, 4.1, 1.8), wallMat);
  leftWallFront.position.set(-3.78, 2.05, 2.2);
  leftWallFront.receiveShadow = true;
  architecture.add(leftWallFront);

  const leftWallBottom = new THREE.Mesh(new THREE.BoxGeometry(0.24, 1.15, 2.3), wallMat);
  leftWallBottom.position.set(-3.78, 0.575, 0.15);
  leftWallBottom.receiveShadow = true;
  architecture.add(leftWallBottom);

  const leftWallTop = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.72, 2.3), wallMat);
  leftWallTop.position.set(-3.78, 3.74, 0.15);
  architecture.add(leftWallTop);

  // Kampala twilight skyline window pane
  const windowPane = new THREE.Mesh(
    new THREE.PlaneGeometry(2.26, 2.24),
    new THREE.MeshBasicMaterial({ map: skylineTex }),
  );
  windowPane.rotation.y = Math.PI / 2;
  windowPane.position.set(-3.72, 2.27, 0.15);
  architecture.add(windowPane);

  // Window mullions & sill
  const windowFrameMat = darkMetalMat;
  const sill = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.08, 2.4), walnutMat);
  sill.position.set(-3.66, 1.16, 0.15);
  sill.castShadow = true;
  sill.receiveShadow = true;
  architecture.add(sill);

  const mullionV = new THREE.Mesh(new THREE.BoxGeometry(0.06, 2.26, 0.05), windowFrameMat);
  mullionV.position.set(-3.68, 2.27, 0.15);
  architecture.add(mullionV);

  const mullionH = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.05, 2.26), windowFrameMat);
  mullionH.position.set(-3.68, 2.38, 0.15);
  architecture.add(mullionH);

  // Acoustic walnut slats on left half of back wall
  for (let i = 0; i < 16; i += 1) {
    const slat = new THREE.Mesh(new THREE.BoxGeometry(0.09, 3.65, 0.07), walnutMat);
    slat.position.set(-3.45 + i * 0.22, 1.98, -2.83);
    slat.castShadow = true;
    slat.receiveShadow = true;
    architecture.add(slat);
  }

  // Architectural wall crown trim
  const backCrown = new THREE.Mesh(new THREE.BoxGeometry(7.84, 0.1, 0.3), trimMat);
  backCrown.position.set(0, 4.12, -2.98);
  architecture.add(backCrown);

  const leftCrown = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.1, 6.2), trimMat);
  leftCrown.position.set(-3.78, 4.12, 0);
  architecture.add(leftCrown);

  // Suspended linear studio pendant light
  const pendantBar = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.08, 0.16), darkMetalMat);
  pendantBar.position.set(-0.35, 3.62, -1.55);
  architecture.add(pendantBar);

  const pendantDiffuser = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.03, 0.11), amberGlowMat);
  pendantDiffuser.position.set(-0.35, 3.57, -1.55);
  architecture.add(pendantDiffuser);

  [-1.65, 0.95].forEach((x) => {
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.6, 8), darkMetalMat);
    rod.position.set(x, 3.92, -1.55);
    architecture.add(rod);
  });

  // Woven studio rug
  const rug = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 0.025, 3.1),
    new THREE.MeshStandardMaterial({ map: rugTex, roughness: 0.95 }),
  );
  rug.position.set(-0.3, 0.015, 0.25);
  rug.receiveShadow = true;
  architecture.add(rug);

  // Potted architectural botanical plant (front-left corner)
  const plantGroup = new THREE.Group();
  plantGroup.position.set(-3.0, 0, 2.05);
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.32, 0.24, 0.56, 20),
    new THREE.MeshStandardMaterial({ color: '#272f3d', roughness: 0.7 }),
  );
  pot.position.y = 0.28;
  pot.castShadow = true;
  plantGroup.add(pot);

  const soil = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.28, 0.05, 16),
    new THREE.MeshStandardMaterial({ color: '#1b1612', roughness: 0.95 }),
  );
  soil.position.y = 0.55;
  plantGroup.add(soil);

  const leafMat = new THREE.MeshStandardMaterial({
    color: '#255c47',
    roughness: 0.55,
    side: THREE.DoubleSide,
  });
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.02, 0.65 + (i % 3) * 0.16, 6), leafMat);
    stem.position.set(Math.cos(angle) * 0.08, 0.8 + (i % 3) * 0.08, Math.sin(angle) * 0.08);
    stem.rotation.z = -Math.cos(angle) * 0.35;
    stem.rotation.x = Math.sin(angle) * 0.35;
    plantGroup.add(stem);

    const leaf = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 8), leafMat);
    leaf.scale.set(1.2, 0.14, 0.72);
    leaf.position.set(Math.cos(angle) * 0.28, 1.12 + (i % 3) * 0.15, Math.sin(angle) * 0.28);
    leaf.rotation.y = -angle;
    leaf.rotation.z = -0.32;
    leaf.castShadow = true;
    plantGroup.add(leaf);
  }
  architecture.add(plantGroup);

  // Ergonomic studio chair
  const chairGroup = new THREE.Group();
  chairGroup.position.set(-0.35, 0, 0.22);
  chairGroup.rotation.y = 0.28;
  const chairFabric = new THREE.MeshStandardMaterial({ color: '#1d2432', roughness: 0.8 });
  const chairSeat = new THREE.Mesh(new THREE.BoxGeometry(0.68, 0.1, 0.64), chairFabric);
  chairSeat.position.y = 0.56;
  chairSeat.castShadow = true;
  chairGroup.add(chairSeat);

  const chairBack = new THREE.Mesh(new THREE.BoxGeometry(0.64, 0.76, 0.09), chairFabric);
  chairBack.position.set(0, 0.98, 0.28);
  chairBack.rotation.x = 0.1;
  chairBack.castShadow = true;
  chairGroup.add(chairBack);

  const chairStem = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 0.44, 12), darkMetalMat);
  chairStem.position.y = 0.3;
  chairGroup.add(chairStem);

  for (let i = 0; i < 5; i += 1) {
    const a = (i / 5) * Math.PI * 2;
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.04, 0.36), darkMetalMat);
    leg.position.set(Math.sin(a) * 0.18, 0.08, Math.cos(a) * 0.18);
    leg.rotation.y = a;
    chairGroup.add(leg);
  }
  architecture.add(chairGroup);

  root.add(architecture);

  // ==================== STATION 01: CENTRAL WORKSTATION (PROJECTS) ====================
  const projectsGroup = new THREE.Group();

  // Main walnut desk top
  const mainDeskTop = new THREE.Mesh(new THREE.BoxGeometry(3.6, 0.09, 1.38), walnutMat);
  mainDeskTop.position.set(-0.45, 0.96, -1.65);
  mainDeskTop.castShadow = true;
  mainDeskTop.receiveShadow = true;
  projectsGroup.add(mainDeskTop);

  // Steel desk legs
  [
    [-2.12, 0.48, -2.2],
    [-2.12, 0.48, -1.1],
    [1.22, 0.48, -2.2],
    [1.22, 0.48, -1.1],
  ].forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.94, 0.08), darkMetalMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    projectsGroup.add(leg);
  });

  // Desk mat
  const deskMat = new THREE.Mesh(
    new THREE.BoxGeometry(1.72, 0.012, 0.56),
    new THREE.MeshStandardMaterial({ color: '#141923', roughness: 0.9 }),
  );
  deskMat.position.set(-0.32, 1.012, -1.35);
  projectsGroup.add(deskMat);

  // Ultrawide primary monitor
  const monitorStandBase = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.03, 0.28), darkMetalMat);
  monitorStandBase.position.set(-0.28, 1.02, -1.96);
  projectsGroup.add(monitorStandBase);

  const monitorNeck = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.48, 0.07), darkMetalMat);
  monitorNeck.position.set(-0.28, 1.26, -2.01);
  projectsGroup.add(monitorNeck);

  const monitorBezel = new THREE.Mesh(new THREE.BoxGeometry(1.94, 0.98, 0.07), darkMetalMat);
  monitorBezel.position.set(-0.28, 1.72, -1.92);
  monitorBezel.castShadow = true;
  projectsGroup.add(monitorBezel);

  const monitorScreenMat = new THREE.MeshStandardMaterial({
    map: monitorDisplay.texture,
    emissive: new THREE.Color('#ffffff'),
    emissiveMap: monitorDisplay.texture,
    emissiveIntensity: 0.92,
    roughness: 0.18,
    metalness: 0.05,
  });
  const monitorScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.84, 0.89), monitorScreenMat);
  monitorScreen.position.set(-0.28, 1.72, -1.882);
  projectsGroup.add(monitorScreen);

  // Vertical side code monitor
  const sideMonitorGroup = new THREE.Group();
  sideMonitorGroup.position.set(-1.56, 1.66, -1.78);
  sideMonitorGroup.rotation.y = 0.36;

  const sideBezel = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.98, 0.06), darkMetalMat);
  sideBezel.castShadow = true;
  sideMonitorGroup.add(sideBezel);

  const sideScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.56, 0.92),
    new THREE.MeshStandardMaterial({
      map: sideCodeTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveMap: sideCodeTex,
      emissiveIntensity: 0.72,
      roughness: 0.22,
    }),
  );
  sideScreen.position.z = 0.033;
  sideMonitorGroup.add(sideScreen);

  const sideNeck = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.46, 0.06), darkMetalMat);
  sideNeck.position.set(0, -0.45, -0.05);
  sideMonitorGroup.add(sideNeck);
  projectsGroup.add(sideMonitorGroup);

  // Mechanical keyboard with warm backlight strip
  const keyboard = new THREE.Mesh(new THREE.BoxGeometry(0.66, 0.036, 0.24), darkMetalMat);
  keyboard.position.set(-0.38, 1.032, -1.36);
  keyboard.castShadow = true;
  projectsGroup.add(keyboard);

  const keyGlow = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.01, 0.18), amberGlowMat);
  keyGlow.position.set(-0.38, 1.052, -1.36);
  projectsGroup.add(keyGlow);

  // Mouse
  const mouse = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.034, 0.18), darkMetalMat);
  mouse.position.set(0.18, 1.03, -1.34);
  projectsGroup.add(mouse);

  // Dual Studio Speakers
  [-1.96, 0.92].forEach((x, idx) => {
    const speaker = new THREE.Group();
    speaker.position.set(x, 1.24, -1.84);
    speaker.rotation.y = idx === 0 ? 0.24 : -0.24;
    const cabinet = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.46, 0.32), darkMetalMat);
    cabinet.castShadow = true;
    speaker.add(cabinet);
    const woofer = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.03, 18), brassMat);
    woofer.rotation.x = Math.PI / 2;
    woofer.position.set(0, -0.07, 0.16);
    speaker.add(woofer);
    const tweeter = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.03, 14), trimMat);
    tweeter.rotation.x = Math.PI / 2;
    tweeter.position.set(0, 0.11, 0.16);
    speaker.add(tweeter);
    projectsGroup.add(speaker);
  });

  // Brass & Matte-Black Architectural Desk Lamp
  const lampGroup = new THREE.Group();
  lampGroup.position.set(1.06, 1.01, -1.42);
  const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 0.04, 18), darkMetalMat);
  lampGroup.add(lampBase);
  const lampArm1 = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.56, 8), brassMat);
  lampArm1.position.set(0.05, 0.27, 0);
  lampArm1.rotation.z = -0.22;
  lampGroup.add(lampArm1);
  const lampArm2 = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.46, 8), brassMat);
  lampArm2.position.set(-0.08, 0.63, 0.04);
  lampArm2.rotation.z = 0.72;
  lampGroup.add(lampArm2);
  const lampShade = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.2, 18, 1, true), darkMetalMat);
  lampShade.position.set(-0.24, 0.72, 0.07);
  lampShade.rotation.z = 0.4;
  lampGroup.add(lampShade);
  const lampBulb = new THREE.Mesh(new THREE.SphereGeometry(0.055, 12, 12), amberGlowMat);
  lampBulb.position.set(-0.22, 0.67, 0.07);
  lampGroup.add(lampBulb);
  projectsGroup.add(lampGroup);

  // Subtle station highlight indicator bar on desk front edge
  const projectsIndicator = new THREE.Mesh(
    new THREE.BoxGeometry(1.1, 0.018, 0.018),
    amberGlowMat.clone(),
  );
  projectsIndicator.position.set(-0.28, 0.96, -0.955);
  projectsGroup.add(projectsIndicator);

  tagInteractive(projectsGroup, 'projects', interactiveMeshes);
  root.add(projectsGroup);

  // ==================== STATION 02: FIELD NOTEBOOK & STORY WING (ABOUT) ====================
  const aboutGroup = new THREE.Group();

  // Left side desk return (L-desk wing)
  const sideWingTop = new THREE.Mesh(new THREE.BoxGeometry(1.18, 0.09, 2.25), walnutMat);
  sideWingTop.position.set(-2.54, 0.96, -0.35);
  sideWingTop.castShadow = true;
  sideWingTop.receiveShadow = true;
  aboutGroup.add(sideWingTop);

  [
    [-3.04, 0.48, 0.66],
    [-2.04, 0.48, 0.66],
  ].forEach(([x, y, z]) => {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.94, 0.08), darkMetalMat);
    leg.position.set(x, y, z);
    leg.castShadow = true;
    aboutGroup.add(leg);
  });

  // Open Field Notebook
  const notebookCover = new THREE.Mesh(
    new THREE.BoxGeometry(0.68, 0.032, 0.48),
    new THREE.MeshStandardMaterial({ color: '#2b241d', roughness: 0.78 }),
  );
  notebookCover.position.set(-2.46, 1.022, -0.32);
  notebookCover.rotation.y = 0.24;
  notebookCover.castShadow = true;
  aboutGroup.add(notebookCover);

  const notebookPages = new THREE.Mesh(
    new THREE.BoxGeometry(0.64, 0.026, 0.44),
    new THREE.MeshStandardMaterial({ map: notebookTex, roughness: 0.88 }),
  );
  notebookPages.position.set(-2.46, 1.044, -0.32);
  notebookPages.rotation.y = 0.24;
  aboutGroup.add(notebookPages);

  // Brass Fountain Pen
  const pen = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.012, 0.34, 10), brassMat);
  pen.rotation.z = Math.PI / 2;
  pen.rotation.y = -0.52;
  pen.position.set(-2.22, 1.07, -0.18);
  aboutGroup.add(pen);

  // Matte ceramic coffee mug + animated GLSL steam
  const mug = new THREE.Mesh(
    new THREE.CylinderGeometry(0.09, 0.082, 0.19, 18),
    new THREE.MeshStandardMaterial({ color: '#e4ddd1', roughness: 0.55 }),
  );
  mug.position.set(-2.72, 1.1, 0.18);
  mug.castShadow = true;
  aboutGroup.add(mug);

  const coffeeLiquid = new THREE.Mesh(
    new THREE.CylinderGeometry(0.078, 0.078, 0.02, 16),
    new THREE.MeshStandardMaterial({ color: '#2b1a10', roughness: 0.2 }),
  );
  coffeeLiquid.position.set(-2.72, 1.18, 0.18);
  aboutGroup.add(coffeeLiquid);

  const steamMat = createSteamMaterial();
  const steamPlane1 = new THREE.Mesh(new THREE.PlaneGeometry(0.24, 0.52, 6, 12), steamMat);
  steamPlane1.position.set(-2.72, 1.46, 0.18);
  aboutGroup.add(steamPlane1);

  const steamPlane2 = steamPlane1.clone();
  steamPlane2.rotation.y = Math.PI / 2;
  aboutGroup.add(steamPlane2);

  // Stack of engineering books
  const book1 = new THREE.Mesh(
    new THREE.BoxGeometry(0.42, 0.06, 0.3),
    new THREE.MeshStandardMaterial({ color: '#25324a', roughness: 0.72 }),
  );
  book1.position.set(-2.64, 1.036, -0.96);
  book1.rotation.y = -0.12;
  aboutGroup.add(book1);

  const book2 = new THREE.Mesh(
    new THREE.BoxGeometry(0.38, 0.055, 0.27),
    new THREE.MeshStandardMaterial({ color: '#7a4528', roughness: 0.75 }),
  );
  book2.position.set(-2.62, 1.094, -0.95);
  book2.rotation.y = 0.08;
  aboutGroup.add(book2);

  // Wall plaque above the notebook corner
  const plaqueFrame = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.62, 0.05), darkMetalMat);
  plaqueFrame.position.set(-2.55, 2.55, -2.8);
  aboutGroup.add(plaqueFrame);

  const plaqueFace = new THREE.Mesh(
    new THREE.PlaneGeometry(1.08, 0.54),
    new THREE.MeshStandardMaterial({
      map: plaqueTex,
      emissive: new THREE.Color('#ffffff'),
      emissiveMap: plaqueTex,
      emissiveIntensity: 0.28,
      roughness: 0.4,
    }),
  );
  plaqueFace.position.set(-2.55, 2.55, -2.77);
  aboutGroup.add(plaqueFace);

  const aboutIndicator = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.018, 0.72),
    amberGlowMat.clone(),
  );
  aboutIndicator.position.set(-1.95, 0.96, -0.32);
  aboutGroup.add(aboutIndicator);

  tagInteractive(aboutGroup, 'about', interactiveMeshes);
  root.add(aboutGroup);

  // ==================== STATION 03: SYSTEMS WALL & HOLOGRAM PEDESTAL (TECH) ====================
  const techGroup = new THREE.Group();

  // Illuminated modular systems wall panel
  const techBoard = new THREE.Mesh(new THREE.BoxGeometry(2.15, 2.15, 0.1), darkMetalMat);
  techBoard.position.set(2.55, 2.15, -2.76);
  techBoard.castShadow = true;
  techGroup.add(techBoard);

  // Server / module blades mounted on systems wall
  const ledMeshes: THREE.Mesh[] = [];
  for (let row = 0; row < 4; row += 1) {
    const blade = new THREE.Mesh(new THREE.BoxGeometry(1.86, 0.34, 0.14), trimMat);
    blade.position.set(2.55, 2.86 - row * 0.46, -2.68);
    blade.castShadow = true;
    techGroup.add(blade);

    const ledMat = (row % 3 === 0 ? emeraldGlowMat : row % 3 === 1 ? amberGlowMat : cobaltGlowMat).clone();
    const ledStrip = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.032, 0.03), ledMat);
    ledStrip.position.set(2.14, 2.86 - row * 0.46, -2.595);
    techGroup.add(ledStrip);
    ledMeshes.push(ledStrip);

    for (let dot = 0; dot < 3; dot += 1) {
      const pip = new THREE.Mesh(
        new THREE.BoxGeometry(0.045, 0.045, 0.03),
        (dot === 0 ? emeraldGlowMat : amberGlowMat).clone(),
      );
      pip.position.set(3.04 + dot * 0.11, 2.86 - row * 0.46, -2.595);
      techGroup.add(pip);
      ledMeshes.push(pip);
    }
  }

  // Brushed architectural pedestal + Holographic Blueprint Core
  const pedestalBase = new THREE.Mesh(new THREE.CylinderGeometry(0.54, 0.62, 1.02, 24), darkMetalMat);
  pedestalBase.position.set(2.65, 0.51, -1.48);
  pedestalBase.castShadow = true;
  pedestalBase.receiveShadow = true;
  techGroup.add(pedestalBase);

  const emitterRing = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.025, 12, 36), emeraldGlowMat.clone());
  emitterRing.rotation.x = Math.PI / 2;
  emitterRing.position.set(2.65, 1.03, -1.48);
  techGroup.add(emitterRing);

  const hologramMat = createHologramMaterial();
  const holoCore = new THREE.Mesh(new THREE.IcosahedronGeometry(0.44, 1), hologramMat);
  holoCore.position.set(2.65, 1.72, -1.48);
  techGroup.add(holoCore);

  const holoWire = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.56, 0),
    new THREE.MeshBasicMaterial({
      color: '#f0a352',
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    }),
  );
  holoWire.position.copy(holoCore.position);
  techGroup.add(holoWire);

  const holoOrbitRing = new THREE.Mesh(
    new THREE.TorusGeometry(0.7, 0.012, 8, 48),
    new THREE.MeshBasicMaterial({
      color: '#38d9a9',
      transparent: true,
      opacity: 0.58,
    }),
  );
  holoOrbitRing.position.copy(holoCore.position);
  holoOrbitRing.rotation.x = 1.15;
  techGroup.add(holoOrbitRing);

  tagInteractive(techGroup, 'tech', interactiveMeshes);
  root.add(techGroup);

  // ==================== STATION 04: COMMS & BROADCAST CONSOLE (CONTACT) ====================
  const contactGroup = new THREE.Group();

  // Right-side studio console cabinet
  const consoleBase = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.92, 1.82), darkMetalMat);
  consoleBase.position.set(2.65, 0.46, 1.15);
  consoleBase.castShadow = true;
  consoleBase.receiveShadow = true;
  contactGroup.add(consoleBase);

  const consoleTop = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.08, 1.9), walnutMat);
  consoleTop.position.set(2.65, 0.96, 1.15);
  consoleTop.castShadow = true;
  consoleTop.receiveShadow = true;
  contactGroup.add(consoleTop);

  // Retro-modern Comms Signal Display Terminal (angled toward center & camera)
  const commsTerminal = new THREE.Group();
  commsTerminal.position.set(2.62, 1.32, 0.92);
  commsTerminal.rotation.y = -0.58;

  const terminalBody = new THREE.Mesh(new THREE.BoxGeometry(0.84, 0.52, 0.24), trimMat);
  terminalBody.castShadow = true;
  commsTerminal.add(terminalBody);

  const commsScreen = new THREE.Mesh(
    new THREE.PlaneGeometry(0.74, 0.37),
    new THREE.MeshStandardMaterial({
      map: commsDisplay.texture,
      emissive: new THREE.Color('#ffffff'),
      emissiveMap: commsDisplay.texture,
      emissiveIntensity: 0.88,
      roughness: 0.2,
    }),
  );
  commsScreen.position.set(0, 0.02, 0.123);
  commsTerminal.add(commsScreen);

  const statusBar = new THREE.Mesh(new THREE.BoxGeometry(0.56, 0.026, 0.02), emeraldGlowMat.clone());
  statusBar.position.set(0, -0.2, 0.124);
  commsTerminal.add(statusBar);

  contactGroup.add(commsTerminal);

  // Creator Broadcast Microphone on Articulated Boom Arm (YouTube @jeiso_n nod)
  const micRig = new THREE.Group();
  micRig.position.set(2.74, 1.0, 1.72);
  const micClamp = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 0.12, 14), brassMat);
  micRig.add(micClamp);

  const boomLower = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.62, 8), darkMetalMat);
  boomLower.position.set(-0.08, 0.32, -0.05);
  boomLower.rotation.z = 0.26;
  micRig.add(boomLower);

  const boomUpper = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.52, 8), darkMetalMat);
  boomUpper.position.set(-0.34, 0.62, -0.14);
  boomUpper.rotation.z = 1.15;
  micRig.add(boomUpper);

  const micCapsule = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.062, 0.24, 16), darkMetalMat);
  micCapsule.position.set(-0.56, 0.6, -0.18);
  micCapsule.rotation.z = 0.22;
  micRig.add(micCapsule);

  const micGrille = new THREE.Mesh(new THREE.SphereGeometry(0.066, 14, 10), brassMat);
  micGrille.position.set(-0.58, 0.71, -0.18);
  micRig.add(micGrille);

  const onAirRing = new THREE.Mesh(new THREE.TorusGeometry(0.072, 0.012, 8, 20), amberGlowMat.clone());
  onAirRing.rotation.x = Math.PI / 2;
  onAirRing.position.set(-0.56, 0.66, -0.18);
  micRig.add(onAirRing);

  contactGroup.add(micRig);

  const contactIndicator = new THREE.Mesh(
    new THREE.BoxGeometry(0.018, 0.018, 0.78),
    emeraldGlowMat.clone(),
  );
  contactIndicator.position.set(2.03, 0.96, 1.15);
  contactGroup.add(contactIndicator);

  tagInteractive(contactGroup, 'contact', interactiveMeshes);
  root.add(contactGroup);

  // ==================== STATION 04: ILLUMINATED 3D YOUTUBE WALL SIGN ====================
  // Mounted flush on the unobstructed left architectural wall bay above the botanical plant.
  const youtubeGroup = new THREE.Group();
  youtubeGroup.position.set(-3.61, 2.48, 2.12);
  youtubeGroup.rotation.y = Math.PI / 2;

  // Machined metallic housing & brass wall standoffs
  const ytHousing = new THREE.Mesh(new THREE.BoxGeometry(1.24, 0.78, 0.08), darkMetalMat);
  ytHousing.castShadow = true;
  youtubeGroup.add(ytHousing);

  const ytBackplate = new THREE.Mesh(
    new THREE.BoxGeometry(1.14, 0.68, 0.02),
    new THREE.MeshStandardMaterial({ color: '#0d1018', roughness: 0.7, metalness: 0.35 }),
  );
  ytBackplate.position.z = 0.042;
  youtubeGroup.add(ytBackplate);

  [
    [-0.54, 0.31],
    [0.54, 0.31],
    [-0.54, -0.31],
    [0.54, -0.31],
  ].forEach(([sx, sy]) => {
    const bolt = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.09, 10), brassMat);
    bolt.rotation.x = Math.PI / 2;
    bolt.position.set(sx, sy, -0.02);
    youtubeGroup.add(bolt);
  });

  // Neon perimeter frame tubes (alternating smooth ON/OFF glow)
  const ytNeonTubeMat = new THREE.MeshStandardMaterial({
    color: '#ff343c',
    emissive: new THREE.Color('#ff222b'),
    emissiveIntensity: 1.4,
    roughness: 0.2,
    metalness: 0.1,
  });

  const topRail = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.02, 0.024), ytNeonTubeMat);
  topRail.position.set(0, 0.34, 0.052);
  youtubeGroup.add(topRail);

  const bottomRail = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.02, 0.024), ytNeonTubeMat);
  bottomRail.position.set(0, -0.34, 0.052);
  youtubeGroup.add(bottomRail);

  const leftRail = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.68, 0.024), ytNeonTubeMat);
  leftRail.position.set(-0.57, 0, 0.052);
  youtubeGroup.add(leftRail);

  const rightRail = new THREE.Mesh(new THREE.BoxGeometry(0.02, 0.68, 0.024), ytNeonTubeMat);
  rightRail.position.set(0.57, 0, 0.052);
  youtubeGroup.add(rightRail);

  // Iconic rounded red YouTube play button sculpted in 3D
  const ytBadgeMat = new THREE.MeshStandardMaterial({
    color: '#e5252d',
    emissive: new THREE.Color('#ff1f29'),
    emissiveIntensity: 1.5,
    roughness: 0.24,
    metalness: 0.12,
  });
  const ytBadgeGeo = new THREE.ExtrudeGeometry(createRoundedRectShape(0.56, 0.38, 0.1), {
    depth: 0.04,
    bevelEnabled: true,
    bevelThickness: 0.012,
    bevelSize: 0.012,
    bevelSegments: 3,
  });
  const ytBadgeMesh = new THREE.Mesh(ytBadgeGeo, ytBadgeMat);
  ytBadgeMesh.position.set(0, 0.07, 0.05);
  youtubeGroup.add(ytBadgeMesh);

  // Crisp illuminated white play triangle
  const playShape = new THREE.Shape();
  playShape.moveTo(-0.075, -0.095);
  playShape.lineTo(0.11, 0);
  playShape.lineTo(-0.075, 0.095);
  playShape.closePath();

  const ytPlayMat = new THREE.MeshStandardMaterial({
    color: '#f8f5ef',
    emissive: new THREE.Color('#fff5f0'),
    emissiveIntensity: 0.9,
    roughness: 0.22,
  });
  const ytPlayMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(playShape, { depth: 0.018, bevelEnabled: false }),
    ytPlayMat,
  );
  ytPlayMesh.position.set(0.01, 0.07, 0.098);
  youtubeGroup.add(ytPlayMesh);

  // Illuminated channel lettering plate below the play icon
  const ytLabelMat = new THREE.MeshStandardMaterial({
    map: youtubeLabelTex,
    emissive: new THREE.Color('#ff4d54'),
    emissiveMap: youtubeLabelTex,
    emissiveIntensity: 0.9,
    roughness: 0.35,
  });
  const ytLabelMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.04, 0.16), ytLabelMat);
  ytLabelMesh.position.set(0, -0.22, 0.055);
  youtubeGroup.add(ytLabelMesh);

  // Subtle surrounding crimson wall-wash light synced with the alternating ON/OFF cycle
  const youtubeWallLight = new THREE.PointLight('#ff323c', 1.8, 4.0, 1.8);
  youtubeWallLight.position.set(0, 0.05, 0.48);
  youtubeGroup.add(youtubeWallLight);

  tagInteractive(youtubeGroup, 'youtube', interactiveMeshes, 'open-youtube-channel');
  root.add(youtubeGroup);

  // ==================== AMBIENT DUST MOTES ====================
  const particleCount = 90;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i += 1) {
    particlePositions[i * 3] = (Math.sin(i * 12.9898) * 0.5) * 6.8;
    particlePositions[i * 3 + 1] = 0.4 + ((i * 37) % 34) * 0.1;
    particlePositions[i * 3 + 2] = (Math.cos(i * 78.233) * 0.5) * 5.2;
  }
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const dustMat = new THREE.PointsMaterial({
    color: '#f5c78e',
    size: 0.032,
    transparent: true,
    opacity: 0.45,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const dustPoints = new THREE.Points(dustGeo, dustMat);
  root.add(dustPoints);

  // ==================== LIGHTING RIG ====================
  const hemiLight = new THREE.HemisphereLight('#a8c2f0', '#2b2420', 1.15);
  root.add(hemiLight);

  // Warm key directional light from studio pendant / front-right angle
  const keyLight = new THREE.DirectionalLight('#ffddb5', 1.9);
  keyLight.position.set(4.8, 7.6, 5.2);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 22;
  keyLight.shadow.camera.left = -6;
  keyLight.shadow.camera.right = 6;
  keyLight.shadow.camera.top = 6;
  keyLight.shadow.camera.bottom = -6;
  keyLight.shadow.bias = -0.0005;
  root.add(keyLight);

  // Warm desk lamp local pool
  const deskLampLight = new THREE.PointLight('#f0a352', 4.2, 6.6, 1.6);
  deskLampLight.position.set(0.75, 1.72, -1.32);
  root.add(deskLampLight);

  // Warm fill above field notebook & coffee mug
  const notebookLight = new THREE.PointLight('#f2b872', 2.4, 4.8, 1.7);
  notebookLight.position.set(-2.25, 2.25, -0.15);
  root.add(notebookLight);

  // Subtle emerald glow from the systems wall hologram
  const holoLight = new THREE.PointLight('#38d9a9', 2.9, 5.2, 1.8);
  holoLight.position.set(2.65, 1.9, -1.48);
  root.add(holoLight);

  // Dusk sky fill through the left window
  const windowFill = new THREE.PointLight('#7fa2ff', 3.0, 6.8, 1.5);
  windowFill.position.set(-2.95, 2.25, 0.15);
  root.add(windowFill);

  // Comms console warm accent
  const commsLight = new THREE.PointLight('#38d9a9', 2.2, 4.4, 1.7);
  commsLight.position.set(2.15, 1.75, 1.35);
  root.add(commsLight);

  const indicatorMaterials: Record<
    Exclude<StationId, 'overview' | 'youtube'>,
    THREE.MeshStandardMaterial
  > = {
    projects: projectsIndicator.material as THREE.MeshStandardMaterial,
    about: aboutIndicator.material as THREE.MeshStandardMaterial,
    tech: emitterRing.material as THREE.MeshStandardMaterial,
    contact: contactIndicator.material as THREE.MeshStandardMaterial,
  };

  let displayAccumulator = 0;

  const update = (
    elapsed: number,
    delta: number,
    hoveredStation: Exclude<StationId, 'overview'> | null,
  ) => {
    // Hologram & shader animations
    hologramMat.uniforms.uTime.value = elapsed;
    const targetHover = hoveredStation === 'tech' ? 1 : 0;
    hologramMat.uniforms.uHover.value += (targetHover - hologramMat.uniforms.uHover.value) * Math.min(1, delta * 8);

    holoCore.rotation.y = elapsed * 0.42;
    holoCore.rotation.x = Math.sin(elapsed * 0.5) * 0.25;
    holoCore.position.y = 1.72 + Math.sin(elapsed * 1.4) * 0.055;

    holoWire.rotation.y = -elapsed * 0.28;
    holoWire.rotation.z = elapsed * 0.18;
    holoWire.position.y = holoCore.position.y;

    holoOrbitRing.rotation.z = elapsed * 0.55;
    holoOrbitRing.position.y = holoCore.position.y;

    // Coffee steam animation
    steamMat.uniforms.uTime.value = elapsed;

    // Gentle floating dust motes
    dustPoints.rotation.y = elapsed * 0.028;
    dustPoints.position.y = Math.sin(elapsed * 0.45) * 0.08;

    // Telemetry LED pulse on systems wall
    ledMeshes.forEach((mesh, idx) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.85 + Math.sin(elapsed * 2.4 + idx * 0.9) * 0.45;
    });

    // Smooth alternating ON / OFF neon glow for the physical 3D YouTube wall sign
    // ~4.4s cycle: smoothly illuminates to warm crimson ON state, holds briefly, then dims smoothly OFF
    const rawWave = Math.sin(elapsed * 1.42);
    const smoothCycle = Math.min(1, Math.max(0, (rawWave + 0.65) / 1.3));
    const easedGlow = smoothCycle * smoothCycle * (3 - 2 * smoothCycle);
    const ytHoverBoost = hoveredStation === 'youtube' ? 0.55 : 0;

    ytBadgeMat.emissiveIntensity = 0.18 + easedGlow * 1.95 + ytHoverBoost;
    ytNeonTubeMat.emissiveIntensity = 0.12 + easedGlow * 1.75 + ytHoverBoost;
    ytPlayMat.emissiveIntensity = 0.16 + easedGlow * 1.05 + ytHoverBoost * 0.5;
    ytLabelMat.emissiveIntensity = 0.15 + easedGlow * 0.95 + ytHoverBoost * 0.4;
    youtubeWallLight.intensity = 0.22 + easedGlow * 2.35 + ytHoverBoost * 0.8;

    // Subtle hover emphasis on station indicators
    (Object.keys(indicatorMaterials) as Exclude<StationId, 'overview' | 'youtube'>[]).forEach(
      (id) => {
        const mat = indicatorMaterials[id];
        const desired = hoveredStation === id ? 3.2 : 1.35;
        mat.emissiveIntensity += (desired - mat.emissiveIntensity) * Math.min(1, delta * 10);
      },
    );

    // Throttle dynamic canvas updates (~24 fps is smooth and light on CPU/GPU)
    displayAccumulator += delta;
    if (displayAccumulator >= 0.042) {
      monitorDisplay.update(elapsed, displayAccumulator);
      commsDisplay.update(elapsed);
      displayAccumulator = 0;
    }
  };

  const dispose = () => {
    monitorDisplay.dispose();
    commsDisplay.dispose();
    disposableTextures.forEach((tex) => tex.dispose());
    root.traverse((obj) => {
      if (obj instanceof THREE.Mesh || obj instanceof THREE.Points) {
        obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material.dispose();
        }
      }
    });
  };

  return {
    root,
    interactiveMeshes,
    stationGroups: {
      projects: projectsGroup,
      about: aboutGroup,
      tech: techGroup,
      youtube: youtubeGroup,
      contact: contactGroup,
    },
    monitorDisplay,
    commsDisplay,
    update,
    dispose,
  };
}
