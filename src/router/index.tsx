import ReactGA from "react-ga4";
import { Navigate, Outlet } from "react-router-dom";

import { Theme } from "@/app";
import useGetCurrentUser from "@/features/auth/hooks/use-get-current-user";
import Error404 from "@/features/error/components/Error404";
import { FlashCardContextProvider } from "@/features/study-sets/contexts/flashcard-context";

const StudentLayout = lazyWithRetries(() => import("@/layouts/student"));
const AdminLayout = lazyWithRetries(() => import("@/layouts/admin"));
const HomeLayout = lazyWithRetries(() => import("@/layouts/home"));

const NonLoginSetLayout = lazyWithRetries(() => import("@/layouts/non-login-set"));
const HomePage = lazyWithRetries(() => import("@/pages/home"));
const LoginPage = lazyWithRetries(() => import("@/pages/login"));
const CreateSetPage = lazyWithRetries(() => import("@/pages/create"));

const MyCollectionPage = lazyWithRetries(() => import("@/pages/my-collection"));
const ViewSetPage = lazyWithRetries(() => import("@/pages/set/[set-id]"));
const FlashCardPage = lazyWithRetries(() => import("@/pages/set/[set-id]/flashcard"));
const TestPage = lazyWithRetries(() => import("@/pages/set/[set-id]/test"));
const PomodoroSettingPage = lazyWithRetries(() => import("@/pages/setting/pomodoro"));
const ProfileSettingPage = lazyWithRetries(() => import("@/pages/setting/profile"));
const StudySetPage = lazyWithRetries(() => import("@/pages/study-set"));
const SubscriptionPage = lazyWithRetries(() => import("@/pages/subscription"));
const SubscriptionRequestPage = lazyWithRetries(() => import("@/pages/subscription-request"));
const UserPage = lazyWithRetries(() => import("@/pages/user"));

import AuthRouter from "@/modules/auth-router";
import ComingSoonPage from "@/pages/coming-soon";
import ReferralPage from "@/pages/referral";
import { lazyWithRetries } from "@/utils/lazy-with-retries";

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
          path: "setting",
          permissons: ["ADMIN"],
          children: [
            {
              path: "",
              Component: AdminLayout,
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
            {
              path: "referral",
              Component: ReferralPage,
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
          path: "/coming-soon",
          Component: ComingSoonPage,
          asModal: true,
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
