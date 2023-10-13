import { ActionIcon, clsx, createStyles, Group, List, Paper, Stack, Text } from "@mantine/core";
import { IconNote, IconStar, IconVolume } from "@tabler/icons-react";

import { FLAGS, useFeatureFlag } from "@/configs/feature-flag";
import { Question } from "@/features/study-sets/domains/question";

interface Props {
  domain: Question;
}

const useStyles = createStyles(() => ({
  toolbar: {
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
}));

export default function Item({ domain }: Props) {
  const [FLAG_NOTE] = useFeatureFlag(FLAGS.NOTE);
  const { classes } = useStyles();

  return (
    <Paper className="group relative" p="xl">
      <Paper
        radius="md"
        shadow="md"
        className={clsx(
          "pointer-events-none absolute right-[-1rem] top-0 translate-x-[100%] !p-0 opacity-0 [transition:opacity_200ms_ease-in-out] group-hover:pointer-events-auto group-hover:opacity-100 md:hidden",
          classes.toolbar,
        )}
        data-toolbar
      >
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
      <Group className="items-start justify-start md:flex-col" noWrap>
        <Stack className="w-4/6 md:w-full">
          <Text className="whitespace-pre-line font-bold">{domain.question}</Text>
          <List type="ordered">
            {domain.answers.map((answer, index) => (
              <List.Item key={index}>
                <Text className="whitespace-pre-line">{answer}</Text>
              </List.Item>
            ))}
          </List>
        </Stack>
        <Text className="w-2/6 whitespace-pre-line font-bold md:w-full">
          {domain.correctAnswer}
        </Text>
      </Group>
    </Paper>
  );
}
