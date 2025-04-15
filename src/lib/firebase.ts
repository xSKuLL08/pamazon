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
  apiKey: "AIzaSyDDI1BAvEhGRK56Xf3TAcsahO4w1zR8zrc",
  authDomain: "p-ae1f6.firebaseapp.com",
  projectId: "p-ae1f6",
  storageBucket: "p-ae1f6.firebasestorage.app",
  messagingSenderId: "1037228664384",
  appId: "1:1037228664384:web:4e3c096d5a64f4aa48e1a5",
  measurementId: "G-JS6V1HSZS0"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
