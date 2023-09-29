import { UseFormReturnType } from "@mantine/form";
import { useLocalStorage } from "@mantine/hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";

type LoginRequest = components["schemas"]["LoginRequest"];

export default function usePostLoginUser(form: UseFormReturnType<LoginRequest>) {
  const queryClient = useQueryClient();
  const [_, setToken] = useLocalStorage({ key: "token" });

  const mutation = useMutation({
    mutationFn: async (body: LoginRequest) => {
      const response = await client.POST("/v1/login", {
        body,
      });

      return response;
    },
    onSuccess: async (data) => {
      const queryKey = queryKeys.generalUser.user("current").queryKey;

      await queryClient.cancelQueries({ queryKey });

      setToken(data.data?.accessToken || "");

      queryClient.setQueryData(queryKey, { data: data.data?.userResponse });
    },
  });

  const submit = () => mutation.mutate(form.values);

  return { ...mutation, submit };
}
