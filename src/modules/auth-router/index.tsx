import {
  createBrowserRouter,
  NonIndexRouteObject,
  resolvePath,
  RouterProvider,
  useLocation,
  useRoutes,
} from "react-router-dom";

import logger from "@/utils/dev-log";

type AdvanceRouteObject<P = unknown> = Omit<NonIndexRouteObject, "children" | "path"> & {
  path: string;
  asModal?: boolean;
  permissons?: P[] | ((permission: P[] | undefined) => boolean);
  children?: AdvanceRouteObject<P>[];
};

export default class AuthRouter<P = unknown> {
  private useGetPermisson;
  private routes;

  constructor(
    routes: AdvanceRouteObject<P>[] = [],
    {
      usePermission = () => ({
        auth: [],
        isFetching: false,
      }),
    }: {
      usePermission?: () => {
        auth?: P[];
        isFetching?: boolean;
      };
    },
  ) {
    this.useGetPermisson = usePermission;
    this.routes = routes;
  }

  isMatchPermisson(requiredPermissons: P[], availablePermissons: P[]) {
    const availablePermissonSet = new Set(availablePermissons);

    for (const permisson of requiredPermissons) {
      if (!availablePermissonSet.has(permisson)) return false;
    }

    return true;
  }

  flattenRoutes(routes: AdvanceRouteObject<P>[], parentPath = "") {
    let flattenedRoutes: AdvanceRouteObject<P>[] = [];

    for (const route of routes) {
      const { pathname } = resolvePath(route.path, parentPath);

      if (route.asModal)
        flattenedRoutes.push({
          ...route,
          path: pathname,
        });

      if (route.children && route.children.length > 0)
        flattenedRoutes = flattenedRoutes.concat(this.flattenRoutes(route.children, pathname));
    }

    return flattenedRoutes;
  }

  collectAuthRoutes(routes: AdvanceRouteObject<P>[], permissons: P[], modalRoutesIncluded = true) {
    return routes.filter((route) => {
      const shouldIncludeModalRoute = modalRoutesIncluded || !route.asModal;

      const isPermissonMatched =
        typeof route.permissons === "function"
          ? route.permissons(permissons)
          : this.isMatchPermisson(route.permissons || [], permissons);

      if (shouldIncludeModalRoute && isPermissonMatched) {
        if (route.children) {
          route.children = this.collectAuthRoutes(route.children, permissons, modalRoutesIncluded);
        }
        return true;
      } else {
        return false;
      }
    });
  }

  deepCloneRouteArray(routeArray: AdvanceRouteObject<P>[]): AdvanceRouteObject<P>[] {
    return routeArray.map((route) => ({
      ...route,
      children: this.deepCloneRouteArray(route.children || []),
    }));
  }

  get immRoute() {
    return this.deepCloneRouteArray(this.routes);
  }

  get ModalRoutes() {
    return () => {
      const { auth } = this.useGetPermisson();

      const location = useLocation();
      const background = location.state && location.state.background;

      const modalRoute = useRoutes(
        this.collectAuthRoutes(this.flattenRoutes(this.immRoute), auth || []),
      );

      const fullPageRoute = useRoutes(
        this.collectAuthRoutes(this.immRoute, auth || [], false),
        background || location,
      );

      logger.log("modalRoute", {
        modalRoute,
        fullPageRoute: this.collectAuthRoutes(this.immRoute, auth || [], false),
      });

      return (
        <>
          {fullPageRoute}
          {background && modalRoute}
        </>
      );
    };
  }

  get RouterProvider() {
    return () => {
      return (
        <RouterProvider
          router={createBrowserRouter([
            {
              path: "/",
              element: <this.ModalRoutes />,
              children: this.immRoute,
            },
          ])}
          fallbackElement={<h1>Loading</h1>}
        />
      );
    };
  }
}
