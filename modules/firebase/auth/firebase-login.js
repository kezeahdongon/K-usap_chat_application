import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { firebaseConfig } from "../config/firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const loginUser = async (email,password) => {
  try {    
    const user = await signInWithEmailAndPassword(auth, email, password);
    if(user.user.uid !== ''){
      localStorage.setItem("uid", user.user.uid);
      return {
        code: 200,
        message: "Login Successful."
      }
    }
  } catch (e) {
    return {
      code: 400,
      message: "Login Failed."
    }
  }
}

export default loginUser;