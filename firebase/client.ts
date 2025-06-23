// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCC0otWCk2OMcOnWoVU4GIJsCAnpY0PwHQ",
  authDomain: "prepwise-c9e64.firebaseapp.com",
  projectId: "prepwise-c9e64",
  storageBucket: "prepwise-c9e64.firebasestorage.app",
  messagingSenderId: "962851697023",
  appId: "1:962851697023:web:1c77bbccdd7070aa84aa4a",
  measurementId: "G-R1S3NL3ZG0"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);