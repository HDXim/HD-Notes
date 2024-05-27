import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Dimensions, ViewStyle } from "react-native";

const width = Dimensions.get("window").width;

interface customModalProps {
  visible: boolean;
  children?: React.ReactNode;
  style?: ViewStyle;
}

const AppCustomModal: React.FC<customModalProps> = ({
  visible,
  children,
  style,
}) => {
  const offset = useSharedValue(width);

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  useEffect(() => {
    if (visible) {
      offset.value = withTiming(0, { duration: 200, easing: Easing.linear });
    } else {
      offset.value = withTiming(width, {
        duration: 200,
        easing: Easing.linear,
      });
    }
  }, [visible]);

  return (
    <Animated.View
      style={[
        {
          flex: 1,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
        },
        animatedStyles,
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AppCustomModal;
