import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

import ChatBox from "@/features/gpt/components/chat-box";
import { StudentHeader } from "@/layouts/student/header";
import { NavbarNested } from "@/layouts/student/navbar";

const styles = {
  main: {
    height: "100vh",
  },
};

export function StudentLayout() {
  return (
    <AppShell
      styles={styles}
      padding="md"
      layout="alt"
      navbar={<NavbarNested />}
      header={<StudentHeader />}
    >
      <ChatBox />
      <Outlet />
    </AppShell>
  );
}
