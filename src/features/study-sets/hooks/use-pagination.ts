import { useCallback, useMemo, useState } from "react";

function usePagination<T = unknown>(array: T[], itemsPerPage = 5) {
  const [items, setItems] = useState(array);
  const [startIndex, setStartIndex] = useState(0);

  const next = useCallback(() => {
    // prevent to remove the last item

    if (items.length + itemsPerPage - (startIndex + itemsPerPage) <= 1) return;

    setStartIndex((prev) => {
      if (items.length + itemsPerPage - (prev + itemsPerPage) <= 1) return prev;
      if (prev + itemsPerPage < items.length + itemsPerPage) return prev + 1;
      return prev;
    });
  }, [items.length, itemsPerPage, startIndex]);

  const prev = useCallback(() => {
    setStartIndex((prev) => {
      if (prev - 1 >= 0) return prev - 1;
      return prev;
    });
  }, []);

  const reset = useCallback(() => {
    setStartIndex(0);
  }, []);

  const currentView = useMemo(
    () => items.slice(startIndex, startIndex + itemsPerPage),
    [items, itemsPerPage, startIndex],
  );

  return { currentView, next, prev, startIndex, itemsPerPage, items, setItems, reset };
}

export default usePagination;
