import {
  ActionIcon,
  Flex,
  Group,
  Indicator,
  Paper,
  Popover,
  RingProgress,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import {
  IconPinFilled,
  IconPlayerSkipForwardFilled,
  IconReload,
  IconSettings,
} from "@tabler/icons-react";

import usePomodoroService from "@/features/poromodo/hooks/use-pomodoro-service";
import useRedirect from "@/hooks/use-redirect";

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
  const { onRedirectWithState } = useRedirect();

  const pomodoro = usePomodoroService();

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
          thickness={pomodoro.state.paused ? 0 : 3}
          sections={[
            {
              value: pomodoro.progress,
              color: pomodoro.color,
            },
          ]}
          label={
            <Flex
              justify="center"
              align="center"
              className="transition-all"
              style={{
                transform: pomodoro.state.paused ? "scale(1)" : "scale(0.8)",
              }}
            >
              <Indicator
                label={pomodoro.state.pomodoros}
                position="bottom-center"
                size={20}
                withBorder
              >
                <Paper radius="50%" shadow="md">
                  <ActionIcon
                    size={53}
                    color={theme.primaryColor}
                    variant="filled"
                    className="rounded-[50%]"
                  >
                    {pomodoro.icon}
                  </ActionIcon>
                </Paper>
              </Indicator>
            </Flex>
          }
        />
      </Popover.Target>
      <Popover.Dropdown p="lg">
        <Stack spacing="lg">
          <Group position="apart">
            <ActionIcon
              size="lg"
              variant="light"
              color={pinned() ? theme.primaryColor : "gray"}
              radius="50%"
              onClick={() => togglePinned()}
            >
              <IconPinFilled size="1rem" />
            </ActionIcon>
            <ActionIcon
              size="lg"
              variant="light"
              color={pinned() ? theme.primaryColor : "gray"}
              radius="50%"
              onClick={onRedirectWithState("/setting/pomodoro")}
            >
              <IconSettings size="1rem" />
            </ActionIcon>
          </Group>
          <RingProgress
            className="pointer-events-none"
            m={-20}
            onClick={pomodoro.toggle}
            styles={ringProgressStyle}
            sections={[
              {
                value: pomodoro.progress,
                color: pomodoro.color,
                tooltip: pomodoro.progress.toFixed(2) + "%",
              },
            ]}
            roundCaps
            label={
              <Stack spacing={0}>
                <Text color="dimmed" align="center">
                  {pomodoro.type}
                </Text>
                <Text size="2rem" weight="bold" align="center">
                  {pomodoro.state.formattedTimer}
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
              onClick={pomodoro.reset}
            >
              <IconReload size="1rem" />
            </ActionIcon>

            <ActionIcon
              size="xl"
              variant="filled"
              color={theme.primaryColor}
              radius="50%"
              onClick={pomodoro.toggle}
            >
              {pomodoro.playIcon}
            </ActionIcon>

            <ActionIcon
              size="lg"
              variant="filled"
              color={theme.primaryColor}
              radius="50%"
              onClick={pomodoro.next}
            >
              <IconPlayerSkipForwardFilled size="1rem" />
            </ActionIcon>
          </Group>
        </Stack>
      </Popover.Dropdown>
    </Popover>
  );
}
