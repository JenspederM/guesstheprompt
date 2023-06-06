import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions, httpsCallable } from "firebase/functions";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { CreateImageRequest, CreateModerationRequest, CreateModerationResponse, ImagesResponse } from "openai";

const firebaseConfig = {
  apiKey: import.meta.env["VITE_FIREBASE_API_KEY"],
  authDomain: import.meta.env["VITE_FIREBASE_AUTH_DOMAIN"],
  projectId: import.meta.env["VITE_FIREBASE_PROJECT_ID"],
  storageBucket: import.meta.env["VITE_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: import.meta.env["VITE_FIREBASE_MESSAGING_SENDER_ID"],
  appId: import.meta.env["VITE_FIREBASE_APP_ID"],
  measurementId: import.meta.env["VITE_FIREBASE_MEASUREMENT_ID"],
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
const functions = getFunctions(app);

if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log("Firebase Config", firebaseConfig);
  connectFunctionsEmulator(functions, "localhost", 5001);
  connectFirestoreEmulator(db, "localhost", 8080);
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}

export const api = {
  openai: {
    generateImage: httpsCallable<CreateImageRequest, undefined | ImagesResponse>(functions, "openai-generateImage"),
    generateText: httpsCallable<CreateModerationRequest, undefined | CreateModerationResponse>(functions, "openai-generateText"),
    getModeration: httpsCallable(functions, "openai-getModeration"),
  },
}