import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: "AIzaSyApg9kvVIQmnOrqGl-ChmLXdw3MyR-eWUA",
    authDomain: "kartrider-eb390.firebaseapp.com",
    projectId: "kartrider-eb390",
    storageBucket: "kartrider-eb390.appspot.com",
    messagingSenderId: "154455934370",
    appId: "1:154455934370:web:2e168f7b65657e46e41efb",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
