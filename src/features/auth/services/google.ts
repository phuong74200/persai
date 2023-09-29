// import { NavigateFunction } from "react-router-dom";
// import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// import { queryClient } from "@/app";
// import { auth } from "@/features/auth/services/firebase";

// export const provider = new GoogleAuthProvider();

// export const signInWithGoogle = () => signInWithPopup(auth, provider);
// export const signOutWithGoogle = (navigate?: NavigateFunction) => async () => {
//   localStorage.removeItem("id-token");
//   if (typeof navigate === "function") navigate("/login");
//   queryClient.resetQueries();
//   return await signOut(auth);
// };
