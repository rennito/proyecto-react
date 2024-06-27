// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKJT-srrE16yJgsjSVTk8TYp03CNh1vLE",
  authDomain: "proyecto-react-394e1.firebaseapp.com",
  projectId: "proyecto-react-394e1",
  storageBucket: "proyecto-react-394e1.appspot.com",
  messagingSenderId: "931295521788",
  appId: "1:931295521788:web:30fe016c2fa013db30a079"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)