type KeyFinderFunction<T> = (item: T) => string;
type KeyType<T> = T extends Record<infer K, any> ? K : never;

export function groupBy<T extends Record<KeyType<T>, any>>(
  values: T[],
  keyFinder: string | KeyFinderFunction<T>,
): Record<string, T[]> {
  return values.reduce(
    (result, item) => {
      const key = typeof keyFinder === "function" ? keyFinder(item) : item[keyFinder as keyof T];
      if (!result[key]) {
        result[key] = [item];
      } else {
        result[key].push(item);
      }
      return result;
    },
    {} as Record<string, T[]>,
  );
}
