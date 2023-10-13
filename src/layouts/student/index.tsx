import { Outlet } from "react-router-dom";
import { Affix, AppShell, MantineTheme, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import ChatBox from "@/features/gpt/components/chat-box";
import Porodomo from "@/features/poromodo/components/poromodo";
import useMatchPaths from "@/hooks/use-match-paths";
import { StudentHeader } from "@/layouts/student/header";
import { NavbarNested } from "@/layouts/student/navbar";

const styles = (theme: MantineTheme) => ({
  main: {
    minHeight: "100vh",
    background: theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[0],
  },
});

export function StudentLayout() {
  const [isFlashCardRoute] = useMatchPaths("/set/:setId/flashcard");
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <AppShell
      styles={styles}
      padding="md"
      layout="alt"
      navbar={<NavbarNested opened={opened} />}
      header={<StudentHeader toggle={toggle} opened={opened} />}
    >
      <Affix position={{ bottom: "1rem", right: "1rem" }}>
        <Stack align="center" spacing="0.5rem">
          {isFlashCardRoute && <Porodomo />}
          <ChatBox />
        </Stack>
      </Affix>
      <Outlet />
    </AppShell>
  );
}
