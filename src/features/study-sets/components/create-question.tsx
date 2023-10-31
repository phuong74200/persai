import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ActionIcon, Avatar, Button, Group, Paper, Stack, Textarea } from "@mantine/core";
import { IconFolderPlus, IconPlus, IconTrashXFilled } from "@tabler/icons-react";
import { motion } from "framer-motion";

import CreateChoice from "@/features/study-sets/components/create-choices";
import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";

type Props = {
  form: UseFormReturn<CreateSetFormType, unknown, undefined>;
  isLoading: boolean;
};

export default function CreateQuestion({ form, isLoading }: Props) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "studySets",
  });

  const handleAppend = () =>
    append({
      question: "",
      choices: [
        {
          value: "",
        },
        {
          value: "",
        },
        {
          value: "",
        },
      ],
      answer: 0,
      gptGenerated: false,
    });

  return (
    <Stack spacing="1rem">
      {fields.map((_, index) => (
        <motion.div
          key={index}
          initial={{
            opacity: 0,
            y: 100,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <Paper p="md" shadow="sm" className="relative">
            <Stack>
              <Group position="apart">
                <Avatar size="2rem" variant="light">
                  {index + 1}
                </Avatar>
                <Group>
                  <ActionIcon size="2rem" color="red" variant="light" onClick={() => remove(index)}>
                    <IconTrashXFilled size="1.125rem" />
                  </ActionIcon>
                </Group>
              </Group>
              <Textarea
                className="w-full [word-break:break-word] [&_textarea]:font-bold"
                minRows={1}
                autosize
                placeholder="Question"
                size="lg"
                variant="filled"
                {...form.register(`studySets.${index}.question`)}
              />
              <CreateChoice nestIndex={index} form={form} />
            </Stack>
          </Paper>
        </motion.div>
      ))}
      <Group noWrap mt="1rem" className="md:flex-col">
        <Button
          variant="outline"
          fullWidth
          leftIcon={<IconPlus size="1rem" />}
          onClick={handleAppend}
          className="h-[38px]"
        >
          Add new question
        </Button>
        <Button
          leftIcon={<IconFolderPlus size="1rem" />}
          type="submit"
          variant="filled"
          className="h-[38px] min-w-[199.94px] md:w-full"
          loading={isLoading}
        >
          Create study set
        </Button>
      </Group>
    </Stack>
  );
}
