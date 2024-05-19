import { useRootNavigationState, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo } from "react";

// import { formatError } from "@/utils/format";
// import removeEmptyKeys from "@/utils/removeEmptyKeys";

interface Props {
  children: React.ReactNode;
}

interface Value {
  signIn: (countryCode: string, phoneNumber: string) => Promise<string>;
  // confirmSignIn: (input: any) => Promise<ConfirmSignInResult>;
  confirmSignIn: (input: any) => void;
  // signOut: () => Promise<void>;
  signOut: () => void;
  auth: any | null | undefined;
  loading?: boolean;
}

export interface ConfirmSignInResult {
  success: boolean;
  session: string | null;
}

const AuthContext = React.createContext<Value | null>(null);

// This hook can be used to access the auth info.
export const useAuth = () => React.useContext(AuthContext);

// This hook will protect the route access based on auth authentication.
const useProtectedRoute = (auth: any | null | undefined) => {
  const router = useRouter();
  // checking that navigation is all good;
  const rootNavigation = useRootNavigationState();

  React.useEffect(() => {
    if (!rootNavigation.key) return;

    if (!auth) {
      router.replace("/login");
    } else if (auth?.AccessToken) {
      router.replace("/home");
    }
  }, [auth, router, rootNavigation.key]);
};

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const [auth, setAuth] = React.useState<any | null | undefined>(undefined);

  const initializeAuthData = useCallback((auth: any) => {
    // const { ...authData } = auth;
    // const consolidatedAuthData = {
    //   ...authData,
    //   idToken: authData?.IdToken,
    // };
    // requestHeadersVar(
    //   removeEmptyKeys({
    //     accessToken: authData?.AccessToken ?? undefined,
    //     // metabaseSessionId: authData.data.metabaseSessionId,
    //     idToken: authData?.IdToken,
    //     refreshToken: authData?.RefreshToken ?? undefined,
    //   })
    // );
    // return Promise.all([
    //   AsyncStorage.setItem(
    //     "@currentUser",
    //     JSON.stringify({
    //       auth: consolidatedAuthData,
    //     })
    //   ),
    //   setAuth(auth),
    // ]);
  }, []);

  const handleSignIn = useCallback(
    (countryCode: string, phoneNumber: string) =>
      new Promise((resolve: (data: string) => void, reject) => {
        // signIn({
        //   variables: {
        //     input: { phoneNumber: `${countryCode}${phoneNumber}` },
        //   },
        // })
        //   .then(data => resolve(data?.data?.signIn?.data?.Session ?? ""))
        //   .catch(error => {
        //     const { message } = formatError(error);
        //     toast.show({
        //       description:
        //         message ?? "There has been an error, please try again",
        //       action: "error",
        //     });
        //     reject(message);
        //   });
      }),
    []
  );

  const handleConfirmSignIn = useCallback(
    (input: any) => {
      // return confirmSignIn({
      //   variables: {
      //     input,
      //   },
      // })
      //   .then(async ({ data }) => {
      //     switch (data?.confirmSignIn.__typename) {
      //       case "ConfirmSignInResult": {
      //         const { __typename, ...authData } = data.confirmSignIn.data;
      //         try {
      //           requestHeadersVar(
      //             removeEmptyKeys({
      //               accessToken: authData?.AccessToken ?? undefined,
      //               idToken: authData?.IdToken,
      //               refreshToken: authData?.RefreshToken ?? undefined,
      //             })
      //           );
      //           await initializeAuthData({ ...authData });
      //           return {
      //             success: true,
      //             session: null,
      //           };
      //         } catch (error) {
      //           initializeAuthData({ ...authData });
      //           return {
      //             success: true,
      //             session: null,
      //           };
      //         }
      //       }
      //       case "SignInResult": {
      //         const newSession = data.confirmSignIn.data.Session;
      //         return {
      //           success: false,
      //           session: newSession,
      //         };
      //       }
      //       default:
      //         return {
      //           success: false,
      //           session: null,
      //         };
      //     }
      //   })
      //   .then(({ success, session }) => ({
      //     success,
      //     session,
      //   }))
    },

    [initializeAuthData]
  );

  const handleSignOut = useCallback(
    (isTokenExpire?: boolean) => {
      // return signOut()
      //   .then(() => undefined)
      //   .finally(() => {
      //     router.replace("/feedback");
      //     client.clearStore().catch(() => undefined);
      //     if (isTokenExpire)
      //       toast.show({
      //         description: "Your session has expired, please login again",
      //         action: "warning",
      //       });
      //     AsyncStorage.removeItem("@currentUser");
      //     setAuth(null);
      //     requestHeadersVar({
      //       accessToken: null,
      //       // metabaseSessionId: null,
      //       idToken: null,
      //       refreshToken: null,
      //     });
      //   });
    },
    [router]
  );

  const value: Value = useMemo(
    () => ({
      signIn: handleSignIn,
      confirmSignIn: handleConfirmSignIn,
      signOut: handleSignOut,
      auth,
    }),
    [auth, handleConfirmSignIn, handleSignIn, handleSignOut]
  );

  const isLoaded = auth !== undefined;

  // Set the function to be called when a refresh token is needed. This will be called from ApolloClient.tsx.
  useEffect(() => {
    // refreshTokenVar(() => {
    //   const { refreshToken: currentRefreshToken } = requestHeadersVar();
    //   console.warn("token expired. Get a new one with", currentRefreshToken);
    //   return !currentRefreshToken
    //     ? handleSignOut().then(() => undefined)
    //     : refreshToken({
    //         variables: {
    //           refreshTokenInput: {
    //             refreshToken: currentRefreshToken,
    //           },
    //         },
    //       })
    //         .then(({ data }) =>
    //           initializeAuthData({
    //             ...data?.refreshToken.data!,
    //             RefreshToken:
    //               data?.refreshToken?.data?.RefreshToken || currentRefreshToken,
    //           }).then(() => data?.refreshToken.data)
    //         )
    //         .catch(() => handleSignOut().then(() => undefined));
    // });
  }, [handleSignOut, initializeAuthData]);

  // Restore the auth info from the local storage.
  useEffect(() => {
    // if (!isLoaded) {
    //   AsyncStorage.getItem("@currentUser").then((dataString) => {
    //     if (dataString && dataString !== "undefined") {
    //       const { auth } = JSON.parse(dataString);
    //       if (!!auth) {
    //         initializeAuthData(auth);
    //       } else {
    //         // The local storage data is corrupt
    //         setAuth(null);
    //         requestHeadersVar({
    //           accessToken: null,
    //           // metabaseSessionId: null,
    //           idToken: null,
    //           refreshToken: null,
    //         });
    //       }
    //     } else {
    //       setAuth(null);
    //       requestHeadersVar({
    //         accessToken: null,
    //         // metabaseSessionId: null,
    //         idToken: null,
    //         refreshToken: null,
    //       });
    //     }
    //   });
    // }
  }, [isLoaded, initializeAuthData]);

  useProtectedRoute(auth);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
