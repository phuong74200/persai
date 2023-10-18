import { useFieldArray, UseFormReturn } from "react-hook-form";
import {
  ActionIcon,
  Button,
  Group,
  HoverCard,
  SimpleGrid,
  Textarea,
  useMantineTheme,
} from "@mantine/core";
import { IconCheck, IconPlus, IconTrashXFilled } from "@tabler/icons-react";

import { CreateSetFormType } from "@/features/study-sets/types/create-set-form-type";
import { StudySet } from "@/types/study-set";

type Props = {
  form: UseFormReturn<CreateSetFormType, unknown, undefined>;
  nestIndex: number;
};

export default function CreateChoice({ nestIndex, form }: Props) {
  // the reason why we need to use "as `studySets`"" is because of this issue:
  // https://github.com/react-hook-form/react-hook-form/issues/5318
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: `studySets.${nestIndex}.choices` as `studySets`,
  });
  const theme = useMantineTheme();

  const answer = form.watch(`studySets.${nestIndex}.answer`);

  const handleAppend = () => append({} as StudySet);
  const handleMarkAsAnswer = (index: number) => () =>
    form.setValue(`studySets.${nestIndex}.answer`, index);

  const colors = theme.fn.variant({
    color: "green",
    variant: "filled",
  });

  return (
    <SimpleGrid cols={2} breakpoints={[{ maxWidth: "md", cols: 1, spacing: "md" }]}>
      {fields.map((_, k) => (
        <HoverCard
          transitionProps={{
            duration: 0,
          }}
          shadow="md"
          key={k}
          position="top-end"
        >
          <HoverCard.Target>
            <Group noWrap>
              <ActionIcon
                onClick={handleMarkAsAnswer(k)}
                color="green"
                size="37px"
                variant="filled"
                className="hidden md:flex"
              >
                <IconCheck size="1.125rem" />
              </ActionIcon>
              <Textarea
                placeholder={`Choice ${k + 1}`}
                className="w-full [word-break:break-word]"
                minRows={1}
                autosize
                variant="filled"
                styles={{
                  input: {
                    background: answer === k ? colors.background : undefined,
                    borderColor: answer === k ? colors.border : undefined,
                    color: answer === k ? colors.color : undefined,
                    "::placeholder": {
                      color: answer === k ? colors.color : undefined,
                    },
                  },
                }}
                color="red"
                {...form.register(`studySets.${nestIndex}.choices.${k}.value`)}
              />
              <ActionIcon
                onClick={() => remove(k)}
                color="red"
                size="37px"
                variant="filled"
                className="hidden md:flex"
              >
                <IconTrashXFilled size="1.125rem" />
              </ActionIcon>
            </Group>
          </HoverCard.Target>
          <HoverCard.Dropdown p={0} className="border-none shadow-none md:hidden">
            <Group spacing="xs">
              <Button
                onClick={handleMarkAsAnswer(k)}
                leftIcon={<IconCheck size="1.125rem" />}
                color="green"
                size="xs"
              >
                Mark as answer
              </Button>
              <Button
                onClick={() => remove(k)}
                leftIcon={<IconTrashXFilled size="1.125rem" />}
                size="xs"
                color="red"
              >
                Remove
              </Button>
            </Group>
          </HoverCard.Dropdown>
        </HoverCard>
      ))}
      <Button
        variant="subtle"
        className="h-[38px] self-end border-dashed"
        leftIcon={<IconPlus size="1rem" />}
        onClick={handleAppend}
      >
        Add new choice
      </Button>
    </SimpleGrid>
  );
}
