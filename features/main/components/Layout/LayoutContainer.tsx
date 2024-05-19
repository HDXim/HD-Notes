import React from "react";

import LayoutView from "./LayoutView";

const LayoutContainer: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  return <LayoutView>{children}</LayoutView>;
};

export default LayoutContainer;
