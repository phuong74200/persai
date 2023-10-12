import { useEffect } from "react";
import { useLocalStorage } from "@mantine/hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { FLAGS, useFeatureFlag } from "@/configs/feature-flag";
import { queryCache } from "@/configs/react-query";
import { User } from "@/features/user-management/domains/user";

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
  const cache = queryCache.find<{ data: User }>(queryKeys.user.current().queryKey)?.state.data
    ?.data;
  if (cache) return new User(cache);
}
