import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { components } from "@/api/v1";
import { FLAGS, useFeatureFlag } from "@/configs/feature-flag";
import { queryCache } from "@/configs/react-query";

export default function useGetCurrentUser() {
  const [token, , removeToken] = useLocalStorage({ key: "token" });
  const queryClient = useQueryClient();
  const [_, SET_FLAG_NOTE] = useFeatureFlag(FLAGS.NOTE);

  const query = useQuery({
    ...queryKeys.user.current(),

    onError: () => {
      queryClient.resetQueries();
      removeToken();
    },

    onSuccess: (data) => {
      if (data.data?.role === "ADMIN") SET_FLAG_NOTE(true);
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
    queryKeys.user.current().queryKey,
  );
}
