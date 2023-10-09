import { ActionIcon, Button, createStyles, Group, Menu, rem } from "@mantine/core";
import { IconChevronDown, IconTemplate, IconUpload } from "@tabler/icons-react";

const useStyles = createStyles((theme) => ({
  button: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  menuControl: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    border: 0,
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white
    }`,
  },
}));

export function UploadButton() {
  const { classes, theme } = useStyles();
  const menuIconColor = theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 5 : 6];

  return (
    <Group noWrap spacing={0}>
      <Button size="md" className={classes.button} leftIcon={<IconUpload size="1rem" />}>
        Upload template
      </Button>
      <Menu transitionProps={{ transition: "pop" }} withinPortal>
        <Menu.Target>
          <ActionIcon
            variant="filled"
            color={theme.primaryColor}
            size="2.625rem"
            className={classes.menuControl}
          >
            <IconChevronDown size="1rem" stroke={1.5} />
          </ActionIcon>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item
            component="a"
            download
            href="assets/template.xlsx"
            icon={<IconTemplate size="1rem" stroke={1.5} color={menuIconColor} />}
          >
            Download excel template
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Group>
  );
}
