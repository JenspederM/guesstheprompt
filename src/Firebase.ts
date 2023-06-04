import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

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
export const db = getFirestore(app);
export const functions = getFunctions(app);