import firebase from 'firebase';

// Initialize Firebase
const config = {
};
firebase.initializeApp(config);

let database = firebase.database();

export default database;