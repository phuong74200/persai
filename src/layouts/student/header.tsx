import {
  Anchor,
  Breadcrumbs,
  Burger,
  Button,
  Container,
  createStyles,
  Group,
  Header,
  rem,
} from "@mantine/core";
import { sentenceCase } from "change-case";

import FloatNotification from "@/features/notification/components/float-notification";
import useBreadcrumbs from "@/hooks/use-breadcrumbs";
import useRedirect from "@/hooks/use-redirect";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 3,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: "hidden",

    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan("sm")]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
    },
  },
}));

type Props = {
  opened: boolean;
  toggle: () => void;
};

export function StudentHeader({ opened, toggle }: Props) {
  const { classes } = useStyles();
  const paths = useBreadcrumbs();
  const { onRedirect } = useRedirect();

  return (
    <Header height={HEADER_HEIGHT}>
      <Container className={classes.header}>
        <Breadcrumbs>
          {paths.map((item, index) => (
            <Anchor onClick={onRedirect(item.path)} key={index}>
              {sentenceCase(item.name)}
            </Anchor>
          ))}
        </Breadcrumbs>
        <Group className={classes.links}>
          <Button onClick={onRedirect("/create")}>Upload new set</Button>
          <FloatNotification />
          <Burger opened={opened} onClick={toggle} className={classes.burger} />
        </Group>

        {/* <Transition transition="slide-left" duration={200} mounted={opened}>
          {(styles) => (
            <Paper p="lg" className={classes.dropdown} style={styles}>
              <Accordion variant="separated">
                {Object.entries(tree).map(([key, value]) => (
                  <Accordion.Item value={key} key={key}>
                    <Accordion.Control px="1rem">
                      <Text weight="bold">{key}</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                      <Stack>
                        {value.map((item) => (
                          <Text key={item.label}>{item.label}</Text>
                        ))}
                      </Stack>
                    </Accordion.Panel>
                  </Accordion.Item>
                ))}
              </Accordion>
            </Paper>
          )}
        </Transition> */}
      </Container>
    </Header>
  );
}
