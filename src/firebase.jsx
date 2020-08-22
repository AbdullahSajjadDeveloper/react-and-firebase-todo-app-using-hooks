import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "YOUR-FIREBASE-API-KEY",
  authDomain: "YOUR-FIREBASE-AUTH-DOMAIN",
  databaseURL: "YOUR-FIREBASE-DATABASE-URL",
  projectId: "YOUR-FIREBASE-PROJECT-ID",
  storageBucket: "YOUR-FIREBASE-STORAGE-BUCKET",
  messagingSenderId: "YOUR-FIREBASE-MSI",
  appId: "YOUR-FIREBASE-APP-ID",
});

const db = firebaseApp.firestore();

export default db;
