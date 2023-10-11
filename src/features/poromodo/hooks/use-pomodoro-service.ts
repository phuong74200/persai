import { useEffect } from "react";

import { LocalPomodoro } from "@/features/poromodo/domains/local-pomodoro";
import useGetPomodoro from "@/features/poromodo/hooks/use-get-pomodoro";
import { usePomodoro } from "@/modules/pomodoro";

export default function usePomodoroService() {
  const { data, isFetching } = useGetPomodoro();

  const pomodoro = usePomodoro({
    pomodoro: 5,
    shortBreak: 4,
    longBreak: 6,
    autoStartBreaks: true,
    autoStartPomodoros: false,
    longBreakInterval: 4,
  });

  useEffect(() => {
    if (data)
      pomodoro.changeConfig({
        pomodoro: data.studyTimeInSecond,
        shortBreak: data.shortBreakInSecond,
        longBreak: data.longBreakInSecond,
        longBreakInterval: data.longBreakInterval,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFetching]);

  const pomodoroDomain = new LocalPomodoro(pomodoro);

  return pomodoroDomain;
}
