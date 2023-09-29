import { botttsNeutral, initials } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

export default function generateAvatar(seed?: string) {
  return createAvatar(botttsNeutral, {
    seed,
  }).toDataUriSync();
}

export const generateInitialsAvatar = (seed?: string, initial?: string | null) => {
  if (initial) return initial;
  return createAvatar(initials, {
    seed: seed?.replace(/[^a-zA-Z0-9]/g, ""),
  }).toDataUriSync();
};
