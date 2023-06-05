import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { connectAuthEmulator, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAPvpeE4Avgt4s4cOLUFvTi0gNvn41DH2Q",
  authDomain: "guesstheprompt-dabe5.firebaseapp.com",
  projectId: "guesstheprompt-dabe5",
  storageBucket: "guesstheprompt-dabe5.appspot.com",
  messagingSenderId: "1057216610365",
  appId: "1:1057216610365:web:5f1e54fce52e6af804ea54",
  measurementId: "G-06D76GR4GX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.debug("Firebase Config", firebaseConfig);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}