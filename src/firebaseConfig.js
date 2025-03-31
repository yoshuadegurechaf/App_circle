import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBQ9T-qJPb1wYviysE23mEXi6X2fCU2vq8",
  authDomain: "pressthecircle-10cd6.firebaseapp.com",
  projectId: "pressthecircle-10cd6",
  storageBucket: "pressthecircle-10cd6.appspot.com",
  messagingSenderId: "684096687559",
  appId: "1:684096687559:web:558a524535ff1bd6529de2"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Inicializa Firestore

export { db };
