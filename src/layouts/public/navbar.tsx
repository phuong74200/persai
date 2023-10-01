import { forwardRef } from "react";
import { createStyles, Navbar, rem, ScrollArea } from "@mantine/core";
import { IconBell, IconBook2, IconBuildingCommunity, IconClipboardText } from "@tabler/icons-react";

import { LinksGroup, LinksGroupProps } from "@/features/layout/components/navbar-link-group";
import { UserButton } from "@/features/layout/components/user-button";
import { useGetCurrentUserFromCache } from "@/services/use-get-current-user";
import generateAvatar from "@/utils/generate-avatar";

const mockdata: LinksGroupProps[] = [
  { label: "Báo cáo tổng quan", icon: IconClipboardText, link: "asd" },
  {
    label: "Quản lý trường",
    icon: IconBuildingCommunity,
    initiallyOpened: true,

    links: [
      { label: "Tổng quan", link: "/university" },
      { label: "Lớp học", link: "/class" },
    ],
  },
  {
    label: "Quản lý môn",
    icon: IconBook2,
    links: [
      { label: "Upcoming releases", link: "/c" },
      { label: "Previous releases", link: "/d" },
      { label: "Releases schedule", link: "/e" },
    ],
  },
  {
    label: "Quản lý thông báo",
    icon: IconBell,
    links: [
      { label: "Enable 2FA", link: "/f" },
      { label: "Change password", link: "/g" },
      { label: "Recovery codes", link: "/j" },
    ],
  },
];

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
}));

export const NavbarNested = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  const cacheData = useGetCurrentUserFromCache();

  const { classes } = useStyles();
  const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);

  return (
    <Navbar height={800} width={{ sm: 300 }} p="md" className={classes.navbar} ref={ref}>
      {/* <Navbar.Section className={classes.header}>
        <Group position="apart">
          <Logo width={rem(120)} />
          <Code sx={{ fontWeight: 700 }}>v3.1.2</Code>
        </Group>
      </Navbar.Section> */}

      <Navbar.Section grow className={classes.links} component={ScrollArea}>
        <div>{links}</div>
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <UserButton
          image={
            cacheData?.state.data?.data.avatar || generateAvatar(cacheData?.state.data?.data.userId)
          }
          name={cacheData?.state.data?.data.fullName || ""}
          email={cacheData?.state.data?.data.email || ""}
        />
      </Navbar.Section>
    </Navbar>
  );
});
