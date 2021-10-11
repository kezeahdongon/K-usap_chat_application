
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-auth.js";
import { firebaseConfig } from "../config/firebase-config.js";

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const url = window.location.origin;

export function checkAuthentication() {
    onAuthStateChanged(auth, (user) => {
        if (!user) {
            localStorage.removeItem('uid');
            window.location.replace(url + '/pages/login/');  
        }
    });
}