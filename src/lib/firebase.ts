import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  "projectId": "studio-5114516326-e524a",
  "appId": "1:705009863887:web:b0cd72e9b62f67d66bfbba",
  "storageBucket": "studio-5114516326-e524a.appspot.com",
  "apiKey": "AIzaSyBdirxmtjwA490FtcIgD-p5PSPkzs7ki7o",
  "authDomain": "studio-5114516326-e524a.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "705009863887"
};


const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
