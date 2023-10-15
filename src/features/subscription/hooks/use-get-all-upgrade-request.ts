import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { operations } from "@/api/v1";
import { UpgradeRequest } from "@/features/subscription/domains/upgrade-request";
import { NonUndefined } from "@/types";

export default function useGetAllUpgradeRequest(
  status: NonUndefined<operations["getAllUpgradeRequests"]["parameters"]["query"]>["status"],
) {
  const query = useQuery({
    ...queryKeys.subscription.upgradeRequest(status),
    select(data) {
      const newData = data.data?.map((request) => new UpgradeRequest(request)) || [];

      return newData.sort((a) => (a.status === "PENDING" ? -1 : 1));
    },
  });

  return { ...query };
}
