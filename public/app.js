
//Selectors
const logo = document.querySelectorAll('#logo path');
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todolist = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');
for(let i = 0; i < logo.length; i++) {
    console.log(`Letter ${i} is ${logo[i].getTotalLength()}`);
}
//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);

todolist.addEventListener('click', deleteCheck);
todolist.addEventListener('click', checkCheck);
filterOption.addEventListener('click', filterTodo);
/* filterOption.addEventListener('click', savecheckmark); */
//Functions
function keybind () {
    let pressed = new Set();
    let codes = ["Enter", "ShiftLeft"];
    todoInput.addEventListener('keydown', trigger);
    function trigger(e) {
        pressed.add(e.code);
        if (!pressed.has("Enter")) {
            return;
        }
        if (pressed.has("ShiftLeft")) {
            return;
        }
        pressed.clear();
        addTodo(e);
    }
    todoInput.addEventListener('keyup', e => {
        pressed.delete(e.code);
    });
}
keybind();
function addTodo(event){
    //prevent form from submitting
    event.preventDefault();
    //todo-div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //li
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //cache todo in localstorage
    saveLocalTodos(todoInput.value);
    //checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //del button
    const delButton = document.createElement('button');
    delButton.innerHTML = '<i class= "fas fa-trash"></i>';
    delButton.classList.add("del-btn");
    todoDiv.appendChild(delButton);
    //append to list
    todolist.appendChild(todoDiv);
    //clear input value
    todoInput.value = '';
}
function checkCheck(e){
    const item = e.target;
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        savecheckmark(todo);
        todo.classList.toggle("completed");

    }
}
function deleteCheck(e){
    const item = e.target;
    //delete todo
    if(item.classList[0] === 'del-btn'){
        const todo = item.parentElement;
        ///annimationm
        todo.classList.add('fall');
        if(todo.classList.contains("completed")){
            removeLocalChecks(todo);
        }
        else {
            removeLocalTodos(todo);
        }
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });

    }

}
function filterTodo(e){
    const todos = todolist.childNodes;
    console.log(e.target);
/*     Need to fix!
    if(e.target.classList.contains("filter-todo")){
        document.querySelector(".select").setAttribute("style", "border-bottom-left-radius: 0px;");
    }
    else {
        document.querySelector(".select").setAttribute("style", "border-radius: 5px;");
    } */
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    //check for existing storage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));   
}
function getTodos(){
    //check for existing storage
    let todos;
    let checks;

    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    if(localStorage.getItem("checks") === null){
        checks = [];
    }
    else {
        checks = JSON.parse(localStorage.getItem("checks"));
    }
    todos.forEach(function(todo){
        //todo-div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //del button
        const delButton = document.createElement('button');
        delButton.innerHTML = '<i class= "fas fa-trash"></i>';
        delButton.classList.add("del-btn");
        todoDiv.appendChild(delButton);
        //append to list
        todolist.appendChild(todoDiv);
    });
    checks.forEach(function(check){
        //todo-div
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        todoDiv.classList.add("completed");
        //li
        const newTodo = document.createElement('li');
        newTodo.innerText = check;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //checkmark button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class= "fas fa-check"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //del button
        const delButton = document.createElement('button');
        delButton.innerHTML = '<i class= "fas fa-trash"></i>';
        delButton.classList.add("del-btn");
        todoDiv.appendChild(delButton);
        //append to list
        todolist.appendChild(todoDiv);
    });
   
}
function removeLocalTodos(todo){
    //check for existing storage
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
   const todoIndex = todo.children[0].innerText;
   todos.splice(todos.indexOf(todoIndex), 1);
   localStorage.setItem('todos', JSON.stringify(todos));
}
function savecheckmark(todo) {
    let checks;
    if(localStorage.getItem("checks") === null){
        checks = [];
    }
    else {
        checks = JSON.parse(localStorage.getItem("checks"));
    }
    itemIndex = todo.children[0].innerText;
    console.log(todo);
    checks.push(todo.children[0].innerText);
    removeLocalTodos(todo);
    localStorage.setItem('checks', JSON.stringify(checks));
}
function removeLocalChecks(todo){
    let checks;
    if(localStorage.getItem("checks") === null){
        checks = [];
    }
    else {
        checks = JSON.parse(localStorage.getItem("checks"));
    }
    const checkIndex = todo.children[0].innerText;
    checks.splice(checks.indexOf(checkIndex), 1);
    localStorage.setItem('checks', JSON.stringify(checks));
}