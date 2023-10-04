import { createContext, useContext, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { faker } from "@faker-js/faker";

import usePagination from "@/features/flashcard/hooks/use-pagination";
import generateFilledArray from "@/utils/generate-filled-array";

export default function createFlashCardContext<T = unknown>(cards: T[], poolSize = 5) {
  type Props = {
    prev: () => void;
    next: () => void;
    pool: T[];
    startIndex: number;
    itemsPerPage: number;
    progress: number;
    shuffle: () => void;
  };

  const FlashCardContext = createContext<Props>({} as Props);

  const FlashCardContextProvider = () => {
    const { currentView, next, prev, startIndex, itemsPerPage, setItems } = usePagination(
      cards,
      poolSize,
    );

    const value = useMemo(
      () => ({
        prev,
        next,
        pool: currentView,
        startIndex,
        itemsPerPage,
        progress: ((startIndex + 1) / cards.length) * 100,
        shuffle: () => {
          setItems((items) => {
            const shuffled = [...items].sort(() => Math.random() - 0.5);
            return shuffled;
          });
        },
      }),
      [currentView, itemsPerPage, next, prev, setItems, startIndex],
    );

    return (
      <FlashCardContext.Provider value={value}>
        <Outlet />
      </FlashCardContext.Provider>
    );
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
