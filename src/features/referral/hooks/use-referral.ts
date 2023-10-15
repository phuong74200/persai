import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export default function useReferral() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (
      referralCode: operations["enterReferralCode"]["requestBody"]["content"]["application/json"]["referralCode"],
    ) => {
      const response = await client.PUT(`/api/v1/referral`, {
        body: {
          referralCode,
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKeys.user.current._def);
    },
  });

  const submit = (
    referralCode: operations["enterReferralCode"]["requestBody"]["content"]["application/json"]["referralCode"],
  ) => {
    mutation.mutate(referralCode);
  };

  return { ...mutation, submit };
}
