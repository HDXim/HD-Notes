import { useRootNavigationState, useRouter } from "expo-router";
import React, { useCallback, useMemo } from "react";
import { authType } from "./types";
import { loginWithGoogleAPI, logOutAPI } from "../services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AccessToken, LoginManager, Profile } from "react-native-fbsdk-next";

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
      router.replace("/main-tabs");
    } else {
      router.replace("/login");
    }
  }, [auth, router, rootNavigation.key]);
};

export const AuthProvider = ({ children }: Props) => {
  const router = useRouter();

  const [auth, setAuth] = React.useState<authType | null>(null);

  const initializeAuthData = useCallback(async () => {
    try {
      const authAppString = await AsyncStorage.getItem("@authApp");
      if (!authAppString) {
        return;
      }
      const authApp: authType = JSON.parse(authAppString || "");
      setAuth(authApp);
    } catch (error) {
      console.log("error", error);
    }
  }, []);

  const handleSignInManual = useCallback(
    async (accountName: string, password: string) => {
      console.log("-------accountName------", accountName);
      console.log("-------password------", password);
    },
    []
  );

  const handleSignInGoogle = useCallback(async () => {
    const resSigIn = await loginWithGoogleAPI();
    if (!resSigIn) {
      return;
    }
    const authInfo: authType = {
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

  const handleSignInFacebook = useCallback(async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
      ]);
      if (result.isCancelled) {
        console.log("Login cancelled");
      } else {
        const currentProfile = await Profile.getCurrentProfile();
        const currentAccessToken = await AccessToken.getCurrentAccessToken();
        const authInfo: authType = {
          accessToken: currentAccessToken?.accessToken || "",
          userInfo: {
            userId: currentProfile?.userID || "",
            email: currentProfile?.email || "",
            fullName: currentProfile?.name || "",
            avatar: currentProfile?.imageURL || "",
          },
        };
        setAuth(authInfo);
        AsyncStorage.setItem("@authApp", JSON.stringify(authInfo));
      }
    } catch (error) {
      console.log("handleSignInFacebook error", error);
    }
  }, []);

  const handleSignOut = useCallback(async () => {
    await logOutAPI();
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
