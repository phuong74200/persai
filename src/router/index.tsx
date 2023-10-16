import { lazy } from "react";
import ReactGA from "react-ga4";
import { Navigate, Outlet } from "react-router-dom";

import { Theme } from "@/app";
import useGetCurrentUser from "@/features/auth/hooks/use-get-current-user";
import Error404 from "@/features/error/components/Error404";
import { FlashCardContextProvider } from "@/features/study-sets/contexts/flashcard-context";

const StudentLayout = lazy(() => import("@/layouts/student"));
const AdminLayout = lazy(() => import("@/layouts/admin"));
const HomeLayout = lazy(() => import("@/layouts/home"));

const NonLoginSetLayout = lazy(() => import("@/layouts/non-login-set"));
const HomePage = lazy(() => import("@/pages/home"));
const LoginPage = lazy(() => import("@/pages/login"));
const CreateSetPage = lazy(() => import("@/pages/create"));

const MyCollectionPage = lazy(() => import("@/pages/my-collection"));
const ViewSetPage = lazy(() => import("@/pages/set/[set-id]"));
const FlashCardPage = lazy(() => import("@/pages/set/[set-id]/flashcard"));
const TestPage = lazy(() => import("@/pages/set/[set-id]/test"));
const PomodoroSettingPage = lazy(() => import("@/pages/setting/pomodoro"));
const ProfileSettingPage = lazy(() => import("@/pages/setting/profile"));
const StudySetPage = lazy(() => import("@/pages/study-set"));
const SubscriptionPage = lazy(() => import("@/pages/subscription"));
const SubscriptionRequestPage = lazy(() => import("@/pages/subscription-request"));
const UserPage = lazy(() => import("@/pages/user"));

import AuthRouter from "@/modules/auth-router";

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
          Component: Outlet,
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
              path: "subscription",
              Component: SubscriptionPage,
            },
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
            {
              path: "subscription-request",
              Component: SubscriptionRequestPage,
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
