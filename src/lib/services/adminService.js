import { auth, db } from '../firebase.js';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, addDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';

export async function login(email, password) {
  await signInWithEmailAndPassword(auth, email, password);
}

export async function logout() {
  await signOut(auth);
}

export async function loadGames() {
  const snap = await getDocs(collection(db, 'games'));
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function addGame(newGame) {
  const docRef = await addDoc(collection(db, 'games'), newGame);
  return { id: docRef.id, ...newGame };
}

export async function deleteGame(id) {
  await deleteDoc(doc(db, 'games', id));
}
