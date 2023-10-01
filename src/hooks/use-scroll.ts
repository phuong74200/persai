import { useCallback, useRef } from "react";

export default function useScroll<T extends HTMLElement>() {
  const viewport = useRef<T>(null);

  const toBottom = useCallback(() => {
    if (viewport.current)
      viewport.current.scrollTo({ top: viewport.current.scrollHeight, behavior: "smooth" });
  }, [viewport]);

  return {
    viewport,
    toBottom,
  };
}
