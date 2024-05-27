import React, { useCallback, useEffect, useRef, useState } from "react";
import { router, useNavigation } from "expo-router";

import GroupHelper, { Group } from "helpers/groupHelper";
import GroupListView from "./GroupListView";
import { Keyboard } from "react-native";

const limit: number = 33;

const GroupListContainer = () => {
  const navigation = useNavigation();

  const selectedGroupIdRef = useRef<string>();
  const firstRender = useRef<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [visibleDeleteGroup, setVisibleDeleteGroup] = useState<boolean>(false);
  const [refreshingList, setRefreshingList] = useState<boolean>(false);

  const handleGetListGroup = useCallback(
    async (isLoadMore: boolean) => {
      if (!isLoadMore) {
        setIsLoading(true);
      }
      try {
        const listRes = await GroupHelper.getGroupList({
          limit,
          startAfterId: isLoadMore
            ? groupList[groupList.length - 1]?.groupId
            : "",
        });
        if (isLoadMore) {
          setGroupList((prev) => [...prev, ...listRes]);
        } else {
          setGroupList(listRes);
        }
        setRefreshingList(false);
      } catch (error) {
        console.log("handleGetListGroup error", error);
      } finally {
        setIsLoading(false);
      }
    },
    [groupList]
  );

  const handleOnPressGroup = useCallback((groupId: string) => {
    router.push({
      pathname: "/main-tabs/group-note/group-detail",
      params: { groupId },
    });
  }, []);

  const handleOnPressAddGroup = useCallback(() => {
    refModalAdd.current?.open();
  }, []);

  const handleOnPressIconDelete = useCallback((groupId: string) => {
    selectedGroupIdRef.current = groupId;
    setVisibleDeleteGroup(true);
  }, []);

  const handleOnCloseDeleteNote = () => setVisibleDeleteGroup(false);

  const handleConfirmDeleteGroup = async () => {
    if (selectedGroupIdRef.current) {
      await GroupHelper.deleteGroup(selectedGroupIdRef.current);
      setGroupList((prev) =>
        prev.filter((group) => group.groupId != selectedGroupIdRef.current)
      );
      setVisibleDeleteGroup(false);
    }
  };

  useEffect(() => {
    handleGetListGroup(false);

    navigation.addListener("focus", () => {
      if (firstRender.current) {
        return;
      }
      handleGetListGroup(true);
    });
    return () => {
      navigation.removeListener("focus", () => {});
    };
  }, []);

  const handleLoadMoreList = async () => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    console.log("---handleLoadMoreList");
    // await handleGetListGroup(true);
  };

  const handleOnRefreshList = async () => {
    setRefreshingList(true);
    await handleGetListGroup(false);
  };
  const refModalAdd = useRef<{ open: () => void; close: () => void }>();
  const handlePressCancelAddGroup = useCallback(() => {
    refModalAdd.current?.close();
  }, []);

  const handleSubmitCreateGroup = useCallback(async (groupTitle: string) => {
    Keyboard.dismiss();
    await GroupHelper.createGroup({ groupTitle, noteAmount: 0 });

    refModalAdd.current?.close();
  }, []);

  return (
    <GroupListView
      isLoading={isLoading}
      groupList={groupList}
      onPressGroup={handleOnPressGroup}
      onPressAddGroup={handleOnPressAddGroup}
      onPressDeleteIcon={handleOnPressIconDelete}
      visibleDeleteGroup={visibleDeleteGroup}
      onCloseDeleteNote={handleOnCloseDeleteNote}
      onPressConfirmDeleteGroup={handleConfirmDeleteGroup}
      onEndReachedList={handleLoadMoreList}
      refreshingList={refreshingList}
      onRefreshList={handleOnRefreshList}
      ref={refModalAdd}
      onPressCancelAddGroup={handlePressCancelAddGroup}
      onSubmitCreateGroup={handleSubmitCreateGroup}
    />
  );
};

export default GroupListContainer;
