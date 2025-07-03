import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('Initializing...');

  const loadingTexts = [
    'Initializing...',
    'Loading GeeksforGeeks...',
    'Preparing your journey...',
    'Setting up systems...',
    'Almost ready...',
    'Welcome!'
  ];

  useEffect(() => {
    const duration = 10000; // 10 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const progressStep = 100 / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min(100, currentStep * progressStep);
      setProgress(newProgress);

      // Update text based on progress
      const textIndex = Math.floor((newProgress / 100) * (loadingTexts.length - 1));
      setCurrentText(loadingTexts[textIndex]);

      if (newProgress >= 100) {
        clearInterval(timer);
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100 flex items-center justify-center z-50 overflow-hidden">
      {/* Completely Static Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Static decorative orbs with pleasant colors */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-emerald-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-gradient-to-br from-teal-200 to-cyan-300 rounded-full mix-blend-multiply filter blur-2xl opacity-35"></div>
        <div className="absolute bottom-20 left-32 w-48 h-48 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30"></div>
        <div className="absolute bottom-32 right-16 w-36 h-36 bg-gradient-to-br from-cyan-200 to-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-40"></div>
        <div className="absolute top-1/2 left-1/4 w-28 h-28 bg-gradient-to-br from-emerald-300 to-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-25"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-teal-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
        
        {/* Static grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="grid grid-cols-16 gap-6 h-full p-8">
            {[...Array(192)].map((_, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-emerald-300 to-teal-400 rounded-full opacity-20"
                style={{ 
                  transform: `scale(${0.2 + (i % 4) * 0.1})`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Loading Content */}
      <div className="relative z-10 text-center max-w-2xl mx-auto px-8">
        {/* Logo/Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-white via-emerald-50 to-emerald-100 rounded-full shadow-2xl animate-logo-pulse relative overflow-hidden border-4 border-white/50">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/60 to-transparent animate-logo-shimmer rounded-full"></div>
            <div className="relative z-10 w-full h-full flex items-center justify-center">
              <img 
                src="/geek.png" 
                alt="GeeksforGeeks Logo" 
                className="w-18 h-18 object-contain animate-logo-bounce drop-shadow-lg" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  // Fallback to a different path or show SVG backup
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <svg width="60" height="60" viewBox="0 0 100 100" class="animate-logo-bounce drop-shadow-lg">
                        <defs>
                          <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color: #059669; stop-opacity: 1" />
                            <stop offset="100%" style="stop-color: #10b981; stop-opacity: 1" />
                          </linearGradient>
                        </defs>
                        <circle cx="20" cy="30" r="8" fill="url(#logoGradient)" />
                        <circle cx="50" cy="20" r="10" fill="url(#logoGradient)" />
                        <circle cx="80" cy="30" r="8" fill="url(#logoGradient)" />
                        <path d="M15 50 L25 45 L25 55 Z" fill="url(#logoGradient)" />
                        <path d="M85 50 L75 45 L75 55 Z" fill="url(#logoGradient)" />
                        <rect x="35" y="45" width="30" height="8" rx="4" fill="url(#logoGradient)" />
                        <circle cx="30" cy="70" r="6" fill="url(#logoGradient)" opacity="0.8" />
                        <circle cx="50" cy="75" r="8" fill="url(#logoGradient)" opacity="0.9" />
                        <circle cx="70" cy="70" r="6" fill="url(#logoGradient)" opacity="0.8" />
                      </svg>
                    `;
                  }
                }}
              />
            </div>
          </div>
        </div>

        {/* Brand Name - Fixed with proper spacing and container */}
        <div className="mb-4 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-title-glow leading-tight tracking-wide whitespace-nowrap overflow-visible">
            GeeksforGeeks
          </h1>
        </div>
        <p className="text-emerald-600 text-xl mb-10 animate-subtitle-fade font-medium">
          Prepare your journey
        </p>

        {/* Progress Bar */}
        <div className="w-full max-w-sm mx-auto mb-8">
          <div className="relative w-full bg-white/60 backdrop-blur-sm rounded-full h-4 overflow-hidden shadow-lg border border-white/30">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-500 rounded-full transition-all duration-300 ease-out relative overflow-hidden animate-progress-glow"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-40 animate-progress-shimmer"></div>
            </div>
          </div>
          
          {/* Progress percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="text-emerald-700 text-base animate-text-pulse font-medium">{currentText}</span>
            <span className="text-emerald-600 text-base font-mono animate-number-count font-semibold">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Loading dots */}
        <div className="flex justify-center space-x-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full animate-loading-dots shadow-lg"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes logo-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 10px 40px rgba(16, 185, 129, 0.3); }
          50% { transform: scale(1.05); box-shadow: 0 15px 50px rgba(16, 185, 129, 0.5); }
        }
        
        @keyframes logo-shimmer {
          0% { transform: translateX(-100%) rotate(45deg); }
          100% { transform: translateX(100%) rotate(45deg); }
        }
        
        @keyframes logo-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes title-glow {
          0%, 100% { filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.3)); }
          50% { filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.5)); }
        }
        
        @keyframes subtitle-fade {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
        
        @keyframes progress-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(16, 185, 129, 0.4); }
          50% { box-shadow: 0 0 25px rgba(16, 185, 129, 0.6); }
        }
        
        @keyframes progress-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes text-pulse {
          0%, 100% { opacity: 0.9; }
          50% { opacity: 1; }
        }
        
        @keyframes number-count {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes loading-dots {
          0%, 80%, 100% { transform: scale(0.8); opacity: 0.6; }
          40% { transform: scale(1.2); opacity: 1; }
        }
        
        .animate-logo-pulse { animation: logo-pulse 3s ease-in-out infinite; }
        .animate-logo-shimmer { animation: logo-shimmer 4s ease-in-out infinite; }
        .animate-logo-bounce { animation: logo-bounce 2s ease-in-out infinite; }
        .animate-title-glow { animation: title-glow 4s ease-in-out infinite; }
        .animate-subtitle-fade { animation: subtitle-fade 3s ease-in-out infinite; }
        .animate-progress-glow { animation: progress-glow 2s ease-in-out infinite; }
        .animate-progress-shimmer { animation: progress-shimmer 2s linear infinite; }
        .animate-text-pulse { animation: text-pulse 2s ease-in-out infinite; }
        .animate-number-count { animation: number-count 0.3s ease-in-out; }
        .animate-loading-dots { animation: loading-dots 1.4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default LoadingScreen;