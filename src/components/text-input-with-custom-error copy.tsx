import { Textarea, TextareaProps, ThemeIcon } from "@mantine/core";
import { IconExclamationMark } from "@tabler/icons-react";

import ErrorTooltip from "@/features/error/components/error-tooltip";

export default function TextAreaWithCustomError({ error, ...other }: TextareaProps) {
  return (
    <Textarea
      withAsterisk
      {...other}
      rightSection={
        error && (
          <ErrorTooltip
            updated={new Date().getTime()}
            label={error}
            color="red"
            position="right"
            offset={10}
          >
            <ThemeIcon radius="lg" size="sm" color="red">
              <IconExclamationMark />
            </ThemeIcon>
          </ErrorTooltip>
        )
      }
      error={!!error}
    />
  );
}
