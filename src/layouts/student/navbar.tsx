import { Fragment } from "react";
import { createStyles, Navbar, rem, ScrollArea, Text } from "@mantine/core";
import {
  IconBellFilled,
  IconCalendar,
  IconCardsFilled,
  IconChartHistogram,
  IconHome,
} from "@tabler/icons-react";

import { UserButton } from "@/features/user/components/user-button";
import { LinksGroup, LinksGroupProps } from "@/layouts/components/link-group";

const mockdata: {
  [key: string]: LinksGroupProps[];
} = {
  General: [
    { label: "Home", icon: IconHome, link: "/study-set" },
    {
      label: "My collection",
      icon: IconCardsFilled,
      link: "/my-collection",
    },
    {
      label: "Analytics",
      icon: IconChartHistogram,
      link: "",
    },
  ],
  App: [
    {
      label: "Notification",
      icon: IconBellFilled,
      link: "",
    },
    {
      label: "Calendar",
      icon: IconCalendar,
      link: "",
    },
  ],
};

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
    height: "100vh",
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
  },

  footer: {
    marginLeft: `calc(${theme.spacing.md} * -1)`,
    marginRight: `calc(${theme.spacing.md} * -1)`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  groupLabel: {
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    fontWeight: 700,
  },
}));

export const NavbarNested = () => {
  const { classes } = useStyles();

  return (
    <Navbar height={800} width={{ sm: 300 }} px="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {Object.entries(mockdata).map(([key, value]) => (
          <Fragment key={key}>
            <Text className={classes.groupLabel} h="51.5px" py="1rem">
              {key}
            </Text>
            {value.map((item) => (
              <LinksGroup {...item} key={item.label} />
            ))}
          </Fragment>
        ))}
      </Navbar.Section>

      <Navbar.Section grow className={classes.links}>
        <Fragment />
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image="https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80"
          name="Ann Nullpointer"
          email="anullpointer@yahoo.com"
        />
      </Navbar.Section>
    </Navbar>
  );
};
