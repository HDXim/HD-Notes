import React from "react";

import SignInView from "./SignInView";
import { useAuth } from "../../providers/Auth";

interface SignInContainerProps {}

const SignInContainer: React.FC<SignInContainerProps> = () => {
  const auth = useAuth();
  const handleOnLogin = async () => {
    auth?.sigInGoogle();
  };

  return <SignInView onLogin={handleOnLogin} />;
};

export default SignInContainer;
