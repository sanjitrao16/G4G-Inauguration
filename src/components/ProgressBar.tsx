import React from 'react';

interface ProgressBarProps {
  progress: number;
  isLoading: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, isLoading }) => {
  return (
    <div className="w-full mb-6 sm:mb-8">
      <div className="flex justify-between items-center mb-3 sm:mb-4">
        <span className="text-xs sm:text-sm font-medium text-gray-700 animate-label-glow">Progress</span>
        <span className="text-xs sm:text-sm font-bold text-emerald-600 animate-percentage-bounce">
          {isLoading ? (
            <span className="animate-loading-dots">...</span>
          ) : (
            <span className="animate-number-count">{Math.round(progress)}%</span>
          )}
        </span>
      </div>
      
      {/* Main Progress Container - Responsive height */}
      <div className="relative w-full bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 rounded-xl sm:rounded-2xl h-4 sm:h-6 overflow-hidden shadow-inner border border-gray-200">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-bg-shimmer"></div>
        
        {/* Progress Track with Enhanced Design */}
        <div
          className="relative h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-xl sm:rounded-2xl transition-all duration-1000 ease-out overflow-hidden animate-progress-glow"
          style={{ width: `${progress}%` }}
        >
          {/* Multi-layer Shimmer Effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-50 animate-shimmer-fast"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200 to-transparent opacity-40 animate-shimmer-slow"></div>
          
          {/* Energy Pulse Waves */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-300 to-emerald-500 opacity-60 animate-energy-pulse"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-emerald-400 opacity-40 animate-energy-pulse-delayed"></div>
          
          {/* Particle Trail System - Responsive sizing */}
          <div className="absolute right-0 top-0 h-full w-8 sm:w-12 bg-gradient-to-l from-white via-emerald-200 to-transparent opacity-70 animate-particle-trail"></div>
          <div className="absolute right-1 sm:right-2 top-0.5 sm:top-1 h-2 sm:h-4 w-4 sm:w-8 bg-gradient-to-l from-yellow-300 to-transparent opacity-60 animate-particle-trail-fast rounded-full"></div>
          
          {/* Flowing Segments */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent opacity-30 animate-segment-flow"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20 animate-segment-flow-reverse"></div>
          
          {/* Pulsing Highlights - Responsive height */}
          <div className="absolute top-0 left-0 h-1 sm:h-2 w-full bg-gradient-to-r from-emerald-200 to-emerald-300 opacity-80 animate-highlight-pulse rounded-t-xl sm:rounded-t-2xl"></div>
          <div className="absolute bottom-0 left-0 h-0.5 sm:h-1 w-full bg-gradient-to-r from-emerald-600 to-emerald-700 opacity-60 animate-shadow-pulse rounded-b-xl sm:rounded-b-2xl"></div>
          
          {/* Dynamic Sparkles - Responsive count and positioning */}
          {progress > 10 && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(Math.floor(progress / 25))].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-yellow-300 rounded-full animate-sparkle opacity-80"
                  style={{
                    left: `${15 + (i * 20)}%`,
                    top: `${25 + (i % 2) * 50}%`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Completion Burst Effect */}
        {progress >= 100 && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-600 animate-completion-burst rounded-xl sm:rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-emerald-400 animate-completion-flash rounded-xl sm:rounded-2xl"></div>
            <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 sm:w-2 h-1 sm:h-2 bg-yellow-400 rounded-full animate-completion-sparkle"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.1}s`
                  }}
                />
              ))}
            </div>
          </>
        )}
        
        {/* Loading Wave Effect */}
        {isLoading && (
          <>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-200 to-transparent animate-loading-wave rounded-xl sm:rounded-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-emerald-300 to-transparent animate-loading-wave-slow rounded-xl sm:rounded-2xl"></div>
          </>
        )}
        
        {/* Progress Indicators - Responsive sizing */}
        <div className="absolute inset-0 flex items-center justify-between px-1 sm:px-2">
          {[25, 50, 75].map((milestone) => (
            <div
              key={milestone}
              className={`w-0.5 sm:w-1 h-2 sm:h-4 rounded-full transition-all duration-500 ${
                progress >= milestone 
                  ? 'bg-white opacity-80 animate-milestone-glow' 
                  : 'bg-gray-300 opacity-40'
              }`}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes label-glow {
          0%, 100% { text-shadow: 0 0 3px rgba(16, 185, 129, 0.3); }
          50% { text-shadow: 0 0 6px rgba(16, 185, 129, 0.6); }
        }
        
        @keyframes percentage-bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.03); }
        }
        
        @keyframes loading-dots {
          0%, 20% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 0; }
        }
        
        @keyframes number-count {
          0% { transform: translateY(-1px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes bg-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes progress-glow {
          0%, 100% { 
            box-shadow: 0 0 8px rgba(16, 185, 129, 0.6), 
                        0 0 16px rgba(16, 185, 129, 0.4),
                        inset 0 1px 0 rgba(255, 255, 255, 0.3),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.1); 
          }
          50% { 
            box-shadow: 0 0 16px rgba(16, 185, 129, 0.8), 
                        0 0 32px rgba(16, 185, 129, 0.6),
                        inset 0 1px 0 rgba(255, 255, 255, 0.5),
                        inset 0 -1px 0 rgba(0, 0, 0, 0.2); 
          }
        }
        
        @keyframes shimmer-fast {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(200%) skewX(-15deg); }
        }
        
        @keyframes shimmer-slow {
          0% { transform: translateX(-100%) skewX(15deg); }
          100% { transform: translateX(200%) skewX(15deg); }
        }
        
        @keyframes energy-pulse {
          0%, 100% { opacity: 0.6; transform: scaleY(1) scaleX(1); }
          50% { opacity: 0.9; transform: scaleY(1.05) scaleX(1.01); }
        }
        
        @keyframes energy-pulse-delayed {
          0%, 100% { opacity: 0.4; transform: scaleY(1) scaleX(1); }
          50% { opacity: 0.7; transform: scaleY(1.03) scaleX(1.005); }
        }
        
        @keyframes particle-trail {
          0%, 100% { opacity: 0.7; transform: translateX(0) scaleX(1); }
          50% { opacity: 1; transform: translateX(-4px) scaleX(1.1); }
        }
        
        @keyframes particle-trail-fast {
          0%, 100% { opacity: 0.6; transform: translateX(0) scale(1); }
          50% { opacity: 0.9; transform: translateX(-6px) scale(1.2); }
        }
        
        @keyframes segment-flow {
          0% { transform: translateX(-100%) scaleX(0.8); opacity: 0; }
          50% { opacity: 1; scaleX(1); }
          100% { transform: translateX(100%) scaleX(0.8); opacity: 0; }
        }
        
        @keyframes segment-flow-reverse {
          0% { transform: translateX(100%) scaleX(0.8); opacity: 0; }
          50% { opacity: 1; scaleX(1); }
          100% { transform: translateX(-100%) scaleX(0.8); opacity: 0; }
        }
        
        @keyframes highlight-pulse {
          0%, 100% { opacity: 0.8; transform: scaleY(1); }
          50% { opacity: 1; transform: scaleY(1.1); }
        }
        
        @keyframes shadow-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
        }
        
        @keyframes completion-burst {
          0% { opacity: 0; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
          100% { opacity: 0; transform: scale(1.05); }
        }
        
        @keyframes completion-flash {
          0% { opacity: 0; }
          25% { opacity: 0.6; }
          50% { opacity: 0; }
          75% { opacity: 0.4; }
          100% { opacity: 0; }
        }
        
        @keyframes completion-sparkle {
          0% { opacity: 0; transform: scale(0) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
          100% { opacity: 0; transform: scale(0) rotate(360deg); }
        }
        
        @keyframes loading-wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes loading-wave-slow {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes milestone-glow {
          0%, 100% { box-shadow: 0 0 3px rgba(255, 255, 255, 0.8); }
          50% { box-shadow: 0 0 8px rgba(255, 255, 255, 1); }
        }
        
        .animate-label-glow {
          animation: label-glow 3s ease-in-out infinite;
        }
        
        .animate-percentage-bounce {
          animation: percentage-bounce 2s ease-in-out infinite;
        }
        
        .animate-loading-dots {
          animation: loading-dots 1.5s ease-in-out infinite;
        }
        
        .animate-number-count {
          animation: number-count 0.3s ease-out;
        }
        
        .animate-bg-shimmer {
          animation: bg-shimmer 3s ease-in-out infinite;
        }
        
        .animate-progress-glow {
          animation: progress-glow 2s ease-in-out infinite;
        }
        
        .animate-shimmer-fast {
          animation: shimmer-fast 1.5s ease-in-out infinite;
        }
        
        .animate-shimmer-slow {
          animation: shimmer-slow 2.5s ease-in-out infinite;
        }
        
        .animate-energy-pulse {
          animation: energy-pulse 1.5s ease-in-out infinite;
        }
        
        .animate-energy-pulse-delayed {
          animation: energy-pulse-delayed 1.8s ease-in-out infinite 0.3s;
        }
        
        .animate-particle-trail {
          animation: particle-trail 1s ease-in-out infinite;
        }
        
        .animate-particle-trail-fast {
          animation: particle-trail-fast 0.8s ease-in-out infinite;
        }
        
        .animate-segment-flow {
          animation: segment-flow 3s ease-in-out infinite;
        }
        
        .animate-segment-flow-reverse {
          animation: segment-flow-reverse 3.5s ease-in-out infinite;
        }
        
        .animate-highlight-pulse {
          animation: highlight-pulse 2s ease-in-out infinite;
        }
        
        .animate-shadow-pulse {
          animation: shadow-pulse 2.5s ease-in-out infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .animate-completion-burst {
          animation: completion-burst 0.8s ease-out;
        }
        
        .animate-completion-flash {
          animation: completion-flash 1s ease-out;
        }
        
        .animate-completion-sparkle {
          animation: completion-sparkle 0.6s ease-out;
        }
        
        .animate-loading-wave {
          animation: loading-wave 2s ease-in-out infinite;
        }
        
        .animate-loading-wave-slow {
          animation: loading-wave-slow 2.8s ease-in-out infinite;
        }
        
        .animate-milestone-glow {
          animation: milestone-glow 2s ease-in-out infinite;
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          @keyframes progress-glow {
            0%, 100% { 
              box-shadow: 0 0 6px rgba(16, 185, 129, 0.6), 
                          0 0 12px rgba(16, 185, 129, 0.4),
                          inset 0 0.5px 0 rgba(255, 255, 255, 0.3); 
            }
            50% { 
              box-shadow: 0 0 12px rgba(16, 185, 129, 0.8), 
                          0 0 24px rgba(16, 185, 129, 0.6),
                          inset 0 0.5px 0 rgba(255, 255, 255, 0.5); 
            }
          }
        }
      `}</style>
    </div>
  );
};

export default ProgressBar;