import { useId } from "react";
import { Avatar, Group, Paper, Radio, RadioProps, SimpleGrid, Stack, Text } from "@mantine/core";
import { useForm } from "@mantine/form";

interface Props extends RadioProps {
  index: number;
  isSelected: boolean;
}

function Item({ index, label, isSelected, ...rest }: Props) {
  const id = useId();

  return (
    <Paper p="md" withBorder component="label" htmlFor={id} className="cursor-pointer">
      <Radio className="hidden" id={id} {...rest} />
      <Group noWrap className="h-full">
        <Avatar radius="50%" color={isSelected ? "blue" : undefined}>
          {index}
        </Avatar>
        <Text>{label}</Text>
      </Group>
    </Paper>
  );
}

interface RadioSectionProps {
  choices: {
    id: string;
    index: number;
    content: string;
  }[];
  question: string;
  index: number;
}

export default function RadioSection({ choices, question, index }: RadioSectionProps) {
  const form = useForm({
    initialValues: {
      selected: null,
    },
  });

  return (
    <Paper p="md" shadow="sm">
      <Stack>
        <Group>
          <Avatar variant="filled">{index}</Avatar>
        </Group>
        <Text weight="bold" size="lg">
          {question}
        </Text>
        <Radio.Group {...form.getInputProps("selected")}>
          <SimpleGrid cols={2}>
            {choices.map((option) => (
              <Item
                isSelected={option.id === form.values.selected}
                key={option.id}
                index={option.index}
                value={option.id}
                label={option.content}
              />
            ))}
          </SimpleGrid>
        </Radio.Group>
      </Stack>
    </Paper>
  );
}
