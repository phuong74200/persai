export default function getInRange(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
