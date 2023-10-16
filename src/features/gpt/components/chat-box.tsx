import { Dna } from "react-loader-spinner";
import {
  ActionIcon,
  Box,
  Center,
  Flex,
  Popover,
  ScrollArea,
  Stack,
  Textarea,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMessageChatbot, IconSend } from "@tabler/icons-react";

import { FeatureFlag, FLAGS, useFeatureFlag } from "@/configs/feature-flag";
import GPTMessage from "@/features/gpt/components/gpt-message";
import SelfMessage from "@/features/gpt/components/self-message";
import { MessageDomain } from "@/features/gpt/domains/message";
import generateFilledArray from "@/utils/generate-filled-array";

export const messages = generateFilledArray(
  100,
  (index) =>
    new MessageDomain({
      id: index.toString(),
      content: new Date().toLocaleTimeString(),
      createdAt: new Date(),
      sender: {
        id: index % 2 === 0 ? "me" : "gpt",
        name: index % 2 === 0 ? "me" : "gpt",
        avatar:
          "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
      },
    }),
);

export default function ChatBox() {
  const theme = useMantineTheme();
  const [chatGPT] = useFeatureFlag(FLAGS.CHAT_GPT);

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
          <ActionIcon
            color={theme.primaryColor}
            variant="filled"
            className="rounded-[50%]"
            size={53}
          >
            <IconMessageChatbot size="1.5rem" />
          </ActionIcon>
        </Center>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Stack spacing={0}>
          <Box pl="md" pt="md">
            <FeatureFlag
              feature={FLAGS.CHAT_GPT}
              fallbackElement={
                <Center className="h-[400px] w-full">
                  <Stack justify="center" align="center">
                    <Title size="1rem" align="center" className="leading-none" order={3} mt="1rem">
                      COMING SOON
                    </Title>
                    <Dna visible={true} height="80" width="80" ariaLabel="dna-loading" />
                  </Stack>
                </Center>
              }
            >
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
            </FeatureFlag>
          </Box>
          <Flex p="md" align="center" gap="xs">
            <Textarea disabled={!chatGPT} maxRows={4} minRows={1} autosize className="w-full" />
            <ActionIcon
              disabled={!chatGPT}
              variant="transparent"
              size={24}
              color={theme.primaryColor}
            >
              <IconSend size={24} />
            </ActionIcon>
          </Flex>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
