'use strict'
const loginModal = document.getElementById('login-modal');
const logoutBtn = document.getElementById('btn-logout');

(function () {
   const currentUsr = getFromStorage('Current user');
   // if find current user login successfull then no 
   if(currentUsr)
   {
      loginModal.innerHTML = `<p>Welcome ${currentUsr[0].firstName}</p>`;
   } else 
   {
      loginModal.innerHTML =`
      <p>Please Login or Register</p>
      <div class="row" >
         <div class="col-md-3">
            <a href="./pages/login.html" class="btn btn-primary btn-block">Login</a>
         </div>
         <div class="col-md-3">
            <a href="./pages/register.html" class="btn btn-primary btn-block">Register</a>
         </div>
      </div>`
   }
 })();


 // logout remove item
 logoutBtn.addEventListener('click', function(){
      loginModal.innerHTML =`
      <p>Please Login or Register</p>
      <div class="row" >
         <div class="col-md-3">
            <a href="./pages/login.html" class="btn btn-primary btn-block">Login</a>
         </div>
         <div class="col-md-3">
            <a href="./pages/register.html" class="btn btn-primary btn-block">Register</a>
         </div>
      </div>`;
      localStorage.removeItem('Current user');
 });

 


 