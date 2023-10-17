import { Container, Group, SimpleGrid, ThemeIcon, Title } from "@mantine/core";
import { IconLayersIntersect } from "@tabler/icons-react";

import AdsComponent from "@/features/study-sets/components/ad";
import FavoriteCard from "@/features/study-sets/components/favorite-card";
import useGetAllStudySet from "@/features/study-sets/hooks/use-get-all-study-set";

export default function StudySetPage() {
  const { data } = useGetAllStudySet();

  return (
    <Container mb="4rem">
      <Group align="center" mb="3rem" mt="2rem">
        <ThemeIcon size="3rem" variant="gradient">
          <IconLayersIntersect size="2rem" />
        </ThemeIcon>
        <Title>New study set</Title>
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
        <AdsComponent />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1973987809831735"
          crossOrigin="anonymous"
        ></script>
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
          }}
          data-ad-format="fluid"
          data-ad-layout-key="-6t+ed+2i-1n-4w"
          data-ad-client="ca-pub-1973987809831735"
          data-ad-slot="1617082468"
        ></ins>
        <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
      </SimpleGrid>
    </Container>
  );
}
