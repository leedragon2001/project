// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbvEumn00sNKTAUhq_fYJRw_kcp1NsEWQ",
    authDomain: "mynewapp-b9d40.firebaseapp.com",
    databaseURL: "https://mynewapp-b9d40-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mynewapp-b9d40",
    storageBucket: "mynewapp-b9d40.appspot.com",
    messagingSenderId: "404358509524",
    appId: "1:404358509524:web:4ebe7dfc56dc4a048f1c41",
    measurementId: "G-EV8CLF9BJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);