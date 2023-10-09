import { useMatch } from "react-router-dom";
import {
  Box,
  Collapse,
  createStyles,
  Group,
  rem,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import { Icon, IconCalendarStats, IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import useRedirect from "@/hooks/use-redirect";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    marginLeft: rem(30),
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    borderLeft: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },

  controlActive: {
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors[theme.primaryColor][7]
        : theme.colors[theme.primaryColor][0],
  },
}));

export interface LinkItem {
  label: string;
  link: string;
}

export type LinksGroupProps = {
  icon: Icon;
  label: string;
  initiallyOpened?: boolean;
  enabled?: boolean;
} & ({ links: LinkItem[]; link?: never } | { link: string; links?: never });

const SubItem = ({ link, label }: { label: string; link: string }) => {
  const { classes, cx } = useStyles();
  const { onRedirect } = useRedirect();
  const matchLocation = useMatch(link);

  return (
    <Text<"a">
      component="a"
      className={cx(classes.link, { [classes.controlActive]: matchLocation }, "cursor-pointer")}
      key={label}
      onClick={onRedirect(link)}
    >
      {label}
    </Text>
  );
};

export function LinksGroup({ icon: Icon, label, initiallyOpened, links, link }: LinksGroupProps) {
  const { onRedirect } = useRedirect();
  const { classes, theme, cx } = useStyles();
  const [opened, toggleOpen] = useToggle<boolean>([Boolean(initiallyOpened), !initiallyOpened]);

  const hasLinks = Array.isArray(links);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const matchLocation = useMatch(link || "");

  const items = (hasLinks ? links : []).map((link) => <SubItem {...link} key={link.link} />);

  return (
    <>
      <UnstyledButton
        onClick={hasLinks ? () => toggleOpen() : onRedirect(link)}
        className={cx(classes.control, { [classes.controlActive]: matchLocation })}
      >
        <Group position="apart" spacing={0}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <ThemeIcon variant="light" size={30}>
              <Icon size="1.1rem" />
            </ThemeIcon>
            <Box ml="md">{label}</Box>
          </Box>
          {hasLinks && (
            <ChevronIcon
              className={classes.chevron}
              size="1rem"
              stroke={1.5}
              style={{
                transform: opened ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)` : "none",
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box
      sx={(theme) => ({
        minHeight: rem(220),
        padding: theme.spacing.md,
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      })}
    >
      <LinksGroup {...mockdata} />
    </Box>
  );
}
