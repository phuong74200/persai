import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { loginKeys } from "@/api/login";
import { studySetKeys } from "@/api/study-set";
import { userKeys } from "@/api/user";

export const queryKeys = mergeQueryKeys(loginKeys, userKeys, studySetKeys);
