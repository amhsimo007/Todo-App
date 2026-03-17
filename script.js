let tasks = [];

// Load tasks when the page is opened
window.onload = function(){
  let saved = localStorage.getItem("tasks");

  if(saved){
    tasks = JSON.parse(saved);
    displayTasks();
  }
};

// add task 
function addTask(){

  let input = document.getElementById("taskInput");
  let taskText = input.value;

  if(taskText === ""){
    alert("Write a task");
    return;
  }

  tasks.push({
    text: taskText,
    done: false
  });

  saveTasks();
  displayTasks();

  input.value = "";
}

//  Task View
function displayTasks(){

  let list = document.getElementById("taskList");
  list.innerHTML = "";

  for(let i = 0; i < tasks.length; i++){

    let li = document.createElement("li");

    li.textContent = tasks[i].text;

    // Completed case 
    if(tasks[i].done){
      li.classList.add("completed");
    }

    //  // Change status 
    li.onclick = function(){
      tasks[i].done = !tasks[i].done;
      saveTasks();
      displayTasks();
    };

    //  botton delete
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.onclick = function(e){
      e.stopPropagation();
      tasks.splice(i, 1);
      saveTasks();
      displayTasks();
    };

    //   botton edit
    let editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.onclick = function(e){
      e.stopPropagation();

      let newText = prompt("Edit task", tasks[i].text);

      if(newText !== null && newText !== ""){
        tasks[i].text = newText;
        saveTasks();
        displayTasks();
      }
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  }
}

// botton delete all 
function clearAll(){
  tasks = [];
  saveTasks();
  displayTasks();
}

// Save data
function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}