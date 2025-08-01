import React, { useState, useEffect } from "react";
import { Sparkles, Brain, Heart, MessageCircle, Mic, Eye, FileText, ArrowRight, Star, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroInteractive() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    { text: "Kendimi daha iyi anlıyorum", author: "Sarah K.", rating: 5 },
    { text: "Günlük ruh halim çok daha stabil", author: "Mehmet A.", rating: 5 },
    { text: "Profesyonel destek almaya karar verdim", author: "Ayşe T.", rating: 5 }
  ];

  useEffect(() => {
    const elements = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2
    }));
    setFloatingElements(elements);

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const newRipple = {
      x,
      y,
      id: Date.now()
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 800);
    
    // Navigate to auth page
    navigate('/auth');
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-emerald-950 to-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-emerald-600/15 to-green-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-teal-600/15 to-emerald-600/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-600/8 to-teal-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {floatingElements.map((element) => (
          <div
            key={element.id}
            className="absolute w-2 h-2 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full opacity-20"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              animation: `float ${element.duration}s ease-in-out infinite`,
              animationDelay: `${element.delay}s`
            }}
          />
        ))}

        {/* Ana İçerik */}
      </div>
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="pt-8 px-6">
          <div className="max-w-7xl mx-auto flex justify-end items-center">
            <div className="flex items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span className="text-sm text-black">%100 Güvenli</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-400" />
                <span className="text-sm text-black">7/24 Destek</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero İçerik */}
        <div className="flex-1 flex items-center justify-center px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
          
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/40 to-green-500/40 backdrop-blur-sm rounded-full border border-emerald-500/60 mb-8">
              <Sparkles className="w-5 h-5 text-emerald-400 animate-pulse" />
              <span className="text-black font-medium">AI Destekli Psikolojik Analiz</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent">
                Ruh Halinizi
              </span>
              <span className="block bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 bg-clip-text text-transparent animate-pulse">
                Anlıyoruz
              </span>
              <span className="block text-gray-300 text-4xl md:text-5xl mt-4">
                İyileştiriyoruz ✨
              </span>
            </h1>

            {/* Alt başlık */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              Ses, mimik ve test analizi ile günlük ruh halinizi takip edin.
              <br />
              <span className="text-emerald-300 font-semibold">Profesyonel destek</span> almaya hazır olduğunuzda size rehberlik edelim.
            </p>

            <div className="relative mb-16">
               <div className="absolute -top-20 -left-36 animate-float">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl p-4 shadow-2xl backdrop-blur-sm border border-white/10">
                  <Mic className="w-8 h-8 text-white" />
                  <div className="text-xs text-white mt-2 font-medium">Ses Analizi</div>
                </div>
              </div>
               <div className="absolute -top-16 -right-36 animate-float" style={{ animationDelay: '1s' }}>
                <div className="bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl p-4 shadow-2xl backdrop-blur-sm border border-white/10">
                  <Eye className="w-8 h-8 text-white" />
                  <div className="text-xs text-white mt-2 font-medium">Mimik Analizi</div>
                </div>
              </div>
              <div className="absolute -bottom-20 left-16 animate-float" style={{ animationDelay: '2s' }}>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-4 shadow-2xl backdrop-blur-sm border border-white/10">
                  <FileText className="w-8 h-8 text-white" />
                  <div className="text-xs text-white mt-2 font-medium">PHQ-9 Test</div>
                </div>
              </div>

              <div
                className="relative mx-auto cursor-pointer group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={handleClick}
              >
                <div
                  className={`
                    relative w-96 h-96 mx-auto transition-all duration-700 ease-out
                    ${isHovered ? 'scale-110' : 'scale-100'}
                    overflow-hidden rounded-full
                  `}
                  style={{
                    background: 'linear-gradient(135deg, #064e3b 0%, #047857 30%, #059669 60%, #10b981 100%)',
                    boxShadow: isHovered 
                      ? '0 40px 80px -12px rgba(6, 78, 59, 0.6), 0 0 0 1px rgba(255,255,255,0.1), inset 0 1px 0 rgba(255,255,255,0.2)' 
                      : '0 30px 60px -12px rgba(6, 78, 59, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)'
                  }}
                >
                 
                  {ripples.map(ripple => (
                    <div
                      key={ripple.id}
                      className="absolute rounded-full bg-white/50 animate-ping"
                      style={{
                        left: ripple.x - 20,
                        top: ripple.y - 20,
                        width: 40,
                        height: 40,
                        animationDuration: '0.8s'
                      }}
                    />
                  ))}

                  <div className="absolute inset-4 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>

                  {/* İçerik */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <div className={`transition-all duration-500 ${isHovered ? 'scale-110 rotate-12' : 'scale-100'}`}>
                      <div className="relative">
                        <Brain className="w-20 h-20 mb-6 animate-pulse" />
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                          <Sparkles className="w-4 h-4 text-yellow-800" />
                        </div>
                      </div>
                      <h3 className="text-3xl font-black mb-3">Analiz Başlat</h3>
                      <p className="text-lg opacity-90 px-6">Günlük durumunu anlayalım</p>
                    </div>
                  </div>

                  <div className="absolute inset-0 rounded-full">
                    <div className={`
                      absolute inset-0 rounded-full transition-all duration-700
                      ${isHovered ? 'animate-spin' : ''}
                    `} style={{
                      background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent, rgba(255,255,255,0.1), transparent)',
                      animation: isHovered ? 'spin 4s linear infinite' : 'none'
                    }}></div>
                  </div>
                </div>

                <div className="absolute inset-0 rounded-full border-2 border-emerald-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-8 rounded-full border-2 border-green-500/15 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
              </div>
            </div>

            {/* Yorumlar */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-black text-lg mb-4 italic">
                "{testimonials[currentTestimonial].text}"
              </p>
               <p className="text-black font-semibold">
                - {testimonials[currentTestimonial].author}
              </p>
            </div>
          </div>
        </div>
      </div>

        <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(-10px) rotate(-1deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        `}</style>
      </div>
    );
  }
  
  export default HeroInteractive;