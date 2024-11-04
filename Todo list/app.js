document.addEventListener('DOMContentLoaded', () => {
    let todoInput = document.getElementById('todo-input');
    let addTaskButton = document.getElementById('add-task-button')
    let todoList = document.getElementById('todo-list')

    addTaskButton.addEventListener('click', addTasks)
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    tasks.forEach((task) => renderTask(task));
    // addTaskButton.addEventListener('click', ()=>{
    //     let taskText = todoInput.value.trim();
    //     if(taskText === "") return;
    //     const newTask = {
    //         id: Date.now(),
    //         task: taskText,
    //         complete: false
    //     }
    //     tasks.push(newTask);
    //     todoInput.value = ""; //clear input value
    //     console.log(tasks)

    // })

    function addTasks() {
        let taskText = todoInput.value.trim();
        if (taskText === "") return;
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newTask);
        saveTask();
        console.log(newTask)
        renderTask(newTask)
        todoInput.value = ""; //clear input
    }

    function renderTask(task) {     //for showing taskin app
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add("completed")
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;

        //togle task completion

        li.addEventListener('click', (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.completed = !task.completed
            li.classList.toggle("completed")
            saveTask();
        })

        //delete task from array
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTask();

        })
        todoList.appendChild(li)
    }
    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
})
