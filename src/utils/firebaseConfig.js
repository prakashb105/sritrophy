import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDMlN2ycX4MdaB4mYz3vDZIOe4kQXd2eZE",
    authDomain: "sritrophy-8ef5e.firebaseapp.com",
    databaseURL: "https://sritrophy-8ef5e-default-rtdb.firebaseio.com",
    projectId: "sritrophy-8ef5e",
    storageBucket: "sritrophy-8ef5e.firebasestorage.app",
    messagingSenderId: "1039327811803",
    appId: "1:1039327811803:web:d18f8c6153db5d01f614fe",
    measurementId: "G-DZ172TV4CX"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

export { db, auth };