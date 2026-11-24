// Web Audio API high-fidelity procedural sound effects for Floresta do Saber
// Includes realistic Panthera onca (Onça-Pintada) esturro/roar synthesis,
// rich tactile UI feedback, Brazilian fauna guardians audio, and ambient rainforest soundscape.

class SoundManager {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public ambientEnabled: boolean = false;

  // Ambient sound system
  public ambientVolume: number = 0.45;
  private ambientGain: GainNode | null = null;
  private ambientTimer: number | null = null;
  private ambientNodes: AudioNode[] = [];
  private breezeBuffer: AudioBuffer | null = null;

  // Cached buffers for zero-latency realistic animal vocalizations
  private jaguarBuffer: AudioBuffer | null = null;
  private isGeneratingJaguar = false;

  constructor() {
    // Automatically register audio unlock on first user gesture
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockAudio();
        ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
          window.removeEventListener(evt, unlock);
        });
      };
      ['pointerdown', 'touchstart', 'click', 'keydown'].forEach((evt) => {
        window.addEventListener(evt, unlock, { once: true, passive: true });
      });
    }
  }

  /**
   * Safe AudioContext getter with automatic unlock & resume
   */
  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return null;
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }

      return this.ctx;
    } catch {
      return null;
    }
  }

  /**
   * Ensures AudioContext is actively running before scheduling timed audio nodes
   */
  private withRunningContext(callback: (ctx: AudioContext) => void): void {
    const ctx = this.getContext();
    if (!ctx) return;

    if (ctx.state === 'running') {
      callback(ctx);
    } else {
      ctx
        .resume()
        .then(() => {
          if (ctx.state === 'running') {
            callback(ctx);
          }
        })
        .catch(() => {});
    }
  }

  /**
   * Unlock AudioContext upon user gesture
   */
  public unlockAudio() {
    try {
      const ctx = this.getContext();
      if (ctx && ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }
      // Pre-warm the jaguar roar buffer in background
      if (ctx && !this.jaguarBuffer && !this.isGeneratingJaguar) {
        this.getJaguarBuffer(ctx);
      }
    } catch {
      // ignore
    }
  }

  /**
   * Generate an authentic, realistic Panthera onca (Onça-Pintada) roar buffer.
   * Uses proper instantaneous phase integration (preventing metallic FM artifacts)
   * and lowpass-filtered breath turbulence for a deep, natural feline "esturro".
   */
  private getJaguarBuffer(ctx: AudioContext): AudioBuffer {
    if (this.jaguarBuffer) return this.jaguarBuffer;
    this.isGeneratingJaguar = true;

    const sampleRate = ctx.sampleRate || 22050;
    const duration = 2.4;
    const numSamples = Math.floor(sampleRate * duration);
    const audioBuffer = ctx.createBuffer(1, numSamples, sampleRate);
    const channelData = audioBuffer.getChannelData(0);

    let phase = 0;
    let subPhase = 0;
    let filteredBreath = 0;

    for (let i = 0; i < numSamples; i++) {
      const t = i / sampleRate;

      let env = 0;
      let pitch = 68;
      let raspMix = 0.34;
      let flutterRate = 28;

      if (t < 0.32) {
        // Phase 1: Deep chest growl inhalation (0.0s - 0.32s)
        const p = t / 0.32;
        env = 0.45 * Math.sin(p * Math.PI * 0.5);
        pitch = 56 + 14 * p;
        flutterRate = 23;
        raspMix = 0.36;
      } else if (t < 1.52) {
        // Phase 2: Main guttural esturro surge (0.32s - 1.52s)
        const p = (t - 0.32) / 1.2;
        const surge = Math.sin(p * Math.PI);
        const subSurge = 0.25 * Math.sin(p * Math.PI * 3);
        env = 0.95 * Math.max(0, surge + subSurge);
        pitch = 68 + 34 * Math.sin(p * Math.PI * 0.85) - 16 * p;
        flutterRate = 29 + 7 * Math.sin(p * Math.PI);
        raspMix = 0.5;
      } else if (t < 2.02) {
        // Phase 3: Secondary guttural cough-grunt (1.52s - 2.02s)
        const p = (t - 1.52) / 0.5;
        env = 0.72 * Math.sin(p * Math.PI);
        pitch = 62 - 20 * p;
        flutterRate = 21;
        raspMix = 0.38;
      } else {
        // Phase 4: Low decaying chest tail (2.02s - 2.4s)
        const p = (t - 2.02) / 0.38;
        env = 0.35 * Math.max(0, 1 - p);
        pitch = 46;
        flutterRate = 17;
        raspMix = 0.28;
      }

      // Smooth phase integration for clean, non-aliased frequency sweeps
      phase += (2 * Math.PI * pitch) / sampleRate;
      subPhase += (2 * Math.PI * (pitch * 0.5)) / sampleRate;

      // Vocal fold flutter (organic larynx tremor)
      const flutter = 1.0 + 0.62 * Math.sin(2 * Math.PI * flutterRate * t);

      // Rich biological vocal harmonics + chest sub-bass
      const h1 = Math.sin(phase);
      const h2 = 0.72 * Math.sin(phase * 2);
      const h3 = 0.46 * Math.sin(phase * 3);
      const h4 = 0.26 * Math.sin(phase * 4);
      const subChest = 0.82 * Math.sin(subPhase);

      let larynx = (h1 + h2 + h3 + h4 + subChest) / 2.55;
      larynx = Math.tanh(larynx * 2.1);

      // Lowpass-filtered breath noise (warm air rasp, not harsh static)
      const white = Math.random() * 2 - 1;
      filteredBreath = 0.76 * filteredBreath + 0.24 * white;

      const sample = env * ((1 - raspMix) * larynx * flutter + raspMix * filteredBreath * flutter * 1.45);
      channelData[i] = Math.max(-0.95, Math.min(0.95, sample * 1.25));
    }

    this.jaguarBuffer = audioBuffer;
    this.isGeneratingJaguar = false;
    return audioBuffer;
  }

  // ==========================================
  // UI & FEEDBACK SOUNDS
  // ==========================================

  /**
   * Crisp, tactile pop click for button taps
   */
  public playClick() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.07);

      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch {
      // Audio context might be restricted
    }
  }

  /**
   * Tactile whoosh/swish paper flip sound for flashcards
   */
  public playCardFlip() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Filtered noise swoosh
      const bufferSize = Math.floor(ctx.sampleRate * 0.12);
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, now);
      filter.frequency.exponentialRampToValueAtTime(1400, now + 0.08);
      filter.Q.value = 2.0;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(now);
      whiteNoise.stop(now + 0.12);
    } catch {
      // ignore
    }
  }

  /**
   * Harmonious, uplifting chime for correct quiz answers and completed tasks
   */
  public playSuccess() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // C5, E5, G5, C6 uplifting arpeggio with warm harmonics
      const chord = [
        { freq: 523.25, time: 0.0 },
        { freq: 659.25, time: 0.07 },
        { freq: 783.99, time: 0.14 },
        { freq: 1046.5, time: 0.22 },
      ];

      chord.forEach(({ freq, time }) => {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const overtone = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + time);

        overtone.type = 'triangle';
        overtone.frequency.setValueAtTime(freq * 2, now + time);

        gain.gain.setValueAtTime(0.2, now + time);
        gain.gain.exponentialRampToValueAtTime(0.001, now + time + 0.38);

        osc.connect(gain);
        overtone.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + time);
        overtone.start(now + time);
        osc.stop(now + time + 0.4);
        overtone.stop(now + time + 0.4);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Friendly, low-impact buzz for incorrect answers
   */
  public playError() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.exponentialRampToValueAtTime(140, now + 0.18);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, now);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.25);
    } catch {
      // ignore
    }
  }

  /**
   * Celebratory victory fanfare when unlocking levels and badges
   */
  public playLevelUp() {
    if (!this.soundEnabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;
      const now = ctx.currentTime;

      // Glorious fanfare notes: D5, F#5, A5, D6, E6
      const fanfare = [
        { freq: 587.33, start: 0.0, dur: 0.18 },
        { freq: 739.99, start: 0.1, dur: 0.18 },
        { freq: 880.0, start: 0.2, dur: 0.2 },
        { freq: 1174.66, start: 0.32, dur: 0.5 },
      ];

      fanfare.forEach(({ freq, start, dur }) => {
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const shimmer = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + start);

        shimmer.type = 'sine';
        shimmer.frequency.setValueAtTime(freq * 1.5, now + start);

        gain.gain.setValueAtTime(0.22, now + start);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);

        osc.connect(gain);
        shimmer.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + start);
        shimmer.start(now + start);
        osc.stop(now + start + dur);
        shimmer.stop(now + start + dur);
      });
    } catch {
      // ignore
    }
  }

  // ==========================================
  // MASCOTE ONÇA-PINTADA (GUILHERME) & ANIMAL SOUNDS
  // ==========================================

  /**
   * Plays the mighty, authentic Jaguar Roar ("O Esturro da Onça-Pintada")
   */
  public playMascotRoar(): number {
    if (!this.soundEnabled) return 0;
    try {
      this.withRunningContext((ctx) => {
        const now = ctx.currentTime;
        const buffer = this.getJaguarBuffer(ctx);

        const source = ctx.createBufferSource();
        source.buffer = buffer;

        const lowFilter = ctx.createBiquadFilter();
        lowFilter.type = 'lowshelf';
        lowFilter.frequency.setValueAtTime(95, now);
        lowFilter.gain.setValueAtTime(6.0, now);

        const midFilter = ctx.createBiquadFilter();
        midFilter.type = 'peaking';
        midFilter.frequency.setValueAtTime(460, now);
        midFilter.gain.setValueAtTime(3.2, now);
        midFilter.Q.value = 1.6;

        const highCut = ctx.createBiquadFilter();
        highCut.type = 'lowpass';
        highCut.frequency.setValueAtTime(2400, now);

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.9, now);

        source.connect(lowFilter);
        lowFilter.connect(midFilter);
        midFilter.connect(highCut);
        highCut.connect(masterGain);
        masterGain.connect(ctx.destination);

        source.start(now);
      });

      return 2400;
    } catch {
      return 0;
    }
  }

  /**
   * Helper: creates a short filtered noise buffer for splashes, wingbeats, and breaths
   */
  private createNoiseBuffer(ctx: AudioContext, durationSec: number): AudioBuffer {
    const length = Math.max(1, Math.floor(ctx.sampleRate * durationSec));
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  /**
   * Play characteristic vocalizations & habitat sounds for all 12 Brazilian fauna guardians
   * Returns sound duration in milliseconds for UI synchronization.
   */
  public playAnimalSound(animalKey: string): number {
    if (!this.soundEnabled) return 0;
    try {
      const key = animalKey.toLowerCase();

      // 1. Matemática / Mascote Principal -> Onça-pintada (Panthera onca)
      if (key.includes('onca') || key.includes('onça') || key.includes('guilherme') || key.includes('matematica')) {
        return this.playMascotRoar();
      }

      // 2. Artes -> Uirapuru (Cyphorhinus arada) — Melodic Amazonian flute song
      if (key.includes('uirapuru') || key.includes('artes')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;
          const phrase = [
            { freq: 1318.5, glideTo: 1396.9, start: 0.0, dur: 0.24 },
            { freq: 1567.98, glideTo: 1661.2, start: 0.28, dur: 0.22 },
            { freq: 1975.5, glideTo: 2093.0, start: 0.54, dur: 0.32 },
            { freq: 1760.0, glideTo: 1567.98, start: 0.92, dur: 0.28 },
            { freq: 1318.5, glideTo: 1174.66, start: 1.24, dur: 0.55 },
          ];

          phrase.forEach((note) => {
            const osc = ctx.createOscillator();
            const overtone = ctx.createOscillator();
            const vibrato = ctx.createOscillator();
            const vibGain = ctx.createGain();
            const gain = ctx.createGain();
            const echoGain = ctx.createGain();

            osc.type = 'sine';
            overtone.type = 'triangle';
            const t = now + note.start;

            osc.frequency.setValueAtTime(note.freq, t);
            osc.frequency.exponentialRampToValueAtTime(note.glideTo, t + note.dur);

            overtone.frequency.setValueAtTime(note.freq * 2, t);
            overtone.frequency.exponentialRampToValueAtTime(note.glideTo * 2, t + note.dur);

            vibrato.frequency.setValueAtTime(5.8, t);
            vibGain.gain.setValueAtTime(14, t);
            vibrato.connect(vibGain);
            vibGain.connect(osc.frequency);

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.22, t + 0.035);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur);

            // Soft forest canopy echo
            echoGain.gain.setValueAtTime(0.0001, t + 0.14);
            echoGain.gain.linearRampToValueAtTime(0.06, t + 0.17);
            echoGain.gain.exponentialRampToValueAtTime(0.0001, t + note.dur + 0.18);

            osc.connect(gain);
            overtone.connect(echoGain);
            gain.connect(ctx.destination);
            echoGain.connect(ctx.destination);

            osc.start(t);
            overtone.start(t);
            vibrato.start(t);
            osc.stop(t + note.dur + 0.05);
            overtone.stop(t + note.dur + 0.22);
            vibrato.stop(t + note.dur + 0.05);
          });
        });
        return 1950;
      }

      // 3. Biologia -> Rã-de-vidro (Centrolenidae) — Crisp nocturnal glass-frog ribbit
      if (key.includes('biologia') || key.includes('vidro') || key.includes('ra-de') || key.includes('rã')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;
          const calls = [0.0, 0.34, 0.72];

          calls.forEach((offset, idx) => {
            const t = now + offset;
            // High resonant cricket-like frog pulse ("ribb-it!")
            [0, 0.09].forEach((sub, subIdx) => {
              const st = t + sub;
              const osc = ctx.createOscillator();
              const throat = ctx.createOscillator();
              const filter = ctx.createBiquadFilter();
              const gain = ctx.createGain();

              osc.type = 'sawtooth';
              const baseFreq = idx === 2 ? 2500 : 2250;
              const startF = subIdx === 0 ? baseFreq : baseFreq + 400;
              const endF = subIdx === 0 ? baseFreq + 750 : baseFreq + 1150;

              osc.frequency.setValueAtTime(startF, st);
              osc.frequency.exponentialRampToValueAtTime(endF, st + 0.065);

              throat.type = 'sine';
              throat.frequency.setValueAtTime(320, st);
              throat.frequency.exponentialRampToValueAtTime(520, st + 0.065);

              filter.type = 'bandpass';
              filter.frequency.setValueAtTime(2700, st);
              filter.Q.value = 3.2;

              gain.gain.setValueAtTime(0.0001, st);
              gain.gain.linearRampToValueAtTime(0.24, st + 0.012);
              gain.gain.exponentialRampToValueAtTime(0.0001, st + 0.075);

              osc.connect(filter);
              filter.connect(gain);
              throat.connect(gain);
              gain.connect(ctx.destination);

              osc.start(st);
              throat.start(st);
              osc.stop(st + 0.085);
              throat.stop(st + 0.085);
            });
          });
        });
        return 1250;
      }

      // 4. Espanhol -> Macaco-de-cheiro (Saimiri) — Playful rapid monkey chirps & chatter
      if (key.includes('espanhol') || key.includes('macaco')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;
          const chirps = [
            { start: 0.0, dur: 0.11, f1: 1950, f2: 3300, f3: 2400 },
            { start: 0.14, dur: 0.1, f1: 2200, f2: 3600, f3: 2600 },
            { start: 0.27, dur: 0.12, f1: 2400, f2: 3900, f3: 2850 },
            { start: 0.45, dur: 0.16, f1: 2050, f2: 3450, f3: 2100 },
            { start: 0.66, dur: 0.22, f1: 2600, f2: 4100, f3: 1850 },
          ];

          chirps.forEach((c) => {
            const t = now + c.start;
            const osc = ctx.createOscillator();
            const mod = ctx.createOscillator();
            const modGain = ctx.createGain();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(c.f1, t);
            osc.frequency.exponentialRampToValueAtTime(c.f2, t + c.dur * 0.45);
            osc.frequency.exponentialRampToValueAtTime(c.f3, t + c.dur);

            mod.frequency.setValueAtTime(34, t);
            modGain.gain.setValueAtTime(110, t);
            mod.connect(modGain);
            modGain.connect(osc.frequency);

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.22, t + 0.018);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + c.dur);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            mod.start(t);
            osc.stop(t + c.dur + 0.02);
            mod.stop(t + c.dur + 0.02);
          });
        });
        return 1150;
      }

      // 5. Filosofia -> Borboleta Morpho — Soft fluttering wingbeats + contemplative wind shimmer
      if (key.includes('filosofia') || key.includes('borboleta') || key.includes('morpho')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;

          // Gentle wingbeats (6 soft filtered air pulses)
          const noiseBuf = this.createNoiseBuffer(ctx, 1.3);
          const wingFlaps = [0.0, 0.13, 0.26, 0.39, 0.54, 0.7];
          wingFlaps.forEach((offset) => {
            const t = now + offset;
            const src = ctx.createBufferSource();
            src.buffer = noiseBuf;
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.setValueAtTime(520, t);
            bp.Q.value = 1.4;
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(0.16, t + 0.035);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);

            src.connect(bp);
            bp.connect(g);
            g.connect(ctx.destination);
            src.start(t);
            src.stop(t + 0.12);
          });

          // Ethereal harmonic shimmer representing iridescent wings
          [587.33, 880, 1174.66, 1479.98].forEach((freq, idx) => {
            const t = now + 0.08 + idx * 0.14;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, t);
            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(0.09, t + 0.04);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.85);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.9);
          });
        });
        return 1450;
      }

      // 6. Física -> Queixada (Tayassu pecari) — Porcine snort-grunts + signature teeth clacks
      if (key.includes('fisica') || key.includes('queixada')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;

          // Two deep snort-grunts ("oinc-oinc")
          [0.0, 0.28].forEach((offset) => {
            const t = now + offset;
            const osc = ctx.createOscillator();
            const formant = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(98, t);
            osc.frequency.exponentialRampToValueAtTime(165, t + 0.09);
            osc.frequency.exponentialRampToValueAtTime(84, t + 0.21);

            formant.type = 'bandpass';
            formant.frequency.setValueAtTime(420, t);
            formant.frequency.linearRampToValueAtTime(780, t + 0.1);
            formant.Q.value = 2.6;

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.36, t + 0.03);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);

            osc.connect(formant);
            formant.connect(gain);
            gain.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.24);
          });

          // Characteristic rapid Queixada jaw/teeth clacking ("clac-clac-clac-clac")
          const clacks = [0.62, 0.74, 0.86, 0.99];
          const clickNoise = this.createNoiseBuffer(ctx, 0.06);
          clacks.forEach((offset) => {
            const t = now + offset;
            const src = ctx.createBufferSource();
            src.buffer = clickNoise;
            const bp = ctx.createBiquadFilter();
            bp.type = 'bandpass';
            bp.frequency.setValueAtTime(1650, t);
            bp.Q.value = 4.5;
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.45, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);

            src.connect(bp);
            bp.connect(g);
            g.connect(ctx.destination);
            src.start(t);
            src.stop(t + 0.05);
          });
        });
        return 1200;
      }

      // 7. Geografia -> Ariranha (Pteronura brasiliensis) — Giant river otter vocalization + river splash
      if (key.includes('geografia') || key.includes('ariranha')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;

          // River splash burst
          const splashBuf = this.createNoiseBuffer(ctx, 0.55);
          const splash = ctx.createBufferSource();
          splash.buffer = splashBuf;
          const splashFilter = ctx.createBiquadFilter();
          splashFilter.type = 'bandpass';
          splashFilter.frequency.setValueAtTime(1400, now);
          splashFilter.frequency.exponentialRampToValueAtTime(420, now + 0.45);
          splashFilter.Q.value = 1.1;
          const splashGain = ctx.createGain();
          splashGain.gain.setValueAtTime(0.0001, now);
          splashGain.gain.linearRampToValueAtTime(0.28, now + 0.04);
          splashGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.5);
          splash.connect(splashFilter);
          splashFilter.connect(splashGain);
          splashGain.connect(ctx.destination);
          splash.start(now);
          splash.stop(now + 0.52);

          // Otter playful barking/chirping social calls ("hah-hah-hiii!")
          const calls = [
            { start: 0.25, f1: 680, f2: 960, dur: 0.14 },
            { start: 0.45, f1: 720, f2: 1080, dur: 0.15 },
            { start: 0.68, f1: 880, f2: 1420, dur: 0.28 },
          ];
          calls.forEach((c) => {
            const t = now + c.start;
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const g = ctx.createGain();
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(c.f1, t);
            osc.frequency.exponentialRampToValueAtTime(c.f2, t + c.dur * 0.5);
            osc.frequency.exponentialRampToValueAtTime(c.f1 * 0.85, t + c.dur);

            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(1900, t);

            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(0.22, t + 0.025);
            g.gain.exponentialRampToValueAtTime(0.0001, t + c.dur);

            osc.connect(filter);
            filter.connect(g);
            g.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + c.dur + 0.02);
          });
        });
        return 1250;
      }

      // 8. História -> Harpia (Harpia harpyja) — Piercing eagle cry
      if (key.includes('historia') || key.includes('história') || key.includes('harpia')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;
          [0.0, 0.52].forEach((offset, idx) => {
            const t = now + offset;
            const dur = idx === 0 ? 0.42 : 0.56;
            const osc = ctx.createOscillator();
            const harmonic = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(2950, t);
            osc.frequency.exponentialRampToValueAtTime(1520, t + dur);

            harmonic.type = 'sine';
            harmonic.frequency.setValueAtTime(2950 * 0.5, t);
            harmonic.frequency.exponentialRampToValueAtTime(1520 * 0.5, t + dur);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(2200, t);
            filter.Q.value = 1.8;

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.24, t + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);

            osc.connect(filter);
            filter.connect(gain);
            harmonic.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            harmonic.start(t);
            osc.stop(t + dur + 0.02);
            harmonic.stop(t + dur + 0.02);
          });
        });
        return 1250;
      }

      // 9. Inglês -> Coruja-orelhuda (Asio clamator) — Nocturnal owl hoot ("Huu... Huu-Huuu")
      if (key.includes('ingles') || key.includes('inglês') || key.includes('coruja')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;
          const hoots = [
            { start: 0.0, dur: 0.34, fStart: 485, fEnd: 415 },
            { start: 0.52, dur: 0.24, fStart: 505, fEnd: 455 },
            { start: 0.84, dur: 0.62, fStart: 475, fEnd: 375 },
          ];

          hoots.forEach((h) => {
            const t = now + h.start;
            const osc = ctx.createOscillator();
            const sub = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(h.fStart, t);
            osc.frequency.exponentialRampToValueAtTime(h.fEnd, t + h.dur);

            sub.type = 'triangle';
            sub.frequency.setValueAtTime(h.fStart * 0.5, t);
            sub.frequency.exponentialRampToValueAtTime(h.fEnd * 0.5, t + h.dur);

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.28, t + 0.07);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + h.dur);

            osc.connect(gain);
            sub.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            sub.start(t);
            osc.stop(t + h.dur + 0.03);
            sub.stop(t + h.dur + 0.03);
          });
        });
        return 1600;
      }

      // 10. Português -> Quati (Nasua nasua) — Curious nasal chirrups & leaf foraging snuffles
      if (key.includes('portugues') || key.includes('português') || key.includes('quati')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;
          // Playful coati chirrup pulses
          [0.0, 0.16, 0.33, 0.58].forEach((offset, idx) => {
            const t = now + offset;
            const osc = ctx.createOscillator();
            const filter = ctx.createBiquadFilter();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            const fStart = idx === 3 ? 1350 : 1050 + idx * 120;
            osc.frequency.setValueAtTime(fStart, t);
            osc.frequency.exponentialRampToValueAtTime(fStart * 1.65, t + 0.07);
            osc.frequency.exponentialRampToValueAtTime(fStart * 1.15, t + 0.12);

            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(1600, t);
            filter.Q.value = 2.4;

            gain.gain.setValueAtTime(0.0001, t);
            gain.gain.linearRampToValueAtTime(0.26, t + 0.015);
            gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.13);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(t);
            osc.stop(t + 0.14);
          });

          // Quick foraging sniff bursts
          const sniffBuf = this.createNoiseBuffer(ctx, 0.1);
          [0.78, 0.92].forEach((offset) => {
            const t = now + offset;
            const src = ctx.createBufferSource();
            src.buffer = sniffBuf;
            const hp = ctx.createBiquadFilter();
            hp.type = 'bandpass';
            hp.frequency.setValueAtTime(2400, t);
            hp.Q.value = 2.0;
            const g = ctx.createGain();
            g.gain.setValueAtTime(0.18, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);
            src.connect(hp);
            hp.connect(g);
            g.connect(ctx.destination);
            src.start(t);
            src.stop(t + 0.09);
          });
        });
        return 1150;
      }

      // 11. Química -> Tartaruga-da-Amazônia (Podocnemis expansa) — Water plunge + underwater turtle vocal pulse
      if (key.includes('quimica') || key.includes('química') || key.includes('tartaruga')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;

          // Gentle water plop
          const plop = ctx.createOscillator();
          const plopGain = ctx.createGain();
          plop.type = 'sine';
          plop.frequency.setValueAtTime(210, now);
          plop.frequency.exponentialRampToValueAtTime(590, now + 0.09);
          plopGain.gain.setValueAtTime(0.28, now);
          plopGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.14);
          plop.connect(plopGain);
          plopGain.connect(ctx.destination);
          plop.start(now);
          plop.stop(now + 0.15);

          // Low underwater river-turtle bioacoustic contact clucks
          [0.24, 0.56].forEach((offset) => {
            const t = now + offset;
            const osc = ctx.createOscillator();
            const lp = ctx.createBiquadFilter();
            const g = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(195, t);
            osc.frequency.exponentialRampToValueAtTime(125, t + 0.22);

            lp.type = 'lowpass';
            lp.frequency.setValueAtTime(480, t);

            g.gain.setValueAtTime(0.0001, t);
            g.gain.linearRampToValueAtTime(0.32, t + 0.03);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);

            osc.connect(lp);
            lp.connect(g);
            g.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + 0.26);
          });

          // Rising underwater bubbles
          [0.38, 0.72, 0.88, 1.02].forEach((offset, idx) => {
            const t = now + offset;
            const b = ctx.createOscillator();
            const g = ctx.createGain();
            b.type = 'sine';
            const base = 320 + idx * 65;
            b.frequency.setValueAtTime(base, t);
            b.frequency.exponentialRampToValueAtTime(base * 2.1, t + 0.08);
            g.gain.setValueAtTime(0.14, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
            b.connect(g);
            g.connect(ctx.destination);
            b.start(t);
            b.stop(t + 0.1);
          });
        });
        return 1250;
      }

      // 12. Sociologia -> Acará-disco (Symphysodon) — Igarapé water ripples & rising bubbles
      if (key.includes('sociologia') || key.includes('acara') || key.includes('acará')) {
        this.withRunningContext((ctx) => {
          const now = ctx.currentTime;

          // Gentle stream ripple
          const streamBuf = this.createNoiseBuffer(ctx, 1.1);
          const stream = ctx.createBufferSource();
          stream.buffer = streamBuf;
          const bp = ctx.createBiquadFilter();
          bp.type = 'bandpass';
          bp.frequency.setValueAtTime(650, now);
          bp.frequency.linearRampToValueAtTime(980, now + 0.55);
          bp.Q.value = 1.6;
          const streamGain = ctx.createGain();
          streamGain.gain.setValueAtTime(0.0001, now);
          streamGain.gain.linearRampToValueAtTime(0.11, now + 0.15);
          streamGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
          stream.connect(bp);
          bp.connect(streamGain);
          streamGain.connect(ctx.destination);
          stream.start(now);
          stream.stop(now + 1.08);

          // Community of fish bubbles ("blub-blub-blub-blub-blub")
          const bubbles = [
            { start: 0.05, f1: 280, f2: 640, dur: 0.09 },
            { start: 0.19, f1: 350, f2: 780, dur: 0.08 },
            { start: 0.34, f1: 310, f2: 720, dur: 0.1 },
            { start: 0.52, f1: 410, f2: 920, dur: 0.09 },
            { start: 0.7, f1: 360, f2: 840, dur: 0.11 },
            { start: 0.88, f1: 450, f2: 990, dur: 0.1 },
          ];
          bubbles.forEach((b) => {
            const t = now + b.start;
            const osc = ctx.createOscillator();
            const g = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(b.f1, t);
            osc.frequency.exponentialRampToValueAtTime(b.f2, t + b.dur);
            g.gain.setValueAtTime(0.22, t);
            g.gain.exponentialRampToValueAtTime(0.0001, t + b.dur);
            osc.connect(g);
            g.connect(ctx.destination);
            osc.start(t);
            osc.stop(t + b.dur + 0.02);
          });
        });
        return 1150;
      }

      // Fallback
      this.playSuccess();
      return 600;
    } catch {
      return 0;
    }
  }

  /**
   * Spoken text narration for mascot quotes in Portuguese using Web Speech API
   */
  public speakText(text: string, onEnd?: () => void) {
    if (!this.soundEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 1.0;
      utterance.pitch = 0.92; // Slightly deeper, dignified mascot tone

      const voices = window.speechSynthesis.getVoices();
      const ptVoice = voices.find((v) => v.lang.startsWith('pt'));
      if (ptVoice) {
        utterance.voice = ptVoice;
      }

      utterance.onend = () => {
        if (onEnd) onEnd();
      };
      utterance.onerror = () => {
        if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch {
      if (onEnd) onEnd();
    }
  }

  /**
   * Stop any active mascot speech
   */
  public stopSpeech() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
  }

  // ==========================================
  // RELAXING RAINFOREST AMBIENT SOUNDSCAPE
  // ==========================================

  /**
   * Set ambient volume (0.0 to 1.0)
   */
  public setAmbientVolume(vol: number) {
    this.ambientVolume = Math.max(0, Math.min(1, vol));
    if (this.ambientGain && this.ctx) {
      try {
        const scaledGain = this.ambientVolume * 0.18;
        this.ambientGain.gain.setTargetAtTime(scaledGain, this.ctx.currentTime, 0.05);
      } catch {
        // ignore
      }
    }
  }

  /**
   * Generates a smooth, seamless pink/brown noise buffer for natural breeze
   */
  private getOrCreateBreezeBuffer(ctx: AudioContext): AudioBuffer {
    if (this.breezeBuffer) return this.breezeBuffer;

    const sampleRate = ctx.sampleRate;
    const duration = 5; // 5-second seamless loop
    const buffer = ctx.createBuffer(2, sampleRate * duration, sampleRate);

    for (let channel = 0; channel < 2; channel++) {
      const data = buffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < data.length; i++) {
        const white = Math.random() * 2 - 1;
        // Pink noise filtering algorithm
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        const pink = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
        b6 = white * 0.115926;

        // Apply smooth window crossfade at boundaries for click-free loop
        const fadeLen = sampleRate * 0.5;
        let windowScale = 1.0;
        if (i < fadeLen) {
          windowScale = i / fadeLen;
        } else if (i > data.length - fadeLen) {
          windowScale = (data.length - i) / fadeLen;
        }

        data[i] = pink * 0.08 * windowScale;
      }
    }

    this.breezeBuffer = buffer;
    return buffer;
  }

  /**
   * Toggles realistic, calming ambient Brazilian rainforest soundscape
   * (gentle canopy breeze + night crickets + tropical birds)
   */
  public toggleAmbient(enable?: boolean) {
    const target = enable !== undefined ? enable : !this.ambientEnabled;
    this.ambientEnabled = target;

    // Stop if disabling
    if (!target) {
      if (this.ambientTimer) {
        window.clearInterval(this.ambientTimer);
        this.ambientTimer = null;
      }
      if (this.ambientGain && this.ctx) {
        try {
          this.ambientGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.15);
        } catch {
          // ignore
        }
      }
      setTimeout(() => {
        this.ambientNodes.forEach((node) => {
          try {
            if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
              (node as AudioScheduledSourceNode).stop();
            }
            node.disconnect();
          } catch {
            // ignore
          }
        });
        this.ambientNodes = [];
        this.ambientGain = null;
      }, 200);
      return;
    }

    // Start immediately
    try {
      this.unlockAudio();
      const ctx = this.getContext();
      if (!ctx) return;

      const masterAmbient = ctx.createGain();
      const initialGain = this.ambientVolume * 0.18;
      masterAmbient.gain.setValueAtTime(0.0001, ctx.currentTime);
      masterAmbient.gain.exponentialRampToValueAtTime(Math.max(0.001, initialGain), ctx.currentTime + 0.6);
      masterAmbient.connect(ctx.destination);
      this.ambientGain = masterAmbient;

      // 1. Continuous soothing canopy breeze
      const breezeBuf = this.getOrCreateBreezeBuffer(ctx);
      const breezeSource = ctx.createBufferSource();
      breezeSource.buffer = breezeBuf;
      breezeSource.loop = true;

      // Filter 1: Low-pass for deep gentle wind whoosh
      const breezeLp = ctx.createBiquadFilter();
      breezeLp.type = 'lowpass';
      breezeLp.frequency.setValueAtTime(420, ctx.currentTime);
      breezeLp.Q.setValueAtTime(1.2, ctx.currentTime);

      // Filter 2: Band-pass for leaf rustling
      const breezeBp = ctx.createBiquadFilter();
      breezeBp.type = 'bandpass';
      breezeBp.frequency.setValueAtTime(1100, ctx.currentTime);
      breezeBp.Q.setValueAtTime(0.9, ctx.currentTime);

      const breezeGain = ctx.createGain();
      breezeGain.gain.setValueAtTime(0.65, ctx.currentTime);

      // Slow LFO to swell canopy wind dynamically (breathing forest effect)
      const windLfo = ctx.createOscillator();
      const windLfoGain = ctx.createGain();
      windLfo.frequency.setValueAtTime(0.07, ctx.currentTime); // one cycle every ~14s
      windLfoGain.gain.setValueAtTime(180, ctx.currentTime);
      windLfo.connect(windLfoGain);
      windLfoGain.connect(breezeLp.frequency);
      windLfo.start(ctx.currentTime);

      breezeSource.connect(breezeLp);
      breezeSource.connect(breezeBp);
      breezeLp.connect(breezeGain);
      breezeBp.connect(breezeGain);
      breezeGain.connect(masterAmbient);

      breezeSource.start(ctx.currentTime);
      this.ambientNodes.push(breezeSource, breezeLp, breezeBp, breezeGain, windLfo, windLfoGain);

      // 2. Night rainforest crickets / cicadas (subtle tropical twilight rhythm)
      const cricketOsc = ctx.createOscillator();
      const cricketFilter = ctx.createBiquadFilter();
      const cricketTremolo = ctx.createOscillator();
      const cricketTremoloGain = ctx.createGain();
      const cricketMainGain = ctx.createGain();

      cricketOsc.type = 'triangle';
      cricketOsc.frequency.setValueAtTime(4650, ctx.currentTime);

      cricketFilter.type = 'bandpass';
      cricketFilter.frequency.setValueAtTime(4650, ctx.currentTime);
      cricketFilter.Q.setValueAtTime(6.0, ctx.currentTime);

      // 5.5Hz rhythmic pulse simulating nocturnal crickets
      cricketTremolo.frequency.setValueAtTime(5.5, ctx.currentTime);
      cricketTremoloGain.gain.setValueAtTime(0.018, ctx.currentTime);
      cricketTremolo.connect(cricketTremoloGain);

      cricketMainGain.gain.setValueAtTime(0.016, ctx.currentTime);
      cricketTremoloGain.connect(cricketMainGain.gain);

      cricketOsc.connect(cricketFilter);
      cricketFilter.connect(cricketMainGain);
      cricketMainGain.connect(masterAmbient);

      cricketOsc.start(ctx.currentTime);
      cricketTremolo.start(ctx.currentTime);
      this.ambientNodes.push(cricketOsc, cricketFilter, cricketTremolo, cricketTremoloGain, cricketMainGain);

      // 3. Play immediate gentle greeting bird chirp
      this.triggerAmbientBirdChirp(ctx, masterAmbient);

      // 4. Set interval for realistic tropical forest birds (Bem-te-vi, Uirapuru, Sabiá)
      const scheduleNextBird = () => {
        if (!this.ambientEnabled || !this.ambientGain) return;
        const currentCtx = this.getContext();
        if (!currentCtx) return;
        this.triggerAmbientBirdChirp(currentCtx, this.ambientGain);

        // Next chirp at organic random delay between 3.5s and 7s
        const nextDelay = 3500 + Math.random() * 3500;
        this.ambientTimer = window.setTimeout(scheduleNextBird, nextDelay);
      };

      this.ambientTimer = window.setTimeout(scheduleNextBird, 3800);
    } catch {
      // ignore
    }
  }

  /**
   * Realistic Brazilian tropical bird chirp (Bem-te-vi / Sabiá / Uirapuru style)
   */
  private triggerAmbientBirdChirp(ctx: AudioContext, destination: GainNode) {
    try {
      const now = ctx.currentTime;
      const birdTypes = ['bemtevi', 'sabia', 'uirapuru'];
      const chosenType = birdTypes[Math.floor(Math.random() * birdTypes.length)];

      if (chosenType === 'bemtevi') {
        // Bem-te-vi rhythm: three notes (ti-ti-vi!)
        const notes = [
          { freq: 2200, dur: 0.08, delay: 0.0 },
          { freq: 2400, dur: 0.09, delay: 0.12 },
          { freq: 1950, dur: 0.18, delay: 0.24, glideTo: 1750 },
        ];

        notes.forEach((n) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const t = now + n.delay;
          osc.frequency.setValueAtTime(n.freq, t);
          if (n.glideTo) {
            osc.frequency.exponentialRampToValueAtTime(n.glideTo, t + n.dur);
          }
          gain.gain.setValueAtTime(0.04, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + n.dur);

          osc.connect(gain);
          gain.connect(destination);
          osc.start(t);
          osc.stop(t + n.dur + 0.02);
        });
      } else if (chosenType === 'sabia') {
        // Sabiá melodic trill
        const baseFreq = 1800 + Math.random() * 300;
        for (let i = 0; i < 4; i++) {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          const t = now + i * 0.08;
          const f = baseFreq + (i % 2 === 0 ? 0 : 250);
          osc.frequency.setValueAtTime(f, t);
          osc.frequency.exponentialRampToValueAtTime(f + 120, t + 0.07);

          gain.gain.setValueAtTime(0.035, t);
          gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.075);

          osc.connect(gain);
          gain.connect(destination);
          osc.start(t);
          osc.stop(t + 0.08);
        }
      } else {
        // Uirapuru pure flute-like note with delicate bend
        const osc = ctx.createOscillator();
        const overtone = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        overtone.type = 'triangle';

        const f = 1500 + Math.random() * 400;
        osc.frequency.setValueAtTime(f, now);
        osc.frequency.exponentialRampToValueAtTime(f * 1.3, now + 0.15);
        osc.frequency.exponentialRampToValueAtTime(f * 0.9, now + 0.35);

        overtone.frequency.setValueAtTime(f * 2, now);
        overtone.frequency.exponentialRampToValueAtTime(f * 2.6, now + 0.15);

        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);

        osc.connect(gain);
        overtone.connect(gain);
        gain.connect(destination);

        osc.start(now);
        overtone.start(now);
        osc.stop(now + 0.4);
        overtone.stop(now + 0.4);
      }
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
