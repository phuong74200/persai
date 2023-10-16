import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export type RejectSucscriptionRequest =
  operations["rejectUpgradeRequest"]["requestBody"]["content"]["application/json"];

export default function useRejectSubscription() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: RejectSucscriptionRequest) => {
      const response = await client.PUT(`/api/v1/subscription/reject`, {
        body,
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKeys.subscription.upgradeRequest._def);
    },
  });

  const reject = useCallback(
    (requestBody: RejectSucscriptionRequest) => {
      mutation.mutate(requestBody);
    },
    [mutation],
  );

  return { mutation, reject };
}
