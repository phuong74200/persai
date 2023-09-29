import { useMemo } from "react";
import { matchPath, useLocation } from "react-router-dom";

export default function useMatchPaths(...patterns: string[]) {
  const { pathname } = useLocation();
  return useMemo(
    () => [...patterns].map((pattern) => matchPath(pattern, pathname)),
    [pathname, patterns],
  );
}
