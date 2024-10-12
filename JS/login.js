// import{app} from "./app";

// var login = document.getElementById('login-btn');

// login.addEventListener('click', (e) => {
//     e.preventDefault();
// })

// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

// const auth = getAuth();
// createUserWithEmailAndPassword(auth, email, password)
//   .then((userCredential) => {
//     // Signed up 
//     const user = userCredential.user;
//     console.log(object);
//     window.location.href ="./idex.html"
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });



  // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.2/firebase-auth.js";

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
const database = getDatabase();//lay data
const auth = getAuth();

var logIn = document.getElementById('signin-btn');//lay gia tri button
logIn.addEventListener("click", (e) => { 
    e.preventDefault();
    var email = document.getElementById("unameId").value;//lay gia tri email
    var password = document.getElementById("pwdId").value;//lay gia tri password
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            
              alert ("sign in successfully");
            window.location.href = "./index.html"
            // ... 
            // localStorage.setItem("Session", email);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });

});