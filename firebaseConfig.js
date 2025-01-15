const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getDatabase } = require("firebase/database");

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: `${process.env.FIREBASE_DOMAIN}.firebaseapp.com`,
  databaseURL:
    "https://uas-project-e022f-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: process.env.FIREBASE_DOMAIN,
  storageBucket: `${process.env.FIREBASE_DOMAIN}.appspot.com`,
  messagingSenderId: "931439134492",
  appId: "1:931439134492:web:ee9be75cbfafd5acc11cd9",
  measurementId: "G-CYQF6R0MBH",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

module.exports = { auth, db };
