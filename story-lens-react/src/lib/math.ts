export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Linear interpolation between `from` and `to`. */
export const mix = (from: number, to: number, progress: number): number =>
  from + (to - from) * progress;

/** Normalised 0..1 progress of `value` between `start` and `end`. */
export const clampProgress = (value: number, start: number, end: number): number =>
  clamp((value - start) / (end - start), 0, 1);
