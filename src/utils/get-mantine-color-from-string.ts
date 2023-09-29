import { DEFAULT_THEME } from "@mantine/core";

import crc32 from "@/utils/crc32";

export const COLOR_LIST = Object.keys(DEFAULT_THEME.colors);

export function getMantineColorFromString(string: string, min = 0, max = 10, dateDepended = false) {
  const interval = max - min;
  if (dateDepended) {
    return ((crc32(string) + new Date().getTime()) % interval) + min;
  }
  return ((crc32(string) + 0) % interval) + min;
}
