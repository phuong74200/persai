export function normalizePath(path: string): string {
  return (
    "/" +
    path
      .split("/")
      .filter((segment) => segment !== "")
      .join("/")
  );
}
