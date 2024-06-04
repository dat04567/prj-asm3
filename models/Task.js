class Task {

   // contructor
   constructor(task,owner,isDone = false) {
      this.task = task;
      this.owner = owner;
      this.isDone = isDone;
   }
   
     // save to localstorage
   saveToLocalStorage(name){
      const obj = {};
      obj["task"] = this.task;
      obj["owner"] = this.owner;
      obj["isDone"] = this.isDone;
      let taskArr = getFromStorage(name, []);
      taskArr.push(obj);
      saveToStorage(name, JSON.stringify(taskArr));
   }


   // parse user
   static parseTask(taskData) {
      const task = new Task( taskData.task, taskData.owner,taskData.isDone );
      return task;
   }

   // parse Array 
   static getTaskArray()
   {
      return getFromStorage("Tasks", []).map( (value) => Task.parseTask(value) );
   }
     

}