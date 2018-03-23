import firebase from 'firebase';
import 'firebase/firestore';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyBOZKJ3I0CD34rr-e0z8BByCe_-be4Avyw",
    authDomain: "music-generator-b6934.firebaseapp.com",
    databaseURL: "https://music-generator-b6934.firebaseio.com",
    projectId: "music-generator-b6934",
    storageBucket: "music-generator-b6934.appspot.com",
    messagingSenderId: "404958676896"
};
firebase.initializeApp(config);

let database = firebase.firestore();

export default database;