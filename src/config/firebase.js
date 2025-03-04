import { initializeApp } from "firebase/app";
import { getFirestore} from  "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBGmUZlcxddvflqsOlN9k2cqRCo0d_xuSg",
  authDomain: "toursync-28d03.firebaseapp.com",
  projectId: "toursync-28d03",
  storageBucket: "toursync-28d03.firebasestorage.app",
  messagingSenderId: "441044534562",
  appId: "1:441044534562:web:5a0516715c7f006ae1917b",
  measurementId: "G-WDZSRKJ5PF",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
