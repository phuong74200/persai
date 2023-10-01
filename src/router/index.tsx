import { Outlet } from "react-router-dom";

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
          ],
        },

        {
          path: "*",
          element: <h1>not found</h1>,
        },
        {
          path: "*",
          asModal: true,
          element: <h1>not found</h1>,
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
