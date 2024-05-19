import React from "react";

import SignInView from "./SignInView";

interface SignInContainerProps {}

const SignInContainer: React.FC<SignInContainerProps> = () => {
  const handleOnLogin = async () => {};

  return <SignInView onLogin={handleOnLogin} />;
};

export default SignInContainer;
