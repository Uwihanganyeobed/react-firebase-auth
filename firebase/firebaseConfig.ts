import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUOz2KLpAKzHXp1WNnP8Sn7X2Y_f8nBXI",
  authDomain: "renderapi-7b268.firebaseapp.com",
  projectId: "renderapi-7b268",
  storageBucket: "renderapi-7b268.appspot.com",
  messagingSenderId: "92202158278",
  appId: "1:92202158278:web:a4ccee7d1ada3ee90b2fc7",
  measurementId: "G-DCJ06N0CCN",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
