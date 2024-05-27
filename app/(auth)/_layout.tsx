import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack initialRouteName="login" screenOptions={{ gestureEnabled: false }}>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
