import React, { useState, useEffect } from "react";


function Hero() {
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: "💎",
      title: "Uzmanlık",
      description: "Alanında uzman klinik psikologlardan, dil ve profesyonel destek.",
      color: "from-emerald-500 to-teal-600"
    },
    {
      icon: "🎯",
      title: "Teknoloji",
      description: "İlişkileriniz ve beklentilerinize göre kişiselleştirilmiş psikolojik destek yaklaşımı.",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: "🌟",
      title: "Erişilebilirlik",
      description: "Herkes için her yerden erişilebilir, büro dışı ve evlerden erişilebilir psikolojik destek süreci.",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: "🔐",
      title: "Gizlilik",
      description: "AIpathy sizinle kişisel güçlü paylaşımlar tarafından korunan ve güvenli görüşmeler.",
      color: "from-pink-500 to-rose-600"
    }
  ];

  const steps = [
    {
      title: "Uzmanınızla Eşleşin",
      description: "AIpathy, ihtiyaçlarınız ve beklentilerinizi anlamak için kayıt sırasında kısa sorularla size en uygun uzman psikologları ulaştırmanız ve seçmenizi sağlar.",
      icon: "👥",
      bgColor: "from-blue-50 to-blue-100"
    },
    {
      title: "Uzmanınızla Ücretsiz Tanışın",
      description: "Dilediğiniz uzman psikologla uyumunuzu değerlendirmek ve tercihten beklentilerinizi konuşmak için 15 dakikalık ücretsiz ön görüşmeler yapabilirsiniz.",
      icon: "💬",
      bgColor: "from-teal-50 to-teal-100"
    },
    {
      title: "Psikolojik Destek Yolculuğunuza Başlayın",
      description: "Seçtiğiniz uzman psikolog ile kişiselleştirilmiş psikolojik destek sürecinize kolaylıkla ve güvenli bir şekilde başlarsınız.",
      icon: "✨",
      bgColor: "from-emerald-50 to-emerald-100"
    }
  ];

  const mentalHealthFacts = [
    {
      icon: "🧠",
      stat: "4 kişiden 1'i",
      description: "yaşamının bir döneminde mental sağlık sorunu yaşar"
    },
    {
      icon: "🌍",
      stat: "Her 40 saniyede",
      description: "dünyada 1 kişi intihar nedeniyle yaşamını kaybediyor"
    },
    {
      icon: "🤝",
      stat: "Mental hastalıkların %75'i",
      description: "14-25 yaş arasında başlar"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 overflow-hidden relative">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-teal-200 to-emerald-200 rounded-full opacity-20 animate-pulse blur-sm"></div>
        <div className="absolute top-60 right-20 w-24 h-24 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full opacity-30 animate-bounce blur-sm"></div>
        <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200 to-teal-200 rounded-full opacity-15 animate-pulse blur-sm"></div>
        <div className="absolute top-1/2 right-1/3 w-16 h-16 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-25 animate-bounce blur-sm"></div>
      </div>

  
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className={`grid lg:grid-cols-2 gap-16 items-center mb-24 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
       
          <div className="space-y-8">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-100 to-emerald-100 rounded-full text-teal-700 font-medium text-sm mb-6 shadow-lg border border-teal-200">
              <span className="w-3 h-3 bg-teal-500 rounded-full mr-3 animate-pulse shadow-sm"></span>
              Yapay Zeka Destekli Psikolojik Analiz
            </div>

            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                Daha iyi hissetmeye
              </span>
              <br />
              <span className="bg-gradient-to-r from-teal-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent animate-pulse">
                bugün
              </span>
              <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">
                {" "}başlayın
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              AIpathy ailesiyle psikolojik destek yolculuğunuza güvenli bir adım atın!
              Size en uygun uzman ile şimdi ücretsiz ön görüşme yaparak tanışın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group relative bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-gray-800 font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl overflow-hidden">
                <span className="relative z-10 flex items-center gap-2">
                  <span>Ücretsiz Deneyin</span>
                  <span className="text-lg">→</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 font-semibold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                <span>Nasıl Çalışır?</span>
                <span className="text-lg">🎬</span>
              </button>
            </div>

            {/* İstatistik */}
            <div className="flex gap-8 pt-8">
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-gray-800">1M+</div>
                <div className="text-sm text-gray-500">Kullanıcı</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-gray-800">95%</div>
                <div className="text-sm text-gray-500">Memnuniyet</div>
              </div>
              <div className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-lg">
                <div className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-gray-800">24/7</div>
                <div className="text-sm text-gray-500">Destek</div>
              </div>
              </div>
              </div>

              <div className="relative">
            <div className="relative">
              <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-4 transform rotate-6 hover:rotate-3 transition-transform duration-500 border-8 border-gray-200">
                <div className="bg-gradient-to-br from-teal-500 to-emerald-600 rounded-2xl p-1">
                  <div className="bg-white rounded-xl p-6 h-96">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-gray-800 font-bold text-sm">AI</span>
                        </div>
                        <span className="font-bold text-gray-800">AIpathy</span>
                      </div>
                      <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-sm"></div>
                    </div>

                
                    <div className="space-y-3">
                      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 rounded-2xl p-4 border border-teal-100 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-xl">🎤</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">Ses Analizi</div>
                            <div className="text-xs text-teal-600 font-medium">Aktif</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-4 border border-blue-100 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-xl">📷</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">Mimik Analizi</div>
                            <div className="text-xs text-blue-600 font-medium">Hazır</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-4 border border-purple-100 shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-sm">
                            <span className="text-xl">📋</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800 text-sm">PHQ-9 Testi</div>
                            <div className="text-xs text-purple-600 font-medium">Tamamlandı</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Analiz*/}
                    <div className="mt-6">
                      <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-600 text-gray-800 font-semibold py-3 rounded-2xl text-sm shadow-lg hover:shadow-xl transition-shadow duration-300">
                        Analizi Başlat
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                <span className="text-2xl">✨</span>
              </div>
              <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-xl shadow-lg flex items-center justify-center animate-pulse">
                <span className="text-xl">💖</span>
              </div>
              <div className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-full shadow-lg flex items-center justify-center animate-pulse">
                <span className="text-sm">🔮</span>
              </div>
            </div>
          </div>
        </div>

        {/* Güven faktörleri */}
        <div className="text-center mb-20">
          <p className="text-gray-700 mb-8 text-lg font-medium">Dünya genelinde 1 milyondan fazla kullanıcının güvendiği platform</p>
          <div className="flex justify-center items-center gap-8 mb-8">
            <div className="px-6 py-3 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <span className="text-sm font-bold text-gray-800">1M+ Kullanıcı</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <span className="text-sm font-bold text-gray-800">95% Memnuniyet</span>
            </div>
            <div className="px-6 py-3 bg-white rounded-2xl shadow-lg border-2 border-gray-200">
              <span className="text-sm font-bold text-gray-800">24/7 Destek</span>
            </div>
          </div>
          <div className="flex justify-center items-center gap-12">
            <div className="text-2xl font-bold text-gray-600">TechCorp</div>
            <div className="text-2xl font-bold text-gray-600">AILabs</div>
            <div className="text-2xl font-bold text-gray-600">MindTech</div>
            <div className="text-2xl font-bold text-gray-600">HealthAI</div>
          </div>
        </div>

        {/* Özellikler bölümü */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              <span className="bg-gradient-to-r from-teal-600 to-emerald-600 bg-clip-text text-gray-800">
                Neden AIpathy'i Tercih Ediyorlar?
              </span>
            </h2>
            <h3 className="text-2xl font-semibold text-gray-700">
              1 Milyonu Aşkın Kullanıcı
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 border-2 border-gray-100 relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="relative z-10">
                  <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nasıl Çalışır bölümü */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Nasıl Çalışır</h2>
            <p className="text-xl text-gray-600">3 basit adımda psikolojik destek yolculuğunuza başlayın</p>
          </div>

          <div className="space-y-8 max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${step.bgColor} rounded-3xl p-8 transition-all duration-700 transform ${currentStep === index ? 'scale-105 shadow-2xl' : 'hover:scale-102 hover:shadow-xl'
                  } border-2 ${currentStep === index ? 'border-teal-300' : 'border-transparent'} relative`}
              >
                <div className="flex items-center gap-8">
                  <div className="flex-shrink-0 relative z-10">
                    <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-gray-800 font-bold text-2xl transition-all duration-300 shadow-xl ${currentStep === index
                      ? 'bg-gradient-to-br from-teal-500 to-emerald-600 shadow-lg scale-110'
                      : 'bg-gradient-to-br from-teal-600 to-emerald-600'
                      }`}>
                      {index + 1}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-800 leading-relaxed text-lg">
                      {step.description}
                    </p>
                  </div>
                  <div className="hidden lg:block flex-shrink-0">
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl transition-all duration-300 shadow-lg ${currentStep === index ? 'bg-white shadow-lg scale-110' : 'bg-white/50'
                      }`}>
                      {step.icon}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mental Sağlık Farkındalığı Bölümü */}
        <div className="mb-24">
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-3xl p-12 shadow-2xl border border-white/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100/30 to-pink-100/30"></div>
            <div className="relative z-10">
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full text-indigo-700 font-medium text-sm mb-6 shadow-lg border border-indigo-200">
                  <span className="text-lg mr-2">🧠</span>
                  Mental Sağlık Farkındalığı
                </div>
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-gray-800">
                    Mental Sağlık Hakkında Bilmeniz Gerekenler
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                  Mental sağlık sorunları hayatımızın her anında karşımıza çıkabilir.
                  Doğru bilgi ve zamanında destek alarak bu sorunların üstesinden gelebiliriz.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {mentalHealthFacts.map((fact, index) => (
                  <div key={index} className="bg-white rounded-3xl p-8 shadow-lg text-center border-2 border-gray-100">
                    <div className="text-5xl mb-4">{fact.icon}</div>
                    <div className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-gray-800 mb-3">
                      {fact.stat}
                    </div>
                    <p className="text-gray-800 leading-relaxed font-medium">
                      {fact.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl border-2 border-gray-100">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      🌱 Mental Sağlığınızı Koruyun
                    </h3>
                    <p className="text-gray-800 leading-relaxed mb-6 font-medium">
                      Mental sağlık sorunları depresyon, anksiyete, panik atak, obsesif kompulsif bozukluk (OKB),
                      travma sonrası stres bozukluğu (TSSB) ve daha birçok durumu kapsar. Bu durumlar tedavi
                      edilebilir ve profesyonel destek ile yaşam kalitenizi artırabilirsiniz.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-gradient-to-r from-teal-100 to-emerald-100 text-teal-800 rounded-full text-sm font-bold border border-teal-200">Depresyon</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 rounded-full text-sm font-bold border border-blue-200">Anksiyete</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-800 rounded-full text-sm font-bold border border-purple-200">Panik Atak</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-pink-100 to-rose-100 text-pink-800 rounded-full text-sm font-bold border border-pink-200">OKB</span>
                      <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 rounded-full text-sm font-bold border border-orange-200">TSSB</span>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-8xl mb-4">🤝</div>
                    <div className="bg-gradient-to-br from-teal-600 to-emerald-700 text-gray-800 rounded-2xl p-6 shadow-2xl">
                      <p className="font-bold mb-2 text-lg drop-shadow">Yalnız değilsiniz!</p>
                      <p className="text-sm drop-shadow">Profesyonel destek almak güçlü olmanın bir işaretidir.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        
        <div className="relative bg-gradient-to-r from-teal-100 via-emerald-100 to-green-100 rounded-3xl p-16 text-center overflow-hidden shadow-2xl border-2 border-teal-200">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400/20 to-emerald-400/20"></div>
          <div className="relative z-10">
            <div className="text-6xl mb-6">🌟</div>
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              AIpathy ile mental sağlığınızın
            </h2>
            <h3 className="text-3xl font-semibold text-gray-700 mb-6">
              kontrolünü elinize alın!
            </h3>
            <p className="text-lg text-gray-800 font-medium mb-8 max-w-2xl mx-auto">
              Yapay zeka destekli analiz ve uzman psikolog desteği ile
              kişiselleştirilmiş mental sağlık yolculuğunuza bugün başlayın.
            </p>
            <button className="bg-white border-2 border-teal-500 text-teal-700 font-semibold px-12 py-5 rounded-2xl hover:bg-teal-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl text-lg">
              AIpathy ile Başlayın - Ücretsiz Deneyin
            </button>
          </div>
          <div className="absolute top-8 left-8 w-16 h-16 bg-teal-300 rounded-full opacity-40 animate-pulse shadow-lg"></div>
          <div className="absolute bottom-8 right-8 w-20 h-20 bg-emerald-300 rounded-full opacity-30 animate-bounce shadow-lg"></div>
          <div className="absolute top-1/2 right-12 w-12 h-12 bg-green-300 rounded-full opacity-35 animate-pulse shadow-lg"></div>
        </div>
      </div>
    </main>
  );
}
export default Hero;