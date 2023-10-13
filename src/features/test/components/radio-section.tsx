import { forwardRef } from "react";
import {
  ActionIcon,
  Avatar,
  Paper,
  Radio,
  SimpleGrid,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconVolume } from "@tabler/icons-react";

import RadioItem from "@/features/test/components/radio-item";
import { StudySet } from "@/shared/domains/study-set";

interface RadioSectionProps {
  questionResponse: StudySet["questionResponses"][number];
  form: UseFormReturnType<{
    [key: string]: string;
  }>;
  index: number;
  reveal: boolean;
}

const RadioSection = forwardRef<HTMLDivElement, RadioSectionProps>(
  ({ questionResponse, form, index, reveal }: RadioSectionProps, ref) => {
    const theme = useMantineTheme();

    if (!questionResponse.id) return null;

    return (
      <Paper p="md" shadow="sm" className="relative" ref={ref}>
        <Stack spacing="2rem">
          <Stack className="absolute left-[-1rem] top-0 translate-x-[-100%]">
            <Avatar color={theme.primaryColor} variant="filled" size="3rem">
              {index}
            </Avatar>
            <ActionIcon
              color={theme.primaryColor}
              variant="filled"
              size="3rem"
              onClick={() => questionResponse.speak()}
            >
              <IconVolume size="1.125rem" />
            </ActionIcon>
          </Stack>

          <Text weight="bold" size="lg">
            {questionResponse.question}
          </Text>
          <Radio.Group {...form.getInputProps(questionResponse.id.toString())}>
            <SimpleGrid cols={2}>
              {questionResponse.answers.map((option, index) => (
                <RadioItem
                  isSelected={form.values[questionResponse.id || -1] === option}
                  key={option}
                  index={index + 1}
                  value={option}
                  label={option}
                  isAnswer={questionResponse.correctAnswer === option}
                  reveal={reveal}
                />
              ))}
            </SimpleGrid>
          </Radio.Group>
        </Stack>
      </Paper>
    );
  },
);

export default RadioSection;
