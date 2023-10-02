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
    scale: 1 - index * SCALE_FACTOR,
    zIndex: itemsLength - index,
    opacity: 1,
  }),
  animate: ({ index, itemsLength }: CustomVariantsParams) => ({
    top: index * -CARD_OFFSET,
    scale: 1 - index * SCALE_FACTOR,
    zIndex: itemsLength - index,
  }),
  exit: ({ direction, itemsLength }: CustomVariantsParams) => ({
    x: 800 * direction,
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
};
