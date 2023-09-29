import { ReactNode } from "react";
import { Box, Collapse, List, ListItemProps } from "@mantine/core";

export type CollapseListProps = Omit<Omit<ListItemProps, "children">, "title"> & {
  title?: ReactNode;
  children?: ReactNode;
  opened: boolean;
};

const CollapseList = ({ children, title, opened, ...others }: CollapseListProps) => {
  return (
    <List.Item {...others}>
      <Box>
        <span>{title}</span>
      </Box>
      <Collapse in={opened}>
        <List listStyleType="disc">{children}</List>
      </Collapse>
    </List.Item>
  );
};

export default CollapseList;
