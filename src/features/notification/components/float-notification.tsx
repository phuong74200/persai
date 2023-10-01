import {
  ActionIcon,
  Divider,
  Group,
  Indicator,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { IconBellFilled, IconChecks } from "@tabler/icons-react";

import Section from "@/features/notification/components/section";
import { notifications } from "@/mock/notification";

export default function FloatNotification() {
  const theme = useMantineTheme();

  return (
    <Popover width={350} position="bottom-end" shadow="md">
      <Popover.Target>
        <Indicator inline label="9" size={16}>
          <ActionIcon
            size="2.125rem"
            color={theme.primaryColor}
            variant="light"
            className="rounded-[50%]"
          >
            <IconBellFilled size="1.125rem" />
          </ActionIcon>
        </Indicator>
      </Popover.Target>
      <Popover.Dropdown p={0}>
        <Group position="apart" p="md">
          <Stack spacing={0}>
            <Title order={5}>Notifications</Title>
            <Text color="dimmed">You have 4 unreaded messages</Text>
          </Stack>
          <Tooltip label="Mark all as read">
            <ActionIcon color="green" variant="subtle">
              <IconChecks size="1.125rem" />
            </ActionIcon>
          </Tooltip>
        </Group>
        <Divider />
        <ScrollArea h={500}>
          <Stack spacing={2}>
            {notifications.map((notification) => (
              <Section domain={notification} key={notification.id} />
            ))}
          </Stack>
        </ScrollArea>
        <Divider />
        <Text p="md" align="center" color={theme.primaryColor} weight="bold">
          View all
        </Text>
      </Popover.Dropdown>
    </Popover>
  );
}
