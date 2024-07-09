// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdJ8QdR7zB9ca2Syh0CGbzsD5ZISK97ZU",
  authDomain: "avalonuniversity-542d5.firebaseapp.com",
  projectId: "avalonuniversity-542d5",
  storageBucket: "avalonuniversity-542d5.appspot.com",
  messagingSenderId: "459413384068",
  appId: "1:459413384068:web:4bbec99e015b2338584bd1",
  measurementId: "G-JEF9RR6YN8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;