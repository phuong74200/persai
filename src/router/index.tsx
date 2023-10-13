import ReactGA from "react-ga4";
import { Navigate, Outlet } from "react-router-dom";

import { Theme } from "@/app";
import useGetCurrentUser from "@/features/auth/hooks/use-get-current-user";
import Error404 from "@/features/error/components/Error404";
import { FlashCardContextProvider } from "@/features/study-sets/contexts/flashcard-context";
import { PublicLayout, StudentLayout } from "@/layouts";
import { AdminLayout } from "@/layouts/admin";
import { HomeLayout } from "@/layouts/home";
import { NonLoginSetLayout } from "@/layouts/non-login-set";
import AuthRouter from "@/modules/auth-router";
import CreateSetPage from "@/pages/create";
import HomePage from "@/pages/home";
import { LoginPage } from "@/pages/login";
import MyCollectionPage from "@/pages/my-collection";
import ViewSetPage from "@/pages/set/[set-id]";
import FlashCardPage from "@/pages/set/[set-id]/flashcard";
import TestPage from "@/pages/set/[set-id]/test";
import PomodoroSettingPage from "@/pages/setting/pomodoro";
import ProfileSettingPage from "@/pages/setting/profile";
import StudySetPage from "@/pages/study-set";
import UserPage from "@/pages/user";

export const BrowserRouter = new AuthRouter(
  [
    {
      path: "/",
      Component: Theme,
      children: [
        {
          path: "",
          Component: HomeLayout,
          children: [
            {
              path: "",
              Component: HomePage,
            },
          ],
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
          path: "login",
          permissons: ["ADMIN"],
          element: <Navigate to="/user" replace />,
        },

        {
          path: "login",
          permissons: ["STUDENT"],
          element: <Navigate to="/study-set" replace />,
        },

        {
          path: "setting",
          permissons: ["STUDENT"],
          children: [
            {
              path: "pomodoro",
              Component: PomodoroSettingPage,
              asModal: true,
            },
            {
              path: "",
              Component: StudentLayout,
              children: [
                {
                  path: "profile",
                  Component: ProfileSettingPage,
                },
              ],
            },
          ],
        },

        {
          path: "",
          Component: StudentLayout,
          permissons: ["STUDENT"],
          children: [
            {
              path: "create",
              Component: CreateSetPage,
            },
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
                  Component: ViewSetPage,
                },
                {
                  path: ":setId",
                  Component: FlashCardContextProvider,
                  children: [
                    {
                      path: "flashcard",
                      Component: FlashCardPage,
                    },
                    {
                      path: "test",
                      Component: TestPage,
                    },
                  ],
                },
              ],
            },
          ],
        },

        {
          path: "",
          Component: AdminLayout,
          permissons: ["ADMIN"],
          children: [
            {
              path: "user",
              Component: UserPage,
            },
          ],
        },

        {
          path: "",
          Component: NonLoginSetLayout,
          children: [
            {
              path: "set",
              Component: Outlet,
              children: [
                {
                  path: ":setId",
                  Component: ViewSetPage,
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
      const { data, isFetching } = useGetCurrentUser();

      ReactGA.send({
        hitType: "pageview",
        page: window.location.pathname,
        title: window.location.pathname,
      });

      const auth = [data?.data?.role].filter(Boolean);

      return { auth, isFetching };
    },
  },
);
