import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

import { NavBar } from "@/layouts/public/navbar";

export const PublicLayout = () => {
  return (
    <AppShell padding="md" navbar={<NavBar />}>
      <Outlet />
    </AppShell>
  );
};
