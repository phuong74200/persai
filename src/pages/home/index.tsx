import Marquee from "react-fast-marquee";
import {
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Container,
  createStyles,
  Group,
  Overlay,
  Paper,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandGooglePlay } from "@tabler/icons-react";
import { motion } from "framer-motion";

import {
  ASSET_AI,
  ASSET_ANALYSTICS,
  ASSET_FLASHCARD,
  ASSET_HOME_HERO,
  ASSET_INTERACT,
  ASSET_PERSONALIZE,
} from "@/assets";
import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useRedirect from "@/hooks/use-redirect";
import { getRandomItemFromArray } from "@/utils/get-random-item-from-array";

const helps = [
  {
    title: "Personalized",
    description:
      "Persai helps you to learn with your own way. You can create your own study set with your own style.",
    img: ASSET_PERSONALIZE,
  },
  {
    title: "Interactive",
    description: "Engaging tools to enhance learning.",
    img: ASSET_INTERACT,
  },
  {
    title: "Flashcard",
    description: "Flashcard is the most effective way to learn.",
    img: ASSET_FLASHCARD,
  },
  {
    title: "AI Supported",
    description: "Persai uses AI to help you learn more effectively.",
    img: ASSET_AI,
  },
];

const Review = ({ title, description, img }: (typeof helps)[number]) => {
  const theme = useMantineTheme();

  return (
    <Paper h={300} w={400} radius="sm" className="relative">
      <BackgroundImage className="h-full w-full" src={img} />
      <Overlay color="rgba(0,0,0,0.5)" p="lg">
        <Center className="h-full w-full">
          <Box>
            <Title align="center" color={theme.white}>
              {title}
            </Title>
            <Text align="center" color={theme.white}>
              {description}
            </Text>
          </Box>
        </Center>
      </Overlay>
    </Paper>
  );
};

const useStyles = createStyles(() => ({
  container: {
    overflow: "hidden",

    ".child": {
      marginRight: "1rem",
    },
  },

  marqueeContainer: {
    position: "relative",
    "::before": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "10%",
      height: "100%",
      zIndex: 2,
      background: "linear-gradient(90deg, rgba(255,255,255,0.884) 0%, rgba(255,255,255,0) 100%)",
    },
    "::after": {
      content: '""',
      position: "absolute",
      top: 0,
      right: -1,
      width: "10%",
      height: "100%",
      zIndex: 2,
      transform: "scaleX(-1)",
      background: "linear-gradient(90deg, rgba(255, 255, 255, 0.884) 0%, rgba(255,255,255,0) 100%)",
    },
  },
}));

const SampleCard = () => {
  const img = getRandomItemFromArray([
    ASSET_HOME_HERO,
    ASSET_ANALYSTICS,
    ASSET_PERSONALIZE,
    ASSET_FLASHCARD,
    ASSET_INTERACT,
  ]);

  return (
    <FavoriteCard
      className="h-full"
      domain={{
        createdAt: new Date().toISOString(),
        createdDay: new Date().toISOString(),
        id: 1,
        updatedAt: new Date().toISOString(),
        creator: {},
        feImageName: img,
        questionResponses: [],
        status: true,
        studySetName: "SWD",
        visibility: "PUBLIC",
        map: new Map(),
        score: () => ({ correctAnswers: [], score: 0 }),
        shuffle: () => [],
      }}
    />
  );
};

export default function HomePage() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const { onRedirect } = useRedirect();

  return (
    <Stack spacing={0} mb="4rem" className="z-10">
      <section className="relative h-[100vh] bg-oc-gray-6">
        <motion.div
          initial={{ marginTop: -100, opacity: 0 }}
          animate={{ marginTop: 0, opacity: 0.3 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="absolute z-10 h-full w-full"
        >
          <picture>
            <source media="(min-width:1184px)" srcSet={ASSET_HOME_HERO} />
            <img
              className="absolute right-12 top-1/2 translate-y-[-50%]"
              width={1200}
              src="/"
              alt="hero"
            />
          </picture>
        </motion.div>
        <div
          className="absolute left-0 top-0 z-40 h-full w-full"
          style={{
            background: `radial-gradient(104.9% 104.9% at 14.34% -11.49%, rgba(22, 28, 36, 0.48) 0%, rgba(22, 28, 36, 0.80) 49.86%, #161C24 100%, #161C24 100%, #161C24 100%)`,
          }}
        />
        <Stack
          spacing="2rem"
          className="absolute left-12 top-1/2 z-40 max-w-4xl translate-y-[-50%] md:left-0 md:p-4"
        >
          <Box>
            <Title color={theme.white} size="6rem" className="sm:text-[4rem]">
              Start learning
            </Title>
            <Title color={theme.white} size="6rem" className="sm:text-[4rem]">
              with{" "}
              <Text span color="green">
                Persai
              </Text>
            </Title>
          </Box>

          <Text size="lg" className="max-w-2xl" color={theme.white}>
            Welcome to the next-generation online learning platform! Persai aims to transform your
            educational experience and offers cutting-edge tools to revolutionize how learning
            happens.
          </Text>

          <Group>
            <Button
              onClick={onRedirect("/login")}
              color="green"
              mt="1rem"
              w="fit-content"
              size="lg"
            >
              Web
            </Button>
            <Tooltip label="Comming soon">
              <Button
                color="blue"
                mt="1rem"
                w="fit-content"
                size="lg"
                leftIcon={<IconBrandGooglePlay />}
              >
                Android
              </Button>
            </Tooltip>
          </Group>
        </Stack>
      </section>
      <section className="relative h-[100vh]">
        <Stack align="center" justify="center" className="h-full" spacing="1rem">
          <Stack spacing="1rem">
            <Title align="center" color="dimmed" size="sm">
              PERSAI
            </Title>
            <Title size="4rem" className="sm:text-[3rem]" align="center" mb="4rem">
              What Persai helps you?
            </Title>
          </Stack>
          <Container
            p={0}
            className={cx(
              "flex flex-col gap-4 overflow-hidden lg:w-full",
              classes.marqueeContainer,
            )}
          >
            <Marquee className={classes.container}>
              {helps.map((help, i) => (
                <Review key={i} title={help.title} description={help.description} img={help.img} />
              ))}
            </Marquee>
            <Marquee className={classes.container} direction="right">
              {helps.map((help, i) => (
                <Review key={i} title={help.title} description={help.description} img={help.img} />
              ))}
            </Marquee>
          </Container>
        </Stack>
      </section>
      <Container size="xl">
        <section className="relative h-[100vh] items-center md:flex md:h-[70vh]">
          <Stack
            spacing="1rem"
            align="left"
            className="absolute left-16 top-1/2 w-[500px] translate-y-[-50%] lg:left-0 md:relative md:top-0 md:order-2 md:h-fit md:translate-y-0 sm:w-[auto]"
          >
            <Title color="dimmed" size="sm" transform="uppercase">
              Personal learning assistant
            </Title>
            <Title mb="md" size="4rem" ml="-0.25rem" className="sm:text-[3rem]">
              Diverse subjects
            </Title>
            <Title mb="md" color="dimmed" size="sm">
              Research shows that testing yourself with flashcards is more effective than rereading
              your notes. From math to medicine to modern languages,{" "}
              <Text span color="green">
                Persai
              </Text>{" "}
              is used by students in over 100 different subjects.
            </Title>
            <Button
              size="lg"
              variant="outline"
              className="w-fit"
              color="green"
              onClick={onRedirect("/login")}
            >
              Explore now
            </Button>
          </Stack>
          <Box className="absolute right-16 top-1/2 h-[550px] w-[520px] translate-y-[-50%] lg:right-[-2rem] md:relative md:top-0 md:order-1 md:hidden md:translate-y-0">
            <Card
              shadow="md"
              className="pointer-events-none absolute left-0 top-0 z-20 h-full skew-y-[20deg] lg:skew-y-0"
            >
              <Stack className="h-full w-[290px]">
                <SampleCard />
                <SampleCard />
              </Stack>
            </Card>
            <Card
              shadow="md"
              className="pointer-events-none absolute left-[100px] top-[-50px] z-10 skew-y-[20deg] lg:skew-y-0"
            >
              <Stack className="h-full w-[290px]">
                <SampleCard />
                <SampleCard />
              </Stack>
            </Card>
            <Card
              shadow="md"
              className="pointer-events-none absolute left-[200px] top-[-100px] z-0 skew-y-[20deg] lg:hidden"
              style={{
                fontSmooth: "subpixel-antialiased",
                backfaceVisibility: "hidden",
                transform: "skew(0deg, 20deg)",
              }}
            >
              <Stack className="h-full w-[290px]">
                <SampleCard />
                <SampleCard />
              </Stack>
            </Card>
          </Box>
        </section>
      </Container>
      <section className="relative h-[100vh] md:p-4">
        <Stack>
          <Title
            className="mt-[14rem] md:mt-0 md:text-left"
            align="center"
            color="dimmed"
            size="sm"
            transform="uppercase"
          >
            Share your study set
          </Title>
          <Title
            align="center"
            mb="md"
            size="4rem"
            ml="-0.25rem"
            className="md:text-left sm:text-[3rem]"
          >
            Earn money
          </Title>
          <Title mb="md" color="dimmed" size="sm">
            There more users the more money you makes
          </Title>
        </Stack>
        <BackgroundImage
          src={ASSET_ANALYSTICS}
          className="mt-[7rem] h-[50vh] bg-contain bg-no-repeat lg:translate-x-0"
        />
      </section>
    </Stack>
  );
}
