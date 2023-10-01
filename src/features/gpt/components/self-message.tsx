import { createStyles, Paper, Stack, Text } from "@mantine/core";

import { MessageDomain } from "@/features/gpt/domains/message";

const useStyles = createStyles((theme) => {
  const colors = theme.fn.variant({
    variant: "filled",
    color: theme.colorScheme,
  });

  return {
    paper: {
      background: colors.background,
      maxWidth: "80%",
      marginLeft: "auto",
      color: colors.color,
    },
  };
});

export default function SelfMessage({ domain }: { domain: MessageDomain }) {
  const { classes } = useStyles();

  return (
    <Stack spacing="xs">
      <Text size="xs" color="dimmed" ml="auto">
        {domain.formatChatDate}
      </Text>
      <Paper p="md" className={classes.paper}>
        <Text>{domain.content}</Text>
      </Paper>
    </Stack>
  );
}
