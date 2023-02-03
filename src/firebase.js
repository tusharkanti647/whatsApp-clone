// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, } from "firebase/auth";
import { Auth } from "firebase/auth";



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

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

//-------------------------------------------------------------
export { db, auth, provider };