/**
 * Anxiety check functionality
 */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize anxiety check
  initAnxietyCheck();
});

/**
 * Initialize anxiety check functionality
 */
function initAnxietyCheck() {
  const anxietySlider = document.getElementById('anxietyLevel');
  const startBreathingBtn = document.getElementById('startBreathingBtn');
  const stopBreathingBtn = document.getElementById('stopBreathingBtn');
  const breathingModal = document.getElementById('breathingExercise');
  const breathingCircle = document.querySelector('.breathing-circle');
  const breathingInstruction = document.getElementById('breathingInstruction');
  
  let breathingInterval;
  
  // Start guided breathing
  if (startBreathingBtn) {
    startBreathingBtn.addEventListener('click', () => {
      if (anxietySlider) {
        // Save anxiety level
        const level = anxietySlider.value;
        StorageUtil.saveAnxietyEntry(level);
      }
      
      // Show breathing modal
      if (breathingModal) {
        breathingModal.style.display = 'flex';
        startBreathingExercise();
      }
    });
  }
  
  // Stop guided breathing
  if (stopBreathingBtn) {
    stopBreathingBtn.addEventListener('click', () => {
      if (breathingInterval) {
        clearInterval(breathingInterval);
      }
      
      if (breathingModal) {
        breathingModal.style.display = 'none';
      }
    });
  }
  
  /**
   * Start the breathing exercise animation
   */
  function startBreathingExercise() {
    if (!breathingCircle || !breathingInstruction) return;
    
    let phase = 0;
    const phases = [
      { name: 'in', duration: 4000, text: 'Breathe in...' },
      { name: 'hold', duration: 7000, text: 'Hold...' },
      { name: 'out', duration: 8000, text: 'Breathe out...' }
    ];
    
    // Initial state
    breathingCircle.className = 'breathing-circle';
    breathingInstruction.textContent = phases[0].text;
    
    // Start first phase
    breathingCircle.classList.add(`breath-${phases[0].name}`);
    
    // Set up interval for phases
    breathingInterval = setInterval(() => {
      // Remove all animation classes
      breathingCircle.className = 'breathing-circle';
      
      // Move to next phase
      phase = (phase + 1) % phases.length;
      
      // Update instruction text
      breathingInstruction.textContent = phases[phase].text;
      
      // Add appropriate animation class
      setTimeout(() => {
        breathingCircle.classList.add(`breath-${phases[phase].name}`);
      }, 50);
      
    }, phases[phase].duration);
  }
}