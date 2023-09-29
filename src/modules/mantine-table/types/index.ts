import { ReactNode } from "react";

export type DataCell<T> = ({
  column,
  row,
  rowIndex,
}: {
  column?: Column<Row>;
  row?: T;
  rowIndex: number;
}) => ReactNode;

export type HeadCell = ({ column }: { column?: Column<Row> }) => ReactNode;

/**
 * @description
 * Column is a type that describes a column in a table.
 * It has an id, which is used to identify the column.
 * It also has an optional accessKey, which is used to access the data in the row.
 *
 * !Column must have either an id or an accessKey.
 * @property { string } id - The id of the column. Must be unique.
 * @property { string } accessKey - Used to access the data in the row.
 */

export type Column<T> = {
  id?: string;
  accessKey?: keyof T;
  HeadCell?: HeadCell;
  DataCell?: DataCell<T>;
};

export type Row = Record<string, string | boolean | number | undefined>;
