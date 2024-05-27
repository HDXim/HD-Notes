import { Stack, Tabs } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{}}>
      <Stack.Screen
        name="group-list"
        options={{
          headerShown: false,
          headerTitle: "groups",
        }}
      />
      <Stack.Screen
        name="group-detail"
        options={{
          headerShown: false,
          headerTitle: "custom-group-note",
        }}
      />
    </Stack>
  );
}
