import { useEffect, useRef } from "react";

import emptyFn from "@/utils/empty-fn";

export const useInterval = (callback: () => void = emptyFn, delay: number | null = 1000) => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      savedCallback.current?.();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    } else {
      return emptyFn;
    }
  }, [delay]);
};
