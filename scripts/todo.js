'use strict'

const toDoList = document.getElementById('todo-list');
const addBtn = document.getElementById('btn-add');
const taskInput = document.getElementById('input-task');




const checkIsDone = function(e)
{
   const taskArr = Task.getTaskArray();
   const index = [...document.querySelectorAll('#todo-list li')].findIndex( x => x === e.target);
   console.log(taskArr);
   // check is done 
   if(e.target.classList.contains('checked') && !e.target.classList.contains('close'))
   {
      taskArr[index].isDone = true;
   } else if(!e.target.classList.contains('checked') && !e.target.classList.contains('close'))
   {
      taskArr[index].isDone = false;
   }
   saveToStorage('Tasks',JSON.stringify(taskArr));
}

// add checked element
toDoList.addEventListener('click', function(e){
   e.target.classList.toggle('checked');
   // isDone 
   checkIsDone(e);

   // containts close element
   if(e.target.classList.contains('close'))
   {
      let taskArr = Task.getTaskArray();
      e.target.parentNode.remove();
      const text = e.target.parentNode.childNodes[0].textContent;
      // filter not the same text
      taskArr = taskArr.filter( x => x.task !== text);
      saveToStorage('Tasks',JSON.stringify(taskArr));
   }


});


(function(){
   const taskArr = Task.getTaskArray();
   toDoList.innerHTML =  taskArr.map( x =>`<li >${x.task}<span class="close">×</span></li>`).join('');
})();

addBtn.addEventListener('click', function(){

   const currentUser = localStorage.getItem('Current user');
   // dont't find  current user then erro messages
   if(!currentUser)
   {
      alert("Please login user");
      window.location.href = '/index.html';
   } else 
   {
      // check value invalid
      if(!taskInput.value) 
         alert('Please value invalid');
      else 
      {
         const [user] = getFromStorage('Current user', []);
         const task = new Task(taskInput.value,user.userName);
         task.saveToLocalStorage('Tasks');
         const taskArr = Task.getTaskArray();
         toDoList.innerHTML =  taskArr.map( x =>`<li >${x.task}<span class="close">×</span></li>`).join('');
      }

   }
  
})
