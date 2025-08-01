import React, { useState, useEffect } from "react";
import { Star, Leaf, Heart } from "lucide-react";

const testimonials = [
  {
    name: "Tamer T.",
    content: "İyi bir terapi süreci, sabırlı ve önyargısız olmayı gerektirir. Bir-iki seansla hemen sonuç beklemeyin. Devam ederseniz faydasını mutlaka göreceğinize eminim. :)"
  },
  {
    name: "Berkay D.",
    content: "İş yerinde yaşadığım stres sebebiyle AIpathy'i denedim. Yoğun bir programım olduğu için terapiye gidip gelmem çok zor. AIpathy'in kullanımı çok rahat."
  },
  {
    name: "Gizem A.",
    content: "Daha önce hiç terapiye gitmemiş biri olarak AIpathy'den çok memnun kaldığımı söyleyebilirim. Beni terapistimle bir araya getirdiğiniz için teşekkür ederim."
  },
  {
    name: "Murat H.",
    content: "Terapiyi hep erteliyordum. AIpathy ile artık kolay ve hızlı şekilde başlamak mümkün."
  }
];

function AIpathyForestTestimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="bg-white py-20 px-4 min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-0 w-full h-64">
          <svg viewBox="0 0 1200 300" className="absolute bottom-0 w-full h-full">
            <path d="M0,300 L200,100 L400,150 L600,80 L800,120 L1000,90 L1200,130 L1200,300 Z"
              fill="rgba(34, 197, 94, 0.25)" className="animate-pulse" />
            <path d="M0,300 L150,120 L300,180 L500,110 L700,140 L900,100 L1100,120 L1200,110 L1200,300 Z"
              fill="rgba(34, 197, 94, 0.35)" className="animate-pulse delay-500" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-10 transform animate-sway">
          <svg width="80" height="200" viewBox="0 0 80 200">
            <rect x="35" y="140" width="10" height="60" fill="rgba(74, 93, 35, 0.7)" />
            <ellipse cx="40" cy="120" rx="25" ry="40" fill="rgba(34, 84, 61, 0.6)" className="animate-pulse" />
            <ellipse cx="40" cy="100" rx="20" ry="30" fill="rgba(45, 90, 61, 0.65)" className="animate-pulse delay-300" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-20 transform animate-sway delay-1000">
          <svg width="100" height="240" viewBox="0 0 100 240">
            <rect x="45" y="160" width="12" height="80" fill="rgba(74, 93, 35, 0.7)" />
            <ellipse cx="50" cy="140" rx="30" ry="50" fill="rgba(26, 77, 58, 0.6)" className="animate-pulse delay-500" />
            <ellipse cx="50" cy="110" rx="25" ry="40" fill="rgba(45, 90, 61, 0.65)" className="animate-pulse delay-700" />
          </svg>
        </div>

        <div className="absolute bottom-0 left-1/3 transform animate-sway delay-700">
          <svg width="60" height="180" viewBox="0 0 60 180">
            <rect x="25" y="130" width="8" height="50" fill="rgba(74, 93, 35, 0.7)" />
            <ellipse cx="30" cy="110" rx="20" ry="35" fill="rgba(34, 84, 61, 0.6)" className="animate-pulse delay-200" />
            <ellipse cx="30" cy="90" rx="15" ry="25" fill="rgba(45, 90, 61, 0.65)" className="animate-pulse delay-400" />
          </svg>
        </div>

        <div className="absolute bottom-0 right-1/3 transform animate-sway delay-500">
          <svg width="90" height="220" viewBox="0 0 90 220">
            <rect x="40" y="150" width="10" height="70" fill="rgba(74, 93, 35, 0.7)" />
            <ellipse cx="45" cy="130" rx="28" ry="45" fill="rgba(26, 77, 58, 0.6)" className="animate-pulse delay-600" />
            <ellipse cx="45" cy="105" rx="22" ry="35" fill="rgba(45, 90, 61, 0.65)" className="animate-pulse delay-800" />
          </svg>
        </div>

        <div className="absolute top-20 left-1/4 animate-float">
          <Leaf className="w-6 h-6 text-green-500 opacity-40 animate-spin" style={{ animationDuration: '8s' }} />
        </div>
        <div className="absolute top-40 right-1/3 animate-float delay-1000">
          <Leaf className="w-4 h-4 text-emerald-500 opacity-30 animate-spin" style={{ animationDuration: '10s' }} />
        </div>
        <div className="absolute top-60 left-1/2 animate-float delay-2000">
          <Leaf className="w-5 h-5 text-green-600 opacity-35 animate-spin" style={{ animationDuration: '12s' }} />
        </div>

        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-500 rounded-full animate-ping delay-1000 opacity-25"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping delay-2000 opacity-30"></div>
        <div className="absolute top-1/2 right-1/5 w-1 h-1 bg-green-500 rounded-full animate-ping delay-3000 opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row items-center justify-between mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col lg:flex-row items-center gap-6 mb-8 lg:mb-0">
            {/* AIpathy Doğa Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg width="120" height="100" viewBox="0 0 400 350" className="mr-2 drop-shadow-lg">
                  <defs>
                    <filter id="natureglow">
                      <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                    <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                  </defs>

                  <rect x="95" y="140" width="10" height="40" fill="#4a5d23" filter="url(#natureglow)" />

                  <path
                    d="M100 80 C80 50, 40 50, 40 90 C40 130, 100 160, 100 160 C100 160, 160 130, 160 90 C160 50, 120 50, 100 80z"
                    fill="url(#heartGradient)"
                    filter="url(#natureglow)"
                    className="animate-pulse"
                  />

                  <ellipse cx="70" cy="100" rx="8" ry="12" fill="#22c55e" className="animate-pulse delay-200" opacity="0.8" />
                  <ellipse cx="130" cy="95" rx="10" ry="15" fill="#16a34a" className="animate-pulse delay-400" opacity="0.7" />
                  <ellipse cx="85" cy="70" rx="6" ry="10" fill="#22c55e" className="animate-pulse delay-600" opacity="0.6" />

                  <path
                    d="M180 100 L220 100 L240 60 L260 140 L280 60 L300 100 L380 100"
                    stroke="#22c55e"
                    strokeWidth="4"
                    fill="none"
                    className="animate-pulse delay-300"
                    filter="url(#natureglow)"
                  />

                  <defs>
                    <linearGradient id="natureTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#15803d" />
                    </linearGradient>
                  </defs>
                  <text x="40" y="290" fontSize="80" fontWeight="bold" fill="url(#natureTextGradient)" filter="url(#natureglow)">
                    AIpathy
                  </text>
                </svg>
              </div>
            </div>
            <div className="relative inline-block">
              <h2 className="relative text-4xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-green-700 to-emerald-800 bg-clip-text text-transparent text-center lg:text-left drop-shadow-sm">
                Doğanın Huzuruyla Büyüyen Hikayeler
              </h2>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8">
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">100+</div>
              <div className="text-sm text-gray-600">aktif kullanıcı</div>
            </div>
            <div className="text-center group cursor-pointer">
              <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">50+</div>
              <div className="text-sm text-white bg-gradient-to-r from-green-500 to-emerald-500 px-3 py-1 rounded-full text-xs font-medium shadow-lg">uzman psikolog</div>
            </div>
            <div className="text-center flex items-center gap-2 group cursor-pointer">
              <Star className="w-6 h-6 text-green-500 fill-current animate-spin group-hover:animate-pulse" />
              <div className="text-3xl font-bold text-green-600 group-hover:scale-110 transition-transform duration-300">4.8</div>
              <div className="text-green-600">/5</div>
              <div className="text-sm text-gray-600 ml-1">uygulama puanı</div>
            </div>
          </div>
        </div>

        {/* Alt başlık */}
        <p className={`text-gray-700 mb-16 max-w-3xl text-lg leading-relaxed transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Doğanın sakinliği eşliğinde, zihinsel sağlığınız için güvenli bir alan. Yüzlerce kullanıcının tercihi AIpathy, her zaman yanınızda!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-green-50 via-emerald-50 to-green-100 rounded-3xl p-8 relative border-2 border-green-200 hover:border-green-400 transition-all duration-700 group cursor-pointer transform hover:scale-105 hover:-translate-y-3 shadow-lg hover:shadow-xl ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{
                transitionDelay: `${index * 200 + 500}ms`,
                boxShadow: hoveredCard === index ? '0 25px 50px rgba(34, 197, 94, 0.2), inset 0 1px 0 rgba(255,255,255,0.8)' : '0 10px 30px rgba(0, 0, 0, 0.1)'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
           
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-green-200/30 via-emerald-200/30 to-green-300/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

           
              <div className="absolute top-4 right-4 transform group-hover:rotate-12 group-hover:scale-110 transition-transform duration-500">
                <Leaf className="w-8 h-8 text-green-500 group-hover:text-green-600 transition-colors duration-500 animate-pulse" />
              </div>

              <div className="absolute top-4 left-4 transform group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-6 h-6 text-green-600 opacity-70 animate-pulse" />
              </div>

              {/* İçerik */}
              <div className="pr-12 pt-8 relative z-10">
                <h3 className="font-bold text-green-700 mb-4 text-xl group-hover:text-green-800 transition-colors duration-300">
                  {index === 0 && "🌱 Sabırla Büyüyen Değişim"}
                  {index === 1 && "🍃 Hızlı ve Pratik Çözüm"}
                  {index === 2 && "🌿 İlk Deneyimim, Harika!"}
                  {index === 3 && "🌳 Artık Ertelemiyorum"}
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-6 flex-1 group-hover:text-gray-800 transition-colors duration-300">
                  {testimonial.content}
                </p>
              </div>

              
              <div className="text-sm font-medium text-green-600 relative">
                <span className="relative z-10">{testimonial.name}</span>
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 group-hover:w-full transition-all duration-700"></div>
              </div>

            
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400/30 rounded-full animate-ping delay-1000"></div>
                <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400/40 rounded-full animate-ping delay-1500"></div>
                <div className="absolute bottom-1/4 left-3/4 w-1.5 h-1.5 bg-green-300/35 rounded-full animate-ping delay-2000"></div>
              </div>

              
              <div className="absolute bottom-2 right-2 opacity-15 group-hover:opacity-25 transition-opacity duration-500">
                <svg width="30" height="30" viewBox="0 0 30 30">
                  <rect x="13" y="20" width="2" height="8" fill="currentColor" className="text-green-600" />
                  <ellipse cx="15" cy="18" rx="6" ry="8" fill="currentColor" className="text-green-500" />
                </svg>
              </div>
            </div>
          ))}
        </div>

      
        <div className={`text-center mt-20 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col items-center gap-4">
            <p className="text-lg mb-4 font-medium text-gray-700 drop-shadow-sm">
              Doğanın huzuru eşliğinde zihinsel sağlığınıza adım atın
            </p>
            <button className="bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:via-emerald-600 hover:to-green-700 text-white font-bold py-4 px-10 rounded-full transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl animate-pulse relative overflow-hidden group">
              <span className="relative z-10 flex items-center gap-2">
                <Leaf className="w-5 h-5 animate-spin" style={{ animationDuration: '3s' }} />
                Huzurlu Yolculuğa Başla
                <Heart className="w-5 h-5 animate-pulse" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes sway {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          25% { transform: rotate(1deg) translateX(2px); }
          50% { transform: rotate(0deg) translateX(0px); }
          75% { transform: rotate(-1deg) translateX(-2px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(90deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
          75% { transform: translateY(-10px) rotate(270deg); }
        }
        
        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default AIpathyForestTestimonials;