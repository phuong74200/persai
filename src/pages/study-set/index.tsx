import { Container, Group, SimpleGrid, ThemeIcon, Title } from "@mantine/core";
import { IconLayersIntersect } from "@tabler/icons-react";

import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useGetAllStudySet from "@/features/study-sets/hooks/use-get-all-study-set";

export default function StudySetPage() {
  const { data } = useGetAllStudySet();

  return (
    <Container>
      <Group align="center" mb="3rem" mt="2rem">
        <ThemeIcon size="3rem" variant="gradient">
          <IconLayersIntersect size="2rem" />
        </ThemeIcon>
        <Title className="sm:text-oc-green-6 md:text-oc-red-6">New study set</Title>
      </Group>

      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
        spacing="lg"
      >
        {data?.map((set) => <FavoriteCard key={set.id} domain={set} />)}
      </SimpleGrid>
    </Container>
  );
}
