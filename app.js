const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    const newTaskText = newTaskInput.value.trim();
    if (newTaskText!== '') {
        const newTaskItem = document.createElement('li');
        newTaskItem.textContent = newTaskText;

        // Add Edit and Delete buttons
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', () => {
            // Edit task logic (we'll implement this later)
        });
        newTaskItem.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            taskList.removeChild(newTaskItem);
        });
        newTaskItem.appendChild(deleteButton);

        taskList.appendChild(newTaskItem);
        newTaskInput.value = ''; // Clear the input field
    }
});