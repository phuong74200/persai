import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export const loginKeys = createQueryKeys("login", {
  google: (
    idToken: operations["loginUserViaGoogle"]["requestBody"]["content"]["application/json"]["idToken"],
  ) => ({
    queryKey: [idToken],
    queryFn: async () => {
      const response = await client.POST(`/api/v1/login/google`, {
        body: {
          idToken,
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
