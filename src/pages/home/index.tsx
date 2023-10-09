import { Box, Button, Image, Stack, Text, Title, useMantineTheme } from "@mantine/core";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { motion } from "framer-motion";

import { ASSET_HOME_HERO } from "@/assets";
import useGoogleLogin from "@/features/auth/hooks/use-google-login";

export default function HomePage() {
  const theme = useMantineTheme();

  const { handleSuccess } = useGoogleLogin();

  useGoogleOneTapLogin({
    onSuccess: handleSuccess,
  });

  return (
    <Stack>
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

          <Button mt="1rem" w="fit-content" size="lg">
            Get started
          </Button>
        </Stack>
      </section>
    </Stack>
  );
}
