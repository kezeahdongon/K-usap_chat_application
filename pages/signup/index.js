import signupUser from '../../modules/firebase/auth/firebase-signup.js';

const SIGNUP = (() => {
    document.addEventListener('DOMContentLoaded', init);

    const url = window.location.origin;

    function init(){
        document.querySelector('header').innerHTML += menuItems(false);
        addEventListeners();
    }

    // INTERACTIONS
    function addEventListeners() {
        document.querySelector('#signupBtn').addEventListener('click', async (e) => {
            e.preventDefault();
            // SHOW LOADING FOR 3 SECONDS
            document.querySelector('#loader1').style.display = 'block';
            // GET USER DATA
            const signUpForm = document.querySelector('#signupForm');
            const name              = signUpForm.elements["name"].value;
            const email             = signUpForm.elements["email"].value;
            const password          = signUpForm.elements["password"].value;
            const confirm_password  = signUpForm.elements["confirm_password"].value;
            const phone_number      = signUpForm.elements["phone_number"].value;
            const address           = signUpForm.elements["address"].value;
            // VALIDATE USER DATA
            if(name === '') return alert("name is required")
            if(email === '') return alert("email is required")
            if(password === '') return alert("password is required")
            if(confirm_password === '') return alert("confirm_password is required")
            if(phone_number === '') return alert("phone_number is required")
            if(address === '') return alert("address is required")
            // VALIDATE PASSWORD
            if(password.length < 6) return alert('Password should be at least 6 characters');
            if(password !== confirm_password) return alert('password not match')
            // SIGNUP USER TO FIREBASE
            const req = await signupUser(name,email,password,confirm_password,phone_number,address);
            if(req.code == 200) {
                window.location.replace(url + '/pages/login/');
            } else {
                document.querySelector('#loader1').style.display = 'none';
                alert(req.message)
            }
        })
    }
})();