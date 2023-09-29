import { Fragment } from "react";
import { DefaultProps, MantineColor, MantineSize, Selectors, Variants } from "@mantine/core";

import { useComponentDefaultProps } from "@/hooks/use-component-default-props";
import {
  AdvanceTableStylesParams,
  useStyles,
} from "@/modules/mantine-table/components/mantine-table/style";
import useTable from "@/modules/mantine-table/hooks/use-table";
import { dataRender, headRender } from "@/modules/mantine-table/utils/render";

export type AdvanceTableStylesNames = Selectors<typeof useStyles>;

export interface MantineTableProps
  extends DefaultProps<AdvanceTableStylesNames, AdvanceTableStylesParams> {
  color?: MantineColor;
  radius?: MantineSize;
  variant?: Variants<"filled" | "outline" | "light" | "white" | "default" | "subtle" | "gradient">;

  table?: ReturnType<typeof useTable>;

  stickyHeader?: boolean;
  withBorder?: boolean;
}

const defaultProps: Partial<MantineTableProps> = {
  color: "blue",
  radius: "sm",
  variant: "filled",

  stickyHeader: false,
  withBorder: false,
};

export default function MantineTable(props: MantineTableProps) {
  const { color, styles, classNames, radius, table, stickyHeader, className, variant, withBorder } =
    useComponentDefaultProps("MantineTable", defaultProps, props);

  const { classes, cx } = useStyles(
    { color, radius, stickyHeader, variant, withBorder },
    {
      name: "MantineTable",
      styles,
      classNames,
    },
  );

  return (
    <div className={classes.root}>
      <table className={cx(className, classes.table)}>
        <thead className={classes.header}>
          <tr className={classes.headRow}>
            {table.columns.map((column) => (
              <Fragment key={column.id || column.accessKey}>{headRender({ column })}</Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.data.map((row, rowIndex) => (
            <tr key={rowIndex} className={classes.dataRow}>
              {table.columns.map((column) => (
                <Fragment key={column.id || column.accessKey}>
                  {dataRender({ row, column, rowIndex })}
                </Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
