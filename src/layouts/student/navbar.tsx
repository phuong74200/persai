import { Fragment } from "react";
import { clsx, createStyles, Navbar, rem, Text } from "@mantine/core";

import { useGetCurrentUserFromCache } from "@/features/auth/hooks/use-get-current-user";
import { UserButton } from "@/features/user/components/user-button";
import { LinksGroup } from "@/layouts/components/link-group";
import { tree } from "@/layouts/student/tree";

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
  const cache = useGetCurrentUserFromCache();

  return (
    <Navbar
      hiddenBreakpoint="xs"
      hidden={true}
      width={{ xs: 14 * 1.875 + 14 * 2.875 - 3, sm: 14 * 1.875 + 14 * 2.875 - 3, md: 300 }}
      px="md"
      className={classes.navbar}
    >
      <Navbar.Section grow className={classes.links}>
        {Object.entries(tree).map(([key, value]) => (
          <Fragment key={key}>
            <Text className={clsx(classes.groupLabel, "md:hidden")} h="51.5px" py="1rem">
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
          image={cache?.feImageName || ""}
          name={cache?.fullName || ""}
          email={cache?.email || ""}
        />
      </Navbar.Section>
    </Navbar>
  );
};
