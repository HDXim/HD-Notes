import React, {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
} from "react";
import { TouchableOpacity, ViewStyle } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

export interface SwipeableWrapperProps {
  cpmRightWidth?: number;
  onPressLeftCmp: () => void;
  children?: ReactNode;
  rightCmp: ReactNode;
  mainStyle?: ViewStyle;
  rightCmpStyle?: ViewStyle;
  childrenStyle?: ViewStyle;
}

const SwipeableWrapper = forwardRef<{ close: Function }, SwipeableWrapperProps>(
  (
    {
      cpmRightWidth = 50,
      onPressLeftCmp,
      children,
      rightCmp,
      mainStyle,
      rightCmpStyle,
      childrenStyle,
    },
    ref
  ) => {
    const offset = useSharedValue(0);
    const initialTouchLocation = useSharedValue<{
      x: number;
      y: number;
    } | null>(null);

    useImperativeHandle(ref, () => {
      return {
        close: () => {
          offset.value = 0;
        },
      };
    });

    useEffect(() => {
      return () => {
        offset.value = 0;
      };
    }, []);

    const gesture = Gesture.Pan()
      .onBegin((evt) => {
        initialTouchLocation.value = { x: evt.x, y: evt.y };
      })
      .onTouchesMove((evt, state) => {
        // Sanity checks
        if (!initialTouchLocation.value || !evt.changedTouches.length) {
          state.fail();
          return;
        }

        const xDiff = Math.abs(
          evt.changedTouches[0].x - initialTouchLocation.value.x
        );
        const yDiff = Math.abs(
          evt.changedTouches[0].y - initialTouchLocation.value.y
        );
        const isHorizontalPanning = xDiff > yDiff;

        if (isHorizontalPanning) {
          state.activate();
        } else {
          state.fail();
        }
      })
      .onUpdate((event) => {
        offset.value = Math.min(0, event.translationX);
      })
      .onEnd((event) => {
        offset.value =
          Math.abs(event.translationX) < cpmRightWidth
            ? 0
            : Math.max(-cpmRightWidth, Math.min(0, event.translationX));
      });

    const animatedChildren = useAnimatedStyle(() => ({
      transform: [{ translateX: offset.value }],
      borderRadius: offset.value !== 0 ? 0 : 10,
    }));

    const animatedLeftCmp = useAnimatedStyle(() => ({
      width: Math.abs(offset.value),
    }));

    return (
      <GestureDetector gesture={gesture}>
        <TouchableOpacity
          style={mainStyle}
          activeOpacity={0.6}
          onPress={() => {
            offset.value = 0;
            onPressLeftCmp();
          }}
        >
          <Animated.View
            style={[
              { flex: 1, justifyContent: "center" },
              animatedChildren,
              childrenStyle,
            ]}
          >
            {children}
          </Animated.View>
          <Animated.View
            style={[
              {
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                zIndex: -1,
                height: "100%",
                backgroundColor: "red",
                position: "absolute",
                justifyContent: "center",
                alignItems: "center",
                right: 0,
                overflow: "hidden",
              },
              animatedLeftCmp,
              rightCmpStyle,
            ]}
          >
            {rightCmp}
          </Animated.View>
        </TouchableOpacity>
      </GestureDetector>
    );
  }
);

export default SwipeableWrapper;
