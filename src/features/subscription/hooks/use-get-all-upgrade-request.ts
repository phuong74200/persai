import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { operations } from "@/api/v1";
import { UpgradeRequest } from "@/features/subscription/domains/upgrade-request";
import { NonUndefined } from "@/types";

export type Status = NonUndefined<
  operations["getAllUpgradeRequests"]["parameters"]["query"]
>["status"];

export default function useGetAllUpgradeRequest() {
  const [status, setStatus] = useState<Status>(undefined);

  const query = useQuery({
    ...queryKeys.subscription.upgradeRequest(status),
    select(data) {
      const newData = data.data?.map((request) => new UpgradeRequest(request)) || [];

      // return newData.sort((a) => (a.status === "PENDING" ? -1 : 1));

      return newData;
    },
  });

  const handFilter = (status: string | undefined | null) => {
    const validStatus: Set<Status | string | null> = new Set(["PENDING", "SUCCEED", "REJECT"]);

    if (validStatus.has(status)) return setStatus(status as Status);

    return setStatus(undefined);
  };

  return { ...query, setStatus, handFilter };
}
