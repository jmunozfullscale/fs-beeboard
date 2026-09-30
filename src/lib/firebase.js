import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0OZJlwnRiobvqcEx8h970NW72lyFKvmA",
  authDomain: "beeboard-877f2.firebaseapp.com",
  projectId: "beeboard-877f2",
  storageBucket: "beeboard-877f2.firebasestorage.app",
  messagingSenderId: "664021257599",
  appId: "1:664021257599:web:8b53cbd75d8c870a9d5e4a",
  measurementId: "G-JDN6YDKZ4X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
