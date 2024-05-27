import React from "react";

import { useAuth } from "@/features/auth";
import ProfileView from "./ProfileView";

const ProfileContainer = () => {
  const auth = useAuth();

  const handleLogOut = () => {
    auth?.signOut();
  };

  return (
    <ProfileView userInfo={auth?.auth?.userInfo} onPressLogOut={handleLogOut} />
  );
};

export default ProfileContainer;
