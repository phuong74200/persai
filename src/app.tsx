import { ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { FeatureFlagProvider, FLAGS, useFeatureFlag, useHelper } from "@/configs/feature-flag";
import { customMantineTheme } from "@/configs/mantine-theme";
import { defaultOptions, mutationCache, queryCache } from "@/configs/react-query";
import { UserContextProvider } from "@/context/user";
import SyncTailwindColorScheme from "@/modules/sync-tailwind-color-scheme";
import { BrowserRouter } from "@/router";

import "./index.scss";

export const queryClient = new QueryClient({
  defaultOptions,
  queryCache,
  mutationCache,
});

function Theme() {
  const [colorScheme, setColorScheme] = useFeatureFlag(FLAGS.DEV_DARK_MODE);
  const { all: checkDevCustomTheme } = useHelper(FLAGS.DEV, FLAGS.DEV_CUSTOM_THEME);

  const customTheme = checkDevCustomTheme() ? customMantineTheme : undefined;

  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value === "dark");

  const scheme = colorScheme ? "dark" : "light";

  return (
    <ColorSchemeProvider colorScheme={scheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ ...customTheme, colorScheme: scheme }}
      >
        <SyncTailwindColorScheme scheme={scheme} />
        <Notifications />
        <BrowserRouter.RouterProvider />
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

function App() {
  return (
    <UserContextProvider>
      <FeatureFlagProvider>
        <QueryClientProvider client={queryClient}>
          <Theme />
        </QueryClientProvider>
      </FeatureFlagProvider>
    </UserContextProvider>
  );
}

export default App;
