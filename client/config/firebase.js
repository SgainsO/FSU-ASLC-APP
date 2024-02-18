// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, EmailAuthProvider} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjJffO3nq7kVBvYb3gDzIRq7k3hp3Z6rQ",
  authDomain: "fsu-app-782fe.firebaseapp.com",
  projectId: "fsu-app-782fe",
  storageBucket: "fsu-app-782fe.appspot.com",
  messagingSenderId: "681352952044",
  appId: "1:681352952044:web:4b749115f1f2dfd5f38dc9",
  measurementId: "G-1SMXC60QT3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
