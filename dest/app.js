import { TodoList } from './todo.js';
const todoList = new TodoList();
todoList.renderTodoList();
todoList.addItemBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (todoList.addItemText.value.trim() === '') {
        return;
    }
    ;
    const newTodo = {
        text: todoList.addItemText.value,
        expDate: Date.now(),
        id: Date.now().toString(),
    };
    todoList.todos.push(newTodo);
    todoList.refreshList();
    todoList.addItemText.value = "";
});
todoList.clearAll.addEventListener("click", (e) => {
    e.preventDefault();
    todoList.todos = [];
    todoList.refreshList();
});
