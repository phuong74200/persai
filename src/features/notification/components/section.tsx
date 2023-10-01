import { Avatar, createStyles, Flex, Paper, Stack, Text } from "@mantine/core";

import { Notification } from "@/features/notification/domains/notification";

const useStyles = createStyles((theme, { isRead }: { isRead: boolean }) => {
  const colors = theme.fn.variant({
    variant: "light",
    color: theme.primaryColor,
  });

  return {
    root: {
      background: isRead ? colors.background : theme.white,
      padding: theme.spacing.md,
    },
  };
});

export default function Section({ domain }: { domain: Notification }) {
  const { classes } = useStyles({ isRead: domain.isRead });

  return (
    <Paper className={classes.root}>
      <Flex gap="md" key={domain.id}>
        <Avatar src={domain.from.avatar} className="rounded-[50%]" />
        <Stack className="flex-1" spacing="xs">
          <Text>{domain.content}</Text>
          <Text size="xs" color="dimmed">
            {domain.getFormatTime}
          </Text>
        </Stack>
      </Flex>
    </Paper>
  );
}
