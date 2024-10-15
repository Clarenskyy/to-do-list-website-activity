 // Task object constructor
 function Task(name) {
    this.name = name;
    this.dateAdded = new Date().toLocaleString();
}

// Task Manager object
const taskManager = {
    tasks: [],

    // Add a new task
    addTask(taskName) {
        const newTask = new Task(taskName);
        this.tasks.push(newTask);
        this.displayTasks();
    },

    // Delete a task
    deleteTask(index) {
        this.tasks.splice(index, 1);
        this.displayTasks();
    },

    // Edit a task
    editTask(index, newTaskName) {
        this.tasks[index].name = newTaskName;
        this.displayTasks();
    },

    // Display tasks
    displayTasks() {
        const taskList = document.getElementById('displayToDoList');
        taskList.innerHTML = '';

        this.tasks.forEach((task, index) => {
            const listItem = document.createElement('p');
            listItem.innerHTML = `
            <div class="task-display">
                <div  style="width: 30px;">
                    <label>
                        <input type="checkbox">
                        <span class="custom-checkbox"></span>
                    </label>
                </div>
                <div> 
                    <p style="
                    display: inline;
                    flex: 1;
                    ">
                    <span id="taskName-${index}">${task.name}</span>
                    <span class="subtext-for-task">
                    </span>
                </div>
                <div style="flex: 1;">
                    <span class="subtext-for-task">
                         Added on: ${task.dateAdded} 
                    </span> 
                </div>
                <div class="delete-button-div">
                    <button onclick="startEdit(${index})" class="edit-button">Edit</button>
                </div>
                <div class="delete-button-div">
                    <button onclick="deleteTask(${index})" class="delete-button">
                    Delete
                </button>
                </div>
            </div>
            `;
            taskList.appendChild(listItem);
        });
    }
};

// Function to handle adding a task
function addTask() {
    const taskInput = document.getElementById('userInputToDo');
    const taskName = taskInput.value;
    if (taskName.trim()) {
        taskManager.addTask(taskName);
        taskInput.value = ''; // Clear input field after adding
    } else {
        alert("Please enter a valid task.");
    }
}

// Function to delete a task
function deleteTask(index) {
    taskManager.deleteTask(index);
}

 // Function to start editing a task
 function startEdit(index) {
    const taskNameElement = document.getElementById(`taskName-${index}`);
    const currentTaskName = taskNameElement.innerText;
    
    // Create an input element for editing
    taskNameElement.innerHTML = `<input type="text" id="editInput-${index}" value="${currentTaskName}">
    <button onclick="saveEdit(${index})">Save</button>`;
}

// Function to save the edited task
function saveEdit(index) {
    const editInput = document.getElementById(`editInput-${index}`);
    const newTaskName = editInput.value.trim();

    if (newTaskName) {
        taskManager.editTask(index, newTaskName);
    } else {
        alert("Task name cannot be empty.");
    }
}
