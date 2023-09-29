import { Navigate } from "react-router-dom";

import { DevLayout, PublicLayout } from "@/features/layout";
import AuthRouter from "@/modules/auth-router";
import { Error404Page, LoginPage } from "@/pages";
import useGetCurrentUser from "@/services/use-get-current-user";
import { Permission } from "@/types/permisson";

export const BrowserRouter = new AuthRouter<Permission>(
  [
    {
      path: "/",
      Component: DevLayout,
      children: [
        {
          path: "",
          element: <Navigate to="/login" />,
        },

        {
          path: "login",
          Component: PublicLayout,
          permissons: (p) => p === undefined || p.length === 0,
          children: [
            {
              path: "",
              Component: LoginPage,
            },
          ],
        },
        {
          path: "*",
          Component: Error404Page,
        },
        {
          path: "*",
          asModal: true,
          Component: Error404Page,
        },
      ],
    },
  ],
  {
    usePermission: () => {
      const { data, isFetching } = useGetCurrentUser();

      const auth = data?.data?.permissions as Permission[];

      return { auth, isFetching };
    },
  },
);
