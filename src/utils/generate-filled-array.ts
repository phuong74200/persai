export default function generateFilledArray<T>(
  length: number | [number, number],
  generator?: (index: number) => T,
): T[] {
  if (Array.isArray(length)) {
    const [min, max] = length;
    length = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  if (generator) return Array.from({ length }, (_, index) => generator(index));
  return Array.from({ length }) as T[];
}
