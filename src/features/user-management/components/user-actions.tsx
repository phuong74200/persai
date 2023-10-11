import { MouseEvent } from "react";
import { Button, Group } from "@mantine/core";
import { IconBan } from "@tabler/icons-react";

import { User } from "@/features/user-management/domains/user";
import useBanUser from "@/features/user-management/hooks/use-ban-user";
import useUnbanUser from "@/features/user-management/hooks/use-unban-user";

export default function UserActions({ domain }: { domain: User }) {
  const { ban } = useBanUser();
  const { unban } = useUnbanUser();

  const handleBan = (e: MouseEvent) => {
    e.stopPropagation();
    if (domain.id) ban({ user_id: domain.id });
  };

  const handleUnBan = (e: MouseEvent) => {
    e.stopPropagation();
    if (domain.id) unban({ user_id: domain.id });
  };

  return (
    <Group position="center">
      {domain.enabled ? (
        <Button
          fullWidth
          onClick={handleBan}
          variant="filled"
          color="red"
          leftIcon={<IconBan size="1rem" />}
        >
          Ban
        </Button>
      ) : (
        <Button
          fullWidth
          onClick={handleUnBan}
          variant="filled"
          color="blue"
          leftIcon={<IconBan size="1rem" />}
        >
          Unban
        </Button>
      )}
    </Group>
  );
}
