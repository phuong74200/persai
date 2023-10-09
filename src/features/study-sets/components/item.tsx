import { ActionIcon, clsx, createStyles, List, Paper, Stack, Text } from "@mantine/core";
import { IconNote, IconStar, IconVolume } from "@tabler/icons-react";

import { FLAGS, useFeatureFlag } from "@/configs/feature-flag";
import { Question } from "@/features/study-sets/domains/question";

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

interface Props {
  domain: Question;
}

export default function Item({ domain }: Props) {
  const { classes } = useStyles();
  const [FLAG_NOTE] = useFeatureFlag(FLAGS.NOTE);

  return (
    <tr className={clsx(classes.row, "relative")}>
      <td>
        <Stack>
          <Text className="whitespace-pre-line font-bold">{domain.question}</Text>
          <List type="ordered">
            {domain.answers.map((answer, index) => (
              <List.Item key={index}>
                <Text className="whitespace-pre-line">{answer}</Text>
              </List.Item>
            ))}
          </List>
        </Stack>
      </td>
      <td className="absolute right-[-1rem] top-0 translate-x-[100%] !p-0">
        <Paper radius="md" shadow="md">
          <Stack spacing={0}>
            {FLAG_NOTE && (
              <ActionIcon size="3rem">
                <IconNote size="1.125rem" />
              </ActionIcon>
            )}
            <ActionIcon size="3rem">
              <IconStar size="1.125rem" />
            </ActionIcon>
            <ActionIcon size="3rem" onClick={() => domain.speak()}>
              <IconVolume size="1.125rem" />
            </ActionIcon>
          </Stack>
        </Paper>
      </td>
      <td>
        <Text className="whitespace-pre-line font-bold">{domain.correctAnswer}</Text>
      </td>
    </tr>
  );
}
