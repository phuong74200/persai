import Wave from "react-wavify";
import {
  Anchor,
  Box,
  Button,
  Center,
  Container,
  Paper,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";
import { IconChevronLeft } from "@tabler/icons-react";

import { FeatureFlag, FLAGS } from "@/configs/feature-flag";
import useGoogleLogin from "@/features/auth/hooks/use-google-login";
import { Particles } from "@/features/study-sets/components/particles";
import useRedirect from "@/hooks/use-redirect";

export default function LoginPage() {
  const { handleSuccess } = useGoogleLogin();
  const theme = useMantineTheme();
  const { onRedirect } = useRedirect();

  return (
    <>
      <Container className="h-full sm:p-0">
        <FeatureFlag feature={FLAGS.LOGIN_PARTICLES}>
          <Particles />
        </FeatureFlag>
        <Center className="h-[100vh] w-full">
          <Stack className="sm:h-full sm:w-full">
            <Button
              onClick={onRedirect("/")}
              w="fit-content"
              leftIcon={<IconChevronLeft size="1rem" />}
              variant="light"
              className="sm:hidden"
            >
              Home
            </Button>
            <Paper
              p={0}
              shadow="lg"
              className="select-none overflow-hidden bg-oc-white bg-opacity-50 backdrop-blur-sm sm:h-full sm:bg-none"
            >
              <Stack>
                <Box className="relative h-[4.5rem] w-[400px] rotate-180 opacity-50 sm:absolute sm:bottom-0 sm:left-0 sm:w-full sm:rotate-0">
                  <Wave
                    fill={theme.colors.green[4]}
                    paused={false}
                    className="absolute bottom-0 left-0 z-0 mb-[-6px] px-[-6px]"
                    options={{
                      height: 20,
                      amplitude: 30,
                      speed: 0.15,
                      points: 4,
                    }}
                  />
                  <Wave
                    fill={theme.colors.green[6]}
                    paused={false}
                    className="absolute bottom-0 left-0 z-10 mb-[-6px]"
                    options={{
                      height: 40,
                      amplitude: 20,
                      speed: 0.15,
                      points: 4,
                    }}
                  />
                  <Wave
                    fill={theme.colors.green[8]}
                    paused={false}
                    className="absolute bottom-0 left-0 z-20 mb-[-6px]"
                    options={{
                      height: 60,
                      amplitude: 40,
                      speed: 0.15,
                      points: 4,
                    }}
                  />
                </Box>
              </Stack>
              <Stack
                p="lg"
                align="center"
                className="sm:absolute sm:left-1/2 sm:top-1/2 sm:translate-x-[-50%] sm:translate-y-[-50%]"
              >
                <Box>
                  <Title
                    className="mix-blend-multiply"
                    align="center"
                    order={2}
                    transform="uppercase"
                    mb="1rem"
                  >
                    Welcome to{" "}
                    <Text span color="green">
                      PerSai
                    </Text>
                  </Title>
                </Box>
                <GoogleLogin onSuccess={handleSuccess} />
                <Text align="center">
                  <Text align="center">By logging in, you agree to our</Text>
                  <Anchor align="center">Terms of Service</Anchor>
                </Text>
              </Stack>
            </Paper>
          </Stack>
        </Center>
      </Container>
    </>
  );
}
