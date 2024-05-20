import { Box, Text } from "@gluestack-ui/themed";
import React from "react";

// import CustomButton from "@/components/Elements/CustomButton";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

interface SignInViewProps {
  onLogin: () => void;
}

const SignInView: React.FC<SignInViewProps> = ({ onLogin }) => (
  <Box
    flex={1}
    paddingHorizontal="$4"
    justifyContent="center"
    alignItems="center"
    bgColor="white"
  >
    <Text
      onPress={onLogin}
      pt="$2"
      sx={{
        "@base": {
          fontSize: "$6xl",
          lineHeight: "$6xl",
          fontWeight: "bold",
          color: "$primary600",
        },
        "@sm": {
          fontSize: "$8xl",
          lineHeight: "$7xl",
        },
      }}
    >
      SHUDI
    </Text>
    <Text
      mt="$2"
      mb="$10"
      color="$primary600"
      sx={{
        "@sm": {
          fontSize: "$2xl",
          marginBottom: "$6",
        },
      }}
    >
      <GoogleSigninButton onPress={onLogin} />
    </Text>
  </Box>
);

export default SignInView;
