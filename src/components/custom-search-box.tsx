import { forwardRef } from "react";
import { Avatar, Group, Select, SelectProps, Text } from "@mantine/core";

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

export default function CustomSearchBox(props: SelectProps) {
  return (
    <Select
      placeholder="Search by any field"
      itemComponent={SelectItem}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item.searchString?.toLowerCase().includes(value.toLowerCase().trim())
      }
      {...props}
    />
  );
}
