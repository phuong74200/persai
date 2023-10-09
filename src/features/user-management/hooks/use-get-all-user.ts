import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { User } from "@/features/user-management/domains/user";

export default function useGetAllUser() {
  const query = useQuery({
    ...queryKeys.user.all(),
    select(data) {
      return data.data?.map((user) => new User(user)) || [];
    },
  });

  return { ...query };
}
