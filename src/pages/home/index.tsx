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
  Image,
  Overlay,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandGooglePlay } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { ASSET_ANALYSTICS, ASSET_HOME_HERO } from "@/assets";
import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useLoremPicsum from "@/hooks/use-lorem-picsum";

const helps = [
  {
    title: "Personlized",
    description:
      "Persai helps you to learn with your own way. You can create your own study set with your own style.",
  },
  {
    title: "Interactive",
    description: "Engaging tools to enhance learning.",
  },
  {
    title: "Flashcard",
    description: "Flashcard is the most effective way to learn.",
  },
  {
    title: "AI Supported",
    description: "Persai uses AI to help you learn more effectively.",
  },
];

const Review = ({ title, desciption }: { title: string; desciption: string }) => {
  const image = useLoremPicsum({ height: 350, width: 350 });
  const theme = useMantineTheme();

  return (
    <Paper h={300} w={400} radius="sm" className="relative">
      <BackgroundImage className="h-full w-full" src={image} />
      <Overlay color="rgba(0,0,0,0.5)" p="lg">
        <Center className="h-full w-full">
          <Box>
            <Title align="center" color={theme.white}>
              {title}
            </Title>
            <Text align="center" color={theme.white}>
              {desciption}
            </Text>
          </Box>
        </Center>
      </Overlay>
    </Paper>
  );
};

const useStyles = createStyles(() => ({
  container: {
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
  const image = useLoremPicsum({ height: 300, width: 300 });

  return (
    <FavoriteCard
      className="h-full"
      domain={{
        createdAt: new Date().toISOString(),
        createdDay: new Date().toISOString(),
        id: 1,
        updatedAt: new Date().toISOString(),
        creator: {},
        feImageName: image,
        questionResponses: [],
        status: true,
        studySetName: "SWD",
        visibility: "PUBLIC",
      }}
    />
  );
};

export default function HomePage() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();

  return (
    <Stack spacing={0}>
      <section className="relative h-[100vh] bg-oc-gray-6">
        <motion.div
          initial={{ marginTop: -100, opacity: 0 }}
          animate={{ marginTop: 0, opacity: 0.3 }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="absolute z-10 h-full w-full"
        >
          <Image
            className="absolute right-12 top-1/2 translate-y-[-50%]"
            width={1200}
            src={ASSET_HOME_HERO}
          />
        </motion.div>
        <div
          className="absolute left-0 top-0 z-40 h-full w-full"
          style={{
            background: `radial-gradient(104.9% 104.9% at 14.34% -11.49%, rgba(22, 28, 36, 0.48) 0%, rgba(22, 28, 36, 0.80) 49.86%, #161C24 100%, #161C24 100%, #161C24 100%)`,
          }}
        />
        <Stack
          spacing="2rem"
          className="absolute left-12 top-1/2 z-40 max-w-4xl translate-y-[-50%]"
        >
          <Box>
            <Title color={theme.white} size="6rem">
              Start learning
            </Title>
            <Title color={theme.white} size="6rem">
              with{" "}
              <Text span color={theme.primaryColor}>
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
            <Button mt="1rem" w="fit-content" size="lg">
              Web
            </Button>
            <Button
              color="blue"
              mt="1rem"
              w="fit-content"
              size="lg"
              leftIcon={<IconBrandGooglePlay />}
            >
              Android
            </Button>
          </Group>
        </Stack>
      </section>
      <section className="relative h-[100vh]">
        <Stack align="center" justify="center" className="h-full" spacing="1rem">
          <Stack spacing="1rem">
            <Title align="center" color="dimmed" size="sm">
              PERSAI
            </Title>
            <Title size="4rem" align="center" mb="4rem">
              What Persai helps you?
            </Title>
          </Stack>
          <Container
            p={0}
            className={cx("flex flex-col gap-4 overflow-hidden", classes.marqueeContainer)}
          >
            <Marquee className={classes.container}>
              {helps.map((help, i) => (
                <Review key={i} title={help.title} desciption={help.description} />
              ))}
            </Marquee>
            <Marquee className={classes.container} direction="right">
              {helps.map((help, i) => (
                <Review key={i} title={help.title} desciption={help.description} />
              ))}
            </Marquee>
          </Container>
        </Stack>
      </section>
      <Container size="xl">
        <section className="relative h-[100vh]">
          <Stack
            spacing="1rem"
            align="left"
            className="absolute left-16 top-1/2 w-[500px] translate-y-[-50%]"
          >
            <Title color="dimmed" size="sm" transform="uppercase">
              Personal learning assistant
            </Title>
            <Title mb="md" size="4rem" ml="-0.25rem">
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
            <Button size="lg" variant="outline" className="w-fit">
              Explore now
            </Button>
          </Stack>
          <Box className="absolute right-16 top-1/2 h-[550px] w-[520px] translate-y-[-50%]">
            <Card
              shadow="md"
              className="pointer-events-none absolute left-0 top-0 z-20 h-full skew-y-[20deg]"
            >
              <Stack className="h-full w-[290px]">
                <SampleCard />
                <SampleCard />
              </Stack>
            </Card>
            <Card
              shadow="md"
              className="pointer-events-none absolute left-[100px] top-[-50px] z-10 skew-y-[20deg]"
            >
              <Stack className="h-full w-[290px]">
                <SampleCard />
                <SampleCard />
              </Stack>
            </Card>
            <Card
              shadow="md"
              className="pointer-events-none absolute left-[200px] top-[-100px] z-0 skew-y-[20deg]"
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
      <section className="relative h-[100vh]">
        <Title mt="14rem" align="center" color="dimmed" size="sm" transform="uppercase">
          Personal learning assistant
        </Title>
        <Title align="center" mb="md" size="4rem" ml="-0.25rem">
          Earn money
        </Title>
        <Title align="center" color="dimmed" size="sm" transform="uppercase">
          There more users the more money you makes
        </Title>
        <Image
          mt="7rem"
          width="50vw"
          src={ASSET_ANALYSTICS}
          mx="auto"
          className="translate-x-[50px]"
        />
      </section>
    </Stack>
  );
}
