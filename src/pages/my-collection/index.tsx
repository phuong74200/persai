import { Container, SimpleGrid, Title } from "@mantine/core";

import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useGetCurrentUserStudySet from "@/features/study-sets/hooks/use-get-current-user-study-set";

export default function MyCollectionPage() {
  const { data } = useGetCurrentUserStudySet();

  return (
    <Container>
      <Title mb="lg">My collection</Title>

      <SimpleGrid cols={3} spacing="lg">
        {data?.map((set) => <FavoriteCard key={set.id} domain={set} />)}
      </SimpleGrid>
    </Container>
  );
}
