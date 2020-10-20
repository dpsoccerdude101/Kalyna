import firebase from "firebase";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZHCMxHRN6y5M5seG6qQ1V_egJ0uI7wm4",
  authDomain: "kalyna-uafgr-87f61.firebaseapp.com",
  databaseURL: "https://kalyna-uafgr-87f61.firebaseio.com",
  projectId: "kalyna-uafgr-87f61",
  storageBucket: "kalyna-uafgr-87f61.appspot.com",
  messagingSenderId: "382085668023",
  appId: "1:382085668023:web:17e839d8d1cf2745cf4132",
  measurementId: "G-QP7RGL4G01",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
