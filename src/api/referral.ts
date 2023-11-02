import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export const referralKeys = createQueryKeys("referral", {
  using: (
    referralCode: operations["enterReferralCode"]["requestBody"]["content"]["application/json"]["referralCode"],
  ) => ({
    queryKey: [referralCode],
    queryFn: async () => {
      const response = await client.PUT(`/api/v1/referral`, {
        body: {
          referralCode,
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),

  all: () => ({
    queryKey: ["all"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/user/used-referral-code`, {
        params: {
          query: {
            status: "SUCCEED",
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
