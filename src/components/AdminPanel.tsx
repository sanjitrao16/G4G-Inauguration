import React, { useState, useEffect } from 'react';
import { incrementProgress, setProgress, resetProgress, getCurrentProgress } from '../utils/firebaseHelpers';

const AdminPanel: React.FC = () => {
  const [currentCount, setCurrentCount] = useState<number>(0);
  const [customValue, setCustomValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    loadCurrentProgress();
  }, []);

  const loadCurrentProgress = async () => {
    const progress = await getCurrentProgress();
    setCurrentCount(progress);
  };

  const handleIncrement = async (amount: number) => {
    setIsLoading(true);
    await incrementProgress(amount);
    await loadCurrentProgress();
    setIsLoading(false);
  };

  const handleSetCustom = async () => {
    const value = parseInt(customValue);
    if (!isNaN(value) && value >= 0) {
      setIsLoading(true);
      await setProgress(value);
      await loadCurrentProgress();
      setCustomValue('');
      setIsLoading(false);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    await resetProgress();
    await loadCurrentProgress();
    setIsLoading(false);
  };

  const handleSetTo500 = async () => {
    setIsLoading(true);
    await setProgress(500);
    await loadCurrentProgress();
    setIsLoading(false);
  };

  // Hide the AdminPanel completely from display
  return null;

  // Original AdminPanel code kept for future use (commented out)
  /*
  return (
    <div className="fixed top-2 sm:top-4 right-2 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 z-50 min-w-[280px] sm:min-w-[300px] max-w-[320px] sm:max-w-[350px]">
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
        <Zap className="mr-2 text-emerald-500" size={window.innerWidth < 640 ? 18 : 20} />
        <span className="text-sm sm:text-base">Firebase Admin Panel</span>
      </h3>
      
      <div className="space-y-3 sm:space-y-4">
        <div className="bg-emerald-50 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Current Count</p>
          <p className="text-2xl sm:text-3xl font-bold text-emerald-600">{currentCount}</p>
          <p className="text-xs text-gray-500">
            {currentCount >= 500 ? '🚀 Launch Ready!' : `${500 - currentCount} to launch`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
          <button
            onClick={() => handleIncrement(1)}
            disabled={isLoading}
            className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <Plus size={window.innerWidth < 640 ? 14 : 16} className="mr-1" />
            +1
          </button>
          
          <button
            onClick={() => handleIncrement(10)}
            disabled={isLoading}
            className="flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <Plus size={window.innerWidth < 640 ? 14 : 16} className="mr-1" />
            +10
          </button>
          
          <button
            onClick={() => handleIncrement(50)}
            disabled={isLoading}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <Plus size={window.innerWidth < 640 ? 14 : 16} className="mr-1" />
            +50
          </button>
          
          <button
            onClick={() => handleIncrement(100)}
            disabled={isLoading}
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <Plus size={window.innerWidth < 640 ? 14 : 16} className="mr-1" />
            +100
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs sm:text-sm font-medium text-gray-700">Set Custom Value</label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={customValue}
              onChange={(e) => setCustomValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-md sm:rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
              min="0"
            />
            <button
              onClick={handleSetCustom}
              disabled={isLoading || !customValue}
              className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50"
            >
              <Target size={window.innerWidth < 640 ? 14 : 16} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <button
            onClick={handleSetTo500}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-yellow-500 hover:bg-yellow-600 text-white px-3 sm:px-4 py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <Target size={window.innerWidth < 640 ? 14 : 16} className="mr-2" />
            Set to 500 (Launch Ready)
          </button>
          
          <button
            onClick={handleReset}
            disabled={isLoading}
            className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <RotateCcw size={window.innerWidth < 640 ? 14 : 16} className="mr-2" />
            Reset to 0
          </button>
        </div>

        {isLoading && (
          <div className="text-center text-xs sm:text-sm text-gray-500">
            Updating Firebase...
          </div>
        )}
      </div>
    </div>
  );
  */
};

export default AdminPanel;