import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export const generalUserKeys = createQueryKeys("generalUser", {
  user: (userId: operations["getUserById"]["parameters"]["path"]["userId"] = "current") => ({
    queryKey: [userId],
    queryFn: async () => {
      const response = await client.GET(`/v1/user/{userId}`, {
        params: {
          path: {
            userId,
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
