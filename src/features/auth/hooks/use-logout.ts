import { useCallback } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQueryClient } from "@tanstack/react-query";

import useRedirect from "@/hooks/use-redirect";

export default function useLogout() {
  const [, , removeToken] = useLocalStorage<{
    accessToken: string;
    refreshToken: string;
  }>({ key: "token" });
  const queryClient = useQueryClient();
  const { redirect } = useRedirect();

  const logout = useCallback(() => {
    removeToken();
    queryClient.resetQueries();
    redirect("/login");
  }, [queryClient, redirect, removeToken]);

  return { logout };
}
