import { Outlet } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GOOGLE_CLIENT_ID } from "@/configs/env";
import { FeatureFlagProvider } from "@/configs/feature-flag";
import { customMantineTheme } from "@/configs/mantine-theme";
import { defaultOptions, mutationCache, queryCache } from "@/configs/react-query";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
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
      <Outlet />
      <Notifications />
    </MantineProvider>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <FeatureFlagProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter.RouterProvider />
        </QueryClientProvider>
      </FeatureFlagProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
