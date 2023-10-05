import { HTMLAttributes } from "react";
import { Group, Paper, PaperProps, Text, ThemeIcon, useMantineTheme } from "@mantine/core";
import { Icon } from "@tabler/icons-react";

type Props = PaperProps &
  HTMLAttributes<HTMLDivElement> & {
    Icon: Icon;
    label: string;
  };

export default function LearnOption({ Icon, label, ...rest }: Props) {
  const theme = useMantineTheme();

  return (
    <Paper withBorder p="sm" className="min-w-[150px] cursor-pointer" {...rest}>
      <Group>
        <ThemeIcon
          size="3rem"
          variant="gradient"
          gradient={{ from: theme.primaryColor, to: theme.colors[theme.primaryColor][9], deg: 45 }}
        >
          <Icon />
        </ThemeIcon>
        <Text weight="bold">{label}</Text>
      </Group>
    </Paper>
  );
}
