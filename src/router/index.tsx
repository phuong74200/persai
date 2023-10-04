import { Outlet } from "react-router-dom";

import Error404 from "@/features/error/components/Error404";
import { FlashCardContextProvider } from "@/features/flashcard/contexts/flashcard-context";
import { PublicLayout, StudentLayout } from "@/layouts";
import AuthRouter from "@/modules/auth-router";
import { LoginPage } from "@/pages/login";
import MyCollectionPage from "@/pages/my-collection";
import FlashCardPage from "@/pages/set/[set-id]/flashcard";
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
              Component: FlashCardContextProvider,
              children: [
                {
                  path: ":setId",
                  Component: FlashCardPage,
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
