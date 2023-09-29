import { useEffect, useState } from "react";
import { usePagination } from "@mantine/hooks";

import { Column, Row } from "@/modules/mantine-table/types";

const PAGE_SIZE = 15;

export default function useTable<T extends Row>({
  data,
  columns,
}: {
  data: T[];
  columns: Column<T>[];
}) {
  const [page, onChange] = useState(1);
  const pagination = usePagination({ total: 10, page, onChange });
  const [records, setRecords] = useState(data.slice(0, PAGE_SIZE));

  useEffect(() => {
    const from = (page - 1) * PAGE_SIZE;
    const to = from + PAGE_SIZE;
    setRecords(data.slice(from, to));
  }, [data, page]);

  return {
    data: records,
    columns,
    pagination,
  };
}
