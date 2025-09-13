import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  "projectId": "studio-5114516326-e524a",
  "appId": "1:705009863887:web:b0cd72e9b62f67d66bfbba",
  "storageBucket": "studio-5114516326-e524a.firebasestorage.app",
  "apiKey": "AIzaSyBdirxmtjwA490FtcIgD-p5PSPkzs7ki7o",
  "authDomain": "studio-5114516326-e524a.firebaseapp.com",
  "measurementId": "",
  "messagingSenderId": "705009863887"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
