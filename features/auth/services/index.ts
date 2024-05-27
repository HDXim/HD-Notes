import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { AccessToken, LoginManager } from "react-native-fbsdk-next";

export const loginWithGoogleAPI = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    return await GoogleSignin.signIn();
  } catch (error) {
    console.log("loginWithGoogleAPI error", error);
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    } else if (error.code === statusCodes.IN_PROGRESS) {
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    } else {
      // some other error happened
    }
  }
};

export const logOutAPI = async () => {
  try {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    if (isGoogleSignedIn) {
      await GoogleSignin.signOut();
    }

    const resAccessToken = await AccessToken.getCurrentAccessToken();
    if (resAccessToken?.accessToken) {
      LoginManager.logOut();
    }
  } catch (error) {
    console.log("logOutAPI error", error);
  }
};
