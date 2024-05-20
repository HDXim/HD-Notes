import { Box, GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@/configs/gluestack";
import { Slot, usePathname } from "expo-router";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
// import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import { ReactNode } from "react";

import { AuthProvider } from "@/features/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  webClientId:
    "295638920480-r33qg385rlnn6qv6ahtf76rv76aa6fqb.apps.googleusercontent.com",
  offlineAccess: true,
  hostedDomain: "",
  forceCodeForRefreshToken: true,
  accountName: "",
  iosClientId:
    "295638920480-p6chuih038cta6v8ireoesapigf7jvht.apps.googleusercontent.com",
  googleServicePlistPath: "",
  openIdRealm: "",
  profileImageSize: 120,
});

interface ChildrenProps {
  children: ReactNode;
}
const AuthWrapper = ({ children }: ChildrenProps) => {
  const pathname = usePathname();
  const [fontsLoaded] = useFonts({
    ...MaterialCommunityIcons.font,
    ...FontAwesome.font,
    ...Ionicons.font,
    ...Entypo.font,
    ...MaterialIcons.font,
    // ...loadFonts,
  });

  const isAppReady = Platform.OS === "web" || fontsLoaded;

  return !isAppReady ? null : (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ActionSheetProvider>
          <Box flex={1} bgColor="$white">
            <StatusBar backgroundColor={config.tokens.colors.primary400} />
            {children}
          </Box>
        </ActionSheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
};

const CognitoWrapper = ({ children }: ChildrenProps) => {
  return (
    <GluestackUIProvider config={config}>
      <AuthProvider>
        <AuthWrapper>{children}</AuthWrapper>
      </AuthProvider>
    </GluestackUIProvider>
  );
};

export default function RootLayout() {
  return (
    <CognitoWrapper>
      <Slot />
    </CognitoWrapper>
  );
}
