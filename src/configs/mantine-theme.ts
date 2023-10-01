import { MantineThemeOverride } from "@mantine/core";

import { breakpoints, fontFamilyMonospace } from "@/configs/theme";
import { toMantineBreakpoint } from "@/utils/breakpoint-converter";

export const customMantineTheme: MantineThemeOverride = {
  breakpoints: toMantineBreakpoint(breakpoints),
  primaryColor: "green",
  colorScheme: "dark",
  // fontFamily: "Poppins, sans-serif",
  fontFamilyMonospace,
  colors: {},
  components: {
    AppShell: {
      styles: () => ({
        root: {
          display: "flex",
          flexDirection: "column",
        },
        body: {
          flex: 1,
        },
        main: {
          minHeight: "unset",
        },
      }),
    },
    Container: {
      defaultProps: {
        sizes: toMantineBreakpoint(breakpoints),
        size: "lg",
      },
    },
    Badge: {
      styles: (theme) => ({
        root: {
          borderRadius: theme.radius.md,
        },
      }),
    },
    Carousel: {
      styles: (theme) => ({
        viewport: {
          borderRadius: theme.radius.sm,
        },
      }),
    },
    InputWrapper: {
      styles: () => ({
        label: {
          fontWeight: "bold",
          marginBottom: 4,
        },
      }),
    },
    Modal: {
      defaultProps: {
        overlayProps: {
          blur: 3,
          opacity: 0.3,
        },

        transitionProps: {
          exitTransitionDuration: 300,
          transition: "pop",
        },
      },
    },
  },
};
