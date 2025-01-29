const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newTaskText = newTaskInput.value.trim();
  if (newTaskText!== '') {
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = newTaskText;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    newTaskItem.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(newTaskItem);
    });
    newTaskItem.appendChild(deleteButton);

    taskList.appendChild(newTaskItem);
    newTaskInput.value = '';
  }
});

// Edit button event listener (outside the form's listener)
taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Edit') {
    const taskItem = event.target.parentNode;
    const currentTaskText = taskItem.textContent;
    const newTaskText = prompt('Edit task:', currentTaskText);
    if (newTaskText!== null) {
      taskItem.textContent = newTaskText;
    }
  }
});