import * as THREE from 'three';
import type { ProjectRecord } from '../types/workshop';

function createCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Could not initialize 2D canvas context for procedural texture.');
  }
  return [canvas, ctx];
}

export function createWalnutTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 512);
  ctx.fillStyle = '#342419';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 160; i += 1) {
    const y = (i / 160) * 512;
    const shade = 34 + Math.floor(Math.sin(i * 0.45) * 10 + (i % 7) * 2);
    ctx.strokeStyle = `rgba(${shade + 22}, ${shade + 8}, ${shade - 4}, 0.42)`;
    ctx.lineWidth = 1.5 + (i % 3);
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 512; x += 32) {
      const wave = Math.sin(x * 0.012 + i * 0.25) * 4.5;
      ctx.lineTo(x, y + wave);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 1.5);
  return texture;
}

export function createTerrazzoTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 512);
  ctx.fillStyle = '#141923';
  ctx.fillRect(0, 0, 512, 512);

  ctx.strokeStyle = 'rgba(243, 239, 230, 0.045)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i <= 512; i += 128) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, 512);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(512, i);
    ctx.stroke();
  }

  const palette = [
    'rgba(240,163,82,0.16)',
    'rgba(243,239,230,0.08)',
    'rgba(56,217,169,0.09)',
    'rgba(30,39,54,0.65)',
  ];
  for (let i = 0; i < 420; i += 1) {
    const x = ((i * 73) % 509) + 1;
    const y = ((i * 197) % 509) + 1;
    const r = 1 + (i % 4) * 0.7;
    ctx.fillStyle = palette[i % palette.length];
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

export function createRugTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 512);
  ctx.fillStyle = '#19202e';
  ctx.fillRect(0, 0, 512, 512);

  for (let y = 0; y < 512; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? 'rgba(243,239,230,0.035)' : 'rgba(9,12,18,0.12)';
    ctx.fillRect(0, y, 512, 2);
  }

  ctx.strokeStyle = 'rgba(240, 163, 82, 0.38)';
  ctx.lineWidth = 6;
  ctx.strokeRect(24, 24, 464, 464);

  ctx.strokeStyle = 'rgba(243, 239, 230, 0.14)';
  ctx.lineWidth = 2;
  ctx.strokeRect(42, 42, 428, 428);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createNotebookTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 340);
  ctx.fillStyle = '#f2ece1';
  ctx.fillRect(0, 0, 512, 340);

  const crease = ctx.createLinearGradient(236, 0, 276, 0);
  crease.addColorStop(0, 'rgba(30,24,18,0)');
  crease.addColorStop(0.5, 'rgba(30,24,18,0.22)');
  crease.addColorStop(1, 'rgba(30,24,18,0)');
  ctx.fillStyle = crease;
  ctx.fillRect(236, 0, 40, 340);

  ctx.fillStyle = 'rgba(28, 34, 46, 0.16)';
  for (let x = 22; x < 495; x += 18) {
    for (let y = 24; y < 320; y += 18) {
      if (Math.abs(x - 256) < 16) continue;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  ctx.fillStyle = '#18202c';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('FIELD NOTES // 02', 26, 46);
  ctx.fillStyle = '#c46f1f';
  ctx.fillRect(26, 54, 118, 2.5);

  ctx.fillStyle = '#2d3748';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('JOEL MUGANZI', 26, 84);
  ctx.font = '11px monospace';
  ctx.fillStyle = '#4a5568';
  ctx.fillText('VICTORIA UNIVERSITY', 26, 102);
  ctx.fillText('AI + SECURE WORKFLOWS', 26, 124);
  ctx.fillText('BLENDER + 3D CRAFT', 26, 144);

  ctx.strokeStyle = 'rgba(32, 41, 56, 0.34)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 6; i += 1) {
    const y = 172 + i * 20;
    ctx.beginPath();
    ctx.moveTo(26, y);
    ctx.lineTo(186 + ((i * 29) % 34), y);
    ctx.stroke();
  }

  // Right page architectural sketch
  ctx.strokeStyle = '#1f2937';
  ctx.lineWidth = 1.8;
  ctx.strokeRect(290, 44, 188, 92);
  ctx.strokeStyle = '#c46f1f';
  ctx.strokeRect(306, 62, 66, 56);
  ctx.strokeStyle = '#0f9b78';
  ctx.strokeRect(392, 62, 70, 56);

  ctx.beginPath();
  ctx.moveTo(372, 90);
  ctx.lineTo(392, 90);
  ctx.stroke();

  ctx.fillStyle = '#1f2937';
  ctx.font = '10px monospace';
  ctx.fillText('SPEC', 322, 93);
  ctx.fillText('VERIFY', 406, 93);
  ctx.fillText('MYSQL WORKBENCH LAB', 292, 168);

  for (let i = 0; i < 5; i += 1) {
    const y = 192 + i * 22;
    ctx.strokeStyle = 'rgba(32, 41, 56, 0.32)';
    ctx.beginPath();
    ctx.moveTo(290, y);
    ctx.lineTo(445 + ((i * 17) % 35), y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createSkylineWindowTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 512);
  const grad = ctx.createLinearGradient(0, 0, 0, 512);
  grad.addColorStop(0, '#090e1c');
  grad.addColorStop(0.42, '#131d36');
  grad.addColorStop(0.72, '#2d2838');
  grad.addColorStop(0.88, '#935232');
  grad.addColorStop(1, '#d68344');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  ctx.fillStyle = 'rgba(243, 239, 230, 0.65)';
  for (let i = 0; i < 42; i += 1) {
    const x = (i * 97 + 19) % 500;
    const y = (i * 53 + 11) % 210;
    const size = i % 5 === 0 ? 2 : 1.1;
    ctx.fillRect(x, y, size, size);
  }

  ctx.fillStyle = '#121521';
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.lineTo(0, 392);
  ctx.quadraticCurveTo(120, 344, 240, 378);
  ctx.quadraticCurveTo(360, 405, 512, 355);
  ctx.lineTo(512, 512);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#0a0d15';
  const buildings = [
    [28, 360, 36, 152],
    [74, 338, 42, 174],
    [130, 372, 50, 140],
    [206, 326, 48, 186],
    [264, 352, 34, 160],
    [324, 314, 54, 198],
    [392, 348, 44, 164],
    [448, 368, 40, 144],
  ];
  buildings.forEach(([x, y, w, h]) => {
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = 'rgba(240, 163, 82, 0.55)';
    for (let wy = y + 12; wy < 465; wy += 16) {
      for (let wx = x + 7; wx < x + w - 9; wx += 11) {
        if ((wx + wy) % 3 !== 0) {
          ctx.fillRect(wx, wy, 4, 6);
        }
      }
    }
    ctx.fillStyle = '#0a0d15';
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createPlaqueTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 256);
  ctx.fillStyle = '#111621';
  ctx.fillRect(0, 0, 512, 256);
  ctx.strokeStyle = '#f0a352';
  ctx.lineWidth = 5;
  ctx.strokeRect(14, 14, 484, 228);

  ctx.fillStyle = '#f0a352';
  ctx.font = 'bold 18px monospace';
  ctx.fillText('KAMPALA // DIGITAL WORKSHOP', 40, 74);

  ctx.fillStyle = '#f3efe6';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('BUILD WITH AI.', 40, 132);
  ctx.fillText('SHIP WITH CARE.', 40, 174);

  ctx.fillStyle = '#38d9a9';
  ctx.font = '14px monospace';
  ctx.fillText('DESIGN  •  SECURE  •  VERIFY', 40, 212);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Clean architectural workflow reference sheet for the vertical side monitor
 * (replaces fabricated terminal output with honest engineering workflow principles).
 */
export function createSideCodeTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(384, 640);
  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 384, 640);

  ctx.fillStyle = '#141c2b';
  ctx.fillRect(0, 0, 384, 48);
  ctx.fillStyle = '#f0a352';
  ctx.fillRect(0, 46, 384, 2);

  ctx.fillStyle = '#f0a352';
  ctx.font = 'bold 14px monospace';
  ctx.fillText('AI ENGINEERING WORKFLOW', 24, 30);

  const steps = [
    ['01', 'INSPECT FIRST', 'Read repo, docs & constraints'],
    ['02', 'CLEAR SCOPE', 'Define requirements & limits'],
    ['03', 'SAFE BOUNDARIES', 'No secrets, least privilege'],
    ['04', 'IMPLEMENT', 'Focused modular changes'],
    ['05', 'VERIFY', 'Tests, build & browser QA'],
    ['06', 'DELIVER', 'Milestone commits to GitHub'],
  ];

  steps.forEach(([num, title, desc], idx) => {
    const y = 78 + idx * 84;
    ctx.fillStyle = 'rgba(22, 29, 43, 0.9)';
    ctx.fillRect(20, y, 344, 68);
    ctx.strokeStyle = idx === 0 ? '#f0a352' : 'rgba(243, 239, 230, 0.12)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(20, y, 344, 68);

    ctx.fillStyle = '#38d9a9';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(num, 34, y + 26);

    ctx.fillStyle = '#f3efe6';
    ctx.font = 'bold 15px sans-serif';
    ctx.fillText(title, 66, y + 26);

    ctx.fillStyle = '#9aa5b8';
    ctx.font = '13px sans-serif';
    ctx.fillText(desc, 34, y + 50);
  });

  ctx.fillStyle = '#7f8a9f';
  ctx.font = '12px monospace';
  ctx.fillText('HUMAN OVERSIGHT ON EVERY STEP', 24, 608);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class DynamicMonitorDisplay {
  public readonly canvas: HTMLCanvasElement;
  public readonly texture: THREE.CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly imageCache = new Map<string, HTMLImageElement>();
  private project: ProjectRecord;
  private transitionFlash = 0;

  constructor(initialProject: ProjectRecord) {
    const [canvas, ctx] = createCanvas(1024, 512);
    this.canvas = canvas;
    this.ctx = ctx;
    this.project = initialProject;
    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.preloadPreview(initialProject);
    this.render(0);
  }

  private preloadPreview(project: ProjectRecord): void {
    const url = project.screenTheme.previewImageUrl;
    if (!url || this.imageCache.has(url)) return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      this.imageCache.set(url, img);
      this.render(0);
    };
    img.src = url;
  }

  public setProject(project: ProjectRecord): void {
    this.project = project;
    this.transitionFlash = 1;
    this.preloadPreview(project);
    this.render(0);
  }

  public update(elapsedTime: number, delta: number): void {
    if (this.transitionFlash > 0) {
      this.transitionFlash = Math.max(0, this.transitionFlash - delta * 3.0);
      this.render(elapsedTime);
    }
  }

  private render(_time: number): void {
    const { ctx, project } = this;
    const { screenTheme } = project;

    ctx.fillStyle = '#090d15';
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle blueprint grid
    ctx.strokeStyle = 'rgba(243, 239, 230, 0.035)';
    ctx.lineWidth = 1;
    for (let x = 0; x < 1024; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 512);
      ctx.stroke();
    }
    for (let y = 0; y < 512; y += 48) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1024, y);
      ctx.stroke();
    }

    // Header bar
    ctx.fillStyle = '#111826';
    ctx.fillRect(0, 0, 1024, 54);
    ctx.fillStyle = screenTheme.accent;
    ctx.fillRect(0, 52, 1024, 2);

    ctx.fillStyle = screenTheme.accent;
    ctx.font = 'bold 17px monospace';
    ctx.fillText(`STATION 01 // ${screenTheme.badge}`, 28, 34);

    ctx.fillStyle = '#9aa5b8';
    ctx.font = '15px monospace';
    ctx.fillText(`PROJECT ${project.index} OF 05`, 826, 34);

    const previewImg = screenTheme.previewImageUrl
      ? this.imageCache.get(screenTheme.previewImageUrl)
      : undefined;

    if (previewImg) {
      // Split showcase for primary project with genuine live preview screenshot
      ctx.fillStyle = '#f3efe6';
      ctx.font = 'bold 26px sans-serif';
      ctx.fillText(project.name.toUpperCase(), 30, 102, 434);

      ctx.fillStyle = '#b7bfcf';
      ctx.font = '15px sans-serif';
      ctx.fillText('Unified 2D + 3D Campus Navigation · Kampala', 30, 132, 434);

      // Real preview screenshot framed on the right
      const imgX = 486;
      const imgY = 74;
      const imgW = 508;
      const imgH = 294;
      ctx.drawImage(previewImg, imgX, imgY, imgW, imgH);
      ctx.strokeStyle = screenTheme.accent;
      ctx.lineWidth = 2;
      ctx.strokeRect(imgX, imgY, imgW, imgH);

      // Verified facts on the left
      screenTheme.facts.forEach((fact, idx) => {
        const y = 160 + idx * 72;
        ctx.fillStyle = 'rgba(20, 27, 40, 0.94)';
        ctx.fillRect(30, y, 430, 58);
        ctx.strokeStyle = idx === 0 ? screenTheme.accent : 'rgba(243,239,230,0.14)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(30, y, 430, 58);

        ctx.fillStyle = '#828ea3';
        ctx.font = '13px monospace';
        ctx.fillText(fact.label, 46, y + 22);

        ctx.fillStyle = '#f3efe6';
        ctx.font = 'bold 20px monospace';
        ctx.fillText(fact.value, 46, y + 46);
      });

      // Bottom highlight strip
      ctx.fillStyle = 'rgba(17, 23, 35, 0.94)';
      ctx.fillRect(30, 392, 964, 90);
      ctx.strokeStyle = 'rgba(243,239,230,0.12)';
      ctx.strokeRect(30, 392, 964, 90);

      ctx.fillStyle = screenTheme.secondary;
      ctx.font = 'bold 14px monospace';
      ctx.fillText('VERIFIED HIGHLIGHTS', 48, 418);

      screenTheme.modules.slice(0, 2).forEach((mod, idx) => {
        ctx.fillStyle = '#d7deea';
        ctx.font = '15px sans-serif';
        ctx.fillText(`• ${mod}`, 48 + idx * 470, 456);
      });
    } else {
      // Clean architectural layout for projects without screenshots (zero fake terminal logs)
      ctx.fillStyle = '#f3efe6';
      ctx.font = 'bold 40px sans-serif';
      ctx.fillText(project.name.toUpperCase(), 32, 114);

      ctx.fillStyle = '#b7bfcf';
      ctx.font = '18px sans-serif';
      ctx.fillText(project.tagline.slice(0, 82), 32, 148);

      screenTheme.facts.forEach((fact, index) => {
        const x = 32 + index * 326;
        const y = 176;
        ctx.fillStyle = 'rgba(21, 28, 42, 0.92)';
        ctx.fillRect(x, y, 306, 78);
        ctx.strokeStyle = index === 0 ? screenTheme.accent : 'rgba(243,239,230,0.14)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(x, y, 306, 78);

        ctx.fillStyle = '#828ea3';
        ctx.font = '14px monospace';
        ctx.fillText(fact.label, x + 16, y + 28);

        ctx.fillStyle = '#f3efe6';
        ctx.font = 'bold 22px monospace';
        ctx.fillText(fact.value, x + 16, y + 58);
      });

      ctx.fillStyle = 'rgba(17, 23, 35, 0.94)';
      ctx.fillRect(32, 278, 960, 200);
      ctx.strokeStyle = 'rgba(243,239,230,0.12)';
      ctx.strokeRect(32, 278, 960, 200);

      ctx.fillStyle = screenTheme.secondary;
      ctx.font = 'bold 15px monospace';
      ctx.fillText('VERIFIED ARCHITECTURE & SCOPE', 54, 310);

      screenTheme.modules.forEach((mod, idx) => {
        const col = idx % 2;
        const row = Math.floor(idx / 2);
        const mx = 54 + col * 468;
        const my = 352 + row * 56;
        ctx.fillStyle = screenTheme.accent;
        ctx.fillRect(mx, my - 10, 8, 8);
        ctx.fillStyle = '#d7deea';
        ctx.font = '17px sans-serif';
        ctx.fillText(mod, mx + 20, my);
      });
    }

    if (this.transitionFlash > 0.01) {
      ctx.fillStyle = `rgba(240, 163, 82, ${this.transitionFlash * 0.22})`;
      const bandY = ((1 - this.transitionFlash) * 512) % 512;
      ctx.fillRect(0, bandY - 22, 1024, 44);
    }

    this.texture.needsUpdate = true;
  }

  public dispose(): void {
    this.texture.dispose();
  }
}

export class DynamicCommsDisplay {
  public readonly canvas: HTMLCanvasElement;
  public readonly texture: THREE.CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D;

  constructor() {
    const [canvas, ctx] = createCanvas(512, 256);
    this.canvas = canvas;
    this.ctx = ctx;
    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.update(0);
  }

  public update(time: number): void {
    const { ctx } = this;
    ctx.fillStyle = '#090d14';
    ctx.fillRect(0, 0, 512, 256);

    ctx.strokeStyle = 'rgba(56, 217, 169, 0.14)';
    ctx.lineWidth = 1;
    for (let y = 32; y < 256; y += 32) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    ctx.fillStyle = '#38d9a9';
    ctx.font = 'bold 15px monospace';
    ctx.fillText('COMMS // OPEN FOR COLLABORATION', 24, 38);

    ctx.fillStyle = '#f0a352';
    ctx.font = '13px monospace';
    ctx.fillText('GITHUB @jeiso-n  |  YT @jeison_muganzi', 24, 68);

    ctx.strokeStyle = '#38d9a9';
    ctx.lineWidth = 2.4;
    ctx.beginPath();
    for (let x = 24; x <= 488; x += 6) {
      const norm = (x - 24) / 464;
      const env = Math.sin(norm * Math.PI);
      const y =
        146 +
        Math.sin(x * 0.055 + time * 4.0) * 26 * env +
        Math.cos(x * 0.12 - time * 2.4) * 10 * env;
      if (x === 24) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#9aa5b8';
    ctx.font = '13px monospace';
    ctx.fillText('KAMPALA, UGANDA  •  EMAIL / SOCIALS', 24, 224);

    this.texture.needsUpdate = true;
  }

  public dispose(): void {
    this.texture.dispose();
  }
}

export function createYouTubeSignLabelTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(512, 96);
  ctx.fillStyle = '#121620';
  ctx.fillRect(0, 0, 512, 96);

  ctx.fillStyle = '#ff4d54';
  ctx.font = 'bold 26px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('YOUTUBE  •  @JEISON_MUGANZI', 256, 58);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
