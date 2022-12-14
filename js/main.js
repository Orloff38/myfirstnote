
const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const tasksList = document.querySelector('#tasksList')
const emptyList = document.querySelector('#emptyList')

let tasks= [];
if(localStorage.getItem('tasks')){
   tasks =  JSON.parse(localStorage.getItem('tasks'))
}

tasks.forEach(function(task){
    const cssClass = task.done ? "task-title task-title--done" : "task-title"

    const taskHTML = `
    <li id="${task.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${task.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    
tasksList.insertAdjacentHTML ('beforeend', taskHTML);
})

checkEmptyList()

form.addEventListener('submit', addTask)

function addTask(e){
    e.preventDefault();
    const taskText = taskInput.value;
    const newTask = {
        id: Date.now(),
        text: taskText,
        done: false,
    };

    tasks.push(newTask)

    const cssClass = newTask.done ? "task-title task-title--done" : "task-title"

    const taskHTML = `
    <li id="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
					<span class="${cssClass}">${newTask.text}</span>
					<div class="task-item__buttons">
						<button type="button" data-action="done" class="btn-action">
							<img src="./img/tick.svg" alt="Done" width="18" height="18">
						</button>
						<button type="button" data-action="delete" class="btn-action">
							<img src="./img/cross.svg" alt="Done" width="18" height="18">
						</button>
					</div>
				</li>`;

    
tasksList.insertAdjacentHTML ('beforeend', taskHTML);
taskInput.value = '';
taskInput.focus();
checkEmptyList()
saveToLocalStorage()

}



tasksList.addEventListener('click', deleteTask)

function deleteTask(e){
if(e.target.dataset.action === 'delete'){
    console.log('delete')
    const parentNode = e.target.closest('.list-group-item')

    //опред id задачи
    const id = Number(parentNode.id)
    const index = tasks.findIndex((task)=>task.id ===id)

    tasks.splice(index, 1)
    parentNode.remove()
    checkEmptyList()
    saveToLocalStorage()
}}

tasksList.addEventListener('click', doneTask)

function doneTask (e){
    if(e.target.dataset.action === "done"){

        const parentNode = e.target.closest('.list-group-item')
        const id = parentNode.id
        const task = tasks.find(function(task){
           if (task.id == id){
            return true
           }
        })
        task.done = !task.done
        const taskTitle = parentNode.querySelector('.task-title')
        taskTitle.classList.toggle('task-title--done')
        console.log(taskTitle)
        saveToLocalStorage()
    }}

function checkEmptyList(){
    if(tasks.length == 0){
        const emptyListElement = `
        <li id="emptyList" class="list-group-item empty-list">
					<img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
					<div class="empty-list__title">Список дел пуст</div>
				</li>`;

        tasksList.insertAdjacentHTML('afterbegin', emptyListElement)
    }
if (tasks.length >0){
    const emptyListEl = document.querySelector('#emptyList')
    emptyListEl ? emptyListEl.remove() : null
}

    console.log(tasks.length)
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}