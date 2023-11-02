import { mergeQueryKeys } from "@lukemorales/query-key-factory";

import { gptKeys } from "@/api/gpt";
import { loginKeys } from "@/api/login";
import { pomodoroKeys } from "@/api/pomodoro";
import { referralKeys } from "@/api/referral";
import { studySetKeys } from "@/api/study-set";
import { subscriptionKeys } from "@/api/subscription";
import { userKeys } from "@/api/user";

export const queryKeys = mergeQueryKeys(
  loginKeys,
  userKeys,
  studySetKeys,
  subscriptionKeys,
  pomodoroKeys,
  referralKeys,
  gptKeys,
);
