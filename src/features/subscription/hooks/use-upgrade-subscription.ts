import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export type UpgradeSucscriptionRequest =
  operations["upgradeSubscription"]["requestBody"]["content"]["application/json"];

export default function useUpgradeSubscription() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: UpgradeSucscriptionRequest) => {
      const response = await client.PUT(`/api/v1/subscription/upgrade`, {
        body,
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKeys.subscription.upgradeRequest._def);
    },
  });

  const upgrade = useCallback(
    (requestBody: UpgradeSucscriptionRequest) => {
      mutation.mutate(requestBody);
    },
    [mutation],
  );

  return { mutation, upgrade };
}
