import { ActionIcon, Container, createStyles, Group, Image, rem } from "@mantine/core";
import { IconBrandFacebook, IconBrandInstagram } from "@tabler/icons-react";

import { ASSET_PERSAI_LOGO_LG } from "@/assets";

const useStyles = createStyles((theme) => ({
  footer: {
    // position: "sticky",
    // bottom: 0,
    // zIndex: -1,

    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column",
    },
  },

  links: {
    [theme.fn.smallerThan("xs")]: {
      marginTop: theme.spacing.md,
    },
  },
}));

export function FooterSocial() {
  const { classes } = useStyles();

  const handleFacebookClick = () => {
    window.open("https://www.facebook.com/PerSAI.Official", "_blank");
  };

  const handleInstagramClick = () => {
    window.open("https://instagram.com/persai.learning", "_blank");
  };

  return (
    <div className={classes.footer}>
      <Container className={classes.inner}>
        <Image src={ASSET_PERSAI_LOGO_LG} width={140} />
        <Group className={classes.links} position="right" noWrap>
          <ActionIcon size="lg" onClick={handleFacebookClick}>
            <IconBrandFacebook size="1.5rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon size="lg" onClick={handleInstagramClick}>
            <IconBrandInstagram size="1.5rem" stroke={1.5} />
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
}
