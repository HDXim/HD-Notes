import { Tabs, router, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Box, Text } from "@gluestack-ui/themed";
import { TouchableOpacity } from "react-native";
import { useCallback } from "react";

export default function Layout() {
  const pathName = usePathname();

  const handleOnPressTabGroup = () =>
    replacePathTarget("/main-tabs/group-note");

  const handleOnPressTabProfile = () => replacePathTarget("/main-tabs/profile");

  const replacePathTarget = useCallback(
    (path: string) => {
      if (pathName.includes(path)) {
        return;
      }
      router.replace(path);
    },
    [pathName]
  );

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="group-note"
        options={{
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleOnPressTabGroup}
            >
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderRightWidth={1}
                borderTopWidth={1}
                borderColor="$pink500"
              >
                <Ionicons name="list-circle" size={24} color="#ec4899" />
                <Text>Group note</Text>
              </Box>
            </TouchableOpacity>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarButton: () => (
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={handleOnPressTabProfile}
            >
              <Box
                flex={1}
                justifyContent="center"
                alignItems="center"
                borderTopWidth={1}
                borderColor="$pink500"
              >
                <Ionicons
                  name="person-circle-sharp"
                  size={24}
                  color="#ec4899"
                />
                <Text>Profile</Text>
              </Box>
            </TouchableOpacity>
          ),
        }}
      />
    </Tabs>
  );
}
