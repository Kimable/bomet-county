// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,

  authDomain: "bomet-5145c.firebaseapp.com",

  projectId: "bomet-5145c",

  storageBucket: "bomet-5145c.appspot.com",

  messagingSenderId: "846663878485",

  appId: "1:846663878485:web:fc86672768eb8e742911dc",

  measurementId: "G-Z3CTD8V459",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
