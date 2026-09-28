import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "[GCP_API_KEY]",
  authDomain: "beeboard-877f2.firebaseapp.com",
  projectId: "beeboard-877f2",
  storageBucket: "beeboard-877f2.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abc123def456"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
