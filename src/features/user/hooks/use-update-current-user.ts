import { useCallback } from "react";
import { UseFormReturnType } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { operations } from "@/api/v1";

export type UpdateCurrentUserRequest =
  operations["updateCurrentUser"]["requestBody"]["content"]["application/json"];

export default function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: UpdateCurrentUserRequest) => {
      const response = await client.PUT(`/api/v1/user/current`, {
        body: {
          fullName: body.fullName,
          theme: body.theme,
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onSuccess() {
      queryClient.invalidateQueries(queryKeys.user.current._def);
    },
  });

  const submit = useCallback(
    (body: UseFormReturnType<UpdateCurrentUserRequest>) => () => {
      mutation.mutate(body.values);
    },
    [mutation],
  );

  return { ...mutation, submit };
}
