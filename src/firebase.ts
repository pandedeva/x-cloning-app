// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-cloning-app.firebaseapp.com",
  projectId: "x-cloning-app",
  storageBucket: "x-cloning-app.firebasestorage.app",
  messagingSenderId: "339561431297",
  appId: "1:339561431297:web:7c843b53ee88d5073ddb00",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
