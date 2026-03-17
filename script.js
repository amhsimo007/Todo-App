let tasks = [];

// تحميل المهام عند فتح الصفحة
window.onload = function(){
  let saved = localStorage.getItem("tasks");

  if(saved){
    tasks = JSON.parse(saved);
    displayTasks();
  }
};

// إضافة مهمة
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

// عرض المهام
function displayTasks(){

  let list = document.getElementById("taskList");
  list.innerHTML = "";

  for(let i = 0; i < tasks.length; i++){

    let li = document.createElement("li");

    li.textContent = tasks[i].text;

    // حالة مكتملة
    if(tasks[i].done){
      li.classList.add("completed");
    }

    // تغيير الحالة ✔️
    li.onclick = function(){
      tasks[i].done = !tasks[i].done;
      saveTasks();
      displayTasks();
    };

    // زر حذف
    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";

    delBtn.onclick = function(e){
      e.stopPropagation();
      tasks.splice(i, 1);
      saveTasks();
      displayTasks();
    };

    // زر تعديل
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

// حذف الكل
function clearAll(){
  tasks = [];
  saveTasks();
  displayTasks();
}

// حفظ البيانات
function saveTasks(){
  localStorage.setItem("tasks", JSON.stringify(tasks));
}