import { NotificationProps, notifications } from "@mantine/notifications";
import { IconAlertCircleFilled, IconCircleCheckFilled } from "@tabler/icons-react";

const error = (
  props: NotificationProps & {
    id: string;
  },
) => {
  notifications.update({
    title: "Error",
    icon: <IconAlertCircleFilled />,
    color: "red",
    autoClose: 5000,
    ...props,
  });
};

const loader = (props: NotificationProps) => {
  notifications.show({
    title: "Processing",
    loading: true,
    color: "blue",
    autoClose: false,
    ...props,
  });
};

const success = (
  props: NotificationProps & {
    id: string;
  },
) => {
  notifications.update({
    title: "Success",
    icon: <IconCircleCheckFilled />,
    color: "green",
    autoClose: 5000,
    ...props,
  });
};

export const notification = { error, loader, success };
