import { useCallback, useEffect, useRef, useState } from "react";
import { PanInfo, useMotionValue } from "framer-motion";

interface Params {
  handleDragEnd?: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
}

export default function useDrag<T extends HTMLElement = HTMLElement>({
  handleDragEnd,
}: Params = {}) {
  const ref = useRef<T>(null);
  const motionValue = useMotionValue(0);
  const [direction, setDirection] = useState(0);

  // this is a hack to prevent framer-motion from stop
  // the animation when the user is dragging the slider
  // when user click on the drag object while the animation running
  // details:
  // https://github.com/framer/motion/issues/471
  useEffect(() => {
    const unsubscribe = motionValue.on("change", (pos) => {
      if (ref.current) {
        if (pos !== 0) ref.current.classList.add("!pointer-events-none");
        else ref.current.classList.remove("!pointer-events-none");
      }
    });
    return () => unsubscribe();
  }, [motionValue]);

  const _handleDragEnd = useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      setDirection(info.offset.x / Math.abs(info.offset.x));

      if (handleDragEnd) handleDragEnd(_, info);
    },
    [handleDragEnd],
  );

  return {
    ref,
    motionValue,
    handleDragEnd: _handleDragEnd,
    direction,
    width: ref.current?.offsetWidth || 350,
    height: ref.current?.offsetHeight || 350,
  };
}
