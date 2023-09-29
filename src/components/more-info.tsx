import { ThemeIcon, Tooltip, TooltipProps } from "@mantine/core";
import { IconQuestionMark } from "@tabler/icons-react";

export default function MoreInfo(props: Omit<TooltipProps, "children">) {
  return (
    <Tooltip {...props}>
      <ThemeIcon radius="lg" size={12}>
        <IconQuestionMark />
      </ThemeIcon>
    </Tooltip>
  );
}
