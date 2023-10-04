import {
  ActionIcon,
  Divider,
  Popover,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconClockHour3 } from "@tabler/icons-react";

import { usePomodoro } from "@/features/poromodo/hooks/use-pomodoro";

const ringProgressStyle = {
  root: {
    circle: {
      transition: "all 0.5s",
    },
  },
};

export default function Porodomo() {
  const theme = useMantineTheme();
  const { state, toggle } = usePomodoro({
    breakTime: 10,
    workTime: 10,
  });

  return (
    <Popover
      position="top-end"
      shadow="md"
      transitionProps={{
        transition: "pop",
      }}
    >
      <Popover.Target>
        <ActionIcon color="green" variant="filled" className="rounded-[50%]" size={14 * 3.5}>
          <IconClockHour3 size="1.5rem" />
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <RingProgress
          onClick={toggle}
          styles={ringProgressStyle}
          sections={[{ value: state.progress, color: theme.primaryColor }]}
          roundCaps
          label={
            <Stack spacing={0}>
              <Text color="dimmed" align="center">
                Time left
              </Text>
              <Text size="2rem" weight="bold" align="center">
                {state.formattedTime}
              </Text>
            </Stack>
          }
          thickness={200 / 15}
          size={200}
        />
        <Divider />
      </Popover.Dropdown>
    </Popover>
  );
}
