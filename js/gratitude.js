/**
 * Gratitude journal functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize gratitude journal
  initGratitude();
});

/**
 * Initialize gratitude journal functionality
 */
function initGratitude() {
  const gratitudeForm = document.getElementById('gratitudeForm');
  const gratitudeContainer = document.getElementById('gratitudeContainer');
  
  if (gratitudeForm) {
    gratitudeForm.addEventListener('submit', handleGratitudeSubmit);
  }
  
  if (gratitudeContainer) {
    displayGratitudeEntries();
  }
}

/**
 * Handle gratitude form submission
 * @param {Event} event - Form submit event
 */
function handleGratitudeSubmit(event) {
  event.preventDefault();
  
  const gratitudeEntry = document.getElementById('gratitudeEntry');
  const content = gratitudeEntry.value.trim();
  
  if (!content) {
    alert('Please enter what you are grateful for today');
    return;
  }
  
  // Save entry to localStorage
  saveGratitudeEntry(content);
  
  // Clear form
  gratitudeEntry.value = '';
  
  // Update display
  displayGratitudeEntries();
  
  // Show success message
  showMessage('Gratitude entry saved successfully!');
}

/**
 * Save a gratitude entry to localStorage
 * @param {string} content - Gratitude entry content
 */
function saveGratitudeEntry(content) {
  const entries = StorageUtil.get('gratitude_entries', []);
  
  const newEntry = {
    id: Date.now(),
    content,
    date: new Date().toISOString()
  };
  
  entries.unshift(newEntry);
  StorageUtil.set('gratitude_entries', entries);
  
  return newEntry;
}

/**
 * Display gratitude entries from localStorage
 */
function displayGratitudeEntries() {
  const gratitudeContainer = document.getElementById('gratitudeContainer');
  const entries = StorageUtil.get('gratitude_entries', []);
  
  if (!gratitudeContainer) return;
  
  if (entries.length === 0) {
    gratitudeContainer.innerHTML = '<p class="empty-state">Your gratitude entries will appear here. Start practicing gratitude today!</p>';
    return;
  }
  
  gratitudeContainer.innerHTML = '';
  
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.className = 'gratitude-entry card';
    
    entryElement.innerHTML = `
      <div class="date">${formatDate(entry.date)}</div>
      <div class="content">${entry.content.replace(/\n/g, '<br>')}</div>
    `;
    
    gratitudeContainer.appendChild(entryElement);
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