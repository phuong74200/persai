import { useId } from "react";
import {
  Avatar,
  Checkbox,
  CheckboxGroupProps,
  CheckboxProps,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";

interface Props extends CheckboxProps {
  index: number;
  isSelected: boolean;
}

function Item({ index, label, isSelected, ...rest }: Props) {
  const theme = useMantineTheme();
  const id = useId();

  return (
    <Paper p="md" withBorder component="label" htmlFor={id} className="cursor-pointer">
      <Checkbox className="hidden" id={id} {...rest} />
      <Group noWrap className="h-full">
        <Avatar color={isSelected ? theme.primaryColor : undefined}>{index}</Avatar>
        <Text>{label}</Text>
      </Group>
    </Paper>
  );
}

interface CheckboxSectionProps extends Omit<CheckboxGroupProps, "children"> {
  choices: {
    id: string;
    index: number;
    content: string;
  }[];
  question: string;
  index: number;
  form: UseFormReturnType<string[]>;
}

export default function CheckboxSection({ choices, question, index, form }: CheckboxSectionProps) {
  return (
    <Paper p="md" shadow="sm">
      <Stack>
        <Group>
          <Avatar variant="filled">{index}</Avatar>
        </Group>
        <Text weight="bold" size="lg">
          {question}
        </Text>
        <Checkbox.Group {...form.getInputProps("s")}>
          <SimpleGrid cols={2}>
            {choices.map((option) => (
              <Item
                isSelected={false}
                key={option.id}
                index={option.index}
                value={option.id}
                label={option.content}
              />
            ))}
          </SimpleGrid>
        </Checkbox.Group>
      </Stack>
    </Paper>
  );
}
