// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const  firebaseConfig = {
  apiKey: "AIzaSyC71rNWzovutHSxt09bDHJqg11bJYkdh7w",
  authDomain: "netflix-ba730.firebaseapp.com",
  projectId: "netflix-ba730",
  storageBucket: "netflix-ba730.firebasestorage.app",
  messagingSenderId: "1061406178482",
  appId: "1:1061406178482:web:3a5d29e8944bc8b8e21dab",
  measurementId: "G-6KYP8VP62F"
}; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
