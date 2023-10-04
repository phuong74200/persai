import {
  ActionIcon,
  Divider,
  Flex,
  Popover,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconClockHour3, IconPlayerPlayFilled } from "@tabler/icons-react";

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
  const { state, toggle, paused } = usePomodoro({
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
        <RingProgress
          styles={ringProgressStyle}
          roundCaps
          size={60}
          thickness={3}
          sections={[{ value: state.progress, color: "blue" }]}
          label={
            <Flex justify="center" align="center">
              <ActionIcon size="3rem" color="green" variant="filled" className="rounded-[50%]">
                <IconClockHour3 size="1.5rem" />
              </ActionIcon>
            </Flex>
          }
        />
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <RingProgress
          onClick={toggle}
          styles={ringProgressStyle}
          sections={[{ value: state.progress, color: theme.primaryColor }]}
          roundCaps
          label={
            paused ? (
              <Flex justify="center" align="center">
                <ActionIcon size="5rem" color="green" variant="filled" className="rounded-[50%]">
                  <IconPlayerPlayFilled size="1.5rem" />
                </ActionIcon>
              </Flex>
            ) : (
              <Stack spacing={0}>
                <Text color="dimmed" align="center">
                  Time left
                </Text>
                <Text size="2rem" weight="bold" align="center">
                  {state.formattedTime}
                </Text>
              </Stack>
            )
          }
          thickness={200 / 15}
          size={200}
        />
        <Divider />
      </Popover.Dropdown>
    </Popover>
  );
}
