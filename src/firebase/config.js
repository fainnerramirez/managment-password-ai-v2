import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA7IQKteG6Qvpolskm-69XmTviNGB48iOQ",
  authDomain: "passwordsai.firebaseapp.com",
  projectId: "passwordsai",
  storageBucket: "passwordsai.appspot.com",
  messagingSenderId: "48024382750",
  appId: "1:48024382750:web:ccb3de1cf9632fa8f5ed0f",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
