import { Button, Container, Stack, Title } from "@mantine/core";

import RadioSection from "@/features/test/components/radio-section";
import useTest from "@/features/test/hooks/use-test";
import { testOptions } from "@/mock/study-sets";

export default function LearnPage() {
  const { form, set } = useTest(testOptions);

  return (
    <Container size="sm">
      <Stack spacing="xl">
        <Title>EXE 101 TEST</Title>
        <Stack spacing="3rem">
          {set.map((quest, index) => (
            <RadioSection
              key={quest.id}
              id={quest.id}
              index={index + 1}
              choices={quest.choices}
              question={quest.question}
              form={form}
            />
          ))}

          <Button>Submit</Button>
        </Stack>
      </Stack>
    </Container>
  );
}
