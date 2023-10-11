import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";

export const pomodoroKeys = createQueryKeys("pomodoro", {
  current: () => ({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/user/pomodoro-clock`, {});

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
