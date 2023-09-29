export default function parseDec(value?: string | null, defaultValue = "1") {
  return parseInt(value ?? defaultValue, 10);
}
