import { ActionIcon, clsx, createStyles, Group, List, Paper, Stack, Text } from "@mantine/core";
import { IconStar, IconVolume } from "@tabler/icons-react";

import NoteZone from "@/features/study-sets/components/note-zone";
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
  const { classes } = useStyles();

  return (
    <NoteZone.Provider domain={domain}>
      <Stack className="group relative">
        <Paper
          radius="md"
          shadow="md"
          className={clsx(
            "pointer-events-none absolute right-[-1rem] top-0 w-fit translate-x-[100%] !p-0 opacity-0 [transition:opacity_200ms_ease-in-out] group-hover:pointer-events-auto group-hover:opacity-100 xl:relative xl:right-0 xl:translate-x-0 xl:opacity-100 xl:before:hidden",
            classes.toolbar,
          )}
          data-toolbar
        >
          <Stack spacing={0} className="xl:flex-row">
            <NoteZone.Trigger />
            <ActionIcon size="3rem">
              <IconStar size="1.125rem" />
            </ActionIcon>
            <ActionIcon size="3rem" onClick={() => domain.speak()}>
              <IconVolume size="1.125rem" />
            </ActionIcon>
          </Stack>
        </Paper>
        <Group
          className="w-full items-start justify-start md:flex-col md:gap-0"
          noWrap
          spacing="md"
        >
          <Paper p="xl" className="h-full w-4/6 md:w-full">
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
          </Paper>
          <Paper p="xl" className="w-2/6 self-stretch md:w-full">
            <Text className="whitespace-pre-line font-bold">{domain.correctAnswer}</Text>
          </Paper>
        </Group>
        <NoteZone.Textarea w="100%" autosize minRows={2} />
      </Stack>
    </NoteZone.Provider>
  );
}
