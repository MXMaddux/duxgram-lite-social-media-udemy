import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC_PF05NaFV0-3ixraGrzgTex-36TU-tEs",
  authDomain: "duxgram-lite-udemy.firebaseapp.com",
  projectId: "duxgram-lite-udemy",
  storageBucket: "duxgram-lite-udemy.appspot.com",
  messagingSenderId: "378108627407",
  appId: "1:378108627407:web:3543f89bd86c13577faaba",
};

const app = initializeApp(firebaseConfig);
const fireDb = getFirestore(app);

export { app, fireDb };
