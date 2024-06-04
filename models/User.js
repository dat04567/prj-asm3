"use strict";

class User {
   #firstName;
   #lastName;
   #userName;
   #passWord;
   // contructor 
   constructor(firstName, lastName, userName, password) {
      this.#firstName = firstName;
      this.#lastName = lastName;
      this.#userName = userName;
      this.#passWord = password;
   }


   // save to localstorage
   saveToLocalStorage(name){
      const obj = {};
      obj["firstName"] = this.#firstName;
      obj["lastName"] = this.#lastName;
      obj["userName"] = this.#userName;
      obj["passWord"] = this.#passWord;
      let userArr = getFromStorage(name, []);
      userArr.push(obj);
      saveToStorage(name, JSON.stringify(userArr));
   }


   // parse user
    static parseUser(userData) {
      const user = new User( userData.firstName, userData.lastName, userData.userName, userData.passWord);
      return user;
   }



   // parse Array
    static getUserArray()
   {
      return getFromStorage("User", []).map( (value) => User.parseUser(value) );
   }

  

   // getter, setter
   set firstName(firstName)
   {
      this.#firstName = firstName;
   }
   get firstName()
   {
      return this.#firstName;
   }

   set lastName(lastName)
   {
      this.#lastName = lastName
   }

   get lastName()
   {
      return this.#lastName;
   }  
   get userName()
   {
      return this.#userName;
   }
   set password(password)
   {
      this.#passWord = password
   }
   get password()
   {
      return this.#passWord
   }

}
