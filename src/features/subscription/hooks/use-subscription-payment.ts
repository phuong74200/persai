import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { operations } from "@/api/v1";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";

export default function useSubscriptionPayment(
  paidType: operations["requestToUpgradeWithPayment"]["parameters"]["query"]["paidType"],
) {
  const navigate = useNavigate();
  const cache = useGetCurrentUserFromCache();

  const query = useQuery({
    ...queryKeys.subscription.payment(paidType),

    onSuccess: (data) => {
      const pType = new URL(data.response.url).searchParams.get("paidType");

      if (pType === paidType) window.open(data.data?.message, "_blank")?.focus();
    },

    enabled: false,
  });

  const fetch = () => {
    if (cache) query.refetch();
    else navigate("/login");
  };

  return { ...query, fetch };
}
