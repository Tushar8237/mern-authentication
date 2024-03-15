// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-v1-100ab.firebaseapp.com",
  projectId: "mern-auth-v1-100ab",
  storageBucket: "mern-auth-v1-100ab.appspot.com",
  messagingSenderId: "774879995560",
  appId: "1:774879995560:web:439f7fc02824bf4b0bc49d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
