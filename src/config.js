// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import app from 'firebase/app';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDKnRHnIKp2sl_TuR2l7WeH9w3irmelJ50",
  authDomain: "travelwithme-da6e1.firebaseapp.com",
  projectId: "travelwithme-da6e1",
  storageBucket: "travelwithme-da6e1.appspot.com",
  messagingSenderId: "911275302390",
  appId: "1:911275302390:web:dceac5491d4ca304967bd7",
  measurementId: "G-9PED17E5ZS"
};

// Initialize Firebase
const firebaseApp = app.initializeApp(firebaseConfig);
//const db = firebase.firestore().getFirestore(firebaseApp);

export { firebase, firebaseApp};
