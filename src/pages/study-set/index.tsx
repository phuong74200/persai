import { Container, SimpleGrid, Title } from "@mantine/core";

export default function StudySetPage() {
  return (
    <Container>
      <Title mb="lg">Study set</Title>

      <SimpleGrid cols={3} spacing="lg">
        {/* {studySets.map((set) => (
          <FavoriteCard key={set.id} {...set} />
        ))} */}
      </SimpleGrid>
    </Container>
  );
}
