import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgW9G2hRtZVjWzMx3akEMsA7Sd_2FPVyI",
  authDomain: "firechat-526cb.firebaseapp.com",
  projectId: "firechat-526cb",
  storageBucket: "firechat-526cb.appspot.com",
  messagingSenderId: "879603420011",
  appId: "1:879603420011:web:70ce7ba736f6e86aac5a2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
