// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB8PwJVMgpJKgax_qmVaX_xTmNMLhnu7Vs",
  authDomain: "basiccrud-b4521.firebaseapp.com",
  projectId: "basiccrud-b4521",
  storageBucket: "basiccrud-b4521.appspot.com",
  messagingSenderId: "978065184910",
  appId: "1:978065184910:web:9793ea92fa5022e99751df",
  measurementId: "G-90WJ8MVV6S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);