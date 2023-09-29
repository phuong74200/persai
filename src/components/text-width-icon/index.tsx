import { ReactNode } from "react";
import { Group, GroupProps, Text } from "@mantine/core";

interface Props extends GroupProps {
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  children?: ReactNode;
}

export default function TextWithIcon({ leftIcon, rightIcon, children, ...others }: Props) {
  return (
    <Group {...others}>
      {leftIcon}
      <Text mb={-2}>{children}</Text>
      {rightIcon}
    </Group>
  );
}
