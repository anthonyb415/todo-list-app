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

  //... (previous code)...

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const newTaskText = newTaskInput.value.trim();
    const recurrenceFrequency = document.getElementById('recurrence-frequency').value;
  
    if (newTaskText!== '') {
      const newTaskItem = document.createElement('li');
      newTaskItem.textContent = newTaskText;
  
      //... (add Edit and Delete buttons as before)...
  
      taskList.appendChild(newTaskItem);
      newTaskInput.value = '';
  
      // Handle recurring tasks
      if (recurrenceFrequency!== 'none') {
        // Store the task data in local storage
        let recurringTasks = JSON.parse(localStorage.getItem('recurringTasks')) || {};
        recurringTasks[newTaskText] = recurrenceFrequency;
        localStorage.setItem('recurringTasks', JSON.stringify(recurringTasks));
      }
    }
  });
  
  // Function to reset tasks based on recurrence frequency
  function resetTasks() {
    const recurringTasks = JSON.parse(localStorage.getItem('recurringTasks')) || {};
    for (const taskText in recurringTasks) {
      const frequency = recurringTasks[taskText];
      // Check if it's time to reset the task (daily, weekly, or monthly)
      //... (Implementation for checking recurrence frequency)...
      if (/* condition for resetting task is met */) {
        const newTaskItem = document.createElement('li');
        newTaskItem.textContent = taskText;
        //... (add Edit and Delete buttons as before)...
        taskList.appendChild(newTaskItem);
      }
    }
  }
  
  // Call resetTasks() initially and then periodically (e.g., every day)
  resetTasks();
  // setInterval(resetTasks, 24 * 60 * 60 * 1000); // Every 24 hours
  
  //... (rest of the code)...

});