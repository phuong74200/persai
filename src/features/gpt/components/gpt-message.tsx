import { Box, createStyles, Flex, Paper, Stack, Text } from "@mantine/core";

import GPTIcon from "@/assets/svg/gpt-icon";
import { MessageDomain } from "@/features/gpt/domains/message";

const useStyles = createStyles((theme) => {
  const colors = theme.fn.variant({
    variant: "light",
    color: "gray",
  });

  return {
    paper: {
      background: colors.background,
      maxWidth: "80%",
      marginRight: "auto",
      color: colors.color,
    },
  };
});

export default function GPTMessage({ domain }: { domain: MessageDomain }) {
  const { classes } = useStyles();

  return (
    <Flex gap="md">
      <Box className="h-8 w-8 overflow-hidden rounded-[50%]">
        <GPTIcon />
      </Box>
      <Stack className="flex-1" spacing={2}>
        <Text size="xs" color="dimmed">
          {domain.formatChatDate}
        </Text>
        <Paper p="md" className={classes.paper}>
          <Text>{domain.content}</Text>
        </Paper>
      </Stack>
    </Flex>
  );
}
