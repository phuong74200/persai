import { Column, Row } from "@/modules/mantine-table/types";

export function dataRender({
  row,
  column,
  rowIndex,
}: {
  row: Row;
  column: Column<Row>;
  rowIndex: number;
}) {
  const { accessKey, DataCell } = column;

  if (typeof DataCell === "function") return DataCell({ row, column, rowIndex });
  if (accessKey) return <td>{row[accessKey]}</td>;

  return null;
}

export function headRender({ column }: { column: Column<Row> }) {
  const { HeadCell, accessKey } = column;

  if (typeof HeadCell === "function") return HeadCell({ column });

  return <th>{accessKey}</th>;
}
