import React, { useEffect } from "react";
import { Box, Button, ScrollView, Text } from "@gluestack-ui/themed";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import { listThemeColor } from "@/constants/Colors";

export interface ThemeColorPickerProps {
  isOpen: boolean;
  themeColor: string;
  setThemeColor: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeColorPicker: React.FC<ThemeColorPickerProps> = ({
  isOpen = false,
  themeColor,
  setThemeColor,
}) => {
  const offset = useSharedValue<number>(100);

  const animatedStyles = useAnimatedStyle(() => ({
    height: offset.value,
  }));

  useEffect(() => {
    if (isOpen) {
      offset.value = withTiming(getHeightRatio(70), {
        duration: 100,
        easing: Easing.linear,
      });
    } else {
      offset.value = withTiming(0, {
        duration: 100,
        easing: Easing.linear,
      });
    }
  }, [isOpen, offset]);

  return (
    <Animated.View style={[styles.mainStyle, animatedStyles]}>
      <Text textAlign="center" color={themeColor}>
        Theme Color
      </Text>
      <Box style={styles.listColorCotainer}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          horizontal
          style={styles.listColor}
          contentContainerStyle={styles.listColorContainerStyle}
        >
          {listThemeColor.map((color) => (
            <Button
              activeOpacity={0.6}
              key={color}
              onPress={() => setThemeColor(color)}
            >
              <Box
                style={[styles.colorContainer, { backgroundColor: color }]}
              />
            </Button>
          ))}
        </ScrollView>
      </Box>
    </Animated.View>
  );
};

export default ThemeColorPicker;
