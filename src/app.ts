import { TodoList } from './todo.js';

const todoList = new TodoList();

todoList.renderTodoList();

todoList.addItemBtn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    
    if (todoList.addItemText.value === '') {return};

    const newTodo = {
        text: todoList.addItemText.value,
        expDate: Date.now(),
    };

    todoList.todos.push(newTodo);
    todoList.saveToLocalStorage();
    todoList.renderTodoList();

    todoList.addItemText.value = "";
});

todoList.clearAll.addEventListener("click", (e) => {
    e.preventDefault();
    todoList.todos = []; 
    todoList.saveToLocalStorage();
    todoList.renderTodoList();
})

/*

const addItemText = document.querySelector(".task__add") as HTMLInputElement;
const addItemBtn = document.getElementById("btn") as HTMLButtonElement;
const todoList = document.querySelector(".todo") as HTMLDivElement;
const clearAll = document.querySelector(".clear") as HTMLButtonElement;

interface ITodo {
    text: string,
    expDate: number
}

let todos: ITodo[] = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")!) : [];

function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todos));
}

function isExpired(expDate: number): boolean {
    const expirationPeriod = 0.015 * 60 * 60 * 1000;
    const currentTime = Date.now();
    return currentTime - expDate > expirationPeriod;
}

function renderTodoList() {
    todoList.innerHTML = "";
    
    todos.forEach((todo) => {
        if (!isExpired(todo.expDate)) {
            const text = todo.text;
            const todoItem = document.createElement("li");
            todoItem.classList.add('todo__item');

            const itemInput = document.createElement("input");
            itemInput.classList.add('todo__text');
            itemInput.value = text;
            itemInput.setAttribute("readonly","readonly");

            const itemDiv = document.createElement("div");

            const itemBtnEdit = document.createElement("button");
            itemBtnEdit.classList.add('edit');

            const itemImgEdit = document.createElement("img");
            itemImgEdit.src = '../img/edit.png';

            const itemBtnDelete = document.createElement("button");
            itemBtnDelete.classList.add('edit');

            const itemImgDelete = document.createElement("img");
            itemImgDelete.src = '../img/trash-bin.png';

            todoList.appendChild(todoItem);
            todoItem.appendChild(itemInput);
            todoItem.appendChild(itemDiv);
            itemDiv.appendChild(itemBtnEdit);
            itemDiv.appendChild(itemBtnDelete);
            itemBtnDelete.appendChild(itemImgDelete);
            itemBtnEdit.appendChild(itemImgEdit);

            editElement(itemBtnEdit, itemInput);
            deleteElement(itemBtnDelete, todoItem);
        } else {
            todos = []; 
            localStorage.setItem("todoList", JSON.stringify(todos));
        }
    })
}

renderTodoList();

addItemBtn.addEventListener("click", (e: Event) => {
    e.preventDefault();
    
    if (addItemText.value === '') {return};

    const newTodo = {
        text: addItemText.value,
        expDate: Date.now(),
    };

    todos.push(newTodo);
    saveToLocalStorage();
    renderTodoList();

    addItemText.value = "";
});

function editElement(button: HTMLButtonElement, input: HTMLInputElement) {
    let switchEditBtnValue = 0;
    const todo = todos.find((item) => item.text === input.value);
  
    if (todo) {
      const index = todos.indexOf(todo);
      button.addEventListener("click", (e) => {
        e.preventDefault();
        if (switchEditBtnValue === 0) {
          input.removeAttribute("readonly");
          switchEditBtnValue = 1;
        } else if (switchEditBtnValue === 1) {
          input.setAttribute("readonly", "readonly");
          switchEditBtnValue = 0;
        }
        todos[index].text = input.value;
        saveToLocalStorage();
      });
    }
}

function deleteElement(button: HTMLButtonElement, li: HTMLLIElement) {
    button.addEventListener("click", (e) => {
        todos.forEach((task) => {
            if (task.text === li.querySelector("input")!.value) {
                let index = todos.indexOf(task);
                todos.splice(index,1);
                saveToLocalStorage();
                renderTodoList();
            }
        })
    })
}

clearAll.addEventListener("click", (e) => {
    e.preventDefault();
    todos = []; 
    saveToLocalStorage();
    renderTodoList();
})
*/