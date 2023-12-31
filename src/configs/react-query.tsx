import { Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import * as Sentry from "@sentry/browser";
import { DefaultOptions, MutationCache, QueryCache } from "@tanstack/react-query";

import { queryClient } from "@/app";
import { notification } from "@/configs/notifications";
import generateQueryId from "@/utils/generate-query-id";
import isInstanceOfResponseError from "@/utils/is-instance-of";

export const queryCache = new QueryCache({
  onError: (error) => {
    Sentry.captureException(error);

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
    // if (isInstanceOfResponseError(error)) {
    //   notification.error({
    //     id: generateQueryId(vars),
    //     message: error.detail,
    //   });
    // }

    Sentry.captureException(error);

    notification.error({
      id: generateQueryId(vars),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (error as any).detail,
    });
  },
});

export const defaultOptions: DefaultOptions = {
  queries: {
    // useErrorBoundary: false,
    refetchOnWindowFocus: false,
    retry: false,
  },
};
