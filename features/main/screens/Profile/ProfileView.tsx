import React from "react";
import { Box, Button, Image, Text } from "@gluestack-ui/themed";
import { AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { userInfo } from "@/features/auth/providers/types";

interface ProfileProps {
  userInfo: userInfo | undefined;
  onPressLogOut: () => void;
}

const ProfileView: React.FC<ProfileProps> = ({ userInfo, onPressLogOut }) =>
  userInfo ? (
    <Box flex={1} alignItems="center" justifyContent="flex-start">
      <Box flexDirection="column" alignItems="center" p={"$10"}>
        <Image
          borderWidth={0.5}
          borderColor="black"
          borderRadius={99}
          w={"$40"}
          aspectRatio={1}
          alt="avatar"
          source={{ uri: userInfo.avatar }}
        />
        <Text pt={"$2"}>{userInfo.fullName}</Text>
        <Text pt={"$2"}>{userInfo.email}</Text>
      </Box>
      <Button
        onPress={onPressLogOut}
        height={50}
        borderRadius={"$3xl"}
        $active-opacity={"$50"}
        bgColor="$pink500"
        alignSelf="center"
      >
        <Text color="$white" pr={"$10"}>
          Đăng xuất
        </Text>
        <AntDesign name="logout" size={24} color="white" />
      </Button>
    </Box>
  ) : null;

export default ProfileView;
