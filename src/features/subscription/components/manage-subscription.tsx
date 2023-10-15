import { Badge, Group, SimpleGrid } from "@mantine/core";

import { User } from "@/features/user-management/domains/user";

export default function ManageSubscription({ domain }: { domain: User }) {
  return (
    <Group noWrap spacing="sm">
      {domain.subscription && (
        <SimpleGrid cols={3}>
          <Badge variant="filled">{domain.subscription?.currentSubscriptionId}</Badge>
          <Badge variant="filled">{domain.subscription?.paidType}</Badge>
        </SimpleGrid>
      )}
    </Group>
  );
}
