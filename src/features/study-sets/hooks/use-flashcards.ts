import { useCallback } from "react";

import { StudySet } from "@/features/study-sets/domains/study-set";
import usePagination from "@/features/study-sets/hooks/use-pagination";

export default function useFlashCards(initialCards: StudySet[]) {
  const { currentView, next, prev, startIndex, itemsPerPage, setItems, reset, items } =
    usePagination(initialCards, 5);

  const shuffle = useCallback(
    () => () => {
      setItems((items) => {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        return shuffled;
      });
    },
    [],
  );

  return { shuffle, currentView, next, prev, startIndex, itemsPerPage, setItems, reset, items };
}
