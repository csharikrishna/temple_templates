// Pure Web Audio synthesized traditional Vedic temple bell chime (432Hz harmonic series)
// Zero external mp3 dependencies, works instantaneously and smoothly on modern browsers

export function playTempleBell(): void {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();

    // Harmonics for a resonant bronze temple bell
    const freqs = [432, 864, 1296, 1728];
    const gains = [0.32, 0.16, 0.08, 0.035];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      const decay = 2.6 - idx * 0.35;
      gain.gain.setValueAtTime(gains[idx] ?? 0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + decay);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + decay);
    });
  } catch {
    // Audio fallback without interrupting user flow
  }
}
