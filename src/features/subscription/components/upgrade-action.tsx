import { Button } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import { UpgradeRequest } from "@/features/subscription/domains/upgrade-request";
import useUpgradeSubscription from "@/features/subscription/hooks/use-upgrade-subscription";

export default function UpgradeAction({ domain }: { domain: UpgradeRequest }) {
  const { upgrade } = useUpgradeSubscription();

  const handleUpgrade = () => {
    if (!domain.id) return;
    upgrade({
      upgradeRequestId: domain.id,
    });
  };

  return (
    <Button
      variant="filled"
      color="green"
      size="sm"
      leftIcon={<IconCheck size="1rem" />}
      onClick={handleUpgrade}
      disabled={!domain.isPending}
    >
      Approve
    </Button>
  );
}
