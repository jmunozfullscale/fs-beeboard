import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "beeboard-877f2",
  appId: "1:664021257599:web:8b53cbd75d8c870a9d5e4a",
  storageBucket: "beeboard-877f2.firebasestorage.app",
  apiKey: "[GCP_API_KEY]",
  authDomain: "beeboard-877f2.firebaseapp.com",
  messagingSenderId: "664021257599",
  measurementId: "G-JDN6YDKZ4X"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
