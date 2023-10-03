import { useCallback, useMemo, useState } from "react";

function usePagination<T = unknown>(array: T[], itemsPerPage = 5) {
  const [startIndex, setStartIndex] = useState(0);

  const next = useCallback(() => {
    // prevent to remove the last item
    if (array.length + itemsPerPage - (startIndex + itemsPerPage) <= 1) return;

    setStartIndex((prev) => {
      if (array.length + itemsPerPage - (prev + itemsPerPage) <= 1) return prev;
      if (prev + itemsPerPage < array.length + itemsPerPage) return prev + 1;
      return prev;
    });
  }, [array.length, itemsPerPage, startIndex]);

  const prev = useCallback(() => {
    setStartIndex((prev) => {
      if (prev - 1 >= 0) return prev - 1;
      return prev;
    });
  }, []);

  const currentView = useMemo(
    () => array.slice(startIndex, startIndex + itemsPerPage),
    [array, itemsPerPage, startIndex],
  );

  return { currentView, next, prev, startIndex, itemsPerPage };
}

export default usePagination;
