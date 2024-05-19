import { Box } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";

const Container: React.FC<
  React.PropsWithChildren<ComponentProps<typeof Box>>
> = ({ children, ...rest }) => (
  <Box
    width="$full"
    mx="auto"
    sx={{
      "@base": {
        paddingLeft: "$5",
        paddingRight: "$5",
      },
      "@md": {
        paddingLeft: "$20",
        paddingRight: "$20",
      },
      "@lg": {
        paddingLeft: 104,
        paddingRight: 104,
      },
    }}
    {...rest}
  >
    {children}
  </Box>
);
export default Container;
