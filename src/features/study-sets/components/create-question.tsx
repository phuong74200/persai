import { useFieldArray, UseFormReturn } from "react-hook-form";
import { ActionIcon, Avatar, Button, Group, Paper, Stack, Textarea } from "@mantine/core";
import { IconFolderPlus, IconPlus, IconTrashXFilled } from "@tabler/icons-react";

import CreateChoice from "@/features/study-sets/components/create-choices";
import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";

type Props = {
  form: UseFormReturn<CreateSetFormType, unknown, undefined>;
};

export default function CreateQuestion({ form }: Props) {
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
      ],
      answer: 0,
    });

  return (
    <Stack spacing="1rem">
      {fields.map((_, index) => (
        <Paper withBorder p="md" className="relative" key={index}>
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
              {...form.register(`studySets.${index}.question`)}
            />
            <CreateChoice nestIndex={index} form={form} />
          </Stack>
        </Paper>
      ))}
      <Group noWrap mt="1rem">
        <Button
          variant="outline"
          fullWidth
          leftIcon={<IconPlus size="1rem" />}
          onClick={handleAppend}
        >
          Add new question
        </Button>
        <Button
          leftIcon={<IconFolderPlus size="1rem" />}
          type="submit"
          variant="filled"
          miw="199.94px"
        >
          Create study set
        </Button>
      </Group>
    </Stack>
  );
}
