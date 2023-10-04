import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Popover,
  ScrollArea,
  Stack,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { IconMessageChatbot, IconSend } from "@tabler/icons-react";

import GPTMessage from "@/features/gpt/components/gpt-message";
import SelfMessage from "@/features/gpt/components/self-message";
import { messages } from "@/mock/mesage";

export default function ChatBox() {
  const theme = useMantineTheme();

  return (
    <Popover
      width={400}
      position="top-end"
      withArrow
      shadow="md"
      transitionProps={{
        transition: "pop",
      }}
    >
      <Popover.Target>
        <Center className="h-[60px] w-[60px]">
          <ActionIcon color="green" variant="filled" className="rounded-[50%]" size="3rem">
            <IconMessageChatbot size="1.5rem" />
          </ActionIcon>
        </Center>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Stack spacing={0}>
          <Box pl="md" pt="md">
            <ScrollArea h={400} type="always" offsetScrollbars>
              <Stack px="xs" spacing="xl">
                {messages.map((message) =>
                  message.isSentByMe ? (
                    <SelfMessage key={message.id} domain={message} />
                  ) : (
                    <GPTMessage key={message.id} domain={message} />
                  ),
                )}
              </Stack>
            </ScrollArea>
          </Box>
          <Flex p="md" align="center" gap="xs">
            <Textarea maxRows={4} minRows={1} autosize className="w-full" />
            <ActionIcon variant="transparent" size={24} color={theme.primaryColor}>
              <IconSend size={24} />
            </ActionIcon>
          </Flex>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
