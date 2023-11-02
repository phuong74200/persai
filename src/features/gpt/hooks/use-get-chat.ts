import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { MessageDomain } from "@/features/gpt/domains/message";

export default function useGetChat() {
  const query = useQuery({
    ...queryKeys.gpt.all(),
    select(data) {
      if (!data.data) return [];

      return data.data.map((message) => new MessageDomain(message));
    },
  });

  return query;
}
