import { Container, Group, SimpleGrid, ThemeIcon, Title } from "@mantine/core";
import { IconLayersIntersect } from "@tabler/icons-react";

import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useGetCurrentUserStudySet from "@/features/study-sets/hooks/use-get-current-user-study-set";

export default function MyCollectionPage() {
  const { data } = useGetCurrentUserStudySet();

  return (
    <Container>
      <Group align="center">
        <ThemeIcon size="3rem" variant="gradient">
          <IconLayersIntersect size="2rem" />
        </ThemeIcon>
        <Title my="3rem">My collection</Title>
      </Group>

      <SimpleGrid cols={3} spacing="lg">
        {data?.map((set) => <FavoriteCard key={set.id} domain={set} />)}
      </SimpleGrid>
    </Container>
  );
}
