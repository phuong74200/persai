import emptyFn from "@/utils/empty-fn";

const ConsoleKeys = Object.keys(console) as (keyof Console)[];
const customLog = ConsoleKeys.reduce(
  (pre, cur) => ({
    ...pre,
    [cur]: emptyFn,
  }),
  {},
);

/**
 *
 * @param mode development, production, test - which mode that log will be shown in the dev tool
 */
function dev_log(mode: ImportMetaEnv["MODE"][] = ["development"]) {
  if (mode.includes(import.meta.env.MODE)) {
    return console;
  }
  return {
    ...customLog,
    error: () => {
      // send custom error log to server
    },
  } as Console;
}

const logger = dev_log(["development", "test"]);

export default logger;
