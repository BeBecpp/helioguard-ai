/** Clamp a value between min and max. */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** Normalize value within [min, max] to 0–1 range. */
export function normalizeRange(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return clamp((value - min) / (max - min), 0, 1);
}

/** Higher input → lower score; used for distance (closer = riskier). */
export function inverseNormalizeRange(value: number, min: number, max: number): number {
  return 1 - normalizeRange(value, min, max);
}
