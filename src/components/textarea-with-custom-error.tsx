import { TextInput, TextInputProps, ThemeIcon } from "@mantine/core";
import { IconExclamationMark } from "@tabler/icons-react";

import ErrorTooltip from "@/features/error/components/error-tooltip";

export default function TextInputWithCustomError({ error, ...other }: TextInputProps) {
  return (
    <TextInput
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
