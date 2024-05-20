export type userInfo = {
  userId: string;
  email: string;
  fullName: string;
  avatar: string;
};

export type authType = {
  userInfo: userInfo;
  accessToken: string;
};
