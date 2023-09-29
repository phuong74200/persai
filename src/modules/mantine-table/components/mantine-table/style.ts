import { createStyles, MantineColor, MantineSize, Variants } from "@mantine/core";

export interface AdvanceTableStylesParams {
  color: MantineColor;
  radius: MantineSize;
  variant: Variants<"filled" | "outline" | "light" | "white" | "default" | "subtle" | "gradient">;

  stickyHeader: boolean;
  withBorder: boolean;
}

export const useStyles = createStyles(
  (theme, { color, radius, stickyHeader, variant, withBorder }: AdvanceTableStylesParams) => {
    const colors = theme.fn.variant({ variant, color });

    return {
      root: {
        overflow: "auto",
        borderRadius: theme.radius[radius],
        position: "relative",
        width: "fit-content",
        borderBottom: withBorder ? `1px solid ${colors.background}` : "none",

        "&::-webkit-scrollbar": {
          display: "none",
        },
      },

      table: {
        borderCollapse: "separate",
        borderSpacing: 0,

        th: {
          borderTop: withBorder ? `1px solid ${colors.border}` : "none",
          borderBottom: withBorder ? `1px solid ${colors.border}` : "none",
          borderRight: withBorder ? `1px solid ${colors.border}` : "none",

          "&:first-of-type": {
            borderLeft: withBorder ? `1px solid ${colors.border}` : "none",
          },
        },
        td: {
          borderBottom: withBorder ? `1px solid ${colors.background}` : "none",
          borderRight: withBorder ? `1px solid ${colors.background}` : "none",

          "&:first-of-type": {
            borderLeft: withBorder ? `1px solid ${colors.background}` : "none",
          },
        },

        "tr:last-of-type": {
          td: {
            borderBottom: "none",
          },
        },
      },

      header: {
        position: stickyHeader ? "sticky" : "initial",
        background: colors.background,
        color: colors.color,
        boxShadow: stickyHeader ? theme.shadows.md : "none",
        zIndex: 1,
        top: 0,
      },

      dataRow: {},
      headRow: {},

      cell: {},
    };
  },
);
