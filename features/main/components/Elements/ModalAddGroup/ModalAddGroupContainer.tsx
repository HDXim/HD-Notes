import React, {
  forwardRef,
  memo,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import {
  ButtonText,
  Box,
  InputField,
  Input,
  Button,
} from "@gluestack-ui/themed";
import { height, width } from "helpers/deviceInfo";
import { AntDesign } from "@expo/vector-icons";
import { Keyboard, ViewStyle } from "react-native";

interface ModalAddGroupProps {
  onPressCancel: () => void;
  onSubmitCreateGroup: (groupTitle: string) => void;
}

const mainStyle: ViewStyle = {
  borderTopLeftRadius: 10,
  borderTopRightRadius: 10,
  width,
  height: "100%",
  position: "absolute",
  zIndex: 1,
  backgroundColor: "white",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 10,
  },
  shadowOpacity: 0.51,
  shadowRadius: 13.16,
  elevation: 20,
};

const ModalAddGroup = forwardRef<any, ModalAddGroupProps>(
  ({ onPressCancel, onSubmitCreateGroup }, ref) => {
    const offset = useSharedValue(height);
    const refInput = useRef<any>();
    const [groupTitle, setGroupTitle] = useState<string>("");

    const gesture = Gesture.Pan()
      .onBegin(() => {
        Keyboard.dismiss();
      })
      .onUpdate((event) => {
        offset.value = Math.max(0, event.translationY + 30);
      })
      .onEnd((event) => {
        const isShow = event.translationY < height / 2;
        offset.value = withTiming(isShow ? 30 : height, {
          duration: 200,
          easing: Easing.linear,
        });
      })
      .runOnJS(true);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ translateY: offset.value }],
    }));

    useImperativeHandle(ref, () => {
      return {
        open: () => {
          offset.value = withTiming(30, {
            duration: 300,
            easing: Easing.linear,
          });
          refInput.current?.focus();
        },
        close: () => {
          offset.value = withTiming(height, {
            duration: 300,
            easing: Easing.linear,
          });
          Keyboard.dismiss();
        },
      };
    });

    const handleOnPressDone = () => {
      onSubmitCreateGroup(groupTitle);
      setTimeout(() => {
        setGroupTitle("");
      }, 1500);
    };

    const handleOnPressDelete = () => {
      setGroupTitle("");
      refInput.current?.focus();
    };

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View style={[animatedStyle, mainStyle]}>
          {/* <Box
            width={"20%"}
            height={"$2"}
            position="absolute"
            bgColor="$primary400"
            alignSelf="center"
            borderRadius={40}
          /> */}
          <Box
            flexDirection="row"
            justifyContent="space-between"
            paddingHorizontal="$4"
          >
            <ButtonText
              onPress={onPressCancel}
              $active-opacity={"$50"}
              color="$pink500"
              fontWeight={"$bold"}
              textAlign="center"
              justifyContent="center"
              width={"25%"}
              p={"$3"}
            >
              Cancel
            </ButtonText>
            <ButtonText
              onPress={handleOnPressDone}
              $active-opacity={"$50"}
              color="$pink500"
              fontWeight={"$bold"}
              textAlign="center"
              justifyContent="center"
              width={"25%"}
              p={"$3"}
            >
              Done
            </ButtonText>
          </Box>
          <Input
            bgColor="$red100"
            variant="outline"
            size="xl"
            borderWidth={0}
            alignItems="center"
          >
            <InputField
              ref={refInput}
              placeholder="Enter group title"
              paddingHorizontal={15}
              size="xl"
              numberOfLines={1}
              value={groupTitle}
              onChangeText={setGroupTitle}
            />
            {!!groupTitle && (
              <Button
                onPress={handleOnPressDelete}
                pl={0}
                bgColor="transparent"
                $active-opacity={"$50"}
              >
                <AntDesign name="closecircle" size={15} color="black" />
              </Button>
            )}
          </Input>
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default memo(ModalAddGroup);
