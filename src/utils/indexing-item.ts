export default function indexingItems(item?: Array<Record<string, unknown>> | null, start = 0) {
  if (!item) return [];
  return item.map((item, index) => ({
    ...item,
    index: index + start,
  }));
}
