import { initializeApp, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs';

const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const auth = getAuth();
const db = getFirestore();

async function createAdmin() {
  const email = '[EMAIL_ADDRESS]';
  let userRecord;

  try {
    userRecord = await auth.createUser({
      email: email,
      password: '[PASSWORD]'
    });
    console.log('Successfully created new user:', userRecord.uid);
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      console.log('User already exists in Auth. Fetching existing UID...');
      userRecord = await auth.getUserByEmail(email);
    } else {
      console.error('Error creating new user:', error);
      return;
    }
  }

  await db.collection('admins').doc(userRecord.uid).set({
    role: 'admin',
    email: email,
    createdAt: new Date()
  });
  console.log('Admin UID securely injected to admins collection');
}

createAdmin();
