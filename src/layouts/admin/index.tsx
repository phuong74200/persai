import { Outlet } from "react-router-dom";
import { AppShell, MantineTheme } from "@mantine/core";

import AdminFooter from "@/layouts/admin/footer";
import { NavbarNested } from "@/layouts/admin/navbar";
import { StudentHeader } from "@/layouts/student/header";

const styles = (theme: MantineTheme) => ({
  main: {
    minHeight: "100vh",
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },
});

export default function AdminLayout() {
  return (
    <AppShell
      styles={styles}
      padding="md"
      layout="alt"
      navbar={<NavbarNested />}
      header={<StudentHeader />}
      footer={<AdminFooter />}
    >
      <Outlet />
    </AppShell>
  );
}
