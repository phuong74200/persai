import { ReactNode } from "react";
import { Button, List, Paper, Stack, Text } from "@mantine/core";
import { IconCheck, TablerIconsProps } from "@tabler/icons-react";

import { operations } from "@/api/v1";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import useSubscriptionPayment from "@/features/subscription/hooks/use-subscription-payment";

export type SubscriptionCardProps = {
  title: string;
  price: ReactNode;
  paidType: operations["requestToUpgradeWithPayment"]["parameters"]["query"]["paidType"];
  description: {
    title: string;
    icon: (props: TablerIconsProps) => JSX.Element;
    enabled: boolean;
  }[];
  buttonText: string;
  buttonVariant: string;
  level: number;
};

const plans = {
  BASIC: 1,
  PRO_MONTHLY: 2,
  PRO_YEARLY: 3,
};

export default function SubscriptionCard({
  description,
  price,
  title,
  level,
  paidType,
}: SubscriptionCardProps) {
  const cache = useGetCurrentUserFromCache();
  const { fetch } = useSubscriptionPayment(paidType);

  const key = (cache?.subscription?.currentSubscriptionId +
    "_" +
    cache?.subscription?.paidType) as keyof typeof plans;

  const currentPlan = plans[key] || 1;

  return (
    <Paper shadow="md" p="2rem">
      <Stack spacing="4rem" className="h-full">
        <Text weight="bold" align="center" transform="uppercase" color="dimmed">
          {title}
        </Text>
        {price}
        <List spacing="xs" size="sm" center icon={<IconCheck size="1rem" />}>
          {description.map((item) => (
            <List.Item
              key={item.title}
              icon={
                <item.icon
                  size="1rem"
                  style={{
                    opacity: item.enabled ? 1 : 0.5,
                    color: item.enabled ? undefined : "#5a5a5a84",
                  }}
                />
              }
            >
              {item.title}
            </List.Item>
          ))}
        </List>
        <Button onClick={fetch} mt="auto" disabled={currentPlan >= level}>
          {currentPlan === level ? "Current plan" : "Choose plan"}
        </Button>
      </Stack>
    </Paper>
  );
}
