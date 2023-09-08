import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

const auth = getAuth();
const dB = getDatabase ();

let signUpAuth = () => {
  const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
  createUserWithEmailAndPassword(auth, userEmail, userPassword)
   .then((res) => {
     alert("Successfully created Account!");
     // let userID = auth.currentUser.uid;
     let userRef = ref(dB,"users/"+ "("+ userName + ")");
     let userObj = {  Name: userName, Email: userEmail, Pass: userPassword };
     // Use the set operation and its promise to wait for data to be saved
     return set(userRef, userObj);
    })
    .then(() => {
      // Data has been successfully saved to the database, now change the location
      location.href = "./login.html";
    })
    .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Sorry not created" + errorMessage + errorCode);
  })
}
const signUpBtn = document.getElementById('signUpButton');
if(signUpBtn){ 
  signUpBtn.addEventListener("click", signUpAuth);
}

import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { onValue } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-database.js";

let LogIn = () => {
 //  const username = document.getElementById("username");
    const userEmail = document.getElementById('userEmail').value;
    const userPassword = document.getElementById('userPassword').value;
  signInWithEmailAndPassword(auth, userEmail, userPassword)
    .then((resolve) => {
    // const user = userCredential.user;
    alert("Login Sucessful!");
    let userID = auth.currentUser.uid;
    let userNameRef = ref(dB, "LoginUsers/" + userID);
    onValue(userNameRef, (data) => {
      // let userData = data.val().username;
      console.log(userData);
    //  document.getElementById("username").innerHTML = userData;
      // username.innerHTML = userData;

    })
    // location.href = "./dashboard.html";
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Sorry an Error Came by " + errorCode);
  });

};
let loginBtn = document.getElementById('loginBtn');
if(loginBtn) { loginBtn.addEventListener('click',LogIn);}

