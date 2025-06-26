/**
 * Self-care planner functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize self-care planner
  initSelfCare();
});

/**
 * Initialize self-care planner functionality
 */
function initSelfCare() {
  const activityForm = document.getElementById('activityForm');
  const activitiesContainer = document.getElementById('activitiesContainer');
  
  if (activityForm) {
    activityForm.addEventListener('submit', handleActivitySubmit);
  }
  
  if (activitiesContainer) {
    displayActivities();
  }
}

/**
 * Handle activity form submission
 * @param {Event} event - Form submit event
 */
function handleActivitySubmit(event) {
  event.preventDefault();
  
  const activityName = document.getElementById('activityName');
  const activityType = document.getElementById('activityType');
  const activityNotes = document.getElementById('activityNotes');
  
  const name = activityName.value.trim();
  const type = activityType.value;
  const notes = activityNotes.value.trim();
  
  if (!name) {
    alert('Please enter an activity name');
    return;
  }
  
  // Save activity to localStorage
  saveActivity(name, type, notes);
  
  // Clear form
  activityName.value = '';
  activityNotes.value = '';
  
  // Update display
  displayActivities();
  
  // Show success message
  showMessage('Self-care activity added successfully!');
}

/**
 * Save a self-care activity to localStorage
 * @param {string} name - Activity name
 * @param {string} type - Activity type
 * @param {string} notes - Activity notes
 */
function saveActivity(name, type, notes) {
  const activities = StorageUtil.get('self_care_activities', []);
  
  const newActivity = {
    id: Date.now(),
    name,
    type,
    notes,
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  activities.push(newActivity);
  StorageUtil.set('self_care_activities', activities);
  
  return newActivity;
}

/**
 * Toggle activity completion status
 * @param {number} id - Activity ID
 */
function toggleActivityCompletion(id) {
  const activities = StorageUtil.get('self_care_activities', []);
  const activityIndex = activities.findIndex(activity => activity.id === id);
  
  if (activityIndex !== -1) {
    activities[activityIndex].completed = !activities[activityIndex].completed;
    StorageUtil.set('self_care_activities', activities);
    displayActivities();
  }
}

/**
 * Delete a self-care activity
 * @param {number} id - Activity ID
 */
function deleteActivity(id) {
  const activities = StorageUtil.get('self_care_activities', []);
  const filteredActivities = activities.filter(activity => activity.id !== id);
  StorageUtil.set('self_care_activities', filteredActivities);
  displayActivities();
}

/**
 * Display self-care activities from localStorage
 */
function displayActivities() {
  const activitiesContainer = document.getElementById('activitiesContainer');
  const activities = StorageUtil.get('self_care_activities', []);
  
  if (!activitiesContainer) return;
  
  if (activities.length === 0) {
    activitiesContainer.innerHTML = '<p class="empty-state">Your self-care activities will appear here. Start by adding an activity above!</p>';
    return;
  }
  
  activitiesContainer.innerHTML = '';
  
  // Group activities by type
  const groupedActivities = {};
  activities.forEach(activity => {
    if (!groupedActivities[activity.type]) {
      groupedActivities[activity.type] = [];
    }
    groupedActivities[activity.type].push(activity);
  });
  
  // Display activities by type
  Object.keys(groupedActivities).forEach(type => {
    const typeElement = document.createElement('div');
    typeElement.className = 'activity-type-group';
    
    // Format type name
    const typeName = type.charAt(0).toUpperCase() + type.slice(1);
    
    typeElement.innerHTML = `<h3 class="activity-type-title">${typeName} Self-Care</h3>`;
    
    const typeActivities = document.createElement('div');
    typeActivities.className = 'activity-list';
    
    groupedActivities[type].forEach(activity => {
      const activityElement = document.createElement('div');
      activityElement.className = 'activity-item card';
      
      activityElement.innerHTML = `
        <div class="activity-header">
          <h4 class="${activity.completed ? 'completed' : ''}">${activity.name}</h4>
        </div>
        ${activity.notes ? `<p class="activity-notes">${activity.notes}</p>` : ''}
      `;
      
      typeActivities.appendChild(activityElement);
    });
    
    typeElement.appendChild(typeActivities);
    activitiesContainer.appendChild(typeElement);
  });
  
  // Add event listeners to toggle and delete buttons
  document.querySelectorAll('.btn-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleActivityCompletion(Number(btn.dataset.id));
    });
  });
  
  document.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', () => {
      if (confirm('Are you sure you want to delete this activity?')) {
        deleteActivity(Number(btn.dataset.id));
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