import {
  Burger,
  Container,
  createStyles,
  Group,
  Header,
  Paper,
  rem,
  Transition,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useGoogleOneTapLogin } from "@react-oauth/google";

import useGoogleLogin from "@/features/auth/hooks/use-google-login";
import useRedirect from "@/hooks/use-redirect";

const HEADER_HEIGHT = rem(60);

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: "absolute",
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
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

export function HomeHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const { classes } = useStyles();
  const { redirect } = useRedirect();

  const { handleSuccess } = useGoogleLogin();

  useGoogleOneTapLogin({
    onSuccess: (response) => {
      redirect("/study-set");
      handleSuccess(response);
    },
  });

  return (
    <Header
      height={HEADER_HEIGHT}
      bg="transparent"
      className="border-none bg-oc-gray-8 bg-opacity-70 backdrop-blur-lg"
    >
      <Container className={classes.header} fluid>
        <Group className={classes.links}></Group>

        <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              xxx
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
}
