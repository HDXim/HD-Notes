import React, { forwardRef } from "react";
import {
  Box,
  Button,
  Input,
  InputField,
  Text,
  FlatList,
} from "@gluestack-ui/themed";
import { ActivityIndicator } from "react-native";
import {
  Feather,
  FontAwesome6,
  Ionicons,
  SimpleLineIcons,
} from "@expo/vector-icons";

import { GroupDetail } from "helpers/groupHelper";
import Modal from "@/components/Elements/Modal";
import ModalCustom from "@/components/Elements/ModalCustom";
import { Note } from "helpers/noteHelper";
import { KeyboardAvoidingForm } from "@/components/Elements";

interface CustomGroupNoteViewProps {
  isLoading: boolean;
  groupDetail: GroupDetail;
  noteList: Note[];
  onChangeGroupTitle: (text: string) => void;
  onPressEditNote: (note: Note) => void;
  visibleModalDeleteNote: boolean;
  onPressVisibleModalDeleteNote: (note: Note | null) => void;
  onPressConfirmDeleteNote: () => void;
  visibleModalEditNote: boolean;
  selectedNote: Note;
  onChangeNoteContent: (text: string) => void;
  onPressAddNote: () => void;
}

const CustomGroupNoteView = forwardRef<any, CustomGroupNoteViewProps>(
  (
    {
      isLoading,
      groupDetail,
      noteList,
      onChangeGroupTitle,
      onPressEditNote,
      visibleModalDeleteNote,
      onPressVisibleModalDeleteNote,
      onPressConfirmDeleteNote,
      visibleModalEditNote,
      selectedNote,
      onChangeNoteContent,
      onPressAddNote,
    },
    ref
  ) =>
    isLoading ? (
      <Box flex={1} justifyContent="center">
        <ActivityIndicator />
      </Box>
    ) : (
      <Box flex={1}>
        <Input bgColor="$red100" variant="outline" size="xl" borderWidth={0}>
          <InputField
            placeholder="Enter group title"
            paddingHorizontal={20}
            size="2xl"
            numberOfLines={1}
            value={groupDetail?.groupTitle}
            onChangeText={onChangeGroupTitle}
          />
        </Input>
        <FlatList
          p={"$2"}
          columnWrapperStyle={{ gap: 15 }}
          contentContainerStyle={{ flexGrow: 1, gap: 15 }}
          numColumns={3}
          data={noteList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }: { item: Note }) => {
            if (!item) {
              return <Box flex={1} />;
            }
            return (
              <Button
                onPress={() => onPressEditNote(item)}
                $active-opacity={"$50"}
                paddingLeft={0}
                paddingRight={0}
                flex={1}
                bgColor="$pink200"
                flexDirection="column"
                h={"$24"}
                alignItems="flex-start"
                justifyContent="flex-start"
              >
                <Box
                  flexDirection="row"
                  justifyContent="space-between"
                  w={"$full"}
                >
                  <Button
                    width={20}
                    height={20}
                    paddingLeft={0}
                    paddingRight={0}
                    $active-opacity={"$50"}
                    bgColor="transparent"
                  >
                    <Feather name="more-horizontal" color="black" />
                  </Button>
                  <Button
                    onPress={() => onPressVisibleModalDeleteNote(item)}
                    width={20}
                    height={20}
                    paddingLeft={0}
                    paddingRight={0}
                    $active-opacity={"$50"}
                    bgColor="transparent"
                  >
                    <Ionicons name="close" color="black" />
                  </Button>
                </Box>
                <Box flex={1} w={"$full"} paddingHorizontal={5}>
                  <Text numberOfLines={3} size="md" color="$darkBlue700">
                    {item.noteContent || "Empty note"}
                  </Text>
                </Box>
              </Button>
            );
          }}
        />
        <Button
          onPress={onPressAddNote}
          height={50}
          aspectRatio={1}
          paddingLeft={0}
          paddingRight={0}
          borderRadius={99}
          $active-opacity={"$50"}
          bgColor="$pink500"
          flexDirection="column"
          alignSelf="center"
          marginBottom={20}
        >
          <SimpleLineIcons
            name="note"
            size={24}
            color="white"
            style={{ left: 2 }}
          />
        </Button>
        <Modal
          isOpen={visibleModalDeleteNote}
          onClose={() => onPressVisibleModalDeleteNote(null)}
          onPressLeft={() => onPressVisibleModalDeleteNote(null)}
          onPressRight={onPressConfirmDeleteNote}
          title="Delete note"
          content="This note will be delete, are you sure? "
          leftButtonText="Cancel"
          rightButtonText="Delete"
        />
        <ModalCustom visible={visibleModalEditNote}>
          <KeyboardAvoidingForm>
            <Input
              p={"$4"}
              pl={0}
              pr={0}
              height={"$48"}
              bgColor="$red100"
              variant="outline"
              size="xl"
              borderWidth={0}
            >
              <InputField
                ref={ref}
                multiline
                textAlignVertical="top"
                placeholder="Enter some note"
                paddingHorizontal={20}
                size="xl"
                numberOfLines={1}
                value={selectedNote?.noteContent || ""}
                onChangeText={onChangeNoteContent}
              />
            </Input>
          </KeyboardAvoidingForm>
        </ModalCustom>
      </Box>
    )
);

export default CustomGroupNoteView;
