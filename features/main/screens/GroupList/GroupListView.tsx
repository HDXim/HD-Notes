import React, { forwardRef } from "react";
import { ActivityIndicator } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import {
  Box,
  Button,
  ButtonText,
  FlatList,
  KeyboardAvoidingView,
} from "@gluestack-ui/themed";

import { Group } from "helpers/groupHelper";
import Modal from "@/components/Elements/Modal";
import GroupItem from "../../components/Elements/GroupItem";
import ModalAddGroup from "../../components/Elements/ModalAddGroup";

interface GroupListViewProps {
  isLoading: boolean;
  groupList: Group[];
  onPressGroup: (groupId: string) => void;
  onPressAddGroup: () => void;
  onPressDeleteIcon: (groupId: string) => void;
  visibleDeleteGroup: boolean;
  onCloseDeleteNote: () => void;
  onPressConfirmDeleteGroup: () => void;
  onEndReachedList: () => void;
  refreshingList: boolean;
  onRefreshList: () => void;
  onPressCancelAddGroup: () => void;
  onSubmitCreateGroup: (groupTitle: string) => void;
}

const GroupListView = forwardRef<any, GroupListViewProps>(
  (
    {
      isLoading,
      groupList,
      onPressGroup,
      onPressAddGroup,
      onPressDeleteIcon,
      visibleDeleteGroup,
      onCloseDeleteNote,
      onPressConfirmDeleteGroup,
      onEndReachedList,
      refreshingList,
      onRefreshList,
      onPressCancelAddGroup,
      onSubmitCreateGroup,
    },
    ref
  ) =>
    isLoading ? (
      <Box flex={1} justifyContent="center">
        <ActivityIndicator />
      </Box>
    ) : (
      <KeyboardAvoidingView flexGrow={1}>
        <Box flex={1} bgColor="$white">
          <FlatList
            data={groupList}
            keyExtractor={(item, index) => `${index}`}
            p={"$4"}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
            onEndReachedThreshold={0.5}
            refreshing={refreshingList}
            onRefresh={onRefreshList}
            onEndReached={onEndReachedList}
            renderItem={({ item, index }: { item: Group; index: number }) => {
              return (
                <GroupItem
                  group={item}
                  visibleLine={index != groupList.length - 1}
                  onPressGroup={onPressGroup}
                  onPressDeleteIcon={onPressDeleteIcon}
                />
              );
            }}
            ListEmptyComponent={
              <ButtonText
                flex={1}
                textAlign="center"
                textAlignVertical="center"
                lineHeight={"$lg"}
                color="$primary900"
              >
                {
                  "You don't have any group\nPlease create a group by click button below!"
                }
              </ButtonText>
            }
          />
          <Button
            $active-opacity={"$50"}
            onPress={onPressAddGroup}
            position="absolute"
            width={60}
            height={60}
            bottom={20}
            right={20}
            paddingLeft={0}
            paddingRight={0}
            borderRadius={99}
            bgColor="$pink500"
          >
            <AntDesign name="addfolder" size={24} color="white" />
          </Button>
          <Modal
            isOpen={visibleDeleteGroup}
            onClose={onCloseDeleteNote}
            onPressLeft={onCloseDeleteNote}
            onPressRight={onPressConfirmDeleteGroup}
            title="Delete group"
            content="This note will be delete, are you sure? "
            leftButtonText="Cancel"
            rightButtonText="Delete"
          />
          <ModalAddGroup
            ref={ref}
            onPressCancel={onPressCancelAddGroup}
            onSubmitCreateGroup={onSubmitCreateGroup}
          />
        </Box>
      </KeyboardAvoidingView>
    )
);

export default GroupListView;
