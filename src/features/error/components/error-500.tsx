import { FallbackProps } from "react-error-boundary";
import { Box, Button, Container, Image, Stack, Text, Title } from "@mantine/core";
import * as Sentry from "@sentry/browser";

import { ASSET_404 } from "@/assets";

export default function Error500({ error }: FallbackProps) {
  Sentry.captureException(error);

  return (
    <Container h="100vh">
      <Stack justify="center" align="center" className="h-full" spacing="xl">
        <Box>
          <Title mb="md" align="center">
            Sorry, an error occurred!
          </Title>
          <Text align="center" color="dimmed" w={450}>
            Sorry, something went wrong. Please try again later. Refresh the page may help.
          </Text>
        </Box>
        <Image src={ASSET_404} width={300} />
        <Button onClick={window.location.reload}>Go to home</Button>
      </Stack>
    </Container>
  );
}
