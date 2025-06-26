/**
 * Mood tracking functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize mood tracker
  initMoodTracker();
});

/**
 * Initialize mood tracker functionality
 */
function initMoodTracker() {
  const moodOptions = document.querySelectorAll('.mood-option');
  const logMoodBtn = document.getElementById('logMoodBtn');
  
  let selectedMood = null;
  
  // Add click event to mood options
  moodOptions.forEach(option => {
    option.addEventListener('click', () => {
      // Remove selected class from all options
      moodOptions.forEach(opt => opt.classList.remove('selected'));
      
      // Add selected class to clicked option
      option.classList.add('selected');
      
      // Store selected mood
      selectedMood = option.dataset.mood;
    });
  });
  
  // Add click event to log mood button
  if (logMoodBtn) {
    logMoodBtn.addEventListener('click', () => {
      if (!selectedMood) {
        alert('Please select a mood first');
        return;
      }
      
      // Save mood to localStorage
      saveMoodEntry(selectedMood);
      
      // Update mood calendar
      displayMoodCalendar();
      
      // Reset selection
      moodOptions.forEach(opt => opt.classList.remove('selected'));
      selectedMood = null;
      
      // Show success message
      showMessage('Mood logged successfully!');
    });
  }
  
  // Display mood calendar
  displayMoodCalendar();
}

/**
 * Save a mood entry to localStorage
 * @param {string} mood - Mood value
 */
function saveMoodEntry(mood) {
  const entries = StorageUtil.get('mood_entries', []);
  
  const newEntry = {
    id: Date.now(),
    mood,
    date: new Date().toISOString()
  };
  
  entries.unshift(newEntry);
  StorageUtil.set('mood_entries', entries);
  
  return newEntry;
}

/**
 * Display mood calendar from localStorage
 */
function displayMoodCalendar() {
  const calendarContainer = document.getElementById('moodCalendar');
  const entries = StorageUtil.get('mood_entries', []);
  
  if (!calendarContainer) return;
  
  if (entries.length === 0) {
    calendarContainer.innerHTML = '<p class="empty-state">Start tracking your mood to see patterns over time</p>';
    return;
  }
  
  calendarContainer.innerHTML = '';
  
  // Create a mood history list
  const historyList = document.createElement('ul');
  historyList.className = 'mood-history-list';
  
  entries.slice(0, 10).forEach(entry => {
    const item = document.createElement('li');
    
    // Emoji based on mood
    let emoji = '😐';
    switch(entry.mood) {
      case 'sad': emoji = '😔'; break;
      case 'meh': emoji = '😐'; break;
      case 'okay': emoji = '🙂'; break;
      case 'good': emoji = '😊'; break;
      case 'great': emoji = '😁'; break;
    }
    
    item.innerHTML = `
      <span class="mood-emoji">${emoji}</span>
      <span class="mood-date">${formatDate(entry.date)}</span>
    `;
    
    historyList.appendChild(item);
  });
  
  calendarContainer.appendChild(historyList);
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