import { Outlet } from "react-router-dom";
import { AppShell, MantineTheme } from "@mantine/core";

import { HomeHeader } from "@/layouts/home/header";

const styles = (theme: MantineTheme) => ({
  main: {
    minHeight: "100vh",
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },
});

export function HomeLayout() {
  return (
    <AppShell styles={styles} padding="md" layout="alt" header={<HomeHeader />}>
      <Outlet />
    </AppShell>
  );
}
