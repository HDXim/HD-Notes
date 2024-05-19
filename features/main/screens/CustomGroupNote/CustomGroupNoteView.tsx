import { Box, InputField } from "@gluestack-ui/themed";
import React from "react";
import { Platform, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type InputFieldType = React.ComponentProps<typeof InputField> & {
  ref?: React.Ref<TextInput> | undefined;
};

const InputFieldWithRef = InputField as React.ComponentType<InputFieldType>;

export interface CreateStudiValues {
  title: string;
  photo1: string;
  photo2: string;
  description: string;
}

interface CustomGroupNoteViewProps {}

const CustomGroupNoteView: React.FC<CustomGroupNoteViewProps> = ({}) => (
  <KeyboardAwareScrollView
    style={{ backgroundColor: "white" }}
    enableOnAndroid
    contentInsetAdjustmentBehavior="never"
    keyboardShouldPersistTaps="handled"
    showsVerticalScrollIndicator={false}
    enableResetScrollToCoords
    extraHeight={Platform.OS === "android" ? 150 : 70}
    extraScrollHeight={Platform.OS === "android" ? 80 : 126}
  >
    <Box flex={1} bgColor="$white" p="$4"></Box>
  </KeyboardAwareScrollView>
);

export default CustomGroupNoteView;
