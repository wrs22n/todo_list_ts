"use strict";
const addItemText = document.querySelector(".task__add");
const addItemBtn = document.getElementById("btn");
const todoList = document.querySelector(".todo");
const clearAll = document.querySelector(".clear");
let todos = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : [];
function saveToLocalStorage() {
    localStorage.setItem("todoList", JSON.stringify(todos));
}
function renderTodoList() {
    todoList.innerHTML = "";
    todos.forEach((text) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add('todo__item');
        const itemInput = document.createElement("input");
        itemInput.classList.add('todo__text');
        itemInput.value = text;
        itemInput.setAttribute("readonly", "readonly");
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
    });
}
renderTodoList();
addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (addItemText.value === '') {
        return;
    }
    ;
    todos.push(addItemText.value);
    saveToLocalStorage();
    renderTodoList();
    addItemText.value = "";
});
function editElement(button, input) {
    let switchEditBtnValue = 0;
    let index = todos.indexOf(input.value);
    button.addEventListener("click", (e) => {
        e.preventDefault();
        if (switchEditBtnValue === 0) {
            input.removeAttribute("readonly");
            switchEditBtnValue = 1;
        }
        else if (switchEditBtnValue === 1) {
            input.setAttribute("readonly", "readonly");
            switchEditBtnValue = 0;
        }
        console.log(input.value);
        todos[index] = input.value;
        saveToLocalStorage();
    });
}
function deleteElement(button, li) {
    button.addEventListener("click", (e) => {
        todos.forEach((task) => {
            if (task === li.querySelector("input").value) {
                let index = todos.indexOf(li.querySelector("input").value);
                todos.splice(index, 1);
                saveToLocalStorage();
                renderTodoList();
            }
        });
    });
}
clearAll.addEventListener("click", (e) => {
    e.preventDefault();
    todos = [];
    saveToLocalStorage();
    renderTodoList();
});
