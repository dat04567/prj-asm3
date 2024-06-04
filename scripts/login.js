"use strict";
const userNameInput = document.getElementById("input-username");
const passWordInput = document.getElementById("input-password");
const form = document.getElementById("form");

// innerHTML
const validateHTML = function (text, className) {
   const html = `<div class="${className}" style = "display:block; white-space: nowrap; ">${text}</div>`;
   return html;
};

// check name empty string
const validDateEmpty = function (e, text) {
   const parent = e.parentNode;
   const existingError = parent.querySelector(".invalid-feedback");

   if (existingError) existingError.remove();
   // check is empty

   if (!e.value) {
      parent.insertAdjacentHTML(
         "beforeend",
         validateHTML(text, "invalid-feedback")
      );
      return true;
   } else {
      // is containts parent then remove it
      if (existingError) existingError.remove();
      return false;
   }
};

// inner error message
const notificationErro = function () {
   return `<div class="alert alert-danger d-flex  align-items-center " role="alert">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
         <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
         <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
      </svg>
      <p class=" ml-2 mb-0 text-danger">Your account name or password is incorrect.</p>
   </div>`;
};


// check login status don't correct user name password
const isLogin = function () {
   const user = User.getUserArray();
   const parent = form.parentNode;
   const existingError = parent.querySelector(".alert-danger");

   for (const key in user) {
      if ( user[key].userName === userNameInput.value && user[key].password === passWordInput.value  )
      {
         user[key].saveToLocalStorage("Current user");
         window.location.href = "/index.html";
         return true;
      }
         
   }
   // check if erro have else add erro 
   parent.insertAdjacentHTML("afterbegin", notificationErro());

   if(existingError) existingError.remove();

   return false;
};



userNameInput.addEventListener("blur", function () {
   validDateEmpty(this, "User Name is invalid");
});

passWordInput.addEventListener("blur", function () {
   validDateEmpty(this, "Password is invalid");
});


// validate form
form.addEventListener("submit", function (e) {
   e.preventDefault();

   const isusr = validDateEmpty(userNameInput, "User Name is invalid");
   const isPass = validDateEmpty(passWordInput, "Password is invalid");
   // empty false
   if (!isPass && !isusr ) {
      isLogin();
   }
});


