"use client";

class SciFiSynth {
  private ctx: AudioContext | null = null;
  private ambientSource: OscillatorNode | null = null;
  private ambientLfo: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isAmbientPlaying: boolean = false;

  constructor() {
    if (typeof window !== "undefined") {
      const storedMute = localStorage.getItem("portfolio-muted");
      this.isMuted = storedMute === "true";
    }
  }

  private init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("portfolio-muted", muted ? "true" : "false");
    }
    
    // Dynamically adjust ambient hum volume if playing
    if (this.ambientGain && this.ctx) {
      const targetVolume = muted ? 0 : 0.025;
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(targetVolume + 0.0001, this.ctx.currentTime + 0.3);
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public resume() {
    this.init();
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public playUIHover() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(700, now + 0.06);

    gain.gain.setValueAtTime(0.008, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.06);
  }

  public playUIClick() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);

    gain.gain.setValueAtTime(0.025, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }

  public playWarpWhoosh() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;

    // 1. Synthesize white noise buffer for wind/gas rushing sound
    const bufferSize = this.ctx.sampleRate * 2.0; 
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = "bandpass";
    noiseFilter.Q.setValueAtTime(1.5, now);
    noiseFilter.frequency.setValueAtTime(120, now);
    noiseFilter.frequency.exponentialRampToValueAtTime(2200, now + 1.4);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.12, now + 0.5);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    // 2. Synthesize low-end synth glide (sawtooth/triangle)
    const osc = this.ctx.createOscillator();
    const oscFilter = this.ctx.createBiquadFilter();
    const oscGain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(70, now);
    osc.frequency.exponentialRampToValueAtTime(750, now + 1.3);

    oscFilter.type = "lowpass";
    oscFilter.frequency.setValueAtTime(100, now);
    oscFilter.frequency.exponentialRampToValueAtTime(550, now + 1.4);

    oscGain.gain.setValueAtTime(0.0001, now);
    oscGain.gain.exponentialRampToValueAtTime(0.08, now + 0.5);
    oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

    osc.connect(oscFilter);
    oscFilter.connect(oscGain);
    oscGain.connect(this.ctx.destination);

    noise.start(now);
    osc.start(now);
    noise.stop(now + 2.0);
    osc.stop(now + 2.0);
  }

  public playThemeSwitch() {
    this.resume();
    if (this.isMuted || !this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.7);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(450, now);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.05, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.7);
  }

  public startAmbientHum() {
    this.resume();
    if (this.isAmbientPlaying || !this.ctx) return;

    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(55, now); // Deep low A frequency (cockpit drone)

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(80, now);

    // Create an LFO to modulate volume dynamically (breathing texture)
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, now); 
    lfoGain.gain.setValueAtTime(0.01, now);

    gain.gain.setValueAtTime(this.isMuted ? 0 : 0.025, now);

    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain); // Modulate volume

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    lfo.start(now);

    this.ambientSource = osc;
    this.ambientLfo = lfo;
    this.ambientGain = gain;
    this.isAmbientPlaying = true;
  }

  public stopAmbientHum() {
    if (this.ambientSource) {
      try {
        this.ambientSource.stop();
      } catch (e) {}
      this.ambientSource = null;
    }
    if (this.ambientLfo) {
      try {
        this.ambientLfo.stop();
      } catch (e) {}
      this.ambientLfo = null;
    }
    this.isAmbientPlaying = false;
  }
}

export const sciFiAudio = new SciFiSynth();
