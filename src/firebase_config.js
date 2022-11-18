// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAtwqiWl7ZBpeB_-smbwr8s0GE-uMxVVWQ",
  authDomain: "zot-critic.firebaseapp.com",
  projectId: "zot-critic",
  storageBucket: "zot-critic.appspot.com",
  messagingSenderId: "901429781451",
  appId: "1:901429781451:web:12bfffb49c94828f0acc4e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);