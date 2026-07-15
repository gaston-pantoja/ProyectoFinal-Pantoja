
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAX0U92F2ynM3MdiG2RLdFdMdlMeXqVmTQ",
  authDomain: "proyectofinal-pantoja.firebaseapp.com",
  projectId: "proyectofinal-pantoja",
  storageBucket: "proyectofinal-pantoja.firebasestorage.app",
  messagingSenderId: "859662105705",
  appId: "1:859662105705:web:e57cf28d0a677be2d9b6f8"
};


const app = initializeApp(firebaseConfig);


export const db = getFirestore(app);