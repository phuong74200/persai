import PublicLayout from "@/features/layout/public";
import AuthRouter from "@/modules/auth-router";

export const BrowserRouter = new AuthRouter(
  [
    {
      path: "/",
      Component: PublicLayout,
      children: [
        {
          path: "",
          element: <h1>asd</h1>,
        },

        // {
        //   path: "login",
        //   Component: PublicLayout,
        //   permissons: (p) => p === undefined || p.length === 0,
        //   children: [
        //     {
        //       path: "",
        //       Component: LoginPage,
        //     },
        //   ],
        // },

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
