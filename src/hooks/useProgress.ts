import { useState, useEffect } from 'react';
import { ref, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

export const useProgress = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    const progressRef = ref(database, 'progress');
    
    const unsubscribe = onValue(progressRef, (snapshot) => {
      const value = snapshot.val();
      if (typeof value === 'number') {
        setCount(value);
        // Convert Firebase value to percentage (500 = 100%)
        const percentage = Math.min(100, Math.max(0, (value / 500) * 100));
        setProgress(percentage);
      } else {
        // Demo fallback: simulate progress
        simulateProgress();
      }
      setIsLoading(false);
    }, (error) => {
      console.warn('Firebase connection failed, using demo mode:', error);
      simulateProgress();
      setIsLoading(false);
    });

    return () => off(progressRef, 'value', unsubscribe);
  }, []);

  const simulateProgress = () => {
    let currentCount = 0;
    const interval = setInterval(() => {
      currentCount += Math.floor(Math.random() * 50) + 10;
      if (currentCount >= 500) {
        currentCount = 500;
        clearInterval(interval);
      }
      setCount(currentCount);
      const percentage = (currentCount / 500) * 100;
      setProgress(percentage);
    }, 800);
  };

  return { progress, isLoading, count };
};