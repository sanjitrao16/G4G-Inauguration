import { ref, set, get, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

// Function to increment the progress count
export const incrementProgress = async (amount: number = 1): Promise<void> => {
  try {
    const progressRef = ref(database, 'progress');
    const snapshot = await get(progressRef);
    const currentValue = snapshot.val() || 0;
    const newValue = currentValue + amount;
    
    await set(progressRef, newValue);
    console.log(`Progress incremented to: ${newValue}`);
  } catch (error) {
    console.error('Error incrementing progress:', error);
  }
};

// Function to set progress to a specific value
export const setProgress = async (value: number): Promise<void> => {
  try {
    const progressRef = ref(database, 'progress');
    await set(progressRef, value);
    console.log(`Progress set to: ${value}`);
  } catch (error) {
    console.error('Error setting progress:', error);
  }
};

// Function to reset progress to 0
export const resetProgress = async (): Promise<void> => {
  try {
    const progressRef = ref(database, 'progress');
    await set(progressRef, 0);
    console.log('Progress reset to 0');
  } catch (error) {
    console.error('Error resetting progress:', error);
  }
};

// Function to get current progress value
export const getCurrentProgress = async (): Promise<number> => {
  try {
    const progressRef = ref(database, 'progress');
    const snapshot = await get(progressRef);
    return snapshot.val() || 0;
  } catch (error) {
    console.error('Error getting current progress:', error);
    return 0;
  }
};

// Function to listen to progress changes
export const listenToProgress = (callback: (value: number) => void): (() => void) => {
  const progressRef = ref(database, 'progress');
  
  const unsubscribe = onValue(progressRef, (snapshot) => {
    const value = snapshot.val() || 0;
    callback(value);
  }, (error) => {
    console.error('Error listening to progress:', error);
  });

  // Return cleanup function
  return () => off(progressRef, 'value', unsubscribe);
};