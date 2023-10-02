import { Variants } from "framer-motion";

import { useFlashCardContext } from "@/features/flashcard/contexts/flashcard-context";

const CARD_OFFSET = 20;
const SCALE_FACTOR = 0.06;

export default function useVariants(index: number, direction: number): Variants {
  const ctx = useFlashCardContext();

  if (!ctx) {
    throw new Error("useVariants must be used within FlashCardContextProvider");
  }

  return {
    initial: {
      top: index * -CARD_OFFSET,
      scale: 1 - index * SCALE_FACTOR,
      zIndex: ctx.items.length - index,
      opacity: 1,
    },
    animate: {
      top: index * -CARD_OFFSET,
      scale: 1 - index * SCALE_FACTOR,
      zIndex: ctx.items.length - index,
    },
    exit: {
      x: 450 * direction,
      opacity: 0,
      scale: 0.5,
      transition: { duration: 0.5 },
      zIndex: ctx.items.length + 1,
    },
    selected: {
      rotateY: 180,
      top: index * -CARD_OFFSET,
      scale: 1 - index * SCALE_FACTOR,
      zIndex: ctx.items.length - index,
    },
  };
}
