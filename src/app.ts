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