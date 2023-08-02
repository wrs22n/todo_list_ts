interface ITodo {
    text: string;
    expDate: number;
    id: string;
}
  
export class TodoList {
    public addItemText: HTMLInputElement;
    public addItemBtn: HTMLButtonElement;
    public clearAll: HTMLButtonElement;
    public todos: ITodo[];

    private todoList: HTMLDivElement;

    constructor() {
        this.addItemText = document.querySelector(".task__add") as HTMLInputElement;
        this.addItemBtn = document.getElementById("btn") as HTMLButtonElement;
        this.todoList = document.querySelector(".todo") as HTMLDivElement;
        this.clearAll = document.querySelector(".clear") as HTMLButtonElement;
        this.todos = localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")!) : [];
    }

    public saveToLocalStorage() {
        localStorage.setItem("todoList", JSON.stringify(this.todos));
    }
    
    public renderTodoList() {
        this.todoList.innerHTML = "";
        
        this.todos.forEach((todo) => {
            if (!this.isExpired(todo.expDate)) {
                const text = todo.text;
                const id = todo.id;

                const todoItem = document.createElement("li");
                todoItem.classList.add('todo__item');
                todoItem.setAttribute("data-id", id);
    
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
    
                this.todoList.appendChild(todoItem);
                todoItem.appendChild(itemInput);
                todoItem.appendChild(itemDiv);
                itemDiv.appendChild(itemBtnEdit);
                itemDiv.appendChild(itemBtnDelete);
                itemBtnDelete.appendChild(itemImgDelete);
                itemBtnEdit.appendChild(itemImgEdit);
    
                this.editElement(itemBtnEdit, itemInput, itemImgEdit, todoItem);
                this.deleteElement(itemBtnDelete, todoItem);
            } 
        })

        this.todos.forEach((todo) => {
            if (this.isExpired(todo.expDate)) {
                let index = this.todos.indexOf(todo);
                this.todos.splice(index,1);
                this.saveToLocalStorage();
            }
        })
    }

    private editElement(button: HTMLButtonElement, input: HTMLInputElement, img: HTMLImageElement, li: HTMLLIElement) {
        let switchEditBtnValue = 0;
        const todo = this.todos.find((item) => item.id === li.getAttribute("data-id"));
        
        if (todo) {
          const index = this.todos.indexOf(todo);
          button.addEventListener("click", (e) => {
            e.preventDefault();
            if (switchEditBtnValue === 0) {
              input.removeAttribute("readonly");
              switchEditBtnValue = 1;
              img.src = "../img/check.png";
              input.focus();
            } else if (switchEditBtnValue === 1) {
              input.setAttribute("readonly", "readonly");
              switchEditBtnValue = 0;
              img.src = "../img/edit.png";
            }
            if (input.value.trim() === "") {
                this.todos.splice(index,1);
                this.saveToLocalStorage();
                this.renderTodoList();
                return;
            } 
            this.todos[index].text = input.value;
            this.saveToLocalStorage();
          });
        }
    }
    
    private deleteElement(button: HTMLButtonElement, li: HTMLLIElement) {
        button.addEventListener("click", (e) => {
            this.todos.forEach((task) => {
                if (task.id === li.getAttribute("data-id")) {
                    let index = this.todos.indexOf(task);
                    this.todos.splice(index,1);
                    this.saveToLocalStorage();
                    this.renderTodoList();
                }
            })
        })
    }

    private isExpired(expDate: number): boolean {
        const expirationPeriod = 6 * 60 * 60 * 1000;
        const currentTime = Date.now();
        return currentTime - expDate > expirationPeriod;
    }
}

