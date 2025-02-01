import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC92UUoAeGRkLfZHnvCiMUrvNmhyr7HEcQ",
  authDomain: "careerconnect-e348a.firebaseapp.com",
  projectId: "careerconnect-e348a",
  storageBucket: "careerconnect-e348a.firebasestorage.app",
  messagingSenderId: "746951345344",
  appId: "1:746951345344:web:128f523c1cd6e31a041925",
  measurementId: "G-J7RD9J7MXX",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
