import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";

type PomodoroConfig = {
  workTime: number; // in seconds
  breakTime: number; // in seconds

  autoStartBreakTime?: boolean;
};

const defaultConfig: PomodoroConfig = {
  breakTime: 5 * 60,
  workTime: 25 * 60,
  autoStartBreakTime: true,
};

type Timer = {
  workingTime: NodeJS.Timer | null;
  breakTime: NodeJS.Timer | null;
};

const clsInterval = (interval: NodeJS.Timer | null) => {
  if (interval) clearInterval(interval);
};

export function usePomodoro(config: PomodoroConfig) {
  const { breakTime, workTime } = { ...defaultConfig, ...config };

  const [paused, setPaused] = useState(false);
  const [workTimeLeft, setWorkingTimeLeft] = useState(workTime);

  const workingInterval = useRef<NodeJS.Timer | null>(null);

  useEffect(() => {
    workingInterval.current = setInterval(() => {
      if (paused) {
        clsInterval(workingInterval.current);
      } else {
        setWorkingTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clsInterval(workingInterval.current);
    };
  }, [paused]);

  const toggle = useCallback(() => {
    setPaused((prev) => !prev);
  }, []);

  const state = useMemo(
    () => ({
      formattedTime: dayjs(workTimeLeft * 1000).format("mm:ss"),
      progress: ((workTime - workTimeLeft) / workTime) * 100,
    }),
    [workTime, workTimeLeft],
  );

  return { state, toggle };
}
