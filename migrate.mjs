import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import fs from 'fs/promises';

const serviceAccount = JSON.parse(await fs.readFile('./serviceAccountKey.json', 'utf8'));

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

async function migrate() {
  console.log('Reading games.json...');
  const data = await fs.readFile('./data/games.json', 'utf8');
  const games = JSON.parse(data);
  console.log(`Found ${games.length} games. Starting migration to games-oneshot...`);
  
  const batch = db.batch();
  const collectionRef = db.collection('games-oneshot');

  for (const game of games) {
    const docRef = collectionRef.doc(game.id);
    batch.set(docRef, game);
  }

  await batch.commit();
  console.log(`Successfully migrated ${games.length} games to Firestore!`);
}

migrate().catch(console.error);
