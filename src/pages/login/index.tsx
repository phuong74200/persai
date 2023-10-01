import { Box, Center, Container, Stack, Title } from "@mantine/core";

import { GoogleButton } from "@/features/auth/components/google-button";

export function LoginPage() {
  return (
    <Container className="h-full">
      <Center className="h-full w-full">
        <Stack w={300}>
          <Box>
            <Title>Sign in to Persai</Title>
            {/* <Text color="dimmed">Enter your detail below</Text> */}
          </Box>
          <GoogleButton>Login with google</GoogleButton>
        </Stack>
      </Center>
    </Container>
  );
}
