import { deleteDoc, where } from "firebase/firestore";
import ClassFirestore from "./firebaseFirestore";

export interface Note {
  noteId: string;
  noteTitle: string;
  noteContent: string;
  groupId: string;
}
type payloadCreateNote = {
  noteTitle: string;
  noteContent: string;
  groupId: string;
};
type payloadUpdateNote = {
  noteTitle?: string;
  noteContent?: string;
  groupId: string;
};

export default class NoteHelper {
  static collection: string = "notes";

  //OK
  static createNote = async (data: payloadCreateNote) => {
    try {
      return await ClassFirestore.createDocument(this.collection, data);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static updateNote = async (noteId: string, data: payloadUpdateNote) => {
    try {
      return await ClassFirestore.updateDocument(
        `${this.collection}/${noteId}`,
        data
      );
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static deleteNote = async (noteId: string) => {
    try {
      const resDelete = await ClassFirestore.deleteDocument(
        `${this.collection}/${noteId}`
      );
      return resDelete;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static deleteNotesByGroupId = async (groupId: string) => {
    try {
      const resNote = await ClassFirestore.getDocumentsbyQuery(
        this.collection,
        where("groupId", "==", groupId)
      );
      resNote.forEach((note) => {
        deleteDoc(note.ref);
      });
      return true;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static getNoteListByGroupId = async (groupId: string) => {
    try {
      const noteList: Note[] = [];
      const resNote = await ClassFirestore.getDocumentsbyQuery(
        this.collection,
        where("groupId", "==", groupId)
      );
      resNote.forEach((note) => {
        noteList.push({
          noteId: note.id,
          noteTitle: note.data()?.noteTitle || "",
          noteContent: note.data()?.noteContent || "",
          groupId: note.id,
        });
      });
      return noteList;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
