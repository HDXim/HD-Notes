import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";

import CustomGroupNoteView from "./CustomGroupNoteView";
import GroupHelper, { GroupDetail } from "helpers/groupHelper";
import NoteHelper, { Note } from "helpers/noteHelper";
import { Keyboard, TextInput } from "react-native";

type customGroupNoteParams = {
  groupId: string;
};

const CustomGroupNoteContainer = () => {
  const navigation = useNavigation();
  const params = useLocalSearchParams<customGroupNoteParams>();

  const refNoteInput = useRef<TextInput>(null);

  const selectedNoteToDeleteRef = useRef<Note | null>(null);
  const visibleEditNoteRef = useRef<boolean>(false);
  const selectedNoteRef = useRef<Note | null>(null);
  const groupDetailRef = useRef<GroupDetail | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [groupDetail, setGroupDetail] = useState<GroupDetail>({
    groupId: "",
    groupTitle: "",
    notes: [],
  });
  const [visibleDeleteNote, setVisibleDeleteNote] = useState<boolean>(false);
  const [visibleEditNote, setVisibleEditNote] = useState<boolean>(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const handleGetGroupDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await GroupHelper.getGroupDetail(params.groupId || "");
      if (res) {
        setGroupDetail(res);
      }
    } catch (error) {
      console.log("handleGetGroupDetail error", error);
    } finally {
      setIsLoading(false);
    }
  }, [params?.groupId]);

  const updateOrCreateNote = useCallback(async (note: Note | null) => {
    if (!note) {
      return;
    }
    const { noteId, noteTitle, noteContent, groupId } = note;
    if (!!noteId) {
      await NoteHelper.updateNote(noteId, {
        noteTitle,
        noteContent,
        groupId,
      });

      setGroupDetail((prev) => ({
        ...prev,
        notes: prev.notes.map((item) => {
          if (item.noteId == note.noteId) {
            return note;
          }
          return item;
        }),
      }));
    } else {
      const noteId = await NoteHelper.createNote({
        noteTitle,
        noteContent,
        groupId,
      });
      setGroupDetail((prev) => ({
        ...prev,
        notes: [{ ...note, noteId }, ...prev.notes],
      }));
    }
  }, []);

  useEffect(() => {
    visibleEditNoteRef.current = visibleEditNote;
  }, [visibleEditNote]);

  useEffect(() => {
    selectedNoteRef.current = selectedNote;
  }, [selectedNote]);

  useEffect(() => {
    groupDetailRef.current = groupDetail;
  }, [groupDetail]);

  useEffect(() => {
    handleGetGroupDetail();
    navigation.addListener("beforeRemove", handleNavigationListen);

    return () => {
      navigation.removeListener("beforeRemove", () => {});
    };
  }, []);

  const handleNavigationListen = useCallback(
    async (e: any) => {
      e?.preventDefault();
      if (visibleEditNoteRef.current) {
        setTimeout(() => {
          updateOrCreateNote(selectedNoteRef.current);
          setVisibleEditNote(false);
          Keyboard.dismiss();
        }, 400);
      } else {
        if (groupDetailRef.current && params.groupId) {
          const body = {
            groupTitle: groupDetailRef.current.groupTitle,
            noteAmount: groupDetailRef.current.notes.length,
          };
          await GroupHelper.updateGroup(params.groupId, body);
          navigation.dispatch(e.data.action);
        }
      }
    },
    [params?.groupId]
  );

  const handleChangeGrouptitle = useCallback((text: string) => {
    setGroupDetail((prev) => {
      if (prev) {
        return { ...prev, groupTitle: text };
      } else {
        return { groupTitle: text, groupId: "", notes: [] };
      }
    });
  }, []);

  const handleVisibleModalDeleteNote = useCallback((note: Note | null) => {
    if (note) {
      selectedNoteToDeleteRef.current = note;
    }
    setVisibleDeleteNote((prev) => !prev);
  }, []);

  const handleConfirmDeleteNote = useCallback(async () => {
    if (!selectedNoteToDeleteRef.current) {
      return;
    }
    const { noteId, groupId } = selectedNoteToDeleteRef.current;
    setGroupDetail((prev) => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        notes: prev?.notes.filter((note) => note.noteId != noteId),
      };
    });
    setVisibleDeleteNote(false);
    await NoteHelper.deleteNote(noteId, groupId);
  }, []);

  const noteList: Note[] = useMemo(
    () =>
      groupDetail.notes.length % 3 === 0
        ? groupDetail.notes
        : [
            ...groupDetail.notes,
            ...Array(3 - (groupDetail.notes.length % 3)).fill(null),
          ],
    [groupDetail]
  );

  const handleOnPressEditNote = useCallback((note: Note) => {
    setSelectedNote(note);
    setVisibleEditNote(true);
    Keyboard.dismiss();
  }, []);

  const handleOnPressAddNote = useCallback(() => {
    setSelectedNote({
      noteId: "",
      noteTitle: "",
      noteContent: "",
      groupId: groupDetail.groupId,
    });
    setVisibleEditNote(true);
    refNoteInput.current?.focus();
  }, [groupDetail?.groupId]);

  const handleChangeNoteContent = useCallback((text: string) => {
    setSelectedNote((prev) => {
      if (!prev) {
        return prev;
      }
      return { ...prev, noteContent: text };
    });
  }, []);

  return (
    <CustomGroupNoteView
      ref={refNoteInput}
      isLoading={isLoading}
      groupDetail={groupDetail}
      noteList={noteList}
      onChangeGroupTitle={handleChangeGrouptitle}
      onPressEditNote={handleOnPressEditNote}
      visibleModalDeleteNote={visibleDeleteNote}
      onPressVisibleModalDeleteNote={handleVisibleModalDeleteNote}
      onPressConfirmDeleteNote={handleConfirmDeleteNote}
      visibleModalEditNote={visibleEditNote}
      selectedNote={selectedNote}
      onChangeNoteContent={handleChangeNoteContent}
      onPressAddNote={handleOnPressAddNote}
    />
  );
};

export default CustomGroupNoteContainer;
