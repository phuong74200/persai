import { Outlet } from "react-router-dom";

import Error404 from "@/features/error/components/Error404";
import { PublicLayout, StudentLayout } from "@/layouts";
import AuthRouter from "@/modules/auth-router";
import { LoginPage } from "@/pages/login";
import MyCollectionPage from "@/pages/my-collection";
import StudySetPage from "@/pages/study-set";

export const BrowserRouter = new AuthRouter(
  [
    {
      path: "/",
      Component: Outlet,
      children: [
        // {
        //   path: "",
        //   Component: LoginPage,
        // },

        {
          path: "login",
          Component: PublicLayout,
          children: [
            {
              path: "",
              Component: LoginPage,
            },
          ],
        },

        {
          path: "",
          Component: StudentLayout,
          children: [
            {
              path: "study-set",
              Component: StudySetPage,
            },
            {
              path: "my-collection",
              Component: MyCollectionPage,
            },
            {
              path: "set",
              Component: Outlet,
              children: [
                {
                  path: ":setId",
                  element: <h1>asd</h1>,
                },
              ],
            },
          ],
        },

        {
          path: "*",
          Component: Error404,
        },
        {
          path: "*",
          asModal: true,
          Component: Error404,
        },
      ],
    },
  ],
  {
    usePermission: () => {
      return { auth: [], isFetching: false };
    },
  },
);