// import { useState } from "react";
// import { notifications } from "@mantine/notifications";
// import { FirebaseError } from "firebase/app";
// import { UserCredential } from "firebase/auth";

// import { signInWithGoogle } from "@/features/auth/services/google";
// import setIdToken from "@/utils/set-id-token";

// export default function useGoogleLogin() {
//   const [credential, setCredential] = useState<UserCredential | null>(null);
//   const [error, setError] = useState<unknown | FirebaseError>(undefined);
//   const [loading, setLoading] = useState(false);

//   const signIn = async () => {
//     setLoading(true);
//     try {
//       const response = await signInWithGoogle();
//       setCredential(response);
//       const idToken = await response.user.getIdToken();
//       setIdToken(idToken); // save the idToken into the local storage
//       return response;
//     } catch (e) {
//       if (e instanceof FirebaseError) {
//         setError(e);
//         notifications.show({
//           title: "Error",
//           message: e.message,
//           color: "red",
//         });
//       }
//       setCredential(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { credential, error, signIn, loading };
// }
