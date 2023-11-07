export function clamp (value, min = 0, max = 1.0) {
  return Math.min(Math.max(value, min), max);
}
