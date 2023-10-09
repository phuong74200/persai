import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { GOOGLE_CLIENT_ID } from "@/configs/env";
import { FeatureFlagProvider } from "@/configs/feature-flag";
import { customMantineTheme } from "@/configs/mantine-theme";
import { defaultOptions, mutationCache, queryCache } from "@/configs/react-query";
import { BrowserRouter } from "@/router";

import "./index.scss";

export const queryClient = new QueryClient({
  defaultOptions,
  queryCache,
  mutationCache,
});

function Theme() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={customMantineTheme}>
      <Notifications />
      <BrowserRouter.RouterProvider />
    </MantineProvider>
  );
}

function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <FeatureFlagProvider>
        <QueryClientProvider client={queryClient}>
          <Theme />
        </QueryClientProvider>
      </FeatureFlagProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
