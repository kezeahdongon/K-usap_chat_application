import loginUser from "../../modules/firebase/auth/firebase-login.js";
// COMPONENTS
import { menuItems } from "../../modules/component/headerMenu.js";

const LOGIN = (() => {
    document.addEventListener('DOMContentLoaded', init);

    const url = window.location.origin;

    function init(){
        document.querySelector('header').innerHTML += menuItems(false);
        addEventListeners();
    }

    // INTERACTIONS
    function addEventListeners() {
        document.querySelector('#loginBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            
            const loginForm = document.querySelector('#loginForm');
            const email = loginForm.elements["email"].value;
            const password  = loginForm.elements["password"].value;

            if(email === '') return alert("email is required")
            if(password === '') return alert("password is required")

            // LOGIN USER TO FIREBASE
            const req = await loginUser(email,password);
            if(req.code == 200) {
                window.location.replace(url + '/pages/profile/');
            } else {
                alert(req.message)
            }
        })
    }
})();