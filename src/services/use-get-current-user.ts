import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { components } from "@/api/v1";
import { queryCache } from "@/configs/react-query";
import logger from "@/utils/dev-log";

export default function useGetCurrentUser() {
  const [token, , removeToken] = useLocalStorage({ key: "token" });
  const queryClient = useQueryClient();

  const query = useQuery({
    ...queryKeys.generalUser.user("current"),

    onError: () => {
      logger.log(token, "is invalid, remove it");
      removeToken();
    },

    enabled: Boolean(token),
  });

  useEffect(() => {
    if (!token) queryClient.resetQueries();
  }, [queryClient, token]);

  return { ...query };
}

export function useGetCurrentUserFromCache() {
  return queryCache.find<{ data: components["schemas"]["UserResponse"] }>(
    queryKeys.generalUser.user("current").queryKey,
  );
}
