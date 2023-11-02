import { UseFormReturnType } from "@mantine/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";

type RequestParams = components["schemas"]["GptMessageRequest"];

export default function useSentChat() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (body: RequestParams) => {
      const response = await client.POST("/api/v1/gpt", {
        body,
      });
      return response;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKeys.gpt.all._def);
    },
  });

  const submit = (form: UseFormReturnType<RequestParams>) => () => {
    form.setFieldValue("content", "");
    mutation.mutate(form.values);
  };

  return { ...mutation, submit };
}
