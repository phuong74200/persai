import { ActionIcon, clsx, createStyles, Paper, Stack, Text } from "@mantine/core";
import { IconStar, IconVolume } from "@tabler/icons-react";

interface Props {
  sides: readonly [
    {
      id: string;
      text: string;
    },
    {
      id: string;
      text: string;
    },
  ];
}

const useStyles = createStyles((theme) => ({
  row: {
    boxShadow: theme.shadows.md,
    verticalAlign: "text-top",
    background: theme.white,
    borderRadius: theme.radius.md,

    ".mantine-Paper-root": {
      opacity: 0,
      pointerEvents: "none",
      transition: "opacity 200ms ease-in-out",

      "&::before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        background: "transparent",
        left: "-1rem",
      },
    },

    "&:hover .mantine-Paper-root": {
      pointerEvents: "auto",
      opacity: 1,
    },

    td: {
      padding: theme.spacing.md,
    },

    "& td:first-of-type": {
      borderTopLeftRadius: theme.radius.md,
      borderBottomLeftRadius: theme.radius.md,
    },

    "& td:last-of-type": {
      borderTopRightRadius: theme.radius.md,
      borderBottomRightRadius: theme.radius.md,
    },
  },
}));

export default function Item({ sides }: Props) {
  const { classes } = useStyles();

  return (
    <tr className={clsx(classes.row, "relative")}>
      <td>
        <Text className="whitespace-pre-line">{sides[0].text}</Text>
      </td>
      <td className="absolute right-[-1rem] top-0 translate-x-[100%] !p-0">
        <Paper radius="md" shadow="md">
          <Stack spacing={0}>
            <ActionIcon size="3rem">
              <IconStar size="1.125rem" />
            </ActionIcon>
            <ActionIcon size="3rem">
              <IconVolume size="1.125rem" />
            </ActionIcon>
          </Stack>
        </Paper>
      </td>
      <td>
        <Text className="whitespace-pre-line">{sides[1].text}</Text>
      </td>
    </tr>
  );
}
