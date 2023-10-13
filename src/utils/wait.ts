export function wait(milliseconds = 0) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export const sleep = wait;
export const delay = wait;
