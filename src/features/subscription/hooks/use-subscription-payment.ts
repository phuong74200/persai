import ReactGA from "react-ga4";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { operations } from "@/api/v1";
import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import logger from "@/utils/dev-log";

export default function useSubscriptionPayment(
  paidType: operations["requestToUpgradeWithPayment"]["parameters"]["query"]["paidType"],
) {
  const navigate = useNavigate();
  const cache = useGetCurrentUserFromCache();

  const query = useQuery({
    ...queryKeys.subscription.payment(paidType),

    onSuccess: (data) => {
      try {
        const pType = new URL(data.response.url).searchParams.get("paidType");

        if (pType === paidType) window.open(data.data?.message, "_blank")?.focus();
      } catch (e) {
        logger.error(e);
      }
    },

    onSettled: (data, error) => {
      try {
        const pType = new URL(data?.response.url || "").searchParams.get("paidType");

        ReactGA.event({
          category: "use_referral",
          action: error ? "error" : "success",
          label: pType || undefined,
        });
      } catch (e) {
        logger.error(e);
      }
    },

    enabled: false,
  });

  const fetch = () => {
    if (cache) query.refetch();
    else navigate("/login");
  };

  return { ...query, fetch };
}
