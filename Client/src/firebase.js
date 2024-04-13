// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "estate-mern-28611.firebaseapp.com",
    projectId: "estate-mern-28611",
    storageBucket: "estate-mern-28611.appspot.com",
    messagingSenderId: "347766585074",
    appId: "1:347766585074:web:0ff37d23391acf7ecd426b"
};

// Initialize Firebase
export const appFirebase = initializeApp(firebaseConfig);