import { forwardRef } from "react";
import { Avatar, Group, Select, SelectItem, SelectProps, Text } from "@mantine/core";

import { matchAnySearch } from "@/utils/match-any-search";

interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

export interface CustomSelectProps extends SelectProps {
  data: (SelectItem & {
    searchString?: string;
    image?: string;
  })[];
}

export default function CustomSelect(props: CustomSelectProps) {
  return (
    <Select
      placeholder="Pick one"
      itemComponent={SelectItem}
      searchable
      maxDropdownHeight={400}
      nothingFound="Empty"
      filter={(value, item: CustomSelectProps["data"][number]) =>
        matchAnySearch(value, item.searchString)
      }
      {...props}
    />
  );
}
