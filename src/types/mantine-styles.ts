import { CSSObject, DefaultProps, MantineTheme } from "@mantine/core";

import { NonUndefined } from "@/types/non-undefined";

export type MantineStyles<
  T extends DefaultProps<string, StylesParams>,
  StylesParams extends object = CSSObject,
> = (theme: MantineTheme) => Partial<NonUndefined<T["styles"]>>;
