"use strict";

const pageSize = document.getElementById("input-page-size");
const category = document.getElementById("input-category");
const form = document.getElementById("form");

// render html 
const validateHTML = function (text, className) {
   const html = `<div class="${className}" style = "display:block; white-space: nowrap; ">${text}</div>`;
   return html;
};

// check vlua empty string and number
const validDate = function (e, text) {
   const parent = e.parentNode;
   const existingError = parent.querySelector(".invalid-feedback");

   if (existingError) existingError.remove();
   // check is empty and numer lagest 0
   if (!e.value || parseInt(pageSize.value) <= 0 ) {
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



pageSize.addEventListener('blur',function(){
      validDate(this,"Value is invalid (Value lagest than 1)");
});


// save the pageSize and category
form.addEventListener("submit", function (e) {
   e.preventDefault();
   const check = validDate(pageSize,"Value is invalid (Value lagest than 1)");
   if(!check)
   {
      saveToStorage("settings", JSON.stringify( { pageSize: pageSize.value, category: category.value } )); 
      alert("You updated your settings");
      window.location.href = 'news.html';
   }
});












