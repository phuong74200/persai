import { useLocation } from "react-router-dom";
import { ActionIcon, Footer, Group, Paper, SegmentedControl, useMantineTheme } from "@mantine/core";
import { IconPremiumRights, IconSettings, IconUsersGroup } from "@tabler/icons-react";

import useRedirect from "@/hooks/use-redirect";
import { LinksGroupProps } from "@/layouts/components/link-group";

const tree: {
  [key: string]: LinksGroupProps[];
} = {
  Management: [
    { label: "User", icon: IconUsersGroup, link: "/user" },
    { label: "Subscription", icon: IconPremiumRights, link: "/subscription-request" },
    { label: "Setting", icon: IconSettings, link: "/setting/profile" },
  ],
};

const items = Object.entries(tree).reduce<LinksGroupProps[]>(
  (acc, [_, value]) => [...acc, ...value],
  [],
);

export default function AdminFooter() {
  const theme = useMantineTheme();
  const { onRedirect } = useRedirect();

  const location = useLocation();

  return (
    <Footer
      height="auto"
      pos="sticky"
      p="md"
      className="hidden border-none bg-[transparent] bg-none xs:block"
    >
      <Group position="center">
        <Paper shadow="md">
          <SegmentedControl
            size="xs"
            value={location.pathname.split("/").slice(-1)[0]}
            data={items.map((item) => ({
              value: item.link?.split("/").slice(-1)[0] || item.label,
              label: (
                <ActionIcon
                  onClick={onRedirect(item.link)}
                  variant="transparent"
                  size="3rem"
                  color={theme.primaryColor}
                  key={item.label}
                >
                  <item.icon />
                </ActionIcon>
              ),
            }))}
          />
        </Paper>
      </Group>
    </Footer>
  );
}
