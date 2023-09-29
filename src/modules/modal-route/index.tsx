import { RouteObject, useLocation, useRoutes } from "react-router-dom";

export function ModalRoute({ router }: { router: RouteObject[] }) {
  const location = useLocation();
  const background = location.state && location.state.background;

  const normalRoute = useRoutes(router, background || location);

  const modalRoute = useRoutes(router);

  return (
    <>
      {normalRoute}
      {modalRoute}
    </>
  );
}
