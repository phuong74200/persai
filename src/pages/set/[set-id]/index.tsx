import { faker } from "@faker-js/faker";
import { Carousel } from "@mantine/carousel";
import {
  Affix,
  Box,
  Center,
  Container,
  Group,
  GroupProps,
  Rating,
  Stack,
  Text,
  Title,
  Transition,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconAB2, IconBooks, IconCardsFilled } from "@tabler/icons-react";

import { studyItems } from "@/features/flashcard/contexts/flashcard-context";
import Item from "@/features/study-sets/components/item";
import LearnOption from "@/features/study-sets/components/learn-option";
import useRedirect from "@/hooks/use-redirect";
import generateFilledArray from "@/utils/generate-filled-array";

const books = generateFilledArray(10, () => faker.airline.aircraftType());

const LearningMethods = (props: GroupProps) => {
  const { onRedirect } = useRedirect();

  return (
    <Group {...props}>
      <LearnOption Icon={IconCardsFilled} label="Flashcards" onClick={onRedirect("flashcard")} />
      <LearnOption Icon={IconBooks} label="Learn" />
      <LearnOption Icon={IconAB2} label="Test" />
    </Group>
  );
};

export default function ViewSetPage() {
  const [scroll] = useWindowScroll();

  return (
    <Container>
      <Stack spacing="xl">
        <Title>EXE 101</Title>
        <Group position="apart" align="center">
          <Box>
            <Title order={4} size="1.293103448rem">
              Visit this month
            </Title>
            <Text color="dimmed">213 visits</Text>
          </Box>
          <Box>
            <Rating size="lg" defaultValue={3} />
            <Text color="dimmed" align="right">
              1450 reviews
            </Text>
          </Box>
        </Group>
        <Stack>
          <Title order={3}>The books that others also view</Title>
          <Carousel slideSize={100 / 3 + "%"} height={200} slideGap="md" loop withControls={false}>
            {books.map((book, index) => (
              <Carousel.Slide key={index} className="flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center bg-oc-red-6">
                  {book}
                </div>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>
        <Center>
          <LearningMethods />
        </Center>
        <Stack spacing="0px">
          <Title order={3}>There are 42 definitions in this study set</Title>
          <Stack>
            <table style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}>
              <tbody>
                {studyItems.map((item) => (
                  <Item key={item.id} sides={item.sides} />
                ))}
              </tbody>
            </table>
          </Stack>
        </Stack>
      </Stack>

      <Affix position={{ bottom: "1rem", left: 275.5 }}>
        <Transition transition="slide-up" mounted={scroll.y > 400}>
          {(transitionStyles) => <LearningMethods style={transitionStyles} className="flex-col" />}
        </Transition>
      </Affix>
    </Container>
  );
}
