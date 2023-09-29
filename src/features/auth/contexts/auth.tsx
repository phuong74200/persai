import { createContext, PropsWithChildren, useContext, useState } from "react";

import { Role } from "@/types/enums/role";

type AuthContextType = {
  role: Role;
  setRole: React.Dispatch<React.SetStateAction<Role>>;
  handleRoleChange: (value: Role) => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = (props: PropsWithChildren) => {
  const [role, setRole] = useState(Role.STUDENT);

  const handleRoleChange = (value: Role) => setRole(value);

  return <AuthContext.Provider value={{ role, setRole, handleRoleChange }} {...props} />;
};

export const useAuthContext = () => useContext(AuthContext);
