"use strict";
const firstName = document.getElementById("input-firstname");
const lastName = document.getElementById("input-lastname");
const userName = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
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

const checkConfirmPassword = function (e) {
   const parent = e.parentNode;
   const existingError = parent.querySelector(".invalid-feedback");
   // check if not the confirm password the same is password then show error message
   if (existingError) existingError.remove();

   if (!(confirmPasswordInput.value === passwordInput.value)) {
      parent.insertAdjacentHTML(
         "beforeend",
         validateHTML(
            "Confirm password must match with password",
            "invalid-feedback"
         )
      );
      return true;
   } else {
      if (existingError) existingError.remove();
      return false;
   }
};

const checkPassword = function (e) {
   const parent = e.parentNode;
   const existingError = parent.querySelector(".invalid-feedback");
   // remove erro if duplicate elements
   if (existingError) existingError.remove();
   // regex password least 8 characters
   const regex = /^.{8,}$/gm;
   // check password least 8 characters
   if (!regex.test(e.value)) {
      parent.insertAdjacentHTML(
         "beforeend",
         validateHTML(
            "Password must have at least 8 characters.",
            "invalid-feedback"
         )
      );
      return true;
   } else {
      if (existingError) existingError.remove();
      return false;
   }
};

const isArrUserName = function (e) {
   const userArr = User.getUserArray();
   for (const i of userArr) {
      if (i.userName === e.value) return true;
   }
   return false;
};
const checkUserName = function (e) {
   const parent = e.parentNode;
   const existingError = parent.querySelector(".invalid-feedback");
   const checkArr = isArrUserName(e);
   // remove erro if duplicate elements
   if (existingError) existingError.remove();
   // check password least 8 characters
   if (checkArr) {
      parent.insertAdjacentHTML(
         "beforeend",
         validateHTML(
            "The username must not be the same as the usernames of previous users.",
            "invalid-feedback"
         )
      );
      return true;
   } else {
      if (existingError) existingError.remove();
      return false;
   }
};

////// CHECK FOR FROM MULTIPLE FIELDS ///////

// check confirm password
const isConfirmPassword = function (e) {
   const empty = validDateEmpty(e, "Confirm password is invalid");
   if (!empty) return checkConfirmPassword(e);
   return empty;
};
// check password
const isPassWord = function (e) {
   const emtpy = validDateEmpty(e, "Password is invalid");
   if (!emtpy) return checkPassword(e);
   return emtpy;
};

// userName
const isUserName = function (e) {
   const empty = validDateEmpty(e, "User name is invalid");
   if (!empty) return checkUserName(e);
   return empty;
};

// add event
firstName.addEventListener("blur", function () {
   validDateEmpty(this, "First name is invalid");
});

lastName.addEventListener("blur", function () {
   validDateEmpty(this, "Last name is invalid");
});

userName.addEventListener("blur", function () {
   isUserName(this);
});

passwordInput.addEventListener("blur", function () {
   isPassWord(this);
});

confirmPasswordInput.addEventListener("blur", function () {
   isConfirmPassword(this);
});

// excute form
form.addEventListener("submit", function (e) {
   e.preventDefault();
   const isFirstName = validDateEmpty(firstName, "First name is invalid");
   const isLastName = validDateEmpty(lastName, "Last name is invalid");
   const usrName = isUserName(userName);
   const isPass = isPassWord(passwordInput);
   const isConPass = isConfirmPassword(confirmPasswordInput);

   // add user check validtion
   if (!isFirstName && !isPass && !isLastName && !usrName && !isConPass) {
      const data = new FormData(form);
      let obj = {};
      data.forEach((value, name) => (obj[name] = value));
      const user = User.parseUser(obj);
      user.saveToLocalStorage("User");
      alert("Congratulations, your account has been successfully created.");
      window.location.href = "../pages/login.html";
    
   }
});
