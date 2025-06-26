/**
 * Goals functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize goals
  initGoals();
});

/**
 * Initialize goals functionality
 */
function initGoals() {
  const goalForm = document.getElementById('goalForm');
  const goalsContainer = document.getElementById('goalsContainer');
  
  if (goalForm) {
    goalForm.addEventListener('submit', handleGoalSubmit);
  }
  
  if (goalsContainer) {
    displayGoals();
  }
}

/**
 * Handle goal form submission
 * @param {Event} event - Form submit event
 */
function handleGoalSubmit(event) {
  event.preventDefault();
  
  const goalTitle = document.getElementById('goalTitle');
  const goalDescription = document.getElementById('goalDescription');
  const goalDeadline = document.getElementById('goalDeadline');
  
  const title = goalTitle.value.trim();
  const description = goalDescription.value.trim();
  const deadline = goalDeadline.value;
  
  if (!title) {
    alert('Please enter a goal title');
    return;
  }
  
  // Save goal to localStorage
  saveGoal(title, description, deadline);
  
  // Clear form
  goalTitle.value = '';
  goalDescription.value = '';
  goalDeadline.value = '';
  
  // Update display
  displayGoals();
  
  // Show success message
  showMessage('Goal added successfully!');
}

/**
 * Save a goal to localStorage
 * @param {string} title - Goal title
 * @param {string} description - Goal description
 * @param {string} deadline - Goal deadline date
 */
function saveGoal(title, description, deadline) {
  const goals = StorageUtil.get('goals', []);
  
  const newGoal = {
    id: Date.now(),
    title,
    description,
    deadline,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  goals.push(newGoal);
  StorageUtil.set('goals', goals);
  
  return newGoal;
}

/**
 * Toggle goal completion status
 * @param {number} id - Goal ID
 */
function toggleGoalCompletion(id) {
  const goals = StorageUtil.get('goals', []);
  const goalIndex = goals.findIndex(goal => goal.id === id);
  
  if (goalIndex !== -1) {
    goals[goalIndex].completed = !goals[goalIndex].completed;
    StorageUtil.set('goals', goals);
    displayGoals();
  }
}

/**
 * Delete a goal
 * @param {number} id - Goal ID
 */
function deleteGoal(id) {
  const goals = StorageUtil.get('goals', []);
  const filteredGoals = goals.filter(goal => goal.id !== id);
  StorageUtil.set('goals', filteredGoals);
  displayGoals();
}

/**
 * Display goals from localStorage
 */
function displayGoals() {
  const goalsContainer = document.getElementById('goalsContainer');
  const goals = StorageUtil.get('goals', []);
  
  if (!goalsContainer) return;
  
  if (goals.length === 0) {
    goalsContainer.innerHTML = '<p class="empty-state">Your goals will appear here. Start by adding a goal above!</p>';
    return;
  }
  
  goalsContainer.innerHTML = '';
  
  goals.forEach(goal => {
    const goalElement = document.createElement('div');
    goalElement.className = 'goal-item card';
    
    const deadlineText = goal.deadline 
      ? `Target date: ${new Date(goal.deadline).toLocaleDateString()}` 
      : 'No target date';
    
    goalElement.innerHTML = `
      <div class="goal-header">
        <h3 class="${goal.completed ? 'completed' : ''}">${goal.title}</h3>
      </div>
      <p class="goal-description">${goal.description}</p>
      <p class="goal-deadline">${deadlineText}</p>
    `;
    
    goalsContainer.appendChild(goalElement);
  });
  
  // Add event listeners to toggle and delete buttons
  document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleGoalCompletion(Number(btn.dataset.id));
    });
  });
  
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this goal?')) {
        deleteGoal(Number(btn.dataset.id));
      }
    });
  });
}

/**
 * Show a temporary message
 * @param {string} message - Message to display
 */
function showMessage(message) {
  const messageElement = createElement('div', ['message', 'success'], message);
  document.body.appendChild(messageElement);
  
  setTimeout(() => {
    messageElement.classList.add('fade-out');
    setTimeout(() => {
      document.body.removeChild(messageElement);
    }, 500);
  }, 3000);
}