import { Box } from "@gluestack-ui/themed";
import React from "react";

import Container from "./Container";

interface LayoutViewProps {}

const LayoutView: React.FC<React.PropsWithChildren<LayoutViewProps>> = ({
  children,
}) => (
  <Box
    flex={1}
    position="relative"
    h="$full"
    // sx={{
    //   _web: {
    //     minHeight: "100vh",
    //   },
    //   "@base": {
    //     bgColor: "$darkBlue600",
    //   },
    //   "@xl": {
    //     bgColor: "$secondary0",
    //   },
    // }}
  >
    <Container flex={1}>{children}</Container>
  </Box>
);

export default LayoutView;
