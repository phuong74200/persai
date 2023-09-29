export default function sortObjectKeys(
  obj: { [key: string]: unknown },
  order: "asc" | "desc" = "asc",
): { [key: string]: unknown } {
  const sortedKeys = Object.keys(obj).sort((a, b) => {
    if (order === "asc") {
      return a.localeCompare(b);
    } else {
      return b.localeCompare(a);
    }
  });

  const sortedObject: { [key: string]: unknown } = {};

  sortedKeys.forEach((key) => {
    sortedObject[key] = obj[key];
  });

  return sortedObject;
}
