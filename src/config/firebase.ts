import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBp7S2DrTtxSdfKEzApogop9TWY0ofVMcU",
  authDomain: "gfgapp-3a19e.firebaseapp.com",
  projectId: "gfgapp-3a19e",
  storageBucket: "gfgapp-3a19e.appspot.com",
  messagingSenderId: "355851007199",
  appId: "1:355851007199:web:0b791d818d0ea8e016256a",
  measurementId: "G-5B22X14T8V",
  databaseURL: "https://gfgapp-3a19e-default-rtdb.firebaseio.com",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const database = getDatabase(app);
export default app;
