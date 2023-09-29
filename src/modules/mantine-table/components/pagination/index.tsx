import { Pagination, PaginationProps } from "@mantine/core";

import useTable from "@/modules/mantine-table/hooks/use-table";

interface Props extends PaginationProps {
  table: ReturnType<typeof useTable>;
}

export default function MantineTablePagination({ table, ...others }: Props) {
  return <Pagination {...others} {...table.pagination} />;
}
