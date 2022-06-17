import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyD6-zbqprlrC3dLZfB90_ct_benOQQ34BE",
  authDomain: "consolidated-dashboard-c8735.firebaseapp.com",
  databaseURL: "https://consolidated-dashboard-c8735-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "consolidated-dashboard-c8735",
  storageBucket: "consolidated-dashboard-c8735.appspot.com",
  messagingSenderId: "193170833814",
  appId: "1:193170833814:web:e4fdf7d949828761cf5db7"
};


const app = initializeApp(firebaseConfig);
export const firebaseDatabase = getDatabase(app)
export const firebaseAuth = getAuth(app);