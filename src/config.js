// Import the functions you need from the SDKs you need
import firebase from 'firebase';
import app from 'firebase/app';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
};

// Initialize Firebase
const firebaseApp = app.initializeApp(firebaseConfig);
//const db = firebase.firestore().getFirestore(firebaseApp);

export { firebase, firebaseApp};
