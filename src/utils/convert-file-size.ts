type Unit = "B" | "KB" | "MB" | "GB" | "TB" | "PB" | "EB" | "ZB" | "YB";

export default function convertFileSize(
  size: number,
  fromUnit: Unit,
  toUnit: Unit,
  round = 2,
): number {
  const units: Unit[] = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const fromIndex = units.indexOf(fromUnit);
  const toIndex = units.indexOf(toUnit);

  if (fromIndex === -1 || toIndex === -1) {
    throw new Error("Invalid unit provided");
  }

  const sizeInBytes = size * Math.pow(1024, fromIndex);
  const convertedSize = sizeInBytes / Math.pow(1024, toIndex);

  return parseFloat(convertedSize.toFixed(round));
}
