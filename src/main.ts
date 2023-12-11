import "./style.css";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChMH8UwkuT1sGWFU6hIFItPKH3StRBmLg",
  authDomain: "simple-server-game.firebaseapp.com",
  databaseURL: "https://simple-server-game-default-rtdb.firebaseio.com",
  projectId: "simple-server-game",
  storageBucket: "simple-server-game.appspot.com",
  messagingSenderId: "664777792190",
  appId: "1:664777792190:web:4492b2c92154d781a81cef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
