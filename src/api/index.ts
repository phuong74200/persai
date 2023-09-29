import { createQueryKeys, mergeQueryKeys } from "@lukemorales/query-key-factory";

import { generalUserKeys } from "@/api/general-user";
import { institutionKeys } from "@/api/institution";
import { loginKeys } from "@/api/login";
import { majorKeys } from "@/api/major";

export const welcomeKeys = createQueryKeys("welcome", {
  queryKeys: ["welcome"],
});

export const queryKeys = mergeQueryKeys(
  welcomeKeys,
  generalUserKeys,
  loginKeys,
  institutionKeys,
  majorKeys,
);
