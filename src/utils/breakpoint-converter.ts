import { Breakpoint } from "@/types/breakpoint";

export const toMantineBreakpoint = (breakpoint: Breakpoint) => {
  return Object.entries(breakpoint).reduce<{
    [key: string]: string;
  }>((acc, [key, value]) => {
    return {
      ...acc,
      [key]: `${value}px`,
    };
  }, {});
};

// desktop first version. https://gist.github.com/heytulsiprasad/e8bae1eba7b90ef66b8b1b1ae0861d96
export const toTailwindBreakpoint = (breakpoint: Breakpoint) => {
  return Object.entries(breakpoint).reduce<{
    [key: string]: { max: string };
  }>((acc, [key, value]) => {
    return {
      [key]: {
        max: `${value}px`,
      },
      ...acc,
    };
  }, {});
};
