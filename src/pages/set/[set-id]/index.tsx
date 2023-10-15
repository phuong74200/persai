import { useParams } from "react-router-dom";
import { Carousel } from "@mantine/carousel";
import {
  Avatar,
  BackgroundImage,
  Box,
  Container,
  Group,
  HoverCard,
  Overlay,
  Paper,
  Rating,
  SimpleGrid,
  SimpleGridProps,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconAB2, IconBooks, IconCardsFilled } from "@tabler/icons-react";

import Item from "@/features/study-sets/components/item";
import LearnOption from "@/features/study-sets/components/learn-option";
import useGetStudySetById from "@/features/study-sets/hooks/use-get-study-set-by-id";
import useRedirect from "@/hooks/use-redirect";
import parseDec from "@/utils/parse-dec";

const books = ["book 1", "book 2", "book 3"];

const LearningMethods = (props: SimpleGridProps) => {
  const { onRedirect } = useRedirect();

  return (
    <SimpleGrid
      cols={4}
      breakpoints={[
        { maxWidth: "md", cols: 2, spacing: "md" },
        { maxWidth: "sm", cols: 1, spacing: "sm" },
      ]}
      {...props}
    >
      <LearnOption Icon={IconCardsFilled} label="Flashcards" onClick={onRedirect("flashcard")} />
      <LearnOption Icon={IconBooks} label="Learn" />
      <LearnOption Icon={IconAB2} label="Test" onClick={onRedirect("test")} />
      <LearnOption Icon={IconAB2} label="Match" />
    </SimpleGrid>
  );
};

export default function ViewSetPage() {
  const theme = useMantineTheme();

  const { setId } = useParams<{ setId: string }>();
  const { data } = useGetStudySetById(parseDec(setId));

  return (
    <Container>
      <Stack spacing="2rem">
        <Stack>
          <Title order={3}>The books that you may likes</Title>
          <Carousel
            slideSize={100 / 3 + "%"}
            breakpoints={[
              { maxWidth: "md", slideSize: "50%" },
              { maxWidth: "sm", slideSize: "100%" },
            ]}
            height={200}
            slideGap="md"
            loop
            withControls={false}
          >
            {books.map((book, index) => (
              <Carousel.Slide key={index} className="flex items-center justify-center">
                <Paper className="flex h-full w-full items-center justify-center">{book}</Paper>
              </Carousel.Slide>
            ))}
          </Carousel>
        </Stack>

        <BackgroundImage src={data?.feImageName || ""} w="100%" radius="md">
          <Overlay blur={10} radius="md" p="lg" className="h-fit" pos="relative" zIndex={1}>
            <Group position="apart" align="center" className="xs:flex-col">
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
                        {data?.creator?.userFullName}
                      </Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                      <Group>
                        <Avatar size={37.95}>BH</Avatar>
                        <div>
                          <Text>{data?.creator?.userFullName}</Text>
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

              <Rating value={3.5} fractions={2} className="flex-col xs:flex-row" readOnly />
            </Group>
          </Overlay>
        </BackgroundImage>

        <Group position="apart">
          <LearningMethods className="w-full" />
        </Group>
        <Stack>
          <Title order={3} className="whitespace-pre-wrap">
            There {data?.questionResponses.length == 1 ? "is only" : "are"}{" "}
            {data?.questionResponses.length} definition
            {data?.questionResponses.length == 1 ? "" : "s"} in this study set
          </Title>
          <Stack>
            {data?.questionResponses.map((item) => <Item key={item.id} domain={item} />)}
          </Stack>
        </Stack>
      </Stack>

      {/* <Affix position={{ bottom: "1rem", left: 275.5 }}>
        <Transition transition="slide-up" mounted={scroll.y > 400}>
          {(transitionStyles) => <LearningMethods style={transitionStyles} className="flex-col" />}
        </Transition>
      </Affix> */}
    </Container>
  );
}
