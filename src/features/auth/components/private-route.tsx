// import { Outlet } from "react-router-dom";

// import Error404 from "@/pages/error-404";
// import { useQueryUser } from "@/services/use-query-user";
// import { Role } from "@/types/enums/role";

// interface PrivateRouteProps {
//   requiredRole: Role[];
// }

// export default function PrivateRoute({ requiredRole }: PrivateRouteProps) {
//   const { data, isLoading } = useQueryUser();

//   const user = data?.data;

//   if (isLoading) {
//     return null;
//   }

//   if (user?.roleId && requiredRole.includes(user?.roleId)) {
//     return <Outlet />;
//   }

//   return <Error404 />;
// }
