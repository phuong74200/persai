import { useCallback } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { notification } from "@/configs/notifications";
import generateQueryId from "@/utils/generate-query-id";

export default function useUpdateAvatar() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (image: File) => {
      const response = await client.PUT(`/api/v1/user/current/avatar`, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: image,

        bodySerializer(body) {
          const formData = new FormData();

          if (body) formData.append("image", body);

          return formData;
        },
      });

      if (!response.response.ok) throw response.error;

      return response;
    },

    onMutate: (vars) => {
      notification.loader({
        id: generateQueryId(vars),
        message: "Updating user avatar",
      });
    },

    onSuccess: (_r, vars) => {
      notification.success({
        id: generateQueryId(vars),
        message: "User avatar has been updated successfully.",
      });

      queryClient.invalidateQueries(queryKeys.user.current._def);
    },
  });

  const submit = useCallback(
    (data: File) => {
      mutation.mutate(data);
    },
    [mutation],
  );

  return { ...mutation, submit };
}
