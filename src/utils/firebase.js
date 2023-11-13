// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAFjTQHwPIqy2jt0_QAM-OKGkPWiZUsvEA",
  authDomain: "netflixgpt-7b9b7.firebaseapp.com",
  projectId: "netflixgpt-7b9b7",
  storageBucket: "netflixgpt-7b9b7.appspot.com",
  messagingSenderId: "623826268099",
  appId: "1:623826268099:web:c192b2585079f89c965776",
  measurementId: "G-WPY10649V6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
