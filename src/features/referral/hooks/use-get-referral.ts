import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";

export default function useGetReferral() {
  const query = useQuery({
    ...queryKeys.referral.all(),
    select(data) {
      if (!data.data) return [];

      return data.data;
    },
  });

  return query;
}
