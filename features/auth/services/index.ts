import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

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

export const signOutGoogleAPI = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.log("signOutGoogleAPI error", error);
  }
};
