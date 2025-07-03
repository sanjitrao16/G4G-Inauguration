import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import ProgressBar from './ProgressBar';
import LaunchButton from './LaunchButton';

// Firebase configuration - Replace with your actual config
const firebaseConfig = {
  apiKey: "AIzaSyBp7S2DrTtxSdfKEzApogop9TWY0ofVMcU",
  authDomain: "gfgapp-3a19e.firebaseapp.com",
  projectId: "gfgapp-3a19e",
  storageBucket: "gfgapp-3a19e.appspot.com",
  messagingSenderId: "355851007199",
  appId: "1:355851007199:web:0b791d818d0ea8e016256a",
  measurementId: "G-5B22X14T8V",
  databaseURL: "https://gfgapp-3a19e-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showBalloons, setShowBalloons] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // Fetch progress from Firebase
  useEffect(() => {
    setIsLoading(true);
    
    // Reference to your progress document in Firestore
    // Adjust the collection and document path according to your Firebase structure
    const progressDocRef = doc(db, 'counters', 'main'); // Replace 'progress/main' with your actual path
    
    // Set up real-time listener
    const unsubscribe = onSnapshot(
      progressDocRef,
      (docSnapshot) => {
        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          
          // Adjust these field names according to your Firebase document structure
          const currentCount = data.value || 0;
          const targetCount =  500;
          
          setCount(currentCount);
          
          // Calculate progress percentage
          const progressPercentage = Math.min((currentCount / targetCount) * 100, 100);
          setProgress(progressPercentage);
          
          setIsLoading(false);
        } else {
          console.log('Progress document does not exist');
          // Set default values if document doesn't exist
          setCount(0);
          setProgress(0);
          setIsLoading(false);
        }
      },
      (error) => {
        console.error('Error fetching progress from Firebase:', error);
        // Set default values on error
        setCount(0);
        setProgress(0);
        setIsLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => unsubscribe();
  }, []);

  const handleLaunch = () => {
    setIsLaunching(true);
    setShowBalloons(true);
    
    // Navigate after balloon animation completes (reduced to 6 seconds)
    setTimeout(() => {
      navigate('/launch-success');
    }, 6000);
  };

  const isLaunchReady = count >= 500;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Balloon Burst Effect */}
      {showBalloons && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {/* Colorful Balloons - Reduced count for better performance */}
          {[...Array(15)].map((_, i) => {
            const colors = [
              'bg-red-400', 'bg-blue-400', 'bg-green-400', 'bg-yellow-400', 
              'bg-purple-400', 'bg-pink-400', 'bg-orange-400', 'bg-indigo-400',
              'bg-emerald-400', 'bg-cyan-400'
            ];
            const balloonColor = colors[i % colors.length];
            
            return (
              <div
                key={i}
                className={`absolute w-6 sm:w-10 h-8 sm:h-12 ${balloonColor} rounded-full animate-balloon-float opacity-90 shadow-lg`}
                style={{
                  left: `${Math.random() * 100}%`,
                  bottom: '-60px',
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${5 + Math.random() * 3}s`,
                  transform: `rotate(${Math.random() * 20 - 10}deg)`
                }}
              >
                {/* Balloon string */}
                <div className="absolute top-full left-1/2 w-0.5 h-6 sm:h-10 bg-gray-600 transform -translate-x-1/2"></div>
                {/* Balloon highlight */}
                <div className="absolute top-1 left-1 w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white rounded-full opacity-60"></div>
              </div>
            );
          })}

          {/* Confetti Burst - Reduced count */}
          {[...Array(60)].map((_, i) => {
            const confettiColors = [
              'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
              'bg-purple-500', 'bg-pink-500', 'bg-orange-500'
            ];
            const confettiColor = confettiColors[i % confettiColors.length];
            
            return (
              <div
                key={`confetti-${i}`}
                className={`absolute w-1.5 sm:w-2 h-1.5 sm:h-2 ${confettiColor} animate-confetti-burst opacity-80 rounded-sm`}
                style={{
                  left: `${45 + Math.random() * 10}%`,
                  top: `${45 + Math.random() * 10}%`,
                  animationDelay: `${1 + Math.random() * 1.5}s`,
                  animationDuration: `${2 + Math.random() * 1.5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}
              />
            );
          })}

          {/* Floating Hearts - Reduced count */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-red-400 text-xl sm:text-2xl animate-heart-float opacity-80"
              style={{
                left: `${Math.random() * 100}%`,
                bottom: '-40px',
                animationDelay: `${0.5 + Math.random() * 2}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            >
              ❤️
            </div>
          ))}

          {/* Sparkle Burst - Reduced count */}
          {[...Array(20)].map((_, i) => (
            <div
              key={`sparkle-${i}`}
              className="absolute text-yellow-400 text-base sm:text-lg animate-sparkle-burst opacity-90"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${1.5 + Math.random() * 2}s`
              }}
            >
              ✨
            </div>
          ))}

          {/* Party Streamers - Reduced count */}
          {[...Array(6)].map((_, i) => (
            <div
              key={`streamer-${i}`}
              className="absolute w-1 sm:w-1.5 bg-gradient-to-b from-purple-400 via-pink-400 to-yellow-400 animate-streamer-fall opacity-70"
              style={{
                left: `${15 + i * 12}%`,
                top: '-20px',
                height: `${80 + Math.random() * 120}px`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${3 + Math.random() * 1.5}s`,
                transform: `rotate(${Math.random() * 20 - 10}deg)`
              }}
            />
          ))}

          {/* Firework Bursts - Reduced count */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`firework-${i}`}
              className="absolute animate-firework-burst"
              style={{
                left: `${25 + Math.random() * 50}%`,
                top: `${25 + Math.random() * 30}%`,
                animationDelay: `${2 + i * 0.6}s`
              }}
            >
              {[...Array(8)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-yellow-400 rounded-full animate-firework-particle"
                  style={{
                    transform: `rotate(${j * 45}deg) translateY(-15px) sm:translateY(-25px)`,
                    animationDelay: `${2 + i * 0.6}s`
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute -top-5 sm:-top-10 -right-5 sm:-right-10 w-20 sm:w-32 lg:w-40 h-20 sm:h-32 lg:h-40 bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-60"></div>
        <div className="absolute -bottom-8 sm:-bottom-16 -left-8 sm:-left-16 w-24 sm:w-36 lg:w-48 h-24 sm:h-36 lg:h-48 bg-gradient-to-br from-emerald-300 via-emerald-400 to-emerald-500 rounded-full mix-blend-multiply filter blur-xl sm:blur-2xl opacity-50"></div>
        <div className="absolute top-1/4 right-1/4 sm:right-1/3 w-16 sm:w-24 lg:w-32 h-16 sm:h-24 lg:h-32 bg-gradient-to-br from-emerald-100 via-emerald-200 to-emerald-300 rounded-full mix-blend-multiply filter blur-lg sm:blur-xl opacity-70"></div>
        <div className="absolute bottom-1/4 left-1/4 sm:left-1/3 w-18 sm:w-28 lg:w-36 h-18 sm:h-28 lg:h-36 bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400 rounded-full mix-blend-multiply filter blur-lg sm:blur-xl opacity-40"></div>
        
        {/* Geometric shapes */}
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-4 sm:w-6 h-4 sm:h-6 bg-gradient-to-br from-emerald-400 to-emerald-500 rotate-45 opacity-70 rounded-sm"></div>
        <div className="absolute bottom-16 sm:bottom-32 right-16 sm:right-32 w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-emerald-300 to-emerald-400 rounded-full opacity-80"></div>
        <div className="absolute top-1/2 left-5 sm:left-10 w-3 sm:w-4 h-3 sm:h-4 bg-gradient-to-br from-emerald-500 to-emerald-600 opacity-60 rounded-full"></div>
        <div className="absolute top-20 sm:top-40 right-10 sm:right-20 w-5 sm:w-7 h-5 sm:h-7 bg-gradient-to-br from-emerald-200 to-emerald-300 rotate-45 opacity-70"></div>
        
        {/* Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}

        {/* Energy rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-emerald-300 sm:border-2 rounded-full opacity-20"
            style={{
              width: `${80 + i * 40}px`,
              height: `${80 + i * 40}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}

        {/* Sparkles */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-emerald-400 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${8 + Math.random() * 6}px`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative z-10">
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-emerald-100/50 transform hover:scale-[1.02] transition-all duration-700 hover:shadow-4xl hover:border-emerald-200 animate-card-entrance-complex relative overflow-hidden">
          {/* Card background effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 via-transparent to-emerald-100/30 rounded-2xl sm:rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent animate-card-shimmer rounded-2xl sm:rounded-3xl"></div>
          
          {/* Header - Hidden during launch */}
          {!isLaunching && (
            <div className="text-center mb-6 sm:mb-8 relative z-10">
              <div className="relative inline-block mb-3 sm:mb-4">
                <div className="inline-flex items-center justify-center w-16 sm:w-20 lg:w-24 h-16 sm:h-20 lg:h-24 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-full shadow-xl sm:shadow-2xl hover:shadow-3xl transition-all duration-500 animate-icon-float-complex group cursor-pointer relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-emerald-600 animate-icon-bg-pulse rounded-full"></div>
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent animate-icon-shimmer rounded-full"></div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl group-hover:scale-125 transition-transform duration-500 animate-rocket-bounce-complex relative z-10">🚀</span>
                </div>
                
                {/* Orbiting elements */}
                <div className="absolute w-2 sm:w-3 h-2 sm:h-3 bg-emerald-400 rounded-full -top-1 sm:top-0 left-1/2 transform -translate-x-1/2 opacity-80"></div>
                <div className="absolute w-1.5 sm:w-2 h-1.5 sm:h-2 bg-yellow-400 rounded-full -bottom-1 sm:bottom-0 -right-1 sm:right-0 opacity-70"></div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-2 sm:mb-3 animate-title-slide-complex bg-gradient-to-r from-gray-800 via-emerald-600 to-gray-800 bg-clip-text text-transparent leading-tight">
                GeeksforGeeks
              </h1>
              <p className="text-gray-600 animate-subtitle-fade-complex text-sm sm:text-base lg:text-lg">Your journey begins here</p>
            </div>
          )}

          {/* Progress Section - Hidden during launch */}
          {!isLaunching && (
            <div className="relative z-10 mb-4 sm:mb-6">
              <ProgressBar progress={progress} isLoading={isLoading} />
              
              {/* Firebase connection status indicator */}
              {isLoading && (
                <div className="text-center mt-2">
                  <div className="inline-flex items-center text-xs text-gray-500">
                    <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-emerald-600 mr-2"></div>
                    Connecting to Firebase...
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Launch Button - Hidden during launch */}
          {isLaunchReady && !isLaunching && (
            <div className="text-center relative z-10 animate-button-reveal mb-4 sm:mb-6">
              <LaunchButton 
                onClick={handleLaunch} 
                disabled={isLoading}
              />
            </div>
          )}

          {/* Status Text - Hidden during launch */}
          {!isLaunching && (
            <div className="text-center mt-4 sm:mt-6 relative z-10">
              <p className="text-xs sm:text-sm text-gray-500 animate-text-glow-complex px-2">
                {isLaunchReady ? (
                  <span className="text-emerald-600 font-semibold animate-success-pulse-complex">Ready for launch! 🎉</span>
                ) : (
                  <span className="animate-preparing-complex">
                    {isLoading ? 'Loading progress...' : `Preparing for launch... (${count}/500)`}
                  </span>
                )}
              </p>
              
              {/* Real-time indicator */}
              {!isLoading && (
                <div className="mt-1 flex items-center justify-center">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></div>
                  <span className="text-xs text-gray-400">Live from Firebase</span>
                </div>
              )}
            </div>
          )}

          {/* Launch State - Only show during launch */}
          {isLaunching && (
            <div className="text-center relative z-10 py-16 sm:py-20">
              <div className="animate-pulse">
                <div className="inline-flex items-center justify-center w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 rounded-full shadow-2xl animate-launch-icon-spin relative overflow-hidden">
                  <span className="text-3xl sm:text-4xl lg:text-5xl animate-rocket-launch-spin relative z-10">🚀</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer - Hidden during launch */}
      </div>

      <style jsx>{`
        @keyframes balloon-float {
          0% { 
            transform: translateY(0) translateX(0) rotate(var(--rotation, 0deg)) scale(0.8); 
            opacity: 0; 
          }
          10% { 
            opacity: 0.9; 
            transform: translateY(-15vh) translateX(3px) rotate(var(--rotation, 0deg)) scale(1);
          }
          50% { 
            transform: translateY(-40vh) translateX(-8px) rotate(calc(var(--rotation, 0deg) + 8deg)) scale(1.05);
          }
          90% { 
            opacity: 0.9; 
            transform: translateY(-75vh) translateX(12px) rotate(calc(var(--rotation, 0deg) + 15deg)) scale(1);
          }
          100% { 
            transform: translateY(-100vh) translateX(0) rotate(calc(var(--rotation, 0deg) + 20deg)) scale(0.8); 
            opacity: 0; 
          }
        }

        @keyframes confetti-burst {
          0% { 
            transform: translateY(0) translateX(0) rotate(0deg) scale(1); 
            opacity: 1; 
          }
          25% { 
            transform: translateY(-25px) translateX(15px) rotate(90deg) scale(1.1); 
            opacity: 1; 
          }
          50% { 
            transform: translateY(-8px) translateX(-12px) rotate(180deg) scale(0.9); 
            opacity: 0.8; 
          }
          75% { 
            transform: translateY(15px) translateX(20px) rotate(270deg) scale(1.05); 
            opacity: 0.6; 
          }
          100% { 
            transform: translateY(40px) translateX(-8px) rotate(360deg) scale(0.6); 
            opacity: 0; 
          }
        }

        @keyframes heart-float {
          0% { 
            transform: translateY(0) scale(0.6) rotate(0deg); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
            transform: translateY(-15vh) scale(1) rotate(8deg);
          }
          80% { 
            opacity: 1; 
            transform: translateY(-65vh) scale(1.1) rotate(-8deg);
          }
          100% { 
            transform: translateY(-85vh) scale(0.8) rotate(15deg); 
            opacity: 0; 
          }
        }

        @keyframes sparkle-burst {
          0% { 
            transform: scale(0) rotate(0deg); 
            opacity: 0; 
          }
          25% { 
            transform: scale(1.3) rotate(90deg); 
            opacity: 1; 
          }
          50% { 
            transform: scale(1) rotate(180deg); 
            opacity: 0.8; 
          }
          75% { 
            transform: scale(1.2) rotate(270deg); 
            opacity: 0.6; 
          }
          100% { 
            transform: scale(0) rotate(360deg); 
            opacity: 0; 
          }
        }

        @keyframes streamer-fall {
          0% { 
            transform: translateY(-80px) rotate(var(--rotation, 0deg)) scaleY(0); 
            opacity: 0; 
          }
          20% { 
            opacity: 1; 
            transform: translateY(0) rotate(var(--rotation, 0deg)) scaleY(1);
          }
          80% { 
            opacity: 1; 
            transform: translateY(40vh) rotate(calc(var(--rotation, 0deg) + 15deg)) scaleY(1);
          }
          100% { 
            transform: translateY(80vh) rotate(calc(var(--rotation, 0deg) + 30deg)) scaleY(0.8); 
            opacity: 0; 
          }
        }

        @keyframes firework-burst {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1); }
        }

        @keyframes firework-particle {
          0% { transform: rotate(var(--rotation)) translateY(0) scale(1); opacity: 1; }
          100% { transform: rotate(var(--rotation)) translateY(-30px) scale(0); opacity: 0; }
        }

        @keyframes launch-icon-spin {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(90deg); }
          50% { transform: scale(1.05) rotate(180deg); }
          75% { transform: scale(1.08) rotate(270deg); }
          100% { transform: scale(1) rotate(360deg); }
        }

        @keyframes rocket-launch-spin {
          0% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.2) rotate(15deg); }
          50% { transform: scale(1.1) rotate(-10deg); }
          75% { transform: scale(1.15) rotate(20deg); }
          100% { transform: scale(1) rotate(0deg); }
        }

        @keyframes card-entrance-complex {
          0% { transform: translateY(30px) scale(0.95) rotate(-2deg); opacity: 0; }
          25% { transform: translateY(15px) scale(0.98) rotate(1deg); opacity: 0.3; }
          50% { transform: translateY(-3px) scale(1.01) rotate(-0.5deg); opacity: 0.7; }
          75% { transform: translateY(1px) scale(1.005) rotate(0.3deg); opacity: 0.9; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        }

        @keyframes card-shimmer {
          0% { transform: translateX(-100%) skewX(-20deg); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateX(200%) skewX(-20deg); opacity: 0; }
        }

        @keyframes icon-float-complex {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-6px) rotate(3deg) scale(1.03); }
          50% { transform: translateY(-3px) rotate(-2deg) scale(0.99); }
          75% { transform: translateY(-8px) rotate(1deg) scale(1.01); }
        }

        @keyframes icon-bg-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.03); }
        }

        @keyframes icon-shimmer {
          0% { transform: rotate(-45deg) translateX(-100%); }
          100% { transform: rotate(-45deg) translateX(200%); }
        }

        @keyframes rocket-bounce-complex {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.1) rotate(5deg); }
          50% { transform: scale(1.05) rotate(-3deg); }
          75% { transform: scale(1.07) rotate(2deg); }
        }

        @keyframes title-slide-complex {
          0% { transform: translateX(-20px) scale(0.95); opacity: 0; }
          25% { transform: translateX(3px) scale(1.01); opacity: 0.5; }
          50% { transform: translateX(-1px) scale(1.005); opacity: 0.8; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }

        @keyframes subtitle-fade-complex {
          0% { opacity: 0; transform: translateY(8px) scale(0.97); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes button-reveal {
          0% { opacity: 0; transform: translateY(15px) scale(0.9); }
          50% { opacity: 0.7; transform: translateY(-3px) scale(1.03); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes text-glow-complex {
          0%, 100% { text-shadow: 0 0 6px rgba(16, 185, 129, 0.4); }
          50% { text-shadow: 0 0 12px rgba(16, 185, 129, 0.8); }
        }

        @keyframes success-pulse-complex {
          0%, 100% { transform: scale(1); text-shadow: 0 0 4px rgba(16, 185, 129, 0.5); }
          50% { transform: scale(1.05); text-shadow: 0 0 12px rgba(16, 185, 129, 0.8); }
        }

        @keyframes preparing-complex {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.01); }
        }

        @keyframes footer-wave-complex {
          0%, 100% { transform: translateY(0px) scale(1); }
          25% { transform: translateY(-2px) scale(1.005); }
          50% { transform: translateY(-1px) scale(0.998); }
          75% { transform: translateY(-3px) scale(1.01); }
        }

        @keyframes text-rainbow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        /* Animation classes */
        .animate-balloon-float { animation: balloon-float linear infinite; }
        .animate-confetti-burst { animation: confetti-burst ease-out forwards; }
        .animate-heart-float { animation: heart-float ease-out forwards; }
        .animate-sparkle-burst { animation: sparkle-burst ease-in-out infinite; }
        .animate-streamer-fall { animation: streamer-fall ease-out forwards; }
        .animate-firework-burst { animation: firework-burst 1s ease-out; }
        .animate-firework-particle { animation: firework-particle 0.6s ease-out; }
        .animate-launch-icon-spin { animation: launch-icon-spin 2s ease-in-out infinite; }
        .animate-rocket-launch-spin { animation: rocket-launch-spin 1.5s ease-in-out infinite; }
        .animate-card-entrance-complex { animation: card-entrance-complex 1.2s ease-out; }
        .animate-card-shimmer { animation: card-shimmer 4s ease-in-out infinite; }
        .animate-icon-float-complex { animation: icon-float-complex 4s ease-in-out infinite; }
        .animate-icon-bg-pulse { animation: icon-bg-pulse 3s ease-in-out infinite; }
        .animate-icon-shimmer { animation: icon-shimmer 3s ease-in-out infinite; }
        .animate-rocket-bounce-complex { animation: rocket-bounce-complex 2.5s ease-in-out infinite; }
        .animate-title-slide-complex { animation: title-slide-complex 1s ease-out; }
        .animate-subtitle-fade-complex { animation: subtitle-fade-complex 1.2s ease-out 0.5s both; }
        .animate-button-reveal { animation: button-reveal 0.8s ease-out 0.3s both; }
        .animate-text-glow-complex { animation: text-glow-complex 4s ease-in-out infinite; }
        .animate-success-pulse-complex { animation: success-pulse-complex 1.5s ease-in-out infinite; }
        .animate-preparing-complex { animation: preparing-complex 3s ease-in-out infinite; }
        .animate-footer-wave-complex { animation: footer-wave-complex 5s ease-in-out infinite; }
        .animate-text-rainbow { animation: text-rainbow 3s ease-in-out infinite; background-size: 200% 200%; }
        
        .shadow-4xl {
          box-shadow: 0 50px 100px -20px rgba(0, 0, 0, 0.25), 0 30px 60px -30px rgba(16, 185, 129, 0.3);
        }

        @media (max-width: 640px) {
          .shadow-4xl {
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 15px 30px -15px rgba(16, 185, 129, 0.3);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;