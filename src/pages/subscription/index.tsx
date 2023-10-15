import { Container, Group, SimpleGrid, Text } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";

import SubscriptionCard, {
  SubscriptionCardProps,
} from "@/features/subscription/components/subscription-card";

const tiers: SubscriptionCardProps[] = [
  {
    title: "Basic",
    paidType: "NO",
    price: (
      <Text align="center" weight="bold" size="4rem" className="leading-[0.875]">
        FREE
      </Text>
    ),
    description: [
      {
        title: "50 study sets",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Full learning methods",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Pomodoro supported",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "GPT 3.5 supported",
        icon: IconCheck,
        enabled: false,
      },
      {
        title: "With Ads",
        icon: IconCheck,
        enabled: false,
      },
      {
        title: "Must have internet",
        icon: IconCheck,
        enabled: false,
      },
      {
        title: "Personal customization",
        icon: IconCheck,
        enabled: false,
      },
    ],
    buttonText: "Sign up for free",
    buttonVariant: "outlined",
    level: 1,
  },
  {
    title: "Pro monthly",
    paidType: "MONTHLY",
    price: (
      <Group position="center">
        <Text className="self-start" color="dimmed">
          VND
        </Text>
        <Text weight="bold" size="4rem" className="leading-[0.875]">
          79,000
        </Text>
        <Text color="dimmed" className="self-end">
          /month
        </Text>
      </Group>
    ),
    description: [
      {
        title: "Unlimited personal study sets",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Full learning methods",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Pomodoro supported",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "GPT 3.5 supported",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "No ads",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Offline mode for mobile",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Personal customization",
        icon: IconCheck,
        enabled: true,
      },
    ],
    buttonText: "Get started",
    buttonVariant: "filled",
    level: 2,
  },
  {
    title: "Pro yearly",
    paidType: "YEARLY",
    price: (
      <Group position="center">
        <Text className="self-start" color="dimmed">
          VND
        </Text>
        <Text weight="bold" size="4rem" className="leading-[0.875]">
          790,000
        </Text>
        <Text color="dimmed" className="self-end">
          /yealy
        </Text>
      </Group>
    ),
    description: [
      {
        title: "16% cheaper",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Unlimited personal study sets",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Full learning methods",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Pomodoro supported",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "GPT 3.5 supported",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "No ads",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Offline mode for mobile",
        icon: IconCheck,
        enabled: true,
      },
      {
        title: "Personal customization",
        icon: IconCheck,
        enabled: true,
      },
    ],
    buttonText: "Get started",
    buttonVariant: "filled",
    level: 3,
  },
];

export default function SubscriptionPage() {
  return (
    <Container size="xl" className="h-full">
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: "md", cols: 2, spacing: "md" },
          { maxWidth: "sm", cols: 1, spacing: "sm" },
        ]}
      >
        {tiers.map((tier) => (
          <SubscriptionCard key={tier.title} {...tier} />
        ))}
      </SimpleGrid>
    </Container>
  );
}
