// import database from '@react-native-firebase/database';
// import auth from '@react-native-firebase/auth';
import {
  collection as collections,
  addDoc,
  getDocs,
  query,
  where,
  QueryFieldFilterConstraint,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  getCountFromServer,
  orderBy,
  limit,
  startAfter,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";

export default class ClassFirestore {
  static createDocument = async (collection: string, data: any) => {
    try {
      const collectionRef = collections(db, collection);
      return await addDoc(collectionRef, {
        ...data,
        timeCreate: serverTimestamp(),
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  static updateDocument = async (path: string, data: any) => {
    try {
      const docRef = doc(db, path);
      await updateDoc(docRef, data);
      return true;
    } catch (e) {
      return false;
    }
  };

  static deleteDocument = async (path: string) => {
    try {
      const docRef = doc(db, path);
      await deleteDoc(docRef);
      return true;
    } catch (e) {
      return false;
    }
  };

  static getDocument = async (path: string) => {
    try {
      return await getDoc(doc(db, path));
      //   return await getDoc(doc(db, "groups/CX7utKpETjCCY5wZSMKg"));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  static getDocumentList = async ({
    collection,
    startAfterPath,
    lim,
  }: {
    collection: string;
    startAfterPath?: string; // groups/id
    lim: number;
  }) => {
    try {
      const refColl = collections(db, collection);
      let queryRef;
      if (!!startAfterPath) {
        const docSnap = await this.getDocument(startAfterPath);
        queryRef = query(
          refColl,
          startAfter(docSnap),
          orderBy("timeCreate", "desc"),
          limit(lim)
        );
      } else {
        queryRef = query(refColl, orderBy("timeCreate", "desc"), limit(lim));
      }
      if (queryRef) {
        return await getDocs(queryRef);
      } else {
        return Promise.reject("get List thất bại");
      }
    } catch (e) {
      return Promise.reject(e);
    }
  };

  static getDocumentsbyQuery = async (
    collection: string,
    qr: QueryFieldFilterConstraint
  ) => {
    try {
      const queryRef = query(collections(db, collection), qr);
      return await getDocs(queryRef);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  static countByQuery = async (
    collection: string,
    qr: QueryFieldFilterConstraint
  ) => {
    try {
      const queryRef = query(collections(db, collection), qr);
      const snapshot = await getCountFromServer(queryRef);
      return snapshot.data().count;
    } catch (e) {
      return Promise.reject(e);
    }
  };
}
