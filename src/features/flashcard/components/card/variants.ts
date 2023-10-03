const CARD_OFFSET = 30;
const SCALE_FACTOR = 0.06;

type CustomVariantsParams = {
  index: number;
  itemsLength: number;
  direction: number;
};

export const variants = {
  initial: ({ index, itemsLength }: CustomVariantsParams) => ({
    top: index * -CARD_OFFSET,
    scale: 1 - (index + 1) * SCALE_FACTOR,
    zIndex: itemsLength - index,
    opacity: 1,
  }),

  animate: ({ index, itemsLength }: CustomVariantsParams) => ({
    top: index * -CARD_OFFSET,
    scale: 1 - index * SCALE_FACTOR,
    zIndex: itemsLength - index,
  }),

  exit: ({ direction, itemsLength }: CustomVariantsParams) => ({
    x: 820 * (direction || 1),
    opacity: 0,
    scale: 0.5,
    transition: { duration: 0.5 },
    zIndex: itemsLength + 1,
  }),

  selected: ({ index, itemsLength }: CustomVariantsParams) => ({
    rotateY: 180,
    top: index * -CARD_OFFSET,
    scale: 1 - index * SCALE_FACTOR,
    zIndex: itemsLength - index,
  }),

  backExit: ({ index, itemsLength }: CustomVariantsParams) => ({
    y: -120,
    opacity: 0,
    transition: { duration: 0.5 },
    zIndex: itemsLength - index - 1,
    scale: 1 - (index + 1) * SCALE_FACTOR,
  }),
};
