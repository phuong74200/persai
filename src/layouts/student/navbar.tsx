import { Fragment } from "react";
import { createStyles, Navbar, rem, ScrollArea, Text } from "@mantine/core";
import {
  IconBellFilled,
  IconCalendar,
  IconCardsFilled,
  IconChartHistogram,
  IconHome,
} from "@tabler/icons-react";

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
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar}>
      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        {Object.entries(mockdata).map(([key, value]) => (
          <Fragment key={key}>
            <Text className={classes.groupLabel}>{key}</Text>
            {value.map((item) => (
              <LinksGroup {...item} key={item.label} />
            ))}
          </Fragment>
        ))}
      </Navbar.Section>
    </Navbar>
  );
};
