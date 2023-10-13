import { useState } from "react";
import { useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Container,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from "@mantine/core";

import RadioSection from "@/features/test/components/radio-section";
import useTest from "@/features/test/hooks/use-test";
import parseDec from "@/utils/parse-dec";

export default function TestPage() {
  const [reveal, setReveal] = useState(false);

  const { setId } = useParams<{ setId: string }>();
  const { form, questionResponses, studySet } = useTest(parseDec(setId, "-1"));

  const handleSubmit = () => {
    setReveal(true);
  };

  return (
    <Container>
      <Stack spacing="xl">
        <Title transform="uppercase">{studySet?.studySetName}</Title>
        <Group noWrap align="flex-start">
          <Stack spacing="3rem" w="100%">
            {questionResponses.map((quest, index) => (
              <RadioSection
                key={quest.id}
                questionResponse={quest}
                form={form}
                index={index + 1}
                reveal={reveal}
              />
            ))}
            <Button onClick={handleSubmit}>Submit</Button>
          </Stack>
          <Paper shadow="md" p="md" w={500} className="sticky top-20">
            <Stack spacing="md">
              <Title order={3}>TEST INFO</Title>
              <Text size="sm" weight={500}>
                Total questions:
              </Text>
              <SimpleGrid cols={6}>
                {Object.entries(form.values).map(([key, value], index) => (
                  <Avatar color={value ? "green" : "red"} className="w-full" key={key}>
                    {index + 1}
                  </Avatar>
                ))}
              </SimpleGrid>
            </Stack>
          </Paper>
        </Group>
      </Stack>
    </Container>
  );
}
