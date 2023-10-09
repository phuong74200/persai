import { ReactNode } from "react";
import { clsx, Paper, PaperProps } from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { HTMLMotionProps, motion, useTransform } from "framer-motion";

import { variants } from "@/features/study-sets/components/card/variants";
import { useFlashCardContext } from "@/features/study-sets/contexts/flashcard-context";
import useDrag from "@/hooks/use-drag";

interface Props extends HTMLMotionProps<"div"> {
  index: number;
  children?: ReactNode;
}

function _Card({ index, style, ...rest }: Props) {
  const ctx = useFlashCardContext();

  if (!ctx) throw new Error("Card must be used inside FlashCardContextProvider");

  const [isFlip, toggle] = useToggle([false, true]);

  const { ref, direction, handleDragEnd, motionValue, height, width } = useDrag<HTMLDivElement>({
    handleDragEnd: (_, info) => {
      if (Math.abs(info.offset.x) > width / 5) ctx.next();
    },
  });

  const rotate = useTransform(
    motionValue,
    [-width * 1.5, 0, height * 1.5],
    [-width / 5, 0, height / 5],
    {
      clamp: false,
    },
  );

  const handleFlip = () => {
    if (motionValue.get() === 0) toggle();
  };

  return (
    <motion.div
      ref={ref}
      style={{
        rotate,
        scale: 0,
        willChange: "transform",
        x: motionValue,
        pointerEvents: index === 0 ? "auto" : "none", // Only allow dragging on the top card
        position: "absolute",
        ...style,
      }}
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
      exit={index === 0 ? "exit" : "backExit"}
      onDragEnd={handleDragEnd}
      custom={{ itemsLength: ctx.startIndex, index, direction }}
      {...rest}
    />
  );
}

function Front({ className, ...rest }: PaperProps) {
  return (
    <Paper
      shadow="lg"
      p="md"
      className={clsx(className, "h-full w-full [backface-visibility:hidden]")}
      {...rest}
    />
  );
}

function Back({ className, ...rest }: PaperProps) {
  return (
    <Paper
      shadow="lg"
      p="md"
      className={clsx(
        className,
        "absolute left-0 top-0 h-full w-full [backface-visibility:hidden] [transform:rotateY(180deg)]",
      )}
      {...rest}
    />
  );
}

const Card = Object.assign(_Card, {
  Front,
  Back,
});

export default Card;
