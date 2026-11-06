
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBfLmkoPFr9lmg42URvStf9GD57AaTDPPk",
  authDomain: "ph-match.firebaseapp.com",
  projectId: "ph-match",
  storageBucket: "ph-match.firebasestorage.app",
  messagingSenderId: "1081312006522",
  appId: "1:1081312006522:web:01bd9d3b792ac5cc0506c3",
  measurementId: "G-K4YF0XRSV7",
};

const app = getApps().length
  ? getApp()
  : initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export default app;
