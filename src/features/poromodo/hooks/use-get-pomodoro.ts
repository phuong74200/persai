import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/api";
import { Pomodoro } from "@/features/poromodo/domains/pomodoro";

export default function useGetPomodoro() {
  const query = useQuery({
    ...queryKeys.pomodoro.current(),
    select(data) {
      if (data.data) return new Pomodoro(data.data);
    },
  });

  return { ...query };
}
