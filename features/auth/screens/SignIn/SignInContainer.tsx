import React from "react";

import SignInView from "./SignInView";
import { useAuth } from "../../providers/Auth";

interface SignInContainerProps {}

const SignInContainer: React.FC<SignInContainerProps> = () => {
  const auth = useAuth();

  const handleOnLogin = async () => {
    auth?.sigInGoogle();
  };

  const handleOnFBLoginFinished = async () => {
    auth?.sigInFacebook();
  };

  return (
    <SignInView
      onLogin={handleOnLogin}
      onFBLoginFinished={handleOnFBLoginFinished}
    />
  );
};

export default SignInContainer;
