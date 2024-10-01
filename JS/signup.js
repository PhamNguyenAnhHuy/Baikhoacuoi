// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZ-6fN1ynaDwmDyCgow1paFcproMR_34c",
    authDomain: "final-project-16e0e.firebaseapp.com",
    databaseURL: "https://final-project-16e0e-default-rtdb.firebaseio.com",
    projectId: "final-project-16e0e",
    storageBucket: "final-project-16e0e.appspot.com",
    messagingSenderId: "544058937712",
    appId: "1:544058937712:web:02b3fab005bdd978a2bfb5"
  };
  
  // Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const auth = getAuth();

// Create user
var signUp = document.getElementById('signup');
signUp.addEventListener("click", (e) => {
    e.preventDefault();
    var username = document.getElementById("unameId").value;
    var email = document.getElementById("Email").value;
    var password = document.getElementById("pwdId").value;
    var cpassword = document.getElementById("cpassword").value;
    if (password != cpassword) {
        alert("password not match");
    } else {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                 
                //  window.location.href = "./login.html"
                const userRef = ref(db, "user/" + user.uid)
                //save user at realtime database
            
                var created = set(userRef, { email: email , password: password }).then(()=>{
                    console.log("Create user: " + user + "successfully")
                    window.location ="../HTML/login.html"
                  });
                if (created){
                    alert("Sign up successfully")
                }
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }
})
