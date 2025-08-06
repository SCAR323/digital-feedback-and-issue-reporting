import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCar5ZoJ_Yfn_6zoi4Eu4BTnUVNuGcd_cE",
  authDomain: "railway-feedback-system.firebaseapp.com",
  projectId: "railway-feedback-system",
  storageBucket: "railway-feedback-system.firebasestorage.app",
  messagingSenderId: "409187509262",
  appId: "1:409187509262:web:445c1cfa8ad7236b4b885f",
  measurementId: "G-50RED7MT3X",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
