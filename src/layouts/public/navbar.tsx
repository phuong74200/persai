import { forwardRef } from "react";
import { Image, Navbar, Title } from "@mantine/core";

import { ASSET_LOGIN_ARTBOARD } from "@/assets";

export const NavBar = forwardRef<HTMLDivElement, unknown>((_, ref) => {
  return (
    <Navbar className="justify-center gap-12" width={{ sm: 350 }} p="xl" ref={ref}>
      <Title>Hi, welcome back</Title>
      <Image src={ASSET_LOGIN_ARTBOARD} />
    </Navbar>
  );
});
