import { KeyboardEvent } from "react";
import { ActionIcon, Flex, Textarea, useMantineTheme } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSend } from "@tabler/icons-react";

import { components } from "@/api/v1";
import { FLAGS, useFeatureFlag } from "@/configs/feature-flag";
import useSentChat from "@/features/gpt/hooks/use-sent-chat";

type RequestParams = components["schemas"]["GptMessageRequest"];

export default function TextBox() {
  const theme = useMantineTheme();
  const [chatGPT] = useFeatureFlag(FLAGS.CHAT_GPT);
  const { submit, isLoading } = useSentChat();
  const form = useForm<RequestParams>({
    initialValues: {
      content: "",
    },
  });

  const handleKey = (e: KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.key === "Enter" && e.altKey)
      return form.setValues({
        content: form.values.content + "\r\n",
      });
    if (e.key === "Enter") return submit(form)();
  };

  return (
    <Flex p="md" align="center" gap="xs">
      <Textarea
        disabled={!chatGPT || isLoading}
        maxRows={4}
        minRows={1}
        autosize
        onKeyUp={handleKey}
        className="w-full"
        placeholder="Send a message"
        {...form.getInputProps("content")}
      />
      <ActionIcon
        loading={isLoading}
        disabled={!chatGPT}
        variant="transparent"
        size={24}
        color={theme.primaryColor}
      >
        <IconSend size={24} onClick={submit(form)} />
      </ActionIcon>
    </Flex>
  );
}
