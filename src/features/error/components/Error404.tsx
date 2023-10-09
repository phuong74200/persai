import { Box, Button, Container, Image, Stack, Text, Title } from "@mantine/core";

import { ASSET_404 } from "@/assets";
import useRedirect from "@/hooks/use-redirect";

export default function Error404() {
  const { onRedirect } = useRedirect();

  return (
    <Container h="100vh">
      <Stack justify="center" align="center" className="h-full" spacing="xl">
        <Box>
          <Title mb="md" align="center">
            Sorry, page not found!
          </Title>
          <Text align="center" color="dimmed" w={450}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be
            sure to check your spelling.
          </Text>
        </Box>
        <Image src={ASSET_404} width={300} />
        <Button onClick={onRedirect("/login")}>Go to home</Button>
      </Stack>
    </Container>
  );
}
