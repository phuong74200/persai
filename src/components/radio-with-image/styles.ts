import { createStyles, getSize, getStylesRef, MantineColor, rem } from "@mantine/core";

export interface RadioWithImageStylesParams {
  color: MantineColor;
  transitionDuration: number;
  error: boolean;
  checked: boolean;
}

const sizes = {
  xs: rem(16),
  sm: rem(20),
  md: rem(24),
  lg: rem(30),
  xl: rem(36),
};

const iconSizes = {
  xs: rem(6),
  sm: rem(8),
  md: rem(10),
  lg: rem(14),
  xl: rem(16),
};

export const useStyles = createStyles(
  (theme, { color, transitionDuration, error, checked }: RadioWithImageStylesParams, { size }) => {
    const colors = theme.fn.variant({ variant: "filled", color });
    const activeColor = theme.fn.variant({ variant: "light", color });
    const errorColor = theme.fn.variant({ variant: "filled", color: "red" }).background;

    return {
      disabled: {
        opacity: 0.5,
        cursor: "not-allowed",
      },

      image: {
        objectFit: "cover",
        width: 64,
        height: "100%",
      },

      inner: {
        position: "relative",
      },

      root: {
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        cursor: "pointer",

        border: `${rem(1)} solid ${
          error
            ? errorColor
            : checked
            ? colors.background
            : theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
        backgroundColor: activeColor.background,
        padding: theme.spacing.xs,

        borderRadius: theme.radius.sm,
        transition: `border ${transitionDuration}ms ${theme.transitionTimingFunction}`,
      },

      details: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: theme.spacing.xs,
      },

      label: {
        fontWeight: "bold",
        fontSize: theme.fontSizes.sm,
      },

      description: {
        fontSize: theme.fontSizes.sm,
      },

      imageWrapper: {
        borderRadius: theme.radius.sm,
        overflow: "hidden",
      },

      icon: {
        ref: getStylesRef("icon"),
        color: theme.white,
        opacity: 0,
        transform: `scale(0.75) translateY(${rem(2)})`,
        transition: `opacity ${transitionDuration}ms ${theme.transitionTimingFunction}`,
        pointerEvents: "none",
        width: getSize({ sizes: iconSizes, size }),
        height: getSize({ sizes: iconSizes, size }),
        position: "absolute",
        top: `calc(50% - ${getSize({ sizes: iconSizes, size })} / 2)`,
        left: `calc(50% - ${getSize({ sizes: iconSizes, size })} / 2)`,
      },

      radio: {
        ...theme.fn.focusStyles(),
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
        border: `${rem(1)} solid ${
          error
            ? errorColor
            : theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[4]
        }`,
        position: "relative",
        appearance: "none",
        width: getSize({ sizes, size }),
        height: getSize({ sizes, size }),
        borderRadius: getSize({ sizes, size }),
        margin: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transitionProperty: "background-color, border-color",
        transitionTimingFunction: theme.transitionTimingFunction,
        transitionDuration: `${transitionDuration}ms`,
        cursor: theme.cursorType,

        "&:checked": {
          background: colors.background,
          borderColor: colors.background,

          [`& + .${getStylesRef("icon")}`]: {
            opacity: 1,
            transform: "scale(1)",
          },
        },

        "&:disabled": {
          borderColor: theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[4],
          backgroundColor:
            theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[1],

          [`& + .${getStylesRef("icon")}`]: {
            color: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[4],
          },
        },
      },
    };
  },
);
