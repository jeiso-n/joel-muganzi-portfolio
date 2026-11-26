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

  // Subtle architectural tile seams
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

  // Deterministic mineral flecks
  const palette = ['rgba(240,163,82,0.16)', 'rgba(243,239,230,0.08)', 'rgba(56,217,169,0.09)', 'rgba(30,39,54,0.65)'];
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

  // Woven horizontal fibers
  for (let y = 0; y < 512; y += 4) {
    ctx.fillStyle = y % 8 === 0 ? 'rgba(243,239,230,0.035)' : 'rgba(9,12,18,0.12)';
    ctx.fillRect(0, y, 512, 2);
  }

  // Minimal architectural framing lines
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

  // Center crease shadow
  const crease = ctx.createLinearGradient(236, 0, 276, 0);
  crease.addColorStop(0, 'rgba(30,24,18,0)');
  crease.addColorStop(0.5, 'rgba(30,24,18,0.22)');
  crease.addColorStop(1, 'rgba(30,24,18,0)');
  ctx.fillStyle = crease;
  ctx.fillRect(236, 0, 40, 340);

  // Dotted engineering grid
  ctx.fillStyle = 'rgba(28, 34, 46, 0.16)';
  for (let x = 22; x < 495; x += 18) {
    for (let y = 24; y < 320; y += 18) {
      if (Math.abs(x - 256) < 16) continue;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  // Left page heading & philosophy notes
  ctx.fillStyle = '#18202c';
  ctx.font = 'bold 16px monospace';
  ctx.fillText('FIELD NOTES // 02', 26, 46);
  ctx.fillStyle = '#c46f1f';
  ctx.fillRect(26, 54, 110, 2.5);

  ctx.fillStyle = '#2d3748';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillText('JOEL MUGANZI', 26, 84);
  ctx.font = '11px monospace';
  ctx.fillStyle = '#4a5568';
  ctx.fillText('KAMPALA, UGANDA', 26, 102);
  ctx.fillText('BUILD -> VALIDATE -> SHIP', 26, 128);

  // Sketched notes lines
  ctx.strokeStyle = 'rgba(32, 41, 56, 0.38)';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 7; i += 1) {
    const y = 156 + i * 20;
    ctx.beginPath();
    ctx.moveTo(26, y);
    ctx.lineTo(190 + ((i * 29) % 34), y);
    ctx.stroke();
  }

  // Right page wireframe diagram
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
  ctx.fillText('CLIENT', 318, 93);
  ctx.fillText('ENGINE', 406, 93);
  ctx.fillText('REAL USERS FIRST', 292, 168);

  for (let i = 0; i < 5; i += 1) {
    const y = 192 + i * 22;
    ctx.strokeStyle = 'rgba(32, 41, 56, 0.34)';
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

  // Soft stars
  ctx.fillStyle = 'rgba(243, 239, 230, 0.65)';
  for (let i = 0; i < 42; i += 1) {
    const x = (i * 97 + 19) % 500;
    const y = (i * 53 + 11) % 210;
    const size = i % 5 === 0 ? 2 : 1.1;
    ctx.fillRect(x, y, size, size);
  }

  // Stylized distant Kampala hills
  ctx.fillStyle = '#121521';
  ctx.beginPath();
  ctx.moveTo(0, 512);
  ctx.lineTo(0, 392);
  ctx.quadraticCurveTo(120, 344, 240, 378);
  ctx.quadraticCurveTo(360, 405, 512, 355);
  ctx.lineTo(512, 512);
  ctx.closePath();
  ctx.fill();

  // Architectural skyline silhouettes
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
    // Warm lit office/city windows
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
  ctx.font = 'bold 19px monospace';
  ctx.fillText('KAMPALA // DIGITAL WORKSHOP', 42, 76);

  ctx.fillStyle = '#f3efe6';
  ctx.font = 'bold 34px sans-serif';
  ctx.fillText('BUILD USEFUL', 42, 134);
  ctx.fillText('SOFTWARE.', 42, 178);

  ctx.fillStyle = '#38d9a9';
  ctx.font = '15px monospace';
  ctx.fillText('VALIDATE  •  DEPLOY  •  ITERATE', 42, 214);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function createSideCodeTexture(): THREE.CanvasTexture {
  const [canvas, ctx] = createCanvas(384, 640);
  ctx.fillStyle = '#0b1018';
  ctx.fillRect(0, 0, 384, 640);

  // Header bar
  ctx.fillStyle = '#141c2b';
  ctx.fillRect(0, 0, 384, 44);
  ctx.fillStyle = '#f0a352';
  ctx.beginPath();
  ctx.arc(24, 22, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#38d9a9';
  ctx.beginPath();
  ctx.arc(42, 22, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#8b95a8';
  ctx.font = '13px monospace';
  ctx.fillText('workshop.engine.ts', 66, 27);

  const lines = [
    ['#6384ff', 'export interface WorkshopStation {'],
    ['#f3efe6', '  id: StationId;'],
    ['#f3efe6', '  status: "ready" | "active";'],
    ['#6384ff', '}'],
    ['#7f8a9f', ''],
    ['#7f8a9f', '// Verified build systems'],
    ['#38d9a9', 'const stack = ['],
    ['#f0a352', '  "Java 21 / Spring Boot 4",'],
    ['#f0a352', '  "Python / PySide6 / FFmpeg",'],
    ['#f0a352', '  "TypeScript / Fastify / React",'],
    ['#f0a352', '  "Flutter / SQLite / ML Kit",'],
    ['#38d9a9', '];'],
    ['#7f8a9f', ''],
    ['#6384ff', 'function shipProduct(idea: Problem) {'],
    ['#f3efe6', '  const mvp = prototype(idea);'],
    ['#f3efe6', '  verify(mvp, { automated: true });'],
    ['#38d9a9', '  return deployAndIterate(mvp);'],
    ['#6384ff', '}'],
    ['#7f8a9f', ''],
    ['#7f8a9f', '// Studio telemetry'],
    ['#38d9a9', 'TESTS   PASSING'],
    ['#f0a352', 'LOCATION KAMPALA, UG'],
    ['#6384ff', 'CHANNEL  youtube/@jeiso_n'],
  ];

  ctx.font = '14px monospace';
  lines.forEach(([color, text], idx) => {
    ctx.fillStyle = 'rgba(127, 138, 159, 0.35)';
    ctx.fillText(String(idx + 1).padStart(2, '0'), 14, 78 + idx * 23);
    ctx.fillStyle = color;
    ctx.fillText(text, 46, 78 + idx * 23);
  });

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export class DynamicMonitorDisplay {
  public readonly canvas: HTMLCanvasElement;
  public readonly texture: THREE.CanvasTexture;
  private readonly ctx: CanvasRenderingContext2D;
  private project: ProjectRecord;
  private glitchStrength = 0;

  constructor(initialProject: ProjectRecord) {
    const [canvas, ctx] = createCanvas(1024, 512);
    this.canvas = canvas;
    this.ctx = ctx;
    this.project = initialProject;
    this.texture = new THREE.CanvasTexture(canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.render(0);
  }

  public setProject(project: ProjectRecord): void {
    this.project = project;
    this.glitchStrength = 1;
    this.render(0);
  }

  public update(elapsedTime: number, delta: number): void {
    if (this.glitchStrength > 0) {
      this.glitchStrength = Math.max(0, this.glitchStrength - delta * 2.8);
    }
    this.render(elapsedTime);
  }

  private render(time: number): void {
    const { ctx, project } = this;
    const { screenTheme } = project;

    // Background
    ctx.fillStyle = '#090d15';
    ctx.fillRect(0, 0, 1024, 512);

    // Subtle blueprint grid
    ctx.strokeStyle = 'rgba(243, 239, 230, 0.04)';
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

    // Top studio bar
    ctx.fillStyle = '#111826';
    ctx.fillRect(0, 0, 1024, 56);
    ctx.fillStyle = screenTheme.accent;
    ctx.fillRect(0, 54, 1024, 2);

    ctx.fillStyle = screenTheme.accent;
    ctx.font = 'bold 18px monospace';
    ctx.fillText(`STATION 01 // ${screenTheme.badge}`, 28, 35);

    ctx.fillStyle = '#9aa5b8';
    ctx.font = '16px monospace';
    ctx.fillText(`PROJECT ${project.index} OF 04`, 825, 35);

    // Main title
    ctx.fillStyle = '#f3efe6';
    ctx.font = 'bold 42px sans-serif';
    ctx.fillText(project.name.toUpperCase(), 32, 118);

    ctx.fillStyle = '#b7bfcf';
    ctx.font = '19px sans-serif';
    ctx.fillText(project.tagline.slice(0, 84), 32, 152);

    // Metric boxes
    screenTheme.metrics.forEach((metric, index) => {
      const x = 32 + index * 326;
      const y = 178;
      ctx.fillStyle = 'rgba(21, 28, 42, 0.92)';
      ctx.fillRect(x, y, 306, 78);
      ctx.strokeStyle = index === 0 ? screenTheme.accent : 'rgba(243,239,230,0.14)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(x, y, 306, 78);

      ctx.fillStyle = '#828ea3';
      ctx.font = '14px monospace';
      ctx.fillText(metric.label, x + 16, y + 28);

      ctx.fillStyle = '#f3efe6';
      ctx.font = 'bold 24px monospace';
      ctx.fillText(metric.value, x + 16, y + 60);
    });

    // Left modules list
    ctx.fillStyle = 'rgba(17, 23, 35, 0.92)';
    ctx.fillRect(32, 278, 492, 200);
    ctx.strokeStyle = 'rgba(243,239,230,0.12)';
    ctx.strokeRect(32, 278, 492, 200);

    ctx.fillStyle = screenTheme.secondary;
    ctx.font = 'bold 15px monospace';
    ctx.fillText('VERIFIED ARCHITECTURE MODULES', 50, 308);

    screenTheme.modules.forEach((mod, idx) => {
      ctx.fillStyle = screenTheme.accent;
      ctx.fillRect(50, 330 + idx * 34, 8, 8);
      ctx.fillStyle = '#d7deea';
      ctx.font = '16px sans-serif';
      ctx.fillText(mod, 70, 340 + idx * 34);
    });

    // Right terminal & live pulse waveform
    ctx.fillStyle = '#070a10';
    ctx.fillRect(546, 278, 446, 200);
    ctx.strokeStyle = 'rgba(243,239,230,0.12)';
    ctx.strokeRect(546, 278, 446, 200);

    ctx.fillStyle = screenTheme.accent;
    ctx.font = 'bold 14px monospace';
    ctx.fillText('SYSTEM TELEMETRY', 566, 308);

    ctx.font = '14px monospace';
    screenTheme.codeSnippet.forEach((line, idx) => {
      ctx.fillStyle = idx === 2 ? screenTheme.secondary : '#b7bfcf';
      ctx.fillText(line.slice(0, 48), 566, 340 + idx * 28);
    });

    // Animated signal wave inside monitor
    ctx.strokeStyle = screenTheme.accent;
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    for (let i = 0; i <= 400; i += 8) {
      const px = 566 + i;
      const py = 445 + Math.sin(i * 0.045 + time * 4.2) * 12 * Math.sin((i / 400) * Math.PI);
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();

    // Scanline transition flash on project switch
    if (this.glitchStrength > 0.01) {
      ctx.fillStyle = `rgba(240, 163, 82, ${this.glitchStrength * 0.24})`;
      const bandY = ((1 - this.glitchStrength) * 512) % 512;
      ctx.fillRect(0, bandY - 26, 1024, 52);
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
    ctx.font = 'bold 16px monospace';
    ctx.fillText('COMMS // OPEN FOR COLLABORATION', 24, 38);

    ctx.fillStyle = '#f0a352';
    ctx.font = '14px monospace';
    ctx.fillText('GITHUB @jeiso-n   |   YT @jeiso_n', 24, 68);

    // Live audio / radio carrier wave
    ctx.strokeStyle = '#38d9a9';
    ctx.lineWidth = 2.6;
    ctx.beginPath();
    for (let x = 24; x <= 488; x += 6) {
      const norm = (x - 24) / 464;
      const env = Math.sin(norm * Math.PI);
      const y =
        146 +
        Math.sin(x * 0.055 + time * 4.5) * 30 * env +
        Math.cos(x * 0.12 - time * 2.8) * 11 * env;
      if (x === 24) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#9aa5b8';
    ctx.font = '13px monospace';
    ctx.fillText('KAMPALA STUDIO  •  SIGNAL LOCKED', 24, 224);

    this.texture.needsUpdate = true;
  }

  public dispose(): void {
    this.texture.dispose();
  }
}
