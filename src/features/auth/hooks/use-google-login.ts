import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { CredentialResponse } from "@react-oauth/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { client } from "@/api/openapi-fetch";
import { components } from "@/api/v1";

type RequestParams = components["schemas"]["LoginRequest"];

export default function useGoogleLogin() {
  const queryClient = useQueryClient();
  const [_, setToken] = useLocalStorage<{
    accessToken: string;
    refreshToken: string;
  }>({ key: "token" });

  const mutation = useMutation({
    mutationFn: async (body: RequestParams) => {
      const response = await client.POST("/api/v1/login/google", {
        body,
      });
      return response;
    },

    onSuccess: async (data) => {
      const queryKey = queryKeys.user.current().queryKey;

      await queryClient.cancelQueries({ queryKey });

      setToken({
        accessToken: data.data?.accessToken || "",
        refreshToken: data.data?.refreshToken || "",
      });

      queryClient.setQueryData(queryKey, { data: data.data?.userResponse });
    },
  });

  const handleSuccess = useCallback(
    (response: CredentialResponse) => {
      if (response.credential) mutation.mutate({ idToken: response.credential });
    },
    [mutation],
  );

  return { ...mutation, handleSuccess };
}
