import { createContext, PropsWithChildren, useContext, useMemo } from "react";
import { faker } from "@faker-js/faker";
import { useHotkeys } from "@mantine/hooks";

import usePagination from "@/features/flashcard/hooks/use-pagination";
import logger from "@/utils/dev-log";
import generateFilledArray from "@/utils/generate-filled-array";

export default function createFlashCardContext<T = unknown>(cards: T[], poolSize = 5) {
  type Props = {
    prev: () => void;
    next: () => void;
    pool: T[];
    startIndex: number;
    itemsPerPage: number;
  };

  const FlashCardContext = createContext<Props>({} as Props);

  const FlashCardContextProvider = ({ children }: PropsWithChildren) => {
    const { currentView, next, prev, startIndex, itemsPerPage } = usePagination(cards, poolSize);

    const value = useMemo(
      () => ({ prev, next, pool: currentView, startIndex, itemsPerPage }),
      [currentView, itemsPerPage, next, prev, startIndex],
    );

    logger.log(currentView);

    useHotkeys([
      [
        "ArrowLeft",
        () => {
          prev();
        },
      ],
      [
        "ArrowRight",
        () => {
          next();
        },
      ],
    ]);

    return <FlashCardContext.Provider value={value}>{children}</FlashCardContext.Provider>;
  };

  const useFlashCardContext = () => useContext(FlashCardContext);

  return {
    FlashCardContextProvider,
    FlashCardContext,
    useFlashCardContext,
  };
}

const items = generateFilledArray(10, () => ({
  id: faker.string.uuid(),
  color: faker.color.rgb({
    format: "hex",
  }),
  sides: generateFilledArray(2, () => ({
    id: faker.string.uuid(),
    text: faker.lorem.paragraphs({ min: 1, max: 3 }),
  })),
})).map((e, index) => ({
  ...e,
  index,
}));

export const { FlashCardContextProvider, FlashCardContext, useFlashCardContext } =
  createFlashCardContext(items, 5);
