import { useRootNavigationState, useRouter } from "expo-router";
import React, { useCallback, useEffect, useMemo } from "react";
import { authType } from "./types";
import { loginWithGoogleAPI, signOutGoogleAPI } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import { formatError } from "@/utils/format";
// import removeEmptyKeys from "@/utils/removeEmptyKeys";

interface Props {
  children: React.ReactNode;
}

interface Value {
  signInManual: (accountName: string, password: string) => void;
  sigInGoogle: () => void;
  sigInFacebook: () => void;
  signOut: () => void;
  auth: authType | null;
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
const useProtectedRoute = (auth: authType | null) => {
  const router = useRouter();
  // checking that navigation is all good;
  const rootNavigation = useRootNavigationState();

  React.useEffect(() => {
    if (!rootNavigation.key) return;

    if (auth && !!auth.accessToken) {
      router.replace("/home");
    } else {
      router.replace("/login");
    }
  }, [auth, router, rootNavigation.key]);
};

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const [auth, setAuth] = React.useState<authType | null>(null);

  const initializeAuthData = useCallback(async () => {
    const authAppString = await AsyncStorage.getItem("@authApp");
    const authApp: authType = JSON.parse(authAppString || "");
    if (authApp) {
      setAuth(authApp);
    }
  }, []);

  const handleSignInManual = useCallback(
    async (accountName: string, password: string) => {},
    []
  );

  const handleSignInGoogle = useCallback(async () => {
    const resSigIn = await loginWithGoogleAPI();
    if (!resSigIn) {
      return;
    }
    const authInfo = {
      accessToken: resSigIn.idToken || resSigIn.serverAuthCode || "",
      userInfo: {
        userId: resSigIn.user.id || "",
        email: resSigIn.user.email || "",
        fullName: resSigIn.user.name || "",
        avatar: resSigIn.user.photo || "",
      },
    };
    setAuth(authInfo);
    AsyncStorage.setItem("@authApp", JSON.stringify(authInfo));
  }, []);

  const handleSignInFacebook = useCallback(async () => {}, []);

  const handleSignOut = useCallback(async () => {
    await signOutGoogleAPI();
    AsyncStorage.removeItem("@authApp");
    setAuth(null);
  }, [router]);

  React.useEffect(() => {
    initializeAuthData();
  }, []);

  useProtectedRoute(auth);

  const value: Value = useMemo(
    () => ({
      signInManual: handleSignInManual,
      sigInGoogle: handleSignInGoogle,
      sigInFacebook: handleSignInFacebook,
      signOut: handleSignOut,
      auth,
    }),
    [
      handleSignInManual,
      handleSignInGoogle,
      handleSignInFacebook,
      handleSignOut,
      auth,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
