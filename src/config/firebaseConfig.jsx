// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import * as React from 'react';


const firebaseConfig = {
  apiKey: "AIzaSyCH0vOls9C30YSfv_H8n7oikks-WnlXbng",
  authDomain: "resume-builder-cd3e1.firebaseapp.com",
  projectId: "resume-builder-cd3e1",
  storageBucket: "resume-builder-cd3e1.appspot.com",
  messagingSenderId: "406327890524",
  appId: "1:406327890524:web:83abccddf448dac2f9cc99",
  measurementId: "G-LDJCZ5929D"
};

// Initialize Firebase


const app = initializeApp(firebaseConfig);
const dataBase = getFirestore(app);
const auth = getAuth(app);

export { dataBase, auth };
export default firebaseConfig;

