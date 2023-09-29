import { createSearchParams, useSearchParams } from "react-router-dom";
import { usePagination } from "@mantine/hooks";

import parseDec from "@/utils/parse-dec";

export interface PaginationParams {
  /** Page selected on initial render, defaults to 1 */
  initialPage?: number;

  /** Controlled active page number */
  active?: number;

  /** Total amount of pages */
  total: number;

  /** Siblings amount on left/right side of selected page, defaults to 1 */
  siblings?: number;

  /** Amount of elements visible on left/right edges, defaults to 1  */
  boundaries?: number;

  /** Callback fired after change of each page */
  onChange?: (page: number) => void;

  /** Number of items per page */
  pageSizes?: number;
}

export default function useQueryPagination({ pageSizes = 20, ...params }: PaginationParams) {
  const [searchParams, setSearchParams] = useSearchParams();

  const pagination = usePagination({
    initialPage: parseDec(searchParams.get("page")),
    onChange(page) {
      setSearchParams(createSearchParams({ page: page.toString() }));
    },
    ...params,
  });

  const range = [
    (pagination.active - 1) * pageSizes + 1,
    (pagination.active - 1) * pageSizes + pageSizes,
  ] as const;

  return {
    pagination,
    range,
  };
}
