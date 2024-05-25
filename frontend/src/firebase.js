// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "eventplanning-a0214.firebaseapp.com",
  projectId: "eventplanning-a0214",
  storageBucket: "eventplanning-a0214.appspot.com",
  messagingSenderId: "430966448502",
  appId: "1:430966448502:web:e1d4533845b8e93ba0da57"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);