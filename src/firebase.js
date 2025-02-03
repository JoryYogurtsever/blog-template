// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "blog-template-41db7.firebaseapp.com",
  projectId: "blog-template-41db7",
  storageBucket: "blog-template-41db7.firebasestorage.app",
  messagingSenderId: "541955974393",
  appId: "1:541955974393:web:2649ba50261ae4e602ee28",
  measurementId: "G-F2NP59L81Z"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);