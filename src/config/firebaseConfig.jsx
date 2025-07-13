// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as React from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyBTV_IuV7p2LPc8yb5aPJOxk-wn9aoYOkk",
  authDomain: "resumebuilder-641ec.firebaseapp.com",
  projectId: "resumebuilder-641ec",
  storageBucket: "resumebuilder-641ec.appspot.com",
  messagingSenderId: "812630398489",
  appId: "1:812630398489:web:bf5c83f869eed1a6893c88",
  measurementId: "G-Z26N0FKN1E"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const auth = getAuth(app);

export { dataBase, auth };
export default firebaseConfig;

