import React from "react";
import { Box, Button, Text } from "@gluestack-ui/themed";
import { GoogleSigninButton } from "@react-native-google-signin/google-signin";

interface SignInViewProps {
  onLogin: () => void;
  onFBLoginFinished: () => void;
}

const SignInView: React.FC<SignInViewProps> = ({
  onLogin,
  onFBLoginFinished,
}) => (
  <Box
    flex={1}
    paddingHorizontal="$4"
    justifyContent="center"
    alignItems="center"
    bgColor="orange"
  >
    <GoogleSigninButton onPress={onLogin} />
    <Button onPress={onFBLoginFinished}>
      <Text>Facebook</Text>
    </Button>
  </Box>
);

export default SignInView;
