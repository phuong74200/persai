export const matchAnySearch = (
  str: string | undefined | null,
  pattern: string | undefined | null,
) => {
  // check if falsy
  if (str === undefined || pattern === undefined || str === null || pattern === null) return false;

  const strs = str.split(" ").map((str) => str.trim().toLowerCase());
  const _pattern = pattern.toLowerCase().replace(/\s+/g, "");

  const matches = strs.reduce((pre, cur) => {
    if (_pattern.includes(cur)) return pre + 1;
    return pre;
  }, 0);

  return matches == strs.length;
};
