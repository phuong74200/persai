import { ReactNode, useState } from "react";
import { useToggle } from "@mantine/hooks";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";

import { useFlashCardContext } from "@/features/flashcard/contexts/flashcard-context";
import useVariants from "@/features/flashcard/hooks/useVariants";

interface Props {
  index: number;
  color: string;
  children?: ReactNode;
}

export default function Card({ index, children }: Props) {
  const ctx = useFlashCardContext();

  if (!ctx) throw new Error("Card must be used inside FlashCardContextProvider");

  // determine the if the card onDragEnd is dragged to the left or right
  const [direction, setDirection] = useState(0);
  const [isFlip, toggle] = useToggle([false, true]);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-350, 0, 220], [-45, 0, 45], {
    clamp: false,
  });

  const variants = useVariants(index, direction);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDirection(info.offset.x / Math.abs(info.offset.x));
    if (Math.abs(info.offset.x) > 200) ctx.removeItem(index);
  };

  const handleFlip = () => {
    if (x.get() === 0) toggle();
  };

  return (
    <motion.div
      style={{
        rotate,
        scale: 0,
        willChange: "transform",
        x,
        pointerEvents: index === 0 ? "auto" : "none", // Only allow dragging on the top card
      }}
      className="absolute"
      variants={variants}
      drag="x"
      dragConstraints={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
      }}
      onClick={handleFlip}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      animate={isFlip ? "selected" : "animate"}
      exit="exit"
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}
