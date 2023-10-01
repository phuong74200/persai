import { Outlet } from "react-router-dom";
import { AppShell } from "@mantine/core";

import ChatBox from "@/features/gpt/components/chat-box";
import { StudentHeader } from "@/layouts/student/header";
import { NavbarNested } from "@/layouts/student/navbar";

export function StudentLayout() {
  return (
    <AppShell
      padding="md"
      layout="alt"
      navbar={<NavbarNested />}
      header={<StudentHeader links={[]} />}
    >
      <ChatBox />
      <Outlet />
    </AppShell>
  );
}
