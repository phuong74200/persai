import { Card, CardProps, clsx, Image, Stack, Text } from "@mantine/core";

import useRedirect from "@/hooks/use-redirect";
import { StudySet } from "@/shared/domains/study-set";

interface Props extends Omit<CardProps, "children"> {
  domain: StudySet;
}

export default function FavoriteCard({ domain, className, ...rest }: Props) {
  const { onRedirect } = useRedirect();

  return (
    <Card
      onClick={onRedirect(`/set/${domain.id}`)}
      shadow="md"
      padding="lg"
      className={clsx("relative cursor-pointer", className)}
      {...rest}
    >
      <Card.Section>
        <Image src={domain.feImageName} alt="Norway" height={300} />
        <Stack className="absolute bottom-0 left-0 w-full" spacing={0}>
          {/* {domain.progress && (
            <Tooltip.Floating label={`${progress}%`}>
              <Progress value={progress} radius={0} />
            </Tooltip.Floating>
          )} */}
          <Stack p="lg" spacing={0} className="bg-oc-gray-0 bg-opacity-50 backdrop-blur-md">
            <Text weight={500}>{domain.studySetName}</Text>
            <Text size="xs">{domain.createdDay}</Text>
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  );
}
