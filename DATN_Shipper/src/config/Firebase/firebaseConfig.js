// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJLvNiN7Ctbgjy01sEdvZtGAMT7crcBmI",
  authDomain: "datn2022-d02a8.firebaseapp.com",
  databaseURL: "https://datn2022-d02a8-default-rtdb.firebaseio.com",
  projectId: "datn2022-d02a8",
  storageBucket: "datn2022-d02a8.appspot.com",
  messagingSenderId: "628530084952",
  appId: "1:628530084952:web:8b7659887581806c505e2d",
  measurementId: "G-72G8WH03WS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);