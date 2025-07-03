import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle, Sparkles, Star, Zap, X } from "lucide-react";
import logo from "./logo.png"; // Make sure to have logo.png in your project

const LaunchSuccess: React.FC = () => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    setShowFireworks(true);

    const confettiTimer = setTimeout(() => setShowConfetti(false), 4000);
    const fireworksTimer = setTimeout(() => setShowFireworks(false), 6000);

    return () => {
      clearTimeout(confettiTimer);
      clearTimeout(fireworksTimer);
    };
  }, []);

  const handleImageClick = () => {
    setShowVideoModal(true);
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative overflow-hidden">
      {/* Enhanced Background Animations - Responsive */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating celebration elements - responsive sizing */}
        <div className="absolute top-5 sm:top-10 left-5 sm:left-10 w-4 sm:w-6 h-4 sm:h-6 text-yellow-400 animate-float-celebration">
          ⭐
        </div>
        <div className="absolute top-10 sm:top-20 right-10 sm:right-20 w-6 sm:w-8 h-6 sm:h-8 text-emerald-400 animate-float-celebration-delayed">
          ✨
        </div>
        <div className="absolute bottom-10 sm:bottom-20 left-10 sm:left-20 w-4 sm:w-5 h-4 sm:h-5 text-pink-400 animate-float-celebration-slow">
          🎉
        </div>
        <div className="absolute bottom-5 sm:bottom-10 right-5 sm:right-10 w-5 sm:w-7 h-5 sm:h-7 text-purple-400 animate-float-celebration-reverse">
          🎊
        </div>

        {/* Energy rings - responsive sizing */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-emerald-300 sm:border-2 rounded-full animate-energy-ring opacity-20"
            style={{
              width: `${(i + 1) * 60}px`,
              height: `${(i + 1) * 60}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`,
            }}
          />
        ))}
      </div>

      {/* Confetti Animation - Responsive count */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(window.innerWidth < 640 ? 40 : 80)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 sm:w-3 h-2 sm:h-3 rounded-full animate-confetti ${
                [
                  "bg-emerald-500",
                  "bg-yellow-400",
                  "bg-pink-500",
                  "bg-purple-500",
                  "bg-blue-500",
                ][i % 5]
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Fireworks Effect - Responsive count */}
      {showFireworks && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(window.innerWidth < 640 ? 3 : 6)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-firework"
              style={{
                left: `${20 + Math.random() * 60}%`,
                top: `${20 + Math.random() * 40}%`,
                animationDelay: `${i * 0.8}s`,
              }}
            >
              {[...Array(12)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-0.5 sm:w-1 h-0.5 sm:h-1 bg-yellow-400 rounded-full animate-firework-particle"
                  style={{
                    transform: `rotate(${j * 30}deg) translateY(-15px) sm:translateY(-20px)`,
                    animationDelay: `${i * 0.8}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-4xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl">
            {/* Close Button */}
            <button
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors z-10"
            >
              <X size={24} />
            </button>

            {/* Video Player */}
            <iframe
              src="https://www.youtube.com/watch?v=5gKZqP4MIvs"
              title="Launch Video"
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Main Container - Responsive width */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg relative z-10">
        {/* Success Card - Responsive padding and sizing */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl p-4 sm:p-6 lg:p-8 border border-emerald-100/50 text-center transform animate-success-entrance">
          {/* Success Icon - Responsive sizing */}
          <div className="relative mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-20 sm:w-24 lg:w-28 h-20 sm:h-24 lg:h-28 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full shadow-xl sm:shadow-2xl animate-success-icon-bounce">
              <CheckCircle
                size={
                  window.innerWidth < 640
                    ? 32
                    : window.innerWidth < 1024
                      ? 40
                      : 48
                }
                className="text-white animate-check-draw"
              />
            </div>

            {/* Floating icons around main icon - responsive positioning */}
            <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 animate-orbit-1">
              <Sparkles
                size={window.innerWidth < 640 ? 16 : 20}
                className="text-yellow-400"
              />
            </div>
            <div className="absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 animate-orbit-2">
              <Star
                size={window.innerWidth < 640 ? 14 : 18}
                className="text-pink-400"
              />
            </div>
            <div className="absolute -top-2 sm:-top-4 -left-2 sm:-left-4 animate-orbit-3">
              <Zap
                size={window.innerWidth < 640 ? 12 : 16}
                className="text-purple-400"
              />
            </div>

            {/* Pulsing rings - responsive sizing */}
            <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-emerald-300 animate-ring-pulse-1 opacity-30"></div>
            <div className="absolute inset-0 rounded-full border border-emerald-400 sm:border-2 animate-ring-pulse-2 opacity-40"></div>
          </div>

          {/* Success Message - Responsive typography */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 sm:mb-8 animate-title-typewriter leading-tight">
            Launch Successful! 🚀
          </h1>

          {/* Image Box - Clickable to open video - Made larger and more prominent */}
          <div className="mb-6 sm:mb-8">
            <div
              onClick={handleImageClick}
              className="relative group cursor-pointer bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-image-box-entrance"
            >
              {/* Logo Image - Made much larger and more prominent */}
              <div className="aspect-[4/3] flex items-center justify-center relative overflow-hidden bg-white p-6 sm:p-8 lg:p-10">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain max-w-none scale-125 sm:scale-150 lg:scale-175"
                />

                {/* Shimmer Effect - Kept for hover animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              </div>

              {/* Image Caption */}
              <div className="p-3 sm:p-4 bg-white border-t border-gray-100">
                <p className="text-sm sm:text-base text-gray-600 font-medium">
                  🎬 Watch the Video
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info - Responsive spacing and sizing */}
        <div className="text-center mt-4 sm:mt-6 lg:mt-8 animate-footer-float">
          <p className="text-xs sm:text-sm text-gray-500 animate-text-shimmer px-2">
            Thank you for using GeeksforGeeks ✨
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float-celebration {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          25% { transform: translateY(-10px) sm:translateY(-15px) rotate(90deg) scale(1.05) sm:scale(1.1); }
          50% { transform: translateY(-5px) sm:translateY(-10px) rotate(180deg) scale(0.95) sm:scale(0.9); }
          75% { transform: translateY(-12px) sm:translateY(-20px) rotate(270deg) scale(1.02) sm:scale(1.05); }
        }
        
        @keyframes float-celebration-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          33% { transform: translateY(-12px) sm:translateY(-20px) rotate(120deg) scale(1.1) sm:scale(1.2); }
          66% { transform: translateY(-3px) sm:translateY(-5px) rotate(240deg) scale(0.9) sm:scale(0.8); }
        }
        
        @keyframes float-celebration-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-15px) sm:translateY(-25px) scale(1.08) sm:scale(1.15); }
        }
        
        @keyframes float-celebration-reverse {
          0%, 100% { transform: translateY(0px) rotate(360deg) scale(1); }
          50% { transform: translateY(-18px) sm:translateY(-30px) rotate(180deg) scale(1.15) sm:scale(1.3); }
        }
        
        @keyframes energy-ring {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0deg); opacity: 0.8; }
          50% { opacity: 0.4; }
          100% { transform: translate(-50%, -50%) scale(1) rotate(360deg); opacity: 0; }
        }
        
        @keyframes confetti {
          0% {
            transform: translateY(-100px) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(50vh) rotate(180deg) scale(0.8);
            opacity: 0.8;
          }
          100% {
            transform: translateY(100vh) rotate(360deg) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes firework {
          0% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.1) sm:scale(1.2); }
        }
        
        @keyframes firework-particle {
          0% { transform: rotate(var(--rotation)) translateY(0) scale(1); opacity: 1; }
          100% { transform: rotate(var(--rotation)) translateY(-25px) sm:translateY(-40px) scale(0); opacity: 0; }
        }
        
        @keyframes success-entrance {
          0% { transform: translateY(30px) sm:translateY(50px) scale(0.95) rotate(-1deg); opacity: 0; }
          50% { transform: translateY(-5px) sm:translateY(-10px) scale(1.01) rotate(0.5deg); opacity: 0.8; }
          100% { transform: translateY(0) scale(1) rotate(0deg); opacity: 1; }
        }
        
        @keyframes success-icon-bounce {
          0%, 100% { transform: scale(1) rotate(0deg); }
          25% { transform: scale(1.05) sm:scale(1.1) rotate(3deg) sm:rotate(5deg); }
          50% { transform: scale(1.02) sm:scale(1.05) rotate(-2deg) sm:rotate(-3deg); }
          75% { transform: scale(1.04) sm:scale(1.08) rotate(1deg) sm:rotate(2deg); }
        }
        
        @keyframes check-draw {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 100 0; }
        }
        
        @keyframes orbit-1 {
          0% { transform: rotate(0deg) translateX(25px) sm:translateX(40px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(25px) sm:translateX(40px) rotate(-360deg); }
        }
        
        @keyframes orbit-2 {
          0% { transform: rotate(0deg) translateX(22px) sm:translateX(35px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(22px) sm:translateX(35px) rotate(360deg); }
        }
        
        @keyframes orbit-3 {
          0% { transform: rotate(0deg) translateX(20px) sm:translateX(30px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(20px) sm:translateX(30px) rotate(-360deg); }
        }
        
        @keyframes ring-pulse-1 {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.1) sm:scale(1.2); opacity: 0.1; }
        }
        
        @keyframes ring-pulse-2 {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.2) sm:scale(1.4); opacity: 0.1; }
        }
        
        @keyframes title-typewriter {
          0% { width: 0; opacity: 0; }
          50% { opacity: 1; }
          100% { width: 100%; opacity: 1; }
        }
        
        @keyframes image-box-entrance {
          0% { transform: translateY(20px) sm:translateY(30px) scale(0.95); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        
        @keyframes footer-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px) sm:translateY(-5px); }
        }
        
        @keyframes text-shimmer {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        
        /* Animation classes */
        .animate-float-celebration { animation: float-celebration 6s ease-in-out infinite; }
        .animate-float-celebration-delayed { animation: float-celebration-delayed 8s ease-in-out infinite; }
        .animate-float-celebration-slow { animation: float-celebration-slow 10s ease-in-out infinite; }
        .animate-float-celebration-reverse { animation: float-celebration-reverse 7s ease-in-out infinite; }
        .animate-energy-ring { animation: energy-ring linear infinite; }
        .animate-confetti { animation: confetti linear infinite; }
        .animate-firework { animation: firework 1s ease-out; }
        .animate-firework-particle { animation: firework-particle 0.8s ease-out; }
        .animate-success-entrance { animation: success-entrance 1s ease-out; }
        .animate-success-icon-bounce { animation: success-icon-bounce 2s ease-in-out infinite; }
        .animate-check-draw { animation: check-draw 0.8s ease-out 0.5s both; }
        .animate-orbit-1 { animation: orbit-1 8s linear infinite; }
        .animate-orbit-2 { animation: orbit-2 10s linear infinite; }
        .animate-orbit-3 { animation: orbit-3 6s linear infinite; }
        .animate-ring-pulse-1 { animation: ring-pulse-1 2s ease-in-out infinite; }
        .animate-ring-pulse-2 { animation: ring-pulse-2 2.5s ease-in-out infinite 0.5s; }
        .animate-title-typewriter { animation: title-typewriter 1s ease-out 0.5s both; }
        .animate-image-box-entrance { animation: image-box-entrance 0.8s ease-out 1s both; }
        .animate-footer-float { animation: footer-float 4s ease-in-out infinite 2.5s; }
        .animate-text-shimmer { animation: text-shimmer 3s ease-in-out infinite 2.8s; }
      `}</style>
    </div>
  );
};

export default LaunchSuccess;
