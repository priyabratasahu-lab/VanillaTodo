const textInput = document.querySelector(".text-input");
const dateInput = document.querySelector(".date-input");
const timeInput = document.querySelector(".time-input");

const addTodo = document.querySelector(".add-todo");

const popup = document.querySelector(".popup");
const message = document.querySelector(".pop-msg");

const todoTask = document.querySelector(".todo-tasks");

let tasks = [];

window.onload = (() => {
    message.innerText = "Welcome to Todo app";
    message.style.background = "lime";
    message.style.color = "black";
    showPop();
    timeOut();

    const savedData = localStorage.getItem("todos");
    if(savedData){
        tasks = JSON.parse(savedData);
        showTodoTask();
    }
});

addTodo.addEventListener("click", (e) => {
    // checks for invalid inputs
    if(!textInput.value || !dateInput.value || !timeInput.value){
        message.innerText = "Input field cannot be blank";
        message.style.background = "red";
        message.style.color = "white";
        showPop();
        timeOut()
        return;
    } else{
        message.innerText = "Todo task added succesfully";
        message.style.background = "green";
        message.style.color = "white";
        showPop();
        timeOut()
    }

    const taskObj = {
        task: textInput.value,
        date: dateInput.value,
        time: timeInput.value
    }
    tasks.unshift(taskObj);
    localStorage.setItem("todos", JSON.stringify(tasks));
    showTodoTask();

    textInput.value = "";
    dateInput.value = "";
    timeInput.value = "";
});

// to show popup
function showPop(){
    popup.classList.add("active-pop");
}
// timeout for popup
function timeOut(){
    setTimeout(() => {
        popup.classList.remove("active-pop");
    }, 3000);
}
// add new task
function showTodoTask() {
    todoTask.innerHTML = "";
    //builds elements dynamically
    tasks.forEach((todo, index) => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.innerHTML = `
        <p class = "todo-list">Task: ${todo.task}</p>
        <p class = "todo-list">Date: ${todo.date}, Time: ${todo.time}</p>
        `;
        const deleteBtn = document.createElement("delete")
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add("delete-todo");
        div.appendChild(deleteBtn);
        todoTask.appendChild(div);
    })
}

//delete selected todo task 
document.addEventListener("click", (event) => {
    if(event.target.classList.contains("delete-todo") && recentTaskBtn.classList.contains("recent-task-btn")){
        const item = event.target.closest(".item");
        const index = Array.from(todoTask.children).indexOf(item);

        tasks.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(tasks));
        showTodoTask();
        
    };
});

