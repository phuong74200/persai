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

type Flag = {
  type: "work" | "break";
  time: number;
};

const clsInterval = (interval: NodeJS.Timer | null) => {
  if (interval) clearInterval(interval);
};

export function usePomodoro(config: PomodoroConfig) {
  const { breakTime, workTime } = { ...defaultConfig, ...config };

  const [paused, setPaused] = useState(true);
  const [workTimeLeft, setWorkingTimeLeft] = useState(workTime);
  const [breakTimeLeft, setBreakTimeLeft] = useState(0);
  const [flags, setFlags] = useState<Flag[]>([]);

  const workingInterval = useRef<NodeJS.Timer | null>(null);
  const breakInterval = useRef<NodeJS.Timer | null>(null);
  const passedTime = useRef(0);

  useEffect(() => {
    workingInterval.current = setInterval(() => {
      if (workTimeLeft <= 0) {
        setFlags((prev) => [...prev, { type: "work", time: passedTime.current }]);
        setBreakTimeLeft(breakTime);
      }

      if (paused || workTimeLeft <= 0) {
        clsInterval(workingInterval.current);
      } else {
        setWorkingTimeLeft((prev) => prev - 1);
        passedTime.current += 1;
      }
    }, 1000);

    return () => {
      clsInterval(workingInterval.current);
    };
  }, [paused, workTimeLeft, breakTime]);

  useEffect(() => {
    breakInterval.current = setInterval(() => {
      if (breakTime <= 0) setFlags((prev) => [...prev, { type: "work", time: passedTime.current }]);

      if (paused || breakTime <= 0) {
        clsInterval(breakInterval.current);
      } else {
        setBreakTimeLeft((prev) => prev - 1);
        passedTime.current += 1;
      }
    }, 1000);

    return () => {
      clsInterval(workingInterval.current);
    };
  }, [breakTime, paused]);

  const toggle = useCallback(() => {
    setPaused((prev) => !prev);
  }, []);

  const stop = useCallback(() => {
    setPaused(false);
  }, []);

  const start = useCallback(() => {
    setPaused(true);
  }, []);

  const reset = useCallback(() => {
    setWorkingTimeLeft(workTime);
    passedTime.current = 0;
  }, [workTime]);

  const state = useMemo(
    () => ({
      formattedTime: dayjs(workTimeLeft * 1000).format("mm:ss"),
      progress: ((workTime - workTimeLeft) / workTime) * 100,
    }),
    [workTime, workTimeLeft],
  );

  return { state, toggle, stop, start, flags, paused, reset };
}
