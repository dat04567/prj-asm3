'use strict'

//save  data
function saveToStorage(key, value) {
   localStorage.setItem(key, value);
}
// get data
function getFromStorage(key, df) {
   return JSON.parse(localStorage.getItem(key)) ?? df;
}