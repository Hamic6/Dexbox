// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAoK8l-D1nEcjhmTSMOMeJovAlI0B8wCog",
  authDomain: "dexbox-technologies.firebaseapp.com",
  projectId: "dexbox-technologies",
  storageBucket: "dexbox-technologies.appspot.com",
  messagingSenderId: "871505208904",
  appId: "1:871505208904:web:a8e1b30985849e7e765a7d",
  measurementId: "G-25175PKG6E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app); // <-- AJOUTE CETTE LIGNE
export const storage = getStorage(app);

export { app, analytics };