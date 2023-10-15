import { Outlet } from "react-router-dom";
import { AppShell, MantineTheme } from "@mantine/core";

import { NonLoginSetHeader } from "@/layouts/non-login-set/header";

const styles = (theme: MantineTheme) => ({
  main: {
    minHeight: "100vh",
  },
  root: {
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },
});

export default function NonLoginSetLayout() {
  return (
    <AppShell styles={styles} padding="md" layout="alt" header={<NonLoginSetHeader />}>
      <Outlet />
    </AppShell>
  );
}
