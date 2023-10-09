import { useEffect, useState } from "react";
import { Tooltip, TooltipProps } from "@mantine/core";
import { useTimeout } from "@mantine/hooks";

type Props = TooltipProps & {
  updated?: number;
};

export default function ErrorTooltip({ label, closeDelay = 5000, updated = 0, ...others }: Props) {
  const [opened, setOpened] = useState<boolean | undefined>(false);

  const { start } = useTimeout(() => setOpened(undefined), closeDelay);

  useEffect(() => {
    setOpened(true);
    start();
  }, [start, label, updated]);

  return <Tooltip label={label} {...others} opened={opened} />;
}
