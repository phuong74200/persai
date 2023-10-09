import { HTMLAttributes } from "react";
import { Group, Paper, PaperProps, Text, ThemeIcon } from "@mantine/core";
import { Icon } from "@tabler/icons-react";

type Props = PaperProps &
  HTMLAttributes<HTMLDivElement> & {
    Icon: Icon;
    label: string;
  };

export default function LearnOption({ Icon, label, ...rest }: Props) {
  return (
    <Paper p="sm" className="min-w-[150px] cursor-pointer" {...rest}>
      <Group>
        <ThemeIcon size="2rem">
          <Icon size="1rem" />
        </ThemeIcon>
        <Text weight="bold">{label}</Text>
      </Group>
    </Paper>
  );
}
