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

import { FeatureFlag, FLAGS } from "@/configs/feature-flag";
import Section from "@/features/notification/components/section";
import { Notification } from "@/features/notification/domains/notification";
import generateFilledArray from "@/utils/generate-filled-array";

export const notifications = generateFilledArray(
  10,
  (index) =>
    new Notification({
      id: index.toString(),
      content: "empty",
      createdAt: new Date(),
      isRead: index > 5,
      from: {
        avatar:
          "https://media.istockphoto.com/id/1322277517/photo/wild-grass-in-the-mountains-at-sunset.jpg?s=612x612&w=0&k=20&c=6mItwwFFGqKNKEAzv0mv6TaxhLN3zSE43bWmFN--J5w=",
        name: "fuong",
      },
    }),
);

export default function FloatNotification() {
  const theme = useMantineTheme();

  return (
    <FeatureFlag feature={FLAGS.NOTIFICATION}>
      <Popover width={400} position="bottom-end" shadow="md">
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
    </FeatureFlag>
  );
}
