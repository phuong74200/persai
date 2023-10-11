import { useMemo } from "react";
import { resolvePath, useLocation } from "react-router-dom";

type BreadCrumbs = {
  path: string;
  name: string;
};

export default function useBreadcrumbs() {
  const location = useLocation();

  const paths = useMemo(() => {
    return location.pathname.split("/").reduce<BreadCrumbs[]>((acc, cur) => {
      const currentPath = resolvePath(cur, acc[acc.length - 1]?.path || "").pathname;

      return acc.concat({ path: currentPath, name: decodeURI(cur) });
    }, []);
  }, [location]);

  return paths;
}
