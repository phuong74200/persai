import { Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { DefaultOptions, MutationCache, QueryCache } from "@tanstack/react-query";

import { queryClient } from "@/app";
import { notification } from "@/configs/notifications";
import logger from "@/utils/dev-log";
import generateQueryId from "@/utils/generate-query-id";
import isInstanceOfResponseError from "@/utils/is-instance-of";

export const queryCache = new QueryCache({
  onError: (error) => {
    // 🎉 only show error toasts if we already have data in the cache
    // which indicates a failed background update

    if (isInstanceOfResponseError(error)) {
      notifications.show({
        radius: "sm",
        color: "red",
        autoClose: 10000,
        title: (
          <Text size="md" weight="bold">
            Error {error.status}
          </Text>
        ),
        message: error.detail,
      });

      if (error.status === 401) queryClient.invalidateQueries();
    }
  },
});

export const mutationCache = new MutationCache({
  onError: (error, vars) => {
    logger.log("from instance of response error", error);

    if (isInstanceOfResponseError(error)) {
      notification.error({
        id: generateQueryId(vars),
        message: error.detail,
      });
      logger.log("eee");
    }
  },
});

export const defaultOptions: DefaultOptions = {
  queries: {
    // useErrorBoundary: false,
    refetchOnWindowFocus: false,
    retry: false,
  },
};
