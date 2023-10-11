import Marquee from "react-fast-marquee";
import { faker } from "@faker-js/faker";
import {
  Box,
  Button,
  createStyles,
  Group,
  Image,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { IconBrandGooglePlay } from "@tabler/icons-react";
import { motion } from "framer-motion";

import { ASSET_HOME_HERO } from "@/assets";
import useGoogleLogin from "@/features/auth/hooks/use-google-login";

const Review = () => {
  return (
    <Image
      src={faker.image.urlPicsumPhotos({ width: 1, height: 1 })}
      height={300}
      miw={400}
      radius="sm"
    />
  );
};

const useStyles = createStyles(() => ({
  container: {
    ".child": {
      marginRight: "1rem",
    },
  },
}));

export default function HomePage() {
  const { classes } = useStyles();
  const theme = useMantineTheme();

  const { handleSuccess } = useGoogleLogin();

  useGoogleOneTapLogin({
    onSuccess: handleSuccess,
  });

  return (
    <Stack spacing={0}>
      <section className="relative h-[100vh] w-[100vw] bg-oc-gray-6">
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
          style={{
            background: `radial-gradient(104.9% 104.9% at 14.34% -11.49%, rgba(22, 28, 36, 0.48) 0%, rgba(22, 28, 36, 0.80) 49.86%, #161C24 100%, #161C24 100%, #161C24 100%)`,
          }}
          className="absolute left-0 top-0 z-40 h-full w-full"
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
      <section className="relative h-[100vh] max-w-[100vw]">
        <Stack align="center" justify="center" className="h-full" spacing="1rem">
          <Stack spacing="1rem">
            <Title align="center" color="dimmed" size="sm">
              PERSAI
            </Title>
            <Title size="4rem" align="center" mb="4rem">
              What Persai helps you?
            </Title>

            <Marquee className={classes.container} autoFill={true}>
              <Review />
            </Marquee>
            <Marquee className={classes.container} autoFill={true} direction="right">
              <Review />
            </Marquee>
          </Stack>
        </Stack>
      </section>
    </Stack>
  );
}
