import { ConstraintError, keys as ConstraintErrorKeys } from "@/types/constraint-error";
import { keys, ResponseError } from "@/types/response-error";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function isInstanceOfResponseError(object: any): object is ResponseError {
  if (typeof object !== "object" || object === null) return false;

  const interfaceKeys = keys;

  for (const key of interfaceKeys) {
    if (!(key in object)) return false;
  }

  return true;
}

export function isInstanceOfContraintError<V extends Record<string, string>>(
  object: any,
): object is ConstraintError<V> {
  if (typeof object !== "object" || object === null) return false;

  const interfaceKeys = ConstraintErrorKeys;

  for (const key of interfaceKeys) {
    if (!(key in object)) return false;
  }

  return true;
}
