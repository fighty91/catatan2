// import { initializeApp } from "firebase/app";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1-mO_qeR2BruRoopNuCYkD10SqxtZif8",
  authDomain: "admin-template-1-3e4db.firebaseapp.com",
  databaseURL: "https://admin-template-1-3e4db-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "admin-template-1-3e4db",
  storageBucket: "admin-template-1-3e4db.firebasestorage.app",
  messagingSenderId: "499419712502",
  appId: "1:499419712502:web:add547c3fb00fc062e15d7",
  measurementId: "G-N0T84BXKPR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);





export default database