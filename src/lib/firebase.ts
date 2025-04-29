// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFizeNWcXMkNiUe8y5dbh4Sen72USxl5w",
  authDomain: "p-3f6ff.firebaseapp.com",
  projectId: "p-3f6ff",
  storageBucket: "p-3f6ff.firebasestorage.app",
  messagingSenderId: "741021198006",
  appId: "1:741021198006:web:4e31971986e293fb8a2817",
  measurementId: "G-RHP87JZWK7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
