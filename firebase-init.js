// firebase-init.js

const firebaseConfig = {
  apiKey: "AIzaSyBTiuZ3bvY4PJpXKNS2megAcwjo-omYOYM",
  authDomain: "hayatiisler-abde5.firebaseapp.com",
  projectId: "hayatiisler-abde5",
  storageBucket: "hayatiisler-abde5.appspot.com",
  messagingSenderId: "761325880458",
  appId: "1:761325880458:web:084633651cc08429c6d973",
  measurementId: "G-6HLHC9794J"
};

firebase.initializeApp(firebaseConfig);

// SADECE Firestore
const db = firebase.firestore();
