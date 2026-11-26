/**
 * Generative chill, calm ambient studio soundtrack & subtle tactile UI sound engine.
 * Synthesizes warm felt-piano chords, soft bass, sparse pentatonic echoes, and cozy room air
 * using Web Audio API with zero external audio downloads and clean autoplay compliance.
 */

interface ChordStep {
  bass: number;
  notes: number[];
  sparkle: number[];
}

// Slow, dreamy Cmaj9 -> Am9 -> Fmaj9 -> G6 progression (Hz)
const CHORD_PROGRESSION: ChordStep[] = [
  {
    bass: 65.41, // C2
    notes: [130.81, 196.0, 246.94, 293.66, 329.63], // C3, G3, B3, D4, E4
    sparkle: [523.25, 659.25, 587.33, 783.99], // C5, E5, D5, G5
  },
  {
    bass: 55.0, // A1
    notes: [110.0, 164.81, 196.0, 246.94, 261.63], // A2, E3, G3, B3, C4
    sparkle: [493.88, 523.25, 659.25, 440.0], // B4, C5, E5, A4
  },
  {
    bass: 87.31, // F2
    notes: [174.61, 220.0, 261.63, 329.63, 392.0], // F3, A3, C4, E4, G4
    sparkle: [523.25, 587.33, 659.25, 880.0], // C5, D5, E5, A5
  },
  {
    bass: 98.0, // G2
    notes: [146.83, 196.0, 246.94, 293.66, 329.63], // D3, G3, B3, D4, E4
    sparkle: [587.33, 493.88, 659.25, 783.99], // D5, B4, E5, G5
  },
];

const CHORD_INTERVAL_MS = 4400; // Calm, unhurried late-night tempo

export class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled = false;

  private musicMaster: GainNode | null = null;
  private echoInput: GainNode | null = null;
  private roomNoiseSource: AudioBufferSourceNode | null = null;
  private activeNodes: Set<AudioScheduledSourceNode> = new Set();

  private chordTimer: number | null = null;
  private sparkleTimers: number[] = [];
  private chordIndex = 0;
  private sparkleStep = 0;

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!this.ctx) {
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume().catch(() => {
        // Ignore autoplay rejection in restricted/headless contexts
      });
    }
    return this.ctx;
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public setEnabled(next: boolean, playChime = true): void {
    if (this.enabled === next) return;
    this.enabled = next;
    if (next) {
      this.startAmbientMusic();
      if (playChime) {
        this.playSelect();
      }
    } else {
      this.stopAmbientMusic();
    }
  }

  public playHover(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, now);
    osc.frequency.exponentialRampToValueAtTime(660, now + 0.045);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.018, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.065);
  }

  public playSelect(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(392, now);
    osc.frequency.exponentialRampToValueAtTime(587.33, now + 0.09);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.032, now + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  public playWhoosh(): void {
    if (!this.enabled) return;
    const ctx = this.ensureContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const bufferSize = Math.floor(ctx.sampleRate * 0.36);
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      data[i] = (Math.random() * 2 - 1) * Math.sin((i / bufferSize) * Math.PI);
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(220, now);
    filter.frequency.exponentialRampToValueAtTime(640, now + 0.18);
    filter.frequency.exponentialRampToValueAtTime(240, now + 0.36);
    filter.Q.value = 1.4;

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.028, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.36);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  }

  private startAmbientMusic(): void {
    const ctx = this.ensureContext();
    if (!ctx || this.musicMaster) return;

    const now = ctx.currentTime;

    // Master bus with smooth 2.2s fade-in
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.linearRampToValueAtTime(0.24, now + 2.2);

    // Warm master tone filter so ambience always sits calmly behind the UI
    const masterTone = ctx.createBiquadFilter();
    masterTone.type = 'lowpass';
    masterTone.frequency.value = 2200;
    masterTone.Q.value = 0.6;

    masterTone.connect(master);
    master.connect(ctx.destination);

    // Lush warm echo/space bus
    const echoIn = ctx.createGain();
    echoIn.gain.value = 1;

    const delayL = ctx.createDelay(1.0);
    delayL.delayTime.value = 0.44;
    const delayFilter = ctx.createBiquadFilter();
    delayFilter.type = 'lowpass';
    delayFilter.frequency.value = 1150;

    const feedback = ctx.createGain();
    feedback.gain.value = 0.34;

    const wetGain = ctx.createGain();
    wetGain.gain.value = 0.42;

    echoIn.connect(masterTone); // dry
    echoIn.connect(delayL);
    delayL.connect(delayFilter);
    delayFilter.connect(feedback);
    feedback.connect(delayL);
    delayFilter.connect(wetGain);
    wetGain.connect(masterTone);

    this.musicMaster = master;
    this.echoInput = echoIn;

    // Subtle warm room-air / distant rain texture
    this.startRoomAmbience(ctx, masterTone);

    // Trigger first warm chord immediately, then schedule calm loop
    this.playChordCycle();
    this.chordTimer = window.setInterval(() => {
      if (this.enabled) {
        this.playChordCycle();
      }
    }, CHORD_INTERVAL_MS);
  }

  private startRoomAmbience(ctx: AudioContext, destination: AudioNode): void {
    const seconds = 4;
    const length = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Pink-ish noise smoothing for warm rain/room floor
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      b0 = 0.997 * b0 + white * 0.029;
      b1 = 0.985 * b1 + white * 0.032;
      b2 = 0.95 * b2 + white * 0.048;
      data[i] = (b0 + b1 + b2) * 0.25;
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 380;

    const gain = ctx.createGain();
    gain.gain.value = 0.045;

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(destination);
    noise.start();
    this.roomNoiseSource = noise;
  }

  private trackNode(node: AudioScheduledSourceNode): void {
    this.activeNodes.add(node);
    node.onended = () => {
      this.activeNodes.delete(node);
    };
  }

  private playChordCycle(): void {
    if (!this.ctx || !this.echoInput || !this.enabled) return;
    const ctx = this.ctx;
    const dest = this.echoInput;
    const now = ctx.currentTime;
    const chord = CHORD_PROGRESSION[this.chordIndex % CHORD_PROGRESSION.length];
    this.chordIndex += 1;

    // 1. Soft sub-bass root foundation
    const bassOsc = ctx.createOscillator();
    const bassFilter = ctx.createBiquadFilter();
    const bassGain = ctx.createGain();
    bassOsc.type = 'sine';
    bassOsc.frequency.setValueAtTime(chord.bass, now);
    bassFilter.type = 'lowpass';
    bassFilter.frequency.value = 210;

    bassGain.gain.setValueAtTime(0.0001, now);
    bassGain.gain.linearRampToValueAtTime(0.22, now + 0.9);
    bassGain.gain.setValueAtTime(0.18, now + 3.1);
    bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.2);

    bassOsc.connect(bassFilter);
    bassFilter.connect(bassGain);
    bassGain.connect(dest);
    bassOsc.start(now);
    bassOsc.stop(now + 5.3);
    this.trackNode(bassOsc);

    // 2. Warm felt-piano / electric pad chord voices
    chord.notes.forEach((freq, idx) => {
      const start = now + idx * 0.075; // Gentle human arpeggiated roll
      const osc = ctx.createOscillator();
      const harmonic = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, start);
      osc.detune.value = (idx % 2 === 0 ? 1 : -1) * 3.5;

      harmonic.type = 'sine';
      harmonic.frequency.setValueAtTime(freq * 2, start);
      harmonic.detune.value = -2;

      const harmonicGain = ctx.createGain();
      harmonicGain.gain.value = 0.14;

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(480, start);
      filter.frequency.linearRampToValueAtTime(1050, start + 1.1);
      filter.frequency.exponentialRampToValueAtTime(520, start + 4.8);

      const peak = 0.082 / Math.sqrt(chord.notes.length);
      gain.gain.setValueAtTime(0.0001, start);
      gain.gain.linearRampToValueAtTime(peak, start + 0.85);
      gain.gain.exponentialRampToValueAtTime(peak * 0.55, start + 3.0);
      gain.gain.exponentialRampToValueAtTime(0.0001, start + 5.1);

      osc.connect(filter);
      harmonic.connect(harmonicGain);
      harmonicGain.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(start);
      harmonic.start(start);
      osc.stop(start + 5.25);
      harmonic.stop(start + 5.25);
      this.trackNode(osc);
      this.trackNode(harmonic);
    });

    // 3. Delicate sparse kalimba/bell melody notes floating above the chord
    const sparkleDelays = [1100, 2650];
    sparkleDelays.forEach((delayMs, slot) => {
      const timerId = window.setTimeout(() => {
        if (!this.enabled || !this.ctx || !this.echoInput) return;
        const noteFreq = chord.sparkle[(this.sparkleStep + slot) % chord.sparkle.length];
        this.playCalmPluck(noteFreq);
      }, delayMs);
      this.sparkleTimers.push(timerId);
    });
    this.sparkleStep += 1;
  }

  private playCalmPluck(freq: number): void {
    if (!this.ctx || !this.echoInput) return;
    const ctx = this.ctx;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1750, now);
    filter.frequency.exponentialRampToValueAtTime(640, now + 1.8);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.042, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.echoInput);

    osc.start(now);
    osc.stop(now + 2.3);
    this.trackNode(osc);
  }

  private clearTimers(): void {
    if (this.chordTimer !== null) {
      window.clearInterval(this.chordTimer);
      this.chordTimer = null;
    }
    this.sparkleTimers.forEach((id) => window.clearTimeout(id));
    this.sparkleTimers = [];
  }

  private stopAmbientMusic(): void {
    this.clearTimers();
    if (!this.ctx || !this.musicMaster) return;

    const now = this.ctx.currentTime;
    const master = this.musicMaster;
    const roomNoise = this.roomNoiseSource;
    const active = Array.from(this.activeNodes);

    this.musicMaster = null;
    this.echoInput = null;
    this.roomNoiseSource = null;
    this.activeNodes.clear();

    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, 0.0001), now);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.65);

    window.setTimeout(() => {
      try {
        roomNoise?.stop();
        roomNoise?.disconnect();
      } catch {
        // Ignore already stopped noise source
      }
      active.forEach((node) => {
        try {
          node.stop();
          node.disconnect();
        } catch {
          // Ignore already stopped oscillators
        }
      });
      master.disconnect();
    }, 720);
  }

  public dispose(): void {
    this.enabled = false;
    this.stopAmbientMusic();
    if (this.ctx) {
      void this.ctx.close();
      this.ctx = null;
    }
  }
}
