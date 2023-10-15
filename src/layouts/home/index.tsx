import { Outlet } from "react-router-dom";
import { AppShell, MantineTheme } from "@mantine/core";

const styles = (theme: MantineTheme) => ({
  main: {
    minHeight: "100vh",
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
    padding: 0,
  },
});

export default function HomeLayout() {
  return (
    <AppShell styles={styles} padding="md" layout="alt">
      <Outlet />
    </AppShell>
  );
}
