import { useCallback, useState } from "react";

import getInRange from "@/utils/get-in-range";

export default function useStep(initialValue = 0, min = 0, max = Infinity) {
  const [value, setValue] = useState(initialValue);

  const next = useCallback(() => {
    setValue((value) => getInRange(value + 1, min, max));
  }, [min, max]);

  const back = useCallback(() => {
    setValue((value) => getInRange(value - 1, min, max));
  }, [min, max]);

  const goto = useCallback(
    (step: number) => {
      setValue(getInRange(step, min, max));
    },
    [min, max],
  );

  return {
    next,
    back,
    goto,
    value,
  };
}

export type UseStepType = ReturnType<typeof useStep>;
