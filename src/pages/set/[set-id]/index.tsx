import { useParams } from "react-router-dom";
import { faker } from "@faker-js/faker";
import { Carousel } from "@mantine/carousel";
import {
  Affix,
  Avatar,
  BackgroundImage,
  Box,
  Container,
  Group,
  GroupProps,
  HoverCard,
  Overlay,
  Paper,
  Rating,
  Stack,
  Text,
  Title,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconAB2, IconBooks, IconCardsFilled } from "@tabler/icons-react";

import Item from "@/features/study-sets/components/item";
import LearnOption from "@/features/study-sets/components/learn-option";
import useGetStudySetById from "@/features/study-sets/hooks/use-get-study-set-by-id";
import useRedirect from "@/hooks/use-redirect";
import generateFilledArray from "@/utils/generate-filled-array";
import parseDec from "@/utils/parse-dec";

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
  const theme = useMantineTheme();

  const [scroll] = useWindowScroll();
  const { setId } = useParams<{ setId: string }>();
  const { data } = useGetStudySetById(parseDec(setId));

  return (
    <Container>
      <Stack spacing="2rem">
        <Stack>
          <Title order={3}>The books that you may likes</Title>
          <Carousel slideSize={100 / 3 + "%"} height={200} slideGap="md" loop withControls={false}>
            {books.map((book, index) => (
              <Carousel.Slide key={index} className="flex items-center justify-center">
                <Paper className="flex h-full w-full items-center justify-center">{book}</Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>

        <BackgroundImage src={data?.feImageName || ""} w="100%">
          <Overlay blur={10} radius="md" p="lg" className="h-fit" pos="relative">
            <Group position="apart" align="center">
              <Stack>
                <Title color={theme.white} className="uppercase">
                  {data?.studySetName}
                </Title>
                <Box>
                  <Text span color={theme.white}>
                    Posted by{" "}
                  </Text>
                  <HoverCard>
                    <HoverCard.Target>
                      <Text className="cursor-pointer" underline span color={theme.white}>
                        {data?.userFullName}
                      </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Group>
                        <Avatar size={37.95}>BH</Avatar>
                        <div>
                          <Text>{data?.userFullName}</Text>
                          <Text size="xs" color="dimmed">
                            user@email.com
                          </Text>
                        </div>
                      </Group>
                    </HoverCard.Dropdown>
                  </HoverCard>
                </Box>
                <Text span color={theme.white}>
                  Created on {data?.createdDay}
                </Text>
              </Stack>

              <Rating value={3.5} fractions={2} className="flex-col" readOnly />
            </Group>
          </Overlay>
        </BackgroundImage>

        <Group position="apart">
          <LearningMethods />
        </Group>
        <Stack spacing="0px">
          <Title order={3}>
            There are {data?.questionResponses.length} definitions in this study set
          </Title>
          <Stack>
            <table style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}>
              <tbody>
                {data?.questionResponses.map((item) => <Item key={item.id} domain={item} />)}
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
