import Markdown from "react-markdown";
import { Box, Code, createStyles, Flex, Paper, Stack, Text } from "@mantine/core";
import { Prism, PrismProps } from "@mantine/prism";

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
      maxWidth: 250,
      marginRight: "auto",
      color: colors.color,
      overflow: "hidden",
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
        <Paper px="md" className={classes.paper}>
          <Markdown
            components={{
              code(props) {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                const { children, className, ref, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");

                return match ? (
                  <Prism.Tabs defaultValue={match[1]}>
                    <Prism.TabsList>
                      <Prism.Tab value={match[1]}>{match[1]}</Prism.Tab>
                    </Prism.TabsList>
                    <Prism.Panel
                      value={match[1]}
                      colorScheme="dark"
                      language={match[1] as PrismProps["language"]}
                    >
                      {String(children).replace(/\n$/, "")}
                    </Prism.Panel>
                  </Prism.Tabs>
                ) : (
                  <Code {...rest} className={className}>
                    {children}
                  </Code>
                );
              },
            }}
          >
            {domain.gptAnswer}
          </Markdown>
        </Paper>
      </Stack>
    </Flex>
  );
}
