import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-firestore.js";
import { firebaseConfig } from "../config/firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const signupUser = async (name,email,password,confirm_password,phone_number,address) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    // addDoc - collection
    // setDoc - doc
    // doc(db, firestore_collection, documentId)
    // collection(db, firestore_collection)
    const userDocRef = await setDoc(doc(db, "users", user.user.uid), {
      name: name,
      email: email,
      phone_number: phone_number,
      address: address
    });

    if(user.user.uid !== ''){
      return {
        code: 200,
        message: "Signup Successful."
      }
    }
  } catch (e) {
    return {
      code: 400,
      message: "Signup Failed."
    }
  }
}

export default signupUser;