const taskList = document.getElementById('task-list');
const addTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task-input');
const tasksCompletedSpan = document.getElementById('tasks-completed');
const currentStreakSpan = document.getElementById('current-streak');
const longestStreakSpan = document.getElementById('longest-streak');
const userCreationForm = document.getElementById('user-creation-form');

let tasksCompleted = 0;
let currentStreak = 0;
let longestStreak = 0;

// Load stats and streaks from localStorage
loadStatsAndStreaks();

// Load recurring tasks from localStorage
loadRecurringTasks();

function loadStatsAndStreaks() {
    const stats = JSON.parse(localStorage.getItem('stats')) || {};
    tasksCompleted = stats.tasksCompleted || 0;
    currentStreak = stats.currentStreak || 0;
    longestStreak = stats.longestStreak || 0;
    updateStatsDisplay();
  }

function saveStatsAndStreaks() {
    const stats = {
      tasksCompleted: tasksCompleted,
      currentStreak: currentStreak,
      longestStreak: longestStreak
    };
    localStorage.setItem('stats', JSON.stringify(stats));
  }

function updateStatsDisplay() {
    tasksCompletedSpan.textContent = tasksCompleted;
    currentStreakSpan.textContent = currentStreak;
    longestStreakSpan.textContent = longestStreak;
  }

function loadRecurringTasks() {
    const recurringTasks = JSON.parse(localStorage.getItem('recurringTasks')) || {};
    for (const taskText in recurringTasks) {
      const frequency = recurringTasks[taskText];
      addTask(taskText, frequency);
    }
  }

function addTask(taskText, frequency) {
    const newTaskItem = document.createElement('li');
    newTaskItem.textContent = taskText;
  
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
      const currentTaskText = newTaskItem.textContent;
      const newTaskText = prompt('Edit task:', currentTaskText);
      if (newTaskText!== null) {
        newTaskItem.textContent = newTaskText;
      }
    });
    newTaskItem.appendChild(editButton);
  
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(newTaskItem);
    });
    newTaskItem.appendChild(deleteButton);
  
    taskList.appendChild(newTaskItem);
  }

addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const newTaskText = newTaskInput.value.trim();
    const recurrenceFrequency = document.getElementById('recurrence-frequency').value;
  
    if (newTaskText!== '') {
        addTask(newTaskText, recurrenceFrequency);
        newTaskInput.value = '';
    }
});

userCreationForm.addEventListener('submit', (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Store user data in localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
  
    // Clear the form fields
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  
    // Optionally display a success message to the user
    alert('User created successfully!');
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