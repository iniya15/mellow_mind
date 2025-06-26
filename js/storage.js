/**
 * Storage utility for managing data in localStorage
 */
class StorageUtil {
  /**
   * Gets an item from localStorage and parses it
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if key doesn't exist
   * @returns {any} The parsed value or defaultValue
   */
  static get(key, defaultValue = null) {
    const item = localStorage.getItem(key);
    if (item === null) return defaultValue;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error parsing localStorage item ${key}:`, e);
      return defaultValue;
    }
  }
  
  /**
   * Sets an item in localStorage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error(`Error setting localStorage item ${key}:`, e);
    }
  }
  
  /**
   * Removes an item from localStorage
   * @param {string} key - Storage key
   */
  static remove(key) {
    localStorage.removeItem(key);
  }
  
  /**
   * Clears all items in localStorage
   */
  static clear() {
    localStorage.clear();
  }
  
  /**
   * Gets all journal entries
   * @returns {Array} Array of journal entries
   */
  static getJournalEntries() {
    return this.get('journal_entries', []);
  }
  
  /**
   * Saves a journal entry
   * @param {string} content - Journal entry content
   */
  static saveJournalEntry(content) {
    const entries = this.getJournalEntries();
    const newEntry = {
      id: Date.now(),
      content,
      date: new Date().toISOString()
    };
    entries.unshift(newEntry);
    this.set('journal_entries', entries);
    return newEntry;
  }
  
  /**
   * Gets all mood entries
   * @returns {Array} Array of mood entries
   */
  static getMoodEntries() {
    return this.get('mood_entries', []);
  }
  
  /**
   * Saves a mood entry
   * @param {string} mood - Mood value
   */
  static saveMoodEntry(mood) {
    const entries = this.getMoodEntries();
    const newEntry = {
      id: Date.now(),
      mood,
      date: new Date().toISOString()
    };
    entries.unshift(newEntry);
    this.set('mood_entries', entries);
    return newEntry;
  }
  
  /**
   * Gets all anxiety check entries
   * @returns {Array} Array of anxiety check entries
   */
  static getAnxietyEntries() {
    return this.get('anxiety_entries', []);
  }
  
  /**
   * Saves an anxiety check entry
   * @param {number} level - Anxiety level (1-10)
   */
  static saveAnxietyEntry(level) {
    const entries = this.getAnxietyEntries();
    const newEntry = {
      id: Date.now(),
      level,
      date: new Date().toISOString()
    };
    entries.unshift(newEntry);
    this.set('anxiety_entries', entries);
    return newEntry;
  }
}

// Make StorageUtil globally available
window.StorageUtil = StorageUtil;