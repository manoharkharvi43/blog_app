import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyB_kP1GB5JvZafw5lW0xvKCHGNNtmIGjRY",
  authDomain: "blog-df720.firebaseapp.com",
  projectId: "blog-df720",
  storageBucket: "blog-df720.appspot.com",
  messagingSenderId: "367794918648",
  appId: "1:367794918648:web:79e78cff36db02ae26570d",
  measurementId: "G-91MYYC56KN"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const analytics = getAnalytics(app);
