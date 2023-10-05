import {
  ActionIcon,
  Flex,
  Group,
  Indicator,
  Popover,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { IconPinFilled, IconPlayerSkipForwardFilled, IconReload } from "@tabler/icons-react";

import { Pomodoro } from "@/features/poromodo/domains/pomodoro";
import { usePomodoro } from "@/modules/pomodoro";

const ringProgressStyle = {
  root: {
    circle: {
      transition: "all 1s linear ",
    },
  },
};

export default function Porodomo() {
  const theme = useMantineTheme();
  const [pinned, togglePinned] = useToggle([() => undefined, () => true]);

  const pomodoro = usePomodoro({
    pomodoro: 5,
    shortBreak: 4,
    longBreak: 6,
    autoStartBreaks: true,
    autoStartPomodoros: true,
    longBreakInterval: 4,
    notificationConfig: {
      time: 3,
      type: "every",
    },
  });

  const pomodoroDomain = new Pomodoro(pomodoro);

  return (
    <Popover
      position="top-end"
      transitionProps={{
        transition: "pop",
      }}
      opened={pinned()}
    >
      <Popover.Target>
        <RingProgress
          styles={ringProgressStyle}
          roundCaps
          size={51}
          thickness={pomodoroDomain.state.paused ? 0 : 3}
          sections={[
            {
              value: pomodoroDomain.progress,
              color: pomodoroDomain.color,
            },
          ]}
          label={
            <Flex
              justify="center"
              align="center"
              className="transition-all"
              style={{
                transform: pomodoroDomain.state.paused ? "scale(1)" : "scale(0.8)",
              }}
            >
              <Indicator
                label={pomodoroDomain.state.pomodoros}
                position="bottom-center"
                size={20}
                withBorder
              >
                {pomodoroDomain.icon}
              </Indicator>
            </Flex>
          }
        />
      </Popover.Target>
      <Popover.Dropdown p="lg">
        <Stack spacing="lg">
          <ActionIcon
            size="lg"
            variant="light"
            color={pinned() ? theme.primaryColor : "gray"}
            radius="50%"
            onClick={() => togglePinned()}
          >
            <IconPinFilled size="1rem" />
          </ActionIcon>
          <RingProgress
            className="pointer-events-none"
            m={-20}
            onClick={pomodoroDomain.toggle}
            styles={ringProgressStyle}
            sections={[
              {
                value: pomodoroDomain.progress,
                color: pomodoroDomain.color,
                tooltip: pomodoroDomain.progress.toFixed(2) + "%",
              },
            ]}
            roundCaps
            label={
              <Stack spacing={0}>
                <Text color="dimmed" align="center">
                  {pomodoroDomain.type}
                </Text>
                <Text size="2rem" weight="bold" align="center">
                  {pomodoroDomain.state.formattedTimer}
                </Text>
              </Stack>
            }
            thickness={200 / 15}
            size={200}
          />
          <Group position="center" spacing="0.5rem">
            <ActionIcon
              size="lg"
              variant="filled"
              color={theme.primaryColor}
              radius="50%"
              onClick={pomodoroDomain.reset}
            >
              <IconReload size="1rem" />
            </ActionIcon>

            <ActionIcon
              size="xl"
              variant="filled"
              color={theme.primaryColor}
              radius="50%"
              onClick={pomodoroDomain.toggle}
            >
              {pomodoroDomain.playIcon}
            </ActionIcon>

            <ActionIcon
              size="lg"
              variant="filled"
              color={theme.primaryColor}
              radius="50%"
              onClick={pomodoroDomain.next}
            >
              <IconPlayerSkipForwardFilled size="1rem" />
            </ActionIcon>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
