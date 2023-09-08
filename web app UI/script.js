function handleSubmission() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const dashboard = document.getElementById("dashboard");
  const imgInput = document.getElementById("image");

  const title = titleInput.value;
  const content = contentInput.value;
  const imageFile = imgInput.files[0];

  if (title && content) {
    saveToLocalStorage(title, content, imageFile);
    titleInput.value = "";
    contentInput.value = "";
    imgInput.value = "";
    loadFromLocalStorage(dashboard);
  }
}

function saveToLocalStorage(title, content, imageFile) {
  const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  
  const blogPost = { title, content, image: null };

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      blogPost.image = event.target.result;
      existingPosts.push(blogPost);
      localStorage.setItem("blogPosts", JSON.stringify(existingPosts));
      loadFromLocalStorage(dashboard); // Reload after the image is saved
    };
    reader.readAsDataURL(imageFile);
  } else {
    existingPosts.push(blogPost);
    localStorage.setItem("blogPosts", JSON.stringify(existingPosts));
    loadFromLocalStorage(dashboard); // Reload without image if no image is selected
  }
}

function loadFromLocalStorage(dashboard) {
  dashboard.innerHTML = '';
  const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  existingPosts.forEach(post => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog-post");
    if(post.image){
      const imageElement =document.createElement('img');
      imageElement.classList.add('blog-image');
      imageElement.src = post.image;
      postContainer.appendChild(imageElement);
    }

    const titleElement = document.createElement("h2");
    titleElement.classList.add("blog-title");
    titleElement.textContent = post.title;

    const contentElement = document.createElement("p");
    contentElement.classList.add("blog-content");
    contentElement.textContent = post.content;

    postContainer.appendChild(titleElement);
    postContainer.appendChild(contentElement);

    dashboard.appendChild(postContainer);
  });
}

// Attach the handleSubmission function to the submit button click event
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmission);

// Load and display blog posts from local storage when the page loads
window.addEventListener("load", () => {
  const dashboard = document.getElementById("dashboard");
  loadFromLocalStorage(dashboard);
});

/*
function handleSubmission() {
  const titleInput = document.getElementById("title");
  const contentInput = document.getElementById("content");
  const dashboard = document.getElementById("dashboard");
  const imgInput = document.getElementById("image");

  const title = titleInput.value;
  const content = contentInput.value;
  const imageFile = imgInput.files[0]; // Get the selected image file

  if (title && content) {
    // Save data to local storage
    saveToLocalStorage(title, content);

    // Clear input fields
    titleInput.value = "";
    contentInput.value = "";
    imgInput.value ="";

    // Reload blog posts
    loadFromLocalStorage(dashboard);
  }
}

// Function to save blog post data to local storage
function saveToLocalStorage(title, content,imageFile) {
  const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
  existingPosts.push({ title, content });
  // Create a new object to represent the blog post
  const blogPost = { title, content, image: null };

  if (imageFile) {
    // Convert the image file to a data URL
    const reader = new FileReader();
    reader.onload = (event) => {
      blogPost.image = event.target.result; // Set the image property with the data URL
      existingPosts.push(blogPost); // Push the blog post with the image to the array
      localStorage.setItem("blogPosts", JSON.stringify(existingPosts));
    };
    reader.readAsDataURL(imageFile);
  } else {// If no image is selected, save the blog post without an image
    existingPosts.push(blogPost);
    localStorage.setItem("blogPosts", JSON.stringify(existingPosts));
  }
}


// Function to load and display blog posts from local storage
function loadFromLocalStorage(dashboard) {
  dashboard.innerHTML = ''; // Clear the dashboard

  const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

  existingPosts.forEach(post => {
    const postContainer = document.createElement("div");
    postContainer.classList.add("blog-post");

    const titleElement = document.createElement("h2");
    titleElement.classList.add("blog-title");
    titleElement.textContent = post.title;

    const contentElement = document.createElement("p");
    contentElement.classList.add("blog-content");
    contentElement.textContent = post.content;

    postContainer.appendChild(titleElement);
    postContainer.appendChild(contentElement);

    dashboard.appendChild(postContainer);
  });
}

// Attach the handleSubmission function to the submit button click event
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", handleSubmission);

// Load and display blog posts from local storage when the page loads
window.addEventListener("load", () => {
  const dashboard = document.getElementById("dashboard");
  loadFromLocalStorage(dashboard);
});
*/

import { getAuth,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const auth = getAuth();
const signOutBtn = document.getElementById('signOutButton');
const signInBtn = document.getElementById('signInButton');

const inputField = document.getElementById('input-field');

let checkAuthState = () => {
onAuthStateChanged(auth, (user) => {
    if (user) {
      inputField.style.display = "block";
    } else {
      inputField.style.display = "none";
    }
 });
}
const userSignOut = async() =>{
  await signOut(auth);
  signInBtn.style.display = "block";
}

checkAuthState();

signOutBtn.addEventListener('click',userSignOut);