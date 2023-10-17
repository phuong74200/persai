import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ColorRing } from "react-loader-spinner";
import { Outlet } from "react-router-dom";
import { LoadingOverlay, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GOOGLE_CLIENT_ID } from "@/configs/env";
import { FeatureFlagProvider } from "@/configs/feature-flag";
import { customMantineTheme } from "@/configs/mantine-theme";
import { defaultOptions, mutationCache, queryCache } from "@/configs/react-query";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import Error500 from "@/features/error/components/error-500";
import { BrowserRouter } from "@/router";

import "./index.scss";

export const queryClient = new QueryClient({
  defaultOptions,
  queryCache,
  mutationCache,
});

export function Theme() {
  const cache = useGetCurrentUserFromCache();

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        ...customMantineTheme,
        primaryColor: cache?.userTheme,
      }}
    >
      <ModalsProvider>
        <Outlet />
        <Notifications />
      </ModalsProvider>
    </MantineProvider>
  );
}

function App() {
  return (
    <ErrorBoundary fallbackRender={Error500}>
      <Suspense
        fallback={
          <LoadingOverlay
            visible
            loader={
              <ColorRing
                visible={true}
                height="80"
                width="80"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            }
          />
        }
      >
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <FeatureFlagProvider>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter.RouterProvider />
            </QueryClientProvider>
          </FeatureFlagProvider>
        </GoogleOAuthProvider>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
