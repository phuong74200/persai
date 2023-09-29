// import { useCallback, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useQuery } from "@tanstack/react-query";

// import { authenticationApi } from "@/api";
// import { authQueryKey } from "@/configs/query-key";
// import { signInWithGoogle } from "@/features/auth/services/google";
// import { ApproveStatus } from "@/types/enums/project-status";
// import buildModuleCacheKey from "@/utils/build-module-cache-key";

// const queryKey = buildModuleCacheKey(authQueryKey);

// export default function useQueryAuth(initialIdToken?: string | null) {
//   const [idToken, setIdToken] = useState(initialIdToken);
//   const navigate = useNavigate();

//   const authQuery = useQuery({
//     queryKey: queryKey.get.toKeyWithArgs(idToken || ""),
//     retry: false,
//     queryFn: () => authenticationApi.get(`Bearer ${idToken}`),
//     enabled: !idToken,
//   });

//   useEffect(() => {
//     if (authQuery.isError || !idToken) return;

//     // if authentication is successful, save the idToken into the local storage
//     localStorage.setItem("id-token", idToken);

//     if (authQuery.data?.data.status === ApproveStatus.PENDING) return navigate("/po/sign-up");

//     return navigate("/redirect");
//   }, [idToken, navigate, authQuery.data?.data.status, authQuery.isError]);

//   const loginWithGoogle = useCallback(async () => {
//     const firebaseUser = await signInWithGoogle();
//     const newIdToken = await firebaseUser.user.getIdToken();

//     setIdToken(newIdToken);
//   }, []);

//   return { ...authQuery, idToken, setIdToken, loginWithGoogle };
// }
