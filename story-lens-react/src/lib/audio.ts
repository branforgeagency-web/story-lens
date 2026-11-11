/**
 * Cinema audio engine — a tiny Web Audio "shutter click" used as UI feedback.
 * Lazily creates the AudioContext on first use (browsers require a user gesture).
 */
class CinemaAudioEngine {
  private ctx: AudioContext | null = null;

  private init(): AudioContext | null {
    if (!this.ctx) {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume();
    return this.ctx;
  }

  playShutter(): void {
    try {
      const ctx = this.init();
      if (!ctx) return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(25, now + 0.06);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.07);

      window.setTimeout(() => {
        const t2 = ctx.currentTime;
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(320, t2);
        osc2.frequency.exponentialRampToValueAtTime(50, t2 + 0.05);
        gain2.gain.setValueAtTime(0.18, t2);
        gain2.gain.exponentialRampToValueAtTime(0.001, t2 + 0.05);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start(t2);
        osc2.stop(t2 + 0.06);
      }, 50);
    } catch {
      /* audio is a nicety; never break the UI */
    }
  }
}

export const audio = new CinemaAudioEngine();
export const playShutter = (): void => audio.playShutter();
