import { FirebaseOptions, initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";

// Initialize Firebase
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAmi5G55siMXv723D2ev-3UqkW0aOG-AJA",
  authDomain: "hdnotes-7c916.firebaseapp.com",
  projectId: "hdnotes-7c916",
  storageBucket: "hdnotes-7c916.appspot.com",
  messagingSenderId: "295638920480",
  appId: "1:295638920480:web:8d4d49e04d8c53730d3b45",
  measurementId: "G-TPEYBP78C0",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
