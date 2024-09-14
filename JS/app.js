
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCZ-6fN1ynaDwmDyCgow1paFcproMR_34c",
    authDomain: "final-project-16e0e.firebaseapp.com",
    projectId: "final-project-16e0e",
    storageBucket: "final-project-16e0e.appspot.com",
    messagingSenderId: "544058937712",
    appId: "1:544058937712:web:02b3fab005bdd978a2bfb5"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);



//create user
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getDatabase,
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

const auth = getAuth();
const db = getDatabase()
var sign_up = document.getElementById("signup-btn");
sign_up.addEventListener("click" , (e) => {
    e.preventDefault();
    const email = document.getElementById("unameId").value;
    const password = document.getElementById("pwdId").value;
    const cpwd = document.getElementById("cpwdId").value

    if (password !== cpwd) {
        alert("password don't match!")
        return;
    } else {
        // logic sign up
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        const uid = user.uid;
        // write user data to firebase
        const userRef = ref(db, "user/" + uid);
        set(userRef, { email: email , password: password }).then(()=>{
          console.log("Create user: " + user + "successfully")
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
    }
    
    
});