import { useMemo, useRef, useState } from "react";

export default function useDelayFn(arr: (() => void)[], delay = 0) {
  const [delays, setDelays] = useState<boolean[]>([]);
  const handlers = useRef<(() => void)[]>(arr);

  const processedHandlers = useMemo(() => {
    return handlers.current.map((handler, index) => {
      setDelays((prev) => {
        const newDelays = [...prev];
        newDelays[index] = false;
        return newDelays;
      });

      return () => {
        if (delays[index]) return;

        handler();

        setDelays((prev) => {
          const newDelays = [...prev];
          newDelays[index] = true;
          return newDelays;
        });

        setTimeout(() => {
          setDelays((prev) => {
            const newDelays = [...prev];
            newDelays[index] = false;
            return newDelays;
          });
        }, delay);
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);

  return { fn: processedHandlers, delays };
}
