import { Box, Button, Container, Image, Stack, Text, Title } from "@mantine/core";

import { ASSET_404 } from "@/assets";

export default function Error404() {
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
        <Button>Go to home</Button>
      </Stack>
    </Container>
  );
}
