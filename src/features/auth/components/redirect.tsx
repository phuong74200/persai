// import { Navigate } from "react-router-dom";

// import { useQueryUser } from "@/services/use-query-user";
// import { ApproveStatus } from "@/types/enums/project-status";
// import { Role } from "@/types/enums/role";

// export default function Redirect() {
//   const { data, isLoading } = useQueryUser();

//   const user = data?.data;

//   if (isLoading) {
//     return null;
//   }

//   if (user?.roleId === Role.ADMIN) {
//     return <Navigate to="/admin/projects" replace={true} />;
//   }

//   if (user?.status === ApproveStatus.FILLING_REQUIRED) {
//     return <Navigate to="/sign-up" replace={true} />;
//   }

//   return <Navigate to="/po/projects" replace={true} />;
// }
