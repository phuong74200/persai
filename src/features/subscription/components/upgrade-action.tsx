import { Button, Group } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import { UpgradeRequest } from "@/features/subscription/domains/upgrade-request";
import useRejectSubscription from "@/features/subscription/hooks/use-reject-subscription";
import useUpgradeSubscription from "@/features/subscription/hooks/use-upgrade-subscription";

export default function UpgradeAction({ domain }: { domain: UpgradeRequest }) {
  const { upgrade } = useUpgradeSubscription();
  const { reject } = useRejectSubscription();

  const handleUpgrade = () => {
    if (!domain.id) return;
    upgrade({
      upgradeRequestId: domain.id,
    });
  };

  const handleReject = () => {
    if (!domain.id) return;
    reject({
      upgradeRequestId: domain.id,
    });
  };

  return (
    <Group noWrap position="center">
      <Button
        compact
        variant="filled"
        color="green"
        size="sm"
        leftIcon={<IconCheck size="1rem" />}
        onClick={handleUpgrade}
        disabled={!domain.isPending}
      >
        APPROVE
      </Button>
      <Button
        compact
        variant="filled"
        color="orange"
        size="sm"
        leftIcon={<IconCheck size="1rem" />}
        onClick={handleReject}
        disabled={!domain.isPending}
      >
        REJECT
      </Button>
    </Group>
  );
}
