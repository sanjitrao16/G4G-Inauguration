import React, { useState } from 'react';
import { Rocket } from 'lucide-react';

interface LaunchButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LaunchButton: React.FC<LaunchButtonProps> = ({ onClick, disabled = false }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!disabled) {
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 300);
      onClick();
    }
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`
        relative group overflow-hidden
        bg-gradient-to-r from-emerald-500 to-emerald-600
        hover:from-emerald-600 hover:to-emerald-700
        disabled:from-gray-400 disabled:to-gray-500
        text-white font-bold 
        py-3 px-6 sm:py-4 sm:px-8 
        rounded-lg sm:rounded-xl
        transform transition-all duration-300 ease-out
        hover:scale-105 sm:hover:scale-110 active:scale-95
        focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-emerald-300
        shadow-md sm:shadow-lg hover:shadow-xl sm:hover:shadow-2xl
        min-w-[160px] sm:min-w-[200px]
        text-sm sm:text-base lg:text-lg
        ${isPressed ? 'animate-launch-press' : ''}
        ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer animate-button-float'}
      `}
    >
      {/* Multiple ripple effects */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-lg sm:rounded-xl animate-ripple-1"></div>
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-lg sm:rounded-xl animate-ripple-2"></div>
      
      {/* Enhanced glow effect */}
      <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600 rounded-lg sm:rounded-xl blur-sm sm:blur-lg opacity-0 group-hover:opacity-75 transition-all duration-500 -z-10 animate-glow-pulse"></div>
      
      {/* Shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 rounded-lg sm:rounded-xl"></div>
      
      {/* Particle burst effect */}
      {isPressed && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-particle-burst opacity-80"
              style={{
                left: '50%',
                top: '50%',
                transform: `rotate(${i * 45}deg) translateY(-15px) sm:translateY(-20px)`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Button content */}
      <div className="relative z-10 flex items-center justify-center space-x-2 sm:space-x-3">
        <Rocket 
          size={window.innerWidth < 640 ? 20 : 24} 
          className={`transform transition-all duration-300 ${
            isPressed ? 'rotate-45 scale-125 animate-rocket-launch' : 
            isHovered ? 'scale-110 animate-rocket-hover' : 'animate-rocket-idle'
          }`} 
        />
        <span className={`transition-all duration-300 ${
          isPressed ? 'animate-text-launch' : 'animate-text-idle'
        }`}>
          {isPressed ? 'Launching...' : 'Launch'}
        </span>
      </div>

      {/* Energy waves */}
      <div className="absolute inset-0 rounded-lg sm:rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 animate-energy-wave-1"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-15 animate-energy-wave-2"></div>
      </div>

      <style jsx>{`
        @keyframes button-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-1px) sm:translateY(-2px); }
        }
        
        @keyframes launch-press {
          0% { transform: scale(1); }
          50% { transform: scale(0.95); }
          100% { transform: scale(1.05); }
        }
        
        @keyframes ripple-1 {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.2); opacity: 0; }
        }
        
        @keyframes ripple-2 {
          0% { transform: scale(0.9); opacity: 0.6; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.02) sm:scale(1.05); }
        }
        
        @keyframes particle-burst {
          0% { transform: rotate(var(--rotation)) translateY(0) scale(1); opacity: 1; }
          100% { transform: rotate(var(--rotation)) translateY(-30px) sm:translateY(-40px) scale(0); opacity: 0; }
        }
        
        @keyframes rocket-idle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(1deg) sm:rotate(2deg) scale(1.01) sm:scale(1.02); }
        }
        
        @keyframes rocket-hover {
          0%, 100% { transform: rotate(-3deg) sm:rotate(-5deg) scale(1.05) sm:scale(1.1); }
          50% { transform: rotate(3deg) sm:rotate(5deg) scale(1.08) sm:scale(1.15); }
        }
        
        @keyframes rocket-launch {
          0% { transform: rotate(0deg) scale(1); }
          25% { transform: rotate(-8deg) sm:rotate(-10deg) scale(1.1) sm:scale(1.2); }
          50% { transform: rotate(35deg) sm:rotate(45deg) scale(1.2) sm:scale(1.3); }
          75% { transform: rotate(30deg) sm:rotate(35deg) scale(1.15) sm:scale(1.25); }
          100% { transform: rotate(35deg) sm:rotate(45deg) scale(1.15) sm:scale(1.25); }
        }
        
        @keyframes text-idle {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(0.5px) sm:translateX(1px); }
        }
        
        @keyframes text-launch {
          0% { transform: scale(1); }
          50% { transform: scale(1.02) sm:scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes energy-wave-1 {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        
        @keyframes energy-wave-2 {
          0% { transform: translateX(-100%) skewX(12deg); }
          100% { transform: translateX(100%) skewX(12deg); }
        }
        
        .animate-button-float {
          animation: button-float 3s ease-in-out infinite;
        }
        
        .animate-launch-press {
          animation: launch-press 0.3s ease-out;
        }
        
        .animate-ripple-1 {
          animation: ripple-1 0.6s ease-out;
        }
        
        .animate-ripple-2 {
          animation: ripple-2 0.8s ease-out 0.2s;
        }
        
        .animate-glow-pulse {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-particle-burst {
          animation: particle-burst 0.6s ease-out forwards;
        }
        
        .animate-rocket-idle {
          animation: rocket-idle 4s ease-in-out infinite;
        }
        
        .animate-rocket-hover {
          animation: rocket-hover 0.5s ease-in-out infinite;
        }
        
        .animate-rocket-launch {
          animation: rocket-launch 0.6s ease-out;
        }
        
        .animate-text-idle {
          animation: text-idle 5s ease-in-out infinite;
        }
        
        .animate-text-launch {
          animation: text-launch 0.3s ease-out;
        }
        
        .animate-energy-wave-1 {
          animation: energy-wave-1 1.5s ease-in-out infinite;
        }
        
        .animate-energy-wave-2 {
          animation: energy-wave-2 1.8s ease-in-out infinite 0.3s;
        }
      `}</style>
    </button>
  );
};

export default LaunchButton;