import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { firebaseConfig } from "../config/firebase-config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const getCurrentUser = async () => {
    try {
        const uid = localStorage.getItem('uid');
        // GET LOGGED USER DETAILS
        const docSnapA = await getDoc(doc(db, "users", uid));
        const userData = docSnapA.data();
        return userData;
      } catch(err) {
        return {
          code: 400,
          message: "Fetch Failed."
        }
      }
    }

export {getCurrentUser}