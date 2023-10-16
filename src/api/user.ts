import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";

export const userKeys = createQueryKeys("user", {
  current: () => ({
    queryKey: ["current"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/user/current`, {});

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),

  all: () => ({
    queryKey: ["all"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/user`, {
        params: {
          query: {
            status: undefined,
            sort: ["fullName"],
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
