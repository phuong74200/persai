import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export type UnbanUserRequest = {
  user_id: operations["unbanUser"]["parameters"]["path"]["user_id"];
};

export default function useUnbanUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ user_id }: UnbanUserRequest) => {
      const response = await client.PUT(`/api/v1/user/ban/{user_id}`, {
        params: {
          path: {
            user_id,
          },
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKeys.user._def);
    },
  });

  const unban = useCallback(
    ({ user_id }: UnbanUserRequest) => {
      mutation.mutate({ user_id });
    },
    [mutation],
  );

  return { mutation, unban };
}
