export default function generateFilledArray<T>(
  length: number,
  generator?: (v: T, i: number) => T,
): T[] {
  if (generator) return Array.from({ length }, generator);
  return Array.from({ length }) as T[];
}
