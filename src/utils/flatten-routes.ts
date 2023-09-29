import { RouteObject } from "react-router-dom";
import { capitalCase } from "change-case";

import { TableOfContentLink } from "@/components/table-of-content";

export const flattenRoutes = (routes: RouteObject[]) => {
  const seenPaths = new Set<string>();

  const handler = (routes: RouteObject[], root: TableOfContentLink[] = [], order = 1) => {
    routes.forEach((route) => {
      if (route.path) {
        root?.push({
          label: capitalCase(route.path.split("/").pop() || "Home"),
          link: route.path,
          order: order,
        });
      }
      if (route.children) handler(route.children, root, order + 1);
    });

    return root;
  };

  return handler(routes, [], 1)
    .sort((a, b) => a.link.localeCompare(b.link))
    .filter((route) => {
      return seenPaths.has(route.link) ? false : seenPaths.add(route.link);
    });
};
