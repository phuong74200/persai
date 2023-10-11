import { useEffect } from "react";
import { Group, Select } from "@mantine/core";
import { useForm } from "@mantine/form";

import { components } from "@/api/v1";
import useGetAllSubscription from "@/features/subscription/hooks/use-get-all-subscription";
import useUpgradeSubscription from "@/features/subscription/hooks/use-upgrade-subscription";
import { User } from "@/features/user-management/domains/user";

const subscriptionSelection = [
  {
    value: "NO",
    label: "_",
  },
  {
    value: "MONTHLY",
    label: "Monthly",
  },
  {
    value: "YEARLY",
    label: "Yearly",
  },
];

type Form = {
  paidType: components["schemas"]["UpgradeSubscriptionRequest"]["paidType"];
  subscriptionId: string;
};

export default function ManageSubscription({ domain }: { domain: User }) {
  const form = useForm<Form>({
    initialValues: {
      paidType: domain.subscription?.paidType || "NO",
      subscriptionId: domain.subscription?.currentSubscriptionId || "",
    },
  });

  const { upgrade } = useUpgradeSubscription();
  const { selection } = useGetAllSubscription();

  useEffect(() => {
    if (
      domain.email &&
      form.values.paidType &&
      form.values.subscriptionId &&
      form.values.paidType !== "NO"
    )
      upgrade({
        studentEmail: domain.email,
        amount: 799000,
        paidType: form.values.paidType,
        subscriptionId: form.values.subscriptionId,
      });
  }, [domain.email, form.values.paidType, form.values.subscriptionId]);

  useEffect(() => {
    form.setValues({
      paidType: domain.subscription?.paidType || "NO",
      subscriptionId: domain.subscription?.currentSubscriptionId || "",
    });
  }, [domain.email, domain.subscription?.paidType, domain.subscription?.currentSubscriptionId]);

  return (
    <Group noWrap spacing="sm">
      <Select
        data={selection}
        {...form.getInputProps("subscriptionId")}
        onClick={(e) => e.stopPropagation()}
      />
      <Select
        data={subscriptionSelection}
        {...form.getInputProps("paidType")}
        onClick={(e) => e.stopPropagation()}
      />
    </Group>
  );
}
