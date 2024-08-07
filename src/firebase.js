import firebase from 'firebase/compat/app'

import 'firebase/compat/auth'
// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6V56vqW3R3EkX3sYffsftyTsVFR0nsUY",
  authDomain: "ytclonenil.firebaseapp.com",
  projectId: "ytclonenil",
  storageBucket: "ytclonenil.appspot.com",
  messagingSenderId: "172916404616",
  appId: "1:172916404616:web:1bf4fa5e5a86f67b568a3d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);




export default firebase.auth()