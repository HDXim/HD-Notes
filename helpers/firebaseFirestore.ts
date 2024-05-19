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
} from "firebase/firestore";
import { db } from "@/configs/firebaseConfig";

export default class ClassFirestore {
  static createDocument = async (collection: string, data: any) => {
    try {
      const collectionRef = collections(db, collection);
      return await addDoc(collectionRef, data);
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

  static getDocumentList = async (collection: string) => {
    try {
      return await getDocs(collections(db, collection));
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
}
