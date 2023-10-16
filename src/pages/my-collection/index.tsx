import { Container, Group, SimpleGrid, ThemeIcon, Title } from "@mantine/core";
import { IconLayersIntersect } from "@tabler/icons-react";

import FavoriteCardWithDelete from "@/features/study-sets/components/favorite-card-with-delete";
import useGetCurrentUserStudySet from "@/features/study-sets/hooks/use-get-current-user-study-set";

export default function MyCollectionPage() {
  const { data } = useGetCurrentUserStudySet();

  return (
    <Container mb="4rem">
      <Group align="center" mb="3rem" mt="2rem">
        <ThemeIcon size="3rem" variant="gradient">
          <IconLayersIntersect size="2rem" />
        </ThemeIcon>
        <Title>My collection</Title>
      </Group>

      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
      >
        {data?.map((set) => <FavoriteCardWithDelete key={set.id} domain={set} />)}
      </SimpleGrid>
    </Container>
  );
}
