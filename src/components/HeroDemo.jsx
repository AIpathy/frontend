import React, { useState, useEffect } from "react";

function HeroDemo() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentEmoji, setCurrentEmoji] = useState(0);
  
  const emotions = ['😊', '😢', '😠', '😰', '🤔', '😴', '🥳'];
  
  useEffect(() => {
    setIsVisible(true);
    
   
    const emojiInterval = setInterval(() => {
      setCurrentEmoji(prev => (prev + 1) % emotions.length);
    }, 1500);
    
    return () => clearInterval(emojiInterval);
  }, []);

  const floatingParticleStyle = (index) => ({
    position: 'absolute',
    width: '12px',
    height: '12px',
    backgroundColor: '#a7f3d0',
    borderRadius: '50%',
    opacity: 0.6,
    left: `${15 + index * 12}%`,
    top: `${8 + (index % 4) * 20}%`,
    animation: `floatAnimation${(index % 3) + 1} ${3 + (index % 3) * 0.5}s ease-in-out infinite`,
    animationDelay: `${index * 0.6}s`
  });

  return (
    <>
      <style>
        {`
          @keyframes typing {
            from { width: 0 }
            to { width: 100% }
          }
          
          @keyframes floatAnimation1 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(180deg); }
          }
          
          @keyframes floatAnimation2 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-180deg); }
          }
          
          @keyframes floatAnimation3 {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(90deg); }
          }
          
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          
          @keyframes spinSlow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          @keyframes sway {
            0%, 100% { transform: translateX(0px) rotate(0deg); }
            50% { transform: translateX(10px) rotate(5deg); }
          }
          
          @keyframes floatText {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-5px); }
          }
          
          @keyframes rotateEmoji {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(10deg) scale(1.1); }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .typing-animation {
            animation: typing 3s steps(30, end) 1s both;
          }
          
          .shimmer-text {
            background: linear-gradient(90deg, #a7f3d0, #5eead4, #a7f3d0);
            background-size: 200% 100%;
            background-clip: text;
            -webkit-background-clip: text;
            color: transparent;
            animation: shimmer 3s ease-in-out infinite;
          }
          
          .spin-slow {
            animation: spinSlow 4s linear infinite;
          }
          
          .sway-animation {
            animation: sway 3s ease-in-out infinite;
          }
          
          .float-text {
            animation: floatText 2s ease-in-out infinite;
          }
          
          .fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
        `}
      </style>
      
      <div className="relative flex h-56 md:h-64 items-center justify-center bg-gradient-to-br from-emerald-900 via-teal-800 to-[#265d5c] px-4 md:px-10 rounded-2xl shadow-2xl my-6 overflow-hidden">
        
        <div className="absolute inset-0 opacity-15">
          <div className="absolute top-4 left-4 w-20 h-20 bg-green-200 rounded-full animate-pulse"></div>
          <div className="absolute top-12 right-8 w-12 h-12 bg-emerald-300 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-8 left-12 w-16 h-16 bg-teal-200 rounded-full animate-ping delay-700"></div>
          <div className="absolute bottom-4 right-16 w-8 h-8 bg-green-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-20 left-1/3 w-6 h-6 bg-emerald-200 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-16 right-1/4 w-10 h-10 bg-teal-300 rounded-full animate-ping delay-1200"></div>
        </div>
        
   
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              style={floatingParticleStyle(i)}
            ></div>
          ))}
          
         
          <div className="absolute top-8 right-12 w-4 h-4 border-2 border-emerald-300 rotate-45 spin-slow opacity-40"></div>
          <div className="absolute bottom-12 left-8 w-6 h-6 border-2 border-teal-300 animate-pulse opacity-50"></div>
          <div className="absolute top-16 left-1/4 w-3 h-8 bg-green-300 opacity-30 sway-animation"></div>
          <div 
            className="absolute bottom-20 right-1/3 w-8 h-3 bg-emerald-300 opacity-30 sway-animation"
            style={{ animationDelay: '1000ms' }}
          ></div>
        </div>

        <div className="relative z-10 text-center">
          
          <div className="mb-4 flex justify-center">
            <span 
              className="text-4xl md:text-6xl transform transition-all duration-500"
              style={{
                animation: 'bounce 2s infinite, rotateEmoji 1.5s ease-in-out infinite'
              }}
            >
              {emotions[currentEmoji]}
            </span>
          </div>
          
         
          <div className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="typing-animation overflow-hidden whitespace-nowrap border-r-4 border-r-emerald-300 pr-3 text-2xl md:text-4xl font-black shimmer-text tracking-wide drop-shadow-lg">
              AIpathy ile duygularını anla!
            </h1>
          </div>
          
        
          <div className={`mt-4 transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-emerald-100 text-sm md:text-base font-medium fade-in-up">
              Yapay zeka ile duygusal analizin gücünü keşfet
            </p>
          </div>
          
          
          <div className={`mt-6 transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-teal-300 rounded-full animate-pulse delay-200"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-400"></div>
            </div>
          </div>
          
         
          <div className={`mt-4 transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <div className="text-emerald-200 text-xs md:text-sm font-light float-text">
              ✨ Anlık Duygu Analizi ✨
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroDemo;