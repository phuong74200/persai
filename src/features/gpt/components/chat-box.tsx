import { Fragment, useEffect, useRef } from "react";
import { Dna } from "react-loader-spinner";
import {
  ActionIcon,
  Box,
  Center,
  Popover,
  ScrollArea,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconMessageChatbot } from "@tabler/icons-react";

import { FeatureFlag, FLAGS } from "@/configs/feature-flag";
import GPTMessage from "@/features/gpt/components/gpt-message";
import SelfMessage from "@/features/gpt/components/self-message";
import TextBox from "@/features/gpt/components/text-box";
import useGetChat from "@/features/gpt/hooks/use-get-chat";

export default function ChatBox() {
  const theme = useMantineTheme();
  const query = useGetChat();
  const viewport = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (viewport.current)
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: "smooth" });
  }, [query.dataUpdatedAt]);

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
              <ScrollArea viewportRef={viewport} h={400} type="always" offsetScrollbars>
                <Stack px="xs" spacing="xl">
                  {query.data?.map((message) => (
                    <Fragment key={message.id}>
                      <SelfMessage domain={message} />
                      <GPTMessage domain={message} />
                    </Fragment>
                  ))}
                </Stack>
              </ScrollArea>
            </FeatureFlag>
          </Box>
          <TextBox />
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
