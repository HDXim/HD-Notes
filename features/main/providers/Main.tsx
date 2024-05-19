import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";

interface Props {
  children: React.ReactNode;
}

interface Value {
  mainData: any;
}

export interface ConfirmSignInResult {
  success: boolean;
  session: string | null;
}

const MainContext = React.createContext<Value | null>(null);

// This hook can be used to access the main info.
export const useMain = () => React.useContext(MainContext);

export const MainProvider = ({ children }: Props) => {
  const router = useRouter();

  const [mainData, setMainData] = useState<any>(undefined);

  useEffect(() => {
    setMainData({});

    return () => {};
  }, []);

  const value: Value = useMemo(
    () => ({
      mainData,
    }),
    [mainData]
  );

  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};
