import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


const GlobeIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold">
    🌍
  </div>
);

const TreeIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold">
    🌲
  </div>
);

const ShieldCheckIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold">
    🛡️
  </div>
);

const BotIcon = () => (
  <div className="w-16 h-16 flex items-center justify-center text-4xl font-bold">
    🤖
  </div>
);

const LeafIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center text-2xl">
    🍃
  </div>
);

const HeartPulseIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center text-2xl">
    💚
  </div>
);

const cards = [
  {
    icon: <GlobeIcon />,
    title: "970M+",
    subtitle: "Dünya çapında ruhsal sorun yaşayan birey",
    description: "Global ruh sağlığı krizi her geçen gün büyüyor ve milyonlarca insan desteğe ihtiyaç duyuyor.",
    source: "WHO",
    gradient: "from-green-800 via-emerald-700 to-teal-600",
    accentColor: "green",
  },
  {
    icon: <TreeIcon />,
    title: "75%",
    subtitle: "Gelişmekte olan ülkelerde yardım almıyor",
    description: "Kaynaklara erişim sorunu nedeniyle çoğu kişi gerekli desteği alamıyor.",
    source: "WHO",
    gradient: "from-emerald-800 via-green-700 to-teal-600",
    accentColor: "emerald",
  },
  {
    icon: <TreeIcon />,
    title: "50%",
    subtitle: "Gelişmiş ülkelerde yardım almıyor",
    description: "Gelişmiş ekonomilerde bile ruh sağlığı hizmetlerine erişim yetersiz kalıyor.",
    source: "WHO",
    gradient: "from-teal-800 via-green-700 to-emerald-600",
    accentColor: "teal",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Vizyonumuz",
    subtitle: "AI destekli erken müdahale ile herkesin korunması",
    description: "Teknoloji ile ruh sağlığı hizmetlerini herkese ulaştırılabilir kılmak.",
    source: "",
    gradient: "from-green-900 via-emerald-800 to-green-600",
    accentColor: "green",
  },
  {
    icon: <BotIcon />,
    title: "AIpathy",
    subtitle: "Yapay zeka destekli ruh sağlığı platformu",
    description: "Ses analizi, mimik tanıma ve gelişmiş algoritmarla kişiselleştirilmiş destek.",
    source: "",
    gradient: "from-emerald-900 via-green-800 to-teal-600",
    accentColor: "emerald",
  },
];

function OverviewLanding() {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [scrollX, setScrollX] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    const handleScroll = () => {
      setScrollX(window.scrollX);
      setScrollY(window.scrollY);
    };

    // Animation time tracker
    const timeInterval = setInterval(() => {
      setCurrentTime(prev => prev + 0.016); // ~60fps
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-white relative overflow-hidden"
    >
      {/* Ultra-premium forest atmosphere */}
      <div className="absolute inset-0">
        {/* Dynamic forest depth layers */}
        <div className="absolute inset-0">
          {/* Depth layer 1 - Far forest */}
          <div className="absolute inset-0 opacity-8">
            {[...Array(20)].map((_, i) => (
              <div
                key={`far-tree-${i}`}
                className="absolute opacity-20"
                style={{
                  left: `${5 + i * 4.5}%`,
                  top: `${20 + Math.sin(i * 0.7) * 15}%`,
                  transform: `scale(${0.6 + Math.sin(currentTime * 0.5 + i) * 0.1}) translateY(${Math.sin(currentTime * 0.3 + i) * 3}px)`,
                  filter: 'blur(1px)'
                }}
              >
                <div className="text-6xl text-green-600">🌲</div>
              </div>
            ))}
          </div>

          {/* Depth layer 2 - Mid forest */}
          <div className="absolute inset-0 opacity-15">
            {[...Array(15)].map((_, i) => (
              <div
                key={`mid-tree-${i}`}
                className="absolute opacity-30"
                style={{
                  left: `${8 + i * 6}%`,
                  top: `${10 + Math.sin(i * 1.2) * 20}%`,
                  transform: `scale(${0.8 + Math.sin(currentTime * 0.4 + i) * 0.15}) translateY(${Math.sin(currentTime * 0.6 + i) * 5}px)`,
                  filter: 'blur(0.5px)'
                }}
              >
                <div className="text-7xl text-emerald-600">🌳</div>
              </div>
            ))}
          </div>

          {/* Floating magical elements */}
          <div className="absolute inset-0">
            {[...Array(25)].map((_, i) => (
              <div
                key={`magic-${i}`}
                className="absolute animate-float-magic"
                style={{
                  left: `${10 + (i * 3.5) % 80}%`,
                  top: `${15 + (i * 4.2) % 70}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${6 + (i % 4) * 2}s`,
                  transform: `scale(${0.5 + Math.sin(currentTime + i) * 0.3})`
                }}
              >
                <div className="text-3xl opacity-30">
                  {i % 6 === 0 ? '✨' : i % 6 === 1 ? '🍃' : i % 6 === 2 ? '🌿' : i % 6 === 3 ? '💫' : i % 6 === 4 ? '🍀' : '⭐'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div 
          className="absolute transition-all duration-1000 ease-out"
          style={{
            width: '120vw',
            height: '120vh',
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                rgba(34, 197, 94, 0.15) 0%, 
                rgba(16, 185, 129, 0.08) 30%, 
                rgba(20, 184, 166, 0.05) 50%, 
                transparent 70%)
            `,
            left: '-10vw',
            top: '-10vh',
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute transition-all duration-1500 ease-out"
          style={{
            width: '80vw',
            height: '80vh',
            background: `
              radial-gradient(ellipse at ${mousePos.x + 15}% ${mousePos.y - 10}%, 
                rgba(22, 163, 74, 0.12) 0%, 
                rgba(5, 150, 105, 0.06) 40%, 
                transparent 70%)
            `,
            left: '10vw',
            top: '10vh',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.02) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px, 600px 600px, 800px 800px',
            animation: 'organic-flow 20s ease-in-out infinite'
          }}
        />
      </div>
      <div className="relative z-10 min-h-screen flex">
        <div className="w-1/2 flex flex-col justify-center px-16 py-20" 
             style={{ transform: `translateX(${scrollX * -0.1}px)` }}>
          <div 
            className={`transition-all duration-1200 ease-out ${
              isVisible 
                ? 'opacity-100 translate-x-0' 
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-200 shadow-lg mb-12 hover:shadow-xl hover:scale-105 transition-all duration-500 backdrop-blur-sm">
              <div className="animate-spin-slow">
                <LeafIcon />
              </div>
              <span className="text-green-800 font-bold text-base tracking-wide">
                DOĞANIN GÜCÜ × YAPAY ZEKA
              </span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
              </div>
            </div>
            
            <h1 className="text-8xl md:text-9xl font-black leading-none mb-8">
              <span className="block bg-gradient-to-r from-green-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                AIpathy
              </span>
              <span className="block text-5xl md:text-6xl font-light text-green-700 mt-4 tracking-wide">
                Ruhsal Denge × Teknoloji
              </span>
            </h1>
            
 
            <p className="text-2xl text-gray-700 leading-relaxed mb-12 max-w-2xl">
              Ormandaki her yaprağın kendine özgü hikayesi olduğu gibi, 
              <span className="text-green-800 font-semibold bg-gradient-to-r from-green-100 to-emerald-100 px-3 py-1 rounded-lg mx-2 shadow-sm">
                sizin de eşsiz ruhsal yolculuğunuz
              </span>
              için AI destekli, doğa ile uyumlu çözümler sunuyoruz.
            </p>

        
            <div className="grid grid-cols-2 gap-6 mb-16">
              {[
                { icon: '🎤', text: 'Ses Tonunuzu Analiz Eder', desc: 'Duygu durumunuzu ses tonunuzdan okur' },
                { icon: '👁️', text: 'Yüz İfadelerinizi Okur', desc: 'Mimiklerinizdeki gizli mesajları çözer' },
                { icon: '🧠', text: 'AI ile Öngörü Yapar', desc: '24/7 ruhsal durumunuzu takip eder' },
                { icon: '🌿', text: 'Doğa Temelli Terapi', desc: 'Ormanın huzuru ile teknolojinin gücü' }
              ].map((feature, i) => (
                <div 
                  key={i}
                  className="group p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-green-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500"
                  style={{ animationDelay: `${i * 0.15}s` }}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{feature.icon}</div>
                  <h3 className="text-green-800 font-bold text-lg mb-2">{feature.text}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>

        
            <div className="flex items-center gap-6">
              <button 
                onClick={() => navigate('/auth')}
                className="group relative inline-flex items-center gap-4 px-16 py-6 bg-gradient-to-r from-green-800 via-emerald-700 to-teal-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-110 font-bold text-xl overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-emerald-600 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 animate-pulse-gentle">
                  <HeartPulseIcon />
                </div>
                
                <span className="relative z-10">Doğa ile Yolculuğa Başla</span>
                
                <div className="relative z-10 text-2xl transform group-hover:translate-x-2 group-hover:scale-125 transition-all duration-500">
                  🌲
                </div>
                
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>
              
              <div className="text-gray-600">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="font-semibold">14 gün ücretsiz</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="font-semibold">Anında erişim</span>
                </div>
              </div>
            </div>
          </div>
        </div>

    
        <div className="w-1/2 flex items-center justify-center p-16" 
             style={{ transform: `translateX(${scrollX * 0.05}px) translateY(${scrollY * -0.05}px)` }}>
          
        
          <div className="relative w-full max-w-2xl">
            {cards.map((card, index) => {
              const isHovered = hoveredCard === index;
              const stackOffset = index * 8;
              const rotateOffset = (index - 2) * 3;
              
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-700 ease-out ${
                    isVisible 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-24'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 0.15 + 0.5}s`,
                    transform: `
                      translateY(${stackOffset}px) 
                      translateX(${stackOffset}px) 
                      rotate(${rotateOffset}deg)
                      scale(${isHovered ? 1.05 : 1 - index * 0.02})
                      translateZ(${isHovered ? 20 : index * -5}px)
                    `,
                    zIndex: isHovered ? 50 : cards.length - index,
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  <div className={`relative bg-white/95 backdrop-blur-xl rounded-3xl p-10 border-2 border-green-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden min-h-[500px]`}>
                    
            
                    <div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 hover:opacity-10 transition-all duration-700 rounded-3xl`} />
                    
                 
                    {isHovered && (
                      <div className="absolute inset-0 rounded-3xl">
                        <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient} opacity-20 rounded-3xl animate-pulse-glow blur-sm`} />
                      </div>
                    )}

                 
                    <div className="relative mb-8">
                      <div 
                        className={`inline-flex p-8 rounded-3xl bg-gradient-to-br ${card.gradient} text-white shadow-2xl transition-all duration-700 relative overflow-hidden`}
                        style={{
                          transform: isHovered ? 'scale(1.15) rotate(8deg)' : 'scale(1) rotate(0deg)',
                        }}
                      >
                        {card.icon}
                        
                   
                        {isHovered && (
                          <>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine" />
                            <div className="absolute -inset-2 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-3xl blur-lg animate-pulse" />
                          </>
                        )}
                      </div>
                    </div>

                    
                    <div className="space-y-6 relative z-10">
                      <h3 className={`text-6xl font-black transition-all duration-500 ${
                        isHovered ? `text-${card.accentColor}-700 scale-110` : 'text-green-600'
                      }`}>
                        {card.title}
                      </h3>
                      
                      <h4 className="text-2xl font-bold text-green-800 leading-tight">
                        {card.subtitle}
                      </h4>
                      
                      <p className="text-gray-700 leading-relaxed text-lg">
                        {card.description}
                      </p>
                      
                      {card.source && (
                        <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-full hover:from-green-200 hover:to-emerald-200 hover:scale-110 transition-all duration-500 shadow-lg`}>
                          <span className="text-sm text-green-800 font-bold tracking-wider">
                            📊 {card.source}
                          </span>
                        </div>
                      )}
                    </div>

                  
                    <div className={`absolute top-8 right-8 w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center border-2 border-green-200 shadow-lg transition-all duration-500 ${
                      isHovered ? 'scale-125 shadow-xl' : ''
                    }`}>
                      <span className="text-lg font-black text-green-700">
                        {index + 1}
                      </span>
                    </div>

                  
                    {isHovered && (
                      <div className="absolute inset-0 pointer-events-none">
                        {[...Array(6)].map((_, i) => (
                          <div
                            key={i}
                            className="absolute animate-float-particle opacity-60"
                            style={{
                              left: `${20 + i * 15}%`,
                              top: `${10 + i * 12}%`,
                              animationDelay: `${i * 0.2}s`,
                              animationDuration: '3s'
                            }}
                          >
                            <div className="text-2xl">✨</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-magic {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% { 
            transform: translateY(-15px) translateX(8px) rotate(90deg) scale(1.1);
          }
          50% { 
            transform: translateY(-8px) translateX(-5px) rotate(180deg) scale(0.9);
          }
          75% { 
            transform: translateY(-20px) translateX(3px) rotate(270deg) scale(1.05);
          }
        }
        
        @keyframes float-particle {
          0%, 100% { 
            transform: translateY(0px) scale(1) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          50% { 
            transform: translateY(-30px) scale(1.2) rotate(180deg);
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
        }
        
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(100%) skewX(-15deg); }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% { 
            opacity: 0.2;
            transform: scale(1);
          }
          50% { 
            opacity: 0.4;
            transform: scale(1.05);
          }
        }
        
        @keyframes organic-flow {
          0%, 100% { 
            transform: translateX(0%) translateY(0%) rotate(0deg);
          }
          33% { 
            transform: translateX(2%) translateY(-1%) rotate(1deg);
          }
          66% { 
            transform: translateX(-1%) translateY(2%) rotate(-1deg);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-magic {
          animation: float-magic 10s ease-in-out infinite;
        }
        
        .animate-float-particle {
          animation: float-particle 3s ease-out;
        }
        
        .animate-shine {
          animation: shine 1s ease-out;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default OverviewLanding;