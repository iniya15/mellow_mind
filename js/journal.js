/**
 * Journal functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize journal
  initJournal();
});

/**
 * Initialize journal functionality
 */
function initJournal() {
  const journalForm = document.getElementById('journalForm');
  const entriesContainer = document.getElementById('entriesContainer');
  
  if (journalForm) {
    journalForm.addEventListener('submit', handleJournalSubmit);
  }
  
  if (entriesContainer) {
    displayJournalEntries();
  }
}

/**
 * Handle journal form submission
 * @param {Event} event - Form submit event
 */
function handleJournalSubmit(event) {
  event.preventDefault();
  
  const journalEntry = document.getElementById('journalEntry');
  const content = journalEntry.value.trim();
  
  if (!content) {
    alert('Please enter something in your journal');
    return;
  }
  
  // Save entry to localStorage
  saveJournalEntry(content);
  
  // Clear form
  journalEntry.value = '';
  
  // Update display
  displayJournalEntries();
  
  // Show success message
  showMessage('Journal entry saved successfully!');
}

/**
 * Save a journal entry to localStorage
 * @param {string} content - Journal entry content
 */
function saveJournalEntry(content) {
  const entries = StorageUtil.get('journal_entries', []);
  
  const newEntry = {
    id: Date.now(),
    content,
    date: new Date().toISOString()
  };
  
  entries.unshift(newEntry);
  StorageUtil.set('journal_entries', entries);
  
  return newEntry;
}

/**
 * Display journal entries from localStorage
 */
function displayJournalEntries() {
  const entriesContainer = document.getElementById('entriesContainer');
  const entries = StorageUtil.get('journal_entries', []);
  
  if (!entriesContainer) return;
  
  if (entries.length === 0) {
    entriesContainer.innerHTML = '<p class="empty-state">Your journal entries will appear here. Start writing today!</p>';
    return;
  }
  
  entriesContainer.innerHTML = '';
  
  entries.forEach(entry => {
    const entryElement = document.createElement('div');
    entryElement.className = 'journal-entry';
    
    const dateElement = document.createElement('div');
    dateElement.className = 'date';
    dateElement.textContent = formatDate(entry.date);
    
    const contentElement = document.createElement('div');
    contentElement.className = 'content';
    contentElement.textContent = entry.content;
    
    entryElement.appendChild(dateElement);
    entryElement.appendChild(contentElement);
    
    entriesContainer.appendChild(entryElement);
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