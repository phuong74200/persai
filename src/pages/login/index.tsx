import { Box, Center, Container, Stack, Title } from "@mantine/core";
import { GoogleLogin } from "@react-oauth/google";

import useGoogleLogin from "@/features/auth/hooks/use-google-login";

export function LoginPage() {
  const { handleSuccess } = useGoogleLogin();

  return (
    <Container className="h-full">
      <Center className="h-full w-full">
        <Stack w={300}>
          <Box>
            <Title>Sign in to Persai</Title>
          </Box>
          <GoogleLogin onSuccess={handleSuccess} />
        </Stack>
      </Center>
    </Container>
  );
}
