import { useState } from "react";
import { ActionIcon, Badge, Menu } from "@mantine/core";
import { IconDots } from "@tabler/icons-react";
import Overflow from "rc-overflow";

interface ItemType {
  value: string | number;
  label: string;
}

function createData(count: number): ItemType[] {
  const data: ItemType[] = new Array(count).fill(undefined).map((_, index) => ({
    value: index,
    label: `Label ${index}`,
  }));

  return data;
}

function renderItem(item: ItemType) {
  return (
    <Badge radius="xs" className="mr-5" size="lg">
      {item.label}
    </Badge>
  );
}

function renderRest(items: ItemType[]) {
  return (
    <Menu shadow="md" width={200} position="bottom-end">
      <Menu.Target>
        <ActionIcon>
          <IconDots size="1.125rem" />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        {items.map((item) => (
          <Menu.Item key={item.value}>{item.label}</Menu.Item>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}

const App = () => {
  const [data] = useState(createData(15));

  return (
    <div className="p-5">
      <Overflow<ItemType>
        className="flex"
        data={data}
        renderItem={renderItem}
        renderRest={renderRest}
        maxCount="responsive"
      />
    </div>
  );
};

export default App;
