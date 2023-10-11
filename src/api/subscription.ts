import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";

export const subscriptionKeys = createQueryKeys("subscription", {
  all: () => ({
    queryKey: ["all"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/subscription`, {});

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
