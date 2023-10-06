import { Button, Container, Stack, Title } from "@mantine/core";

import CheckboxSection from "@/features/test/components/checkbox-section";
import useTest from "@/features/test/hooks/use-test";
import { testOptions } from "@/mock/study-sets";

export default function TestPage() {
  const { form, set } = useTest(testOptions);

  return (
    <Container size="sm">
      <Stack spacing="xl">
        <Title>EXE 101 TEST</Title>
        <Stack spacing="2rem">
          {set.map((quest, index) => (
            <CheckboxSection
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
