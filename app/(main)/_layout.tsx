import { Stack } from "expo-router";

import { config } from "@/configs/gluestack";

export default function Layout() {
  return (
    <Stack screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="loading-view"
        options={{
          headerShown: false,
          presentation: "transparentModal",
          animation: "fade",
        }}
      />
      <Stack.Screen
        name="home"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          headerShown: true,
          headerBackVisible: true,
          fullScreenGestureEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: config.tokens.colors.primary600,
          headerTitleStyle: {
            fontWeight: "600",
            color: config.tokens.colors.primary700,
          },
        }}
      />
      <Stack.Screen
        name="custom-group-note"
        options={{
          title: "Custom group note",
          headerTitleAlign: "center",
          headerShown: true,
          headerBackVisible: true,
          fullScreenGestureEnabled: true,
          headerBackTitleVisible: false,
          headerTintColor: config.tokens.colors.primary600,
          headerTitleStyle: {
            fontWeight: "600",
            color: config.tokens.colors.primary700,
          },
        }}
      />
    </Stack>
  );
}
