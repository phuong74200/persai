import { createQueryKeys } from "@lukemorales/query-key-factory";

import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";
import { NonUndefined } from "@/types";

export const subscriptionKeys = createQueryKeys("subscription", {
  all: () => ({
    queryKey: ["all"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/subscription`, {});

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),

  upgradeRequest: (
    status: NonUndefined<operations["getAllUpgradeRequests"]["parameters"]["query"]>["status"],
  ) => ({
    queryKey: ["upgradeRequest"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/subscription/upgrade-request/list`, {
        params: {
          query: {
            status: status,
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),

  payment: (
    paidType: operations["requestToUpgradeWithPayment"]["parameters"]["query"]["paidType"],
  ) => ({
    queryKey: ["payment"],
    queryFn: async () => {
      const response = await client.GET(`/api/v1/subscription/upgrade-request/current`, {
        params: {
          query: {
            paidType,
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },
  }),
});
