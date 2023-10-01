import { Card, Image, Progress, Stack, Text, Tooltip } from "@mantine/core";

interface Props {
  id: string;
  name: string;
  createdAt: string;
  image: string;
  progress: number;
}

export default function FavoriteCard({ createdAt, image, name, progress }: Props) {
  return (
    <Card shadow="md" padding="lg" className="relative cursor-pointer">
      <Card.Section>
        <Image src={image} alt="Norway" height={300} />
        <Stack className="absolute bottom-0 left-0 w-full" spacing={0}>
          {progress && (
            <Tooltip.Floating label={`${progress}%`}>
              <Progress value={progress} radius={0} />
            </Tooltip.Floating>
          )}
          <Stack p="lg" spacing={0} className="bg-oc-gray-0 bg-opacity-50 backdrop-blur-md">
            <Text weight={500}>{name}</Text>
            <Text size="xs">{createdAt}</Text>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}
