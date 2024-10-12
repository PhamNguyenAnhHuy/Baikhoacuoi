
//   // Import the functions you need from the SDKs you need
//   import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
//   // TODO: Add SDKs for Firebase products that you want to use
//   // https://firebase.google.com/docs/web/setup#available-libraries

//   // Your web app's Firebase configuration
//   const firebaseConfig = {
//     apiKey: "AIzaSyCZ-6fN1ynaDwmDyCgow1paFcproMR_34c",
//     authDomain: "final-project-16e0e.firebaseapp.com",
//     projectId: "final-project-16e0e",
//     storageBucket: "final-project-16e0e.appspot.com",
//     messagingSenderId: "544058937712",
//     appId: "1:544058937712:web:02b3fab005bdd978a2bfb5"
//   };

//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);



// //create user
// import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
// import {
//   getDatabase,
//   ref,
//   set,
// } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// const auth = getAuth();
// const db = getDatabase()
// var sign_up = document.getElementById("signup-btn");
// sign_up.addEventListener("click" , (e) => {
//     e.preventDefault();
//     const email = document.getElementById("unameId").value;
//     const password = document.getElementById("pwdId").value;
//     const cpwd = document.getElementById("cpwdId").value

//     if (password !== cpwd) {
//         alert("password don't match!")
//         return;
//     } else {
//         // logic sign up
//     createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//         // Signed up 
//         const user = userCredential.user;
//         const uid = user.uid;
//         // write user data to firebase
//         const userRef = ref(db, "user/" + uid);
//         set(userRef, { email: email , password: password }).then(()=>{
//           console.log("Create user: " + user + "successfully")
//         });
//       })
//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage);
//       });
//     }
    
    
// });

//function
function upload() {
    var heading = document.getElementById("heading").value;
    var des = document.getElementById("description").value;
    var name_post = document.getElementById("name").value;
    var post = document.getElementById("wish").value;
    //object image
    var image = document.getElementById("img").files[0];
    var date_post = document.getElementById("date").value;
    //get image name
    var imageName = image.name;
    console.log(imageName);
    //firebase storage reference
    //it is the path where your image will be stored
    var storageRef = firebase.storage().ref('images/' + imageName);//upload image vao storage firebase
    //upload image to selected storage reference
    //make sure you pass image here
    var uploadTask = storageRef.put(image);//dat gia tri url vao image
    //to get the state of image uploading....
    uploadTask.on('state_changed', function (snapshot) {//luu tru toan bo qua trinh tai tai nguyen (image)
      //get task progress by following code
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("upload is " + progress + " done");
    }, function (error) {
      //handle error here
      console.log(error.message);
    }, function () {
      //handle successfull upload here..
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {//chup lai tai nguyen storage de goi element //lay gia tri hinh anh
        //get your image download url here and upload it to databse
        //our path where data is stored ...push is used so that every post have unique id
        firebase.database().ref('blogs/').push().set({ //lay tat ca gia tri nhap vao bai post dua vao database
          heading: heading,
          description: des,
          name_post: name_post,
          post: post,
          date: date_post,
          imageURL: downloadURL
        }, function (error) {
          if (error) {
            alert("Error while uploading");
          } else {
            alert("Successfully uploaded");
            //now reset your form
            document.getElementById('post-form').reset();
            getdata();
          }
        });
      });
    });
  
  }
  window.onload = function () { //load lai trang va bat dau lay lai data
    this.getdata();
  }
  
  // post on html
  function getdata() {
    firebase.database().ref('blogs/').once('value').then(function (snapshot) {
      //get your posts div
      var posts_div = document.getElementById('posts');//lay noi chua
      //remove all remaining data in that div
      // posts_div.innerHTML = "";
      //get data from firebase
      var data = snapshot.val();//chup lai gia tri
      console.log(data);
      //now pass this data to our posts div
      //we have to pass our data to for loop to get one by one
      //we are passing the key of that post to delete it from database
      for (let [key ,value] of Object.entries(data)) { //lap lai cho chua
        posts_div.innerHTML = "<div class='w3-container w3-white w3-margin w3-padding-large'>" + //tao nhung phan tu trong html trong js
          "<div class='w3-center'>" +
          "<h3>" + value.heading + "</h3>" +
          "<h5>" + value.description + ", <span class'w3-opacity'>" + value.date + "</span></h5>" + "</div>" +
          "<div class='w3-justify'>" +
          "<img src='" + value.imageURL + "' alt='error Image' style='width:100%; height: 60%;  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);' class='w3-padding-16'>" +
          "<p><strong>" + value.name_post + "</strong> " + value.post + "</p>"+
          "<p class='w3-left'><button class='w3-button w3-white w3-border' onclick='likeFunction(this)'><b> Like</b></button></p>"+
          "<p class='w3-clear'></p>"+
          "</div></div><hr>"+posts_div.innerHTML;
      }
    });
  } 
  
  
  
  
  //   Toggle between hiding and showing blog replies/comments
    document.getElementById("myBtn").click();//lay gia tri button bang id
  function myFunction(id) {
    var x = document.getElementById(id);
    if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
    } else {
      x.className = x.className.replace(" w3-show", "");
    }
  }
  
  function likeFunction(x) {
    x.style.fontWeight = "bold";
    x.innerHTML = "✓ Liked";
  }



  let slideIndex = 1; 
  showSlides(slideIndex);//dat ve ban dau 
  
  function plusSlides(n) {
      showSlides(slideIndex += n);//tiep theo
  }
  
  function currentSlide(n) {
      showSlides(slideIndex = n);//slide hien tai
  }
  
  function showSlides(n) {
      let i;
      let slides = document.getElementsByClassName("mySlides");//goi thanh phan trong slide
      let dots = document.getElementsByClassName("dot");
      if (n > slides.length) { slideIndex = 1 }
      if (n < 1) { slideIndex = slides.length }
      for (i = 0; i < slides.length; i++) {
          slides[i].style.display = "none";
      }
      for (i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
      }
      slides[slideIndex - 1].style.display = "block";//ep nguyen slide thanh block
      dots[slideIndex - 1].className += " active";//
  }



// document.getElementById('searchButton').addEventListener('click', function() {
//   const input = document.getElementById('searchInput').value;
//   const resultsDiv = document.getElementById('results');

//   // Clear previous results
//   resultsDiv.innerHTML = '';

//   if (input) {
//       // Simulated search results
//       const results = [`Result 1 for "${input}"`, `Result 2 for "${input}"`, `Result 3 for "${input}"`];

//       results.forEach(result => {
//           const p = document.createElement('p');
//           p.textContent = result;
//           resultsDiv.appendChild(p);
//       });
//   } else {
//       resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
//   }
// });
