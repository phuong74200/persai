/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMantineTheme } from "@mantine/core";

type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}

type NonUndefined<T> = T extends undefined ? never : T;

export function useComponentDefaultProps<
  T extends Record<string, any>,
  U extends Partial<T> = NonNullable<unknown>,
>(
  component: string,
  defaultProps: U,
  props: T,
): T & {
  [Key in Extract<keyof T, keyof U>]-?: NonUndefined<T[Key]>;
} {
  const theme = useMantineTheme();
  const contextPropsPayload = theme.components[component]?.defaultProps;
  const contextProps =
    typeof contextPropsPayload === "function" ? contextPropsPayload(theme) : contextPropsPayload;

  return { ...defaultProps, ...contextProps, ...filterProps(props) };
}
