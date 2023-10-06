export default function generateFilledArray<T>(
  length: number,
  generator?: (index: number) => T,
): T[] {
  if (generator) return Array.from({ length }, (_, index) => generator(index));
  return Array.from({ length }) as T[];
}
