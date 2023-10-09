import { useState } from "react";

export const useDelayFn = (cb: () => void, delay = 200) => {
  const [callable, setCallable] = useState(true);

  const handler = () => {
    if (!callable) return;
    cb();
    setCallable(false);
    setTimeout(() => setCallable(true), delay);
  };

  return [handler, callable] as const;
};
