import { Container, SimpleGrid, Title } from "@mantine/core";

import FavoriteCard from "@/features/study-sets/components/favorite-card";
import { studySets } from "@/mock/study-sets";

export default function MyCollectionPage() {
  return (
    <Container>
      <Title mb="lg">My collection</Title>

      <SimpleGrid cols={3} spacing="lg">
        {studySets.map((set) => (
          <FavoriteCard key={set.id} {...set} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
