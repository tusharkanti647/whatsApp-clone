// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCarTZH3jMv1F2Xi3AQcRxQsp7zPRn3aw",
  authDomain: "whatsapp-clone-49093.firebaseapp.com",
  projectId: "whatsapp-clone-49093",
  storageBucket: "whatsapp-clone-49093.appspot.com",
  messagingSenderId: "836584845118",
  appId: "1:836584845118:web:a6ebd0b17ae086927c466f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
export {db};