import * as THREE from 'three';

export const HOLOGRAM_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float pulse = sin(pos.y * 5.0 - uTime * 2.4) * 0.012;
    pos += normal * pulse;
    vElevation = pos.y;

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vViewPosition = -mvPosition.xyz;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const HOLOGRAM_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColorPrimary;
  uniform vec3 uColorSecondary;
  uniform float uHover;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec2 vUv;
  varying float vElevation;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    float fresnel = pow(1.0 - abs(dot(normalize(vNormal), viewDir)), 2.2);
    float scanline = smoothstep(0.35, 0.95, sin(vElevation * 38.0 - uTime * 4.2) * 0.5 + 0.5);
    vec3 baseColor = mix(uColorPrimary, uColorSecondary, clamp(vElevation + 0.5, 0.0, 1.0));
    float alpha = clamp(0.18 + fresnel * 0.72 + scanline * 0.14 + uHover * 0.18, 0.0, 0.92);
    vec3 finalColor = baseColor * (1.05 + uHover * 0.45 + scanline * 0.25);
    gl_FragColor = vec4(finalColor, alpha);
  }
`;

export const STEAM_VERTEX_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 pos = position;
    float sway = sin(uv.y * 5.5 - uTime * 1.6) * 0.035 * uv.y;
    pos.x += sway;
    pos.z += cos(uv.y * 4.0 - uTime * 1.3) * 0.02 * uv.y;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

export const STEAM_FRAGMENT_SHADER = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    float edgeFade = smoothstep(0.0, 0.35, vUv.x) * smoothstep(1.0, 0.65, vUv.x);
    float verticalFade = smoothstep(0.0, 0.2, vUv.y) * smoothstep(1.0, 0.18, vUv.y);
    float wisp = sin(vUv.y * 10.0 - uTime * 2.1 + sin(vUv.x * 6.0)) * 0.5 + 0.5;
    float alpha = edgeFade * verticalFade * (0.12 + wisp * 0.16);
    gl_FragColor = vec4(vec3(0.95, 0.89, 0.8), alpha);
  }
`;

export function createHologramMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: HOLOGRAM_VERTEX_SHADER,
    fragmentShader: HOLOGRAM_FRAGMENT_SHADER,
    uniforms: {
      uTime: { value: 0 },
      uColorPrimary: { value: new THREE.Color('#38d9a9') },
      uColorSecondary: { value: new THREE.Color('#f0a352') },
      uHover: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    blending: THREE.AdditiveBlending,
  });
}

export function createSteamMaterial(): THREE.ShaderMaterial {
  return new THREE.ShaderMaterial({
    vertexShader: STEAM_VERTEX_SHADER,
    fragmentShader: STEAM_FRAGMENT_SHADER,
    uniforms: {
      uTime: { value: 0 },
    },
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}
