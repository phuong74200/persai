import { Avatar, Container, Group, Stack } from "@mantine/core";

import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";

export default function ProfileSettingPage() {
  const cache = useGetCurrentUserFromCache();

  return (
    <Container>
      <Stack>
        <Group>
          <Avatar size={14 * 10} src={cache?.state.data?.data.feImageName} />
        </Group>
      </Stack>
    </Container>
  );
}
