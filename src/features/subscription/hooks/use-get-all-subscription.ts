import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { Subscription } from "@/features/subscription/domains/subscription";

export default function useGetAllSubscription() {
  const query = useQuery({
    ...queryKeys.subscription.all(),
    select(data) {
      return data.data?.map((subscription) => new Subscription(subscription)) || [];
    },
  });

  const selection =
    query.data?.map((subscription) => ({
      label: subscription.subscriptionName || "",
      value: subscription.id || "",
    })) || [];

  return { ...query, selection };
}
