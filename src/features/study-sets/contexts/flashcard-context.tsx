import { createContext, Dispatch, useContext, useMemo } from "react";
import { Outlet } from "react-router-dom";

import { Question } from "@/features/study-sets/domains/question";
import usePagination from "@/features/study-sets/hooks/use-pagination";

export default function createFlashCardContext<T = unknown>(cards: T[], poolSize = 5) {
  type Props = {
    prev: () => void;
    next: () => void;
    pool: T[];
    startIndex: number;
    itemsPerPage: number;
    progress: number;
    shuffle: () => void;
    setItems: Dispatch<React.SetStateAction<T[]>>;
    reset: () => void;
  };

  const FlashCardContext = createContext<Props>({} as Props);

  const FlashCardContextProvider = () => {
    const { currentView, next, prev, startIndex, itemsPerPage, setItems, reset, items } =
      usePagination(cards, poolSize);

    const value = useMemo(
      () => ({
        prev,
        next,
        pool: currentView,
        startIndex,
        itemsPerPage,
        progress: ((startIndex + 1) / items.length) * 100,
        shuffle: () => {
          setItems((items) => {
            const shuffled = [...items].sort(() => Math.random() - 0.5);
            return shuffled;
          });
        },
        setItems,
        reset,
      }),
      [currentView, items.length, itemsPerPage, next, prev, reset, setItems, startIndex],
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

export const { FlashCardContextProvider, FlashCardContext, useFlashCardContext } =
  createFlashCardContext<Question>([], 5);
