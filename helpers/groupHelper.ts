import ClassFirestore from "./firebaseFirestore";
import NoteHelper, { Note } from "./noteHelper";

export interface Group {
  groupId: string;
  groupTitle: string;
}
export interface GroupDetail {
  groupId: string;
  groupTitle: string;
  notes: Note[];
}
type payloadAlterGroup = {
  groupTitle: string;
};

export default class GroupHelper {
  static collection: string = "groups";

  //OK
  static createGroup = async (data: payloadAlterGroup) => {
    try {
      return await ClassFirestore.createDocument(this.collection, data);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static updateGroup = async (groupId: string, data: payloadAlterGroup) => {
    try {
      return await ClassFirestore.updateDocument(
        `${this.collection}/${groupId}`,
        data
      );
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static deleteGroup = async (groupId: string) => {
    try {
      await ClassFirestore.deleteDocument(`${this.collection}/${groupId}`);
      await NoteHelper.deleteNotesByGroupId(groupId);
      return true;
    } catch (e) {
      return Promise.reject(e);
    }
  };

  static getGroupDetail = async (
    groupId: string
  ): Promise<GroupDetail | null> => {
    try {
      const resGroup = await ClassFirestore.getDocument(
        `${this.collection}/${groupId}`
      );
      if (!resGroup.exists()) {
        return null;
      }
      const noteList = await NoteHelper.getNoteListByGroupId(groupId);
      return {
        groupId,
        groupTitle: resGroup.data()?.groupTitle || "",
        notes: noteList,
      };
    } catch (e) {
      return Promise.reject(e);
    }
  };

  //OK
  static getGroupList = async () => {
    try {
      const groupList: Group[] = [];
      const resGroup = await ClassFirestore.getDocumentList(this.collection);
      resGroup.forEach((group) => {
        groupList.push({
          groupId: group.id,
          groupTitle: group.data()?.title || "",
        });
      });
      return groupList;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
