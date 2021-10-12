import loginUser from "./modules/firebase/auth/firebase-login.js";

const APP = (() => {
    document.addEventListener('DOMContentLoaded', init);

    const url = window.location.origin;

    function init(){
        addEventListeners()
    }

    // INTERACTIONS
    function addEventListeners() {
        document.querySelector('#loginBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            // SHOW LOADING
            document.querySelector('#loader1').style.display = 'block';
            // GET INPUTS
            const loginForm = document.querySelector('#loginForm');
            const email = loginForm.elements["email"].value;
            const password  = loginForm.elements["password"].value;

            if(email === '') return alert("email is required")
            if(password === '') return alert("password is required")

            // LOGIN USER TO FIREBASE
            const req = await loginUser(email,password);
            if(req.code == 200) {
                window.location.replace(url + '/pages/messages/');
            } else {
                alert(req.message)
            }
        })
    }
})();
