import { getDatabase } from "firebase/database";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpKWMFwamlbtgf7LZiCqb3MBb-n92KqZ4",
  authDomain: "lelystore-1704.firebaseapp.com",
  databaseURL: "https://lelystore-1704-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "lelystore-1704",
  storageBucket: "lelystore-1704.firebasestorage.app",
  messagingSenderId: "309809433378",
  appId: "1:309809433378:web:c4b047eee6d698ea8ff37b",
  measurementId: "G-QJ98YDFQ38"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default database