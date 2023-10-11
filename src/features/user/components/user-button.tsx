import {
  Avatar,
  createStyles,
  Group,
  Menu,
  Text,
  UnstyledButton,
  UnstyledButtonProps,
} from "@mantine/core";
import { IconChevronRight, IconLogout, IconSettings } from "@tabler/icons-react";

import useLogout from "@/features/auth/hooks/use-logout";
import useRedirect from "@/hooks/use-redirect";

const useStyles = createStyles((theme) => ({
  user: {
    display: "block",
    width: "100%",
    padding: theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    },
  },
}));

interface UserButtonProps extends UnstyledButtonProps {
  image: string;
  name: string;
  email: string;
  icon?: React.ReactNode;
}

export function UserButton({ image, name, email, icon, ...others }: UserButtonProps) {
  const { classes } = useStyles();
  const { logout } = useLogout();
  const { onRedirect } = useRedirect();

  return (
    <Menu position="right-end">
      <Menu.Target>
        <UnstyledButton className={classes.user} {...others}>
          <Group>
            <Avatar src={image} radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" weight={500}>
                {name}
              </Text>
              <Text color="dimmed" size="xs">
                {email}
              </Text>
            </div>

            {icon || <IconChevronRight size="0.9rem" stroke={1.5} />}
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          icon={<IconSettings size={14} />}
          px="2rem"
          onClick={onRedirect("/setting/profile")}
        >
          Setting
        </Menu.Item>
        <Menu.Item color="red" icon={<IconLogout size={14} />} px="2rem" onClick={logout}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
