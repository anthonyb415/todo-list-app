const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');

addTaskForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from refreshing the page

  const newTaskText = newTaskInput.value.trim();
  if (newTaskText!== '') {
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = newTaskText;
    taskList.appendChild(newTaskItem);
    newTaskInput.value = ''; // Clear the input field
  }
});