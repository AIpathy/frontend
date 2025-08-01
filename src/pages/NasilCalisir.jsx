import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Brain,
  Users,
  TestTube,
  BarChart3,
  MessageCircle,
  Shield,
  Stethoscope,
  Eye,
  Mic,
  FileText,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Lock,
  TrendingUp,
  Heart,
  Play,
  Star,
  Zap,
  Leaf,
  ArrowLeft,
  Home
} from 'lucide-react';

const AIpathyNasilCalisir = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const analysisSteps = [
    {
      icon: <Mic className="w-12 h-12" />,
      title: "Ses Analizi",
      description: "Gelişmiş yapay zeka algoritmaları ile ses tonunuz, konuşma hızınız ve duygusal değişiklikleriniz analiz edilir.",
      detail: "Real-time ses işleme teknolojisi"
    },
    {
      icon: <Eye className="w-12 h-12" />,
      title: "Mimik Tanıma",
      description: "Yüz ifadeleriniz ve mikro ifadeleriniz duygusal durumunuzu anlamak için detaylı şekilde değerlendirilir.",
      detail: "Computer vision teknolojisi"
    },
    {
      icon: <FileText className="w-12 h-12" />,
      title: "Bilimsel Testler",
      description: "Uluslararası standartlara uygun psikolojik testler ile kapsamlı ruh sağlığı değerlendirmesi yapılır.",
      detail: "Klinik olarak onaylanmış testler"
    },
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: "AI Sentezi",
      description: "Tüm verileriniz yapay zeka ile analiz edilerek size özel, kişiselleştirilmiş sonuçlar ve öneriler sunulur.",
      detail: "Machine learning destekli analiz"
    }
  ];

  const features = [
    {
      category: "Kullanıcı Deneyimi",
      icon: <Users className="w-8 h-8" />,
      items: [
        { icon: <TestTube />, title: "Kapsamlı Test Kütüphanesi", desc: "50+ bilimsel test" },
        { icon: <BarChart3 />, title: "Akıllı Dashboard", desc: "Gelişim takibi ve analizler" },
        { icon: <MessageCircle />, title: "24/7 AI Destek", desc: "Anlık yardım ve rehberlik" }
      ]
    },
    {
      category: "Uzman Araçları",
      icon: <Stethoscope className="w-8 h-8" />,
      items: [
        { icon: <TrendingUp />, title: "Hasta Takip Sistemi", desc: "Detaylı ilerleme raporları" },
        { icon: <Brain />, title: "AI Klinik Asistanı", desc: "Akıllı tanı desteği" },
        { icon: <FileText />, title: "Otomatik Raporlama", desc: "Profesyonel değerlendirmeler" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
     <div className="relative pt-8 pb-16 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <button 
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border border-emerald-200 hover:border-emerald-300 overflow-hidden animate-bounce-subtle"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            <ArrowLeft className="w-6 h-6 text-emerald-700 group-hover:-translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10 animate-wiggle" />
            <span className="font-semibold text-gray-800 relative z-10 group-hover:text-emerald-800 transition-colors">Ana Sayfaya Dön</span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
          </button>
        </div>
      </div>

      {/* Hero */}
      <div className="relative min-h-screen flex items-center justify-center bg-white">
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
          {/* AIpathy Logo */}
          <div className="mb-16 flex justify-center">
            <div className="relative group">
              <svg width="600" height="180" viewBox="0 0 600 180" className="drop-shadow-2xl">
                <defs>
                 
                  <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="30%" stopColor="#047857" />
                    <stop offset="60%" stopColor="#065f46" />
                    <stop offset="100%" stopColor="#064e3b" />
                  </linearGradient>

                  <radialGradient id="heartGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                    <stop offset="70%" stopColor="#059669" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#047857" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="25%" stopColor="#047857" />
                    <stop offset="50%" stopColor="#065f46" />
                    <stop offset="75%" stopColor="#0d9488" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>

                  <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#022c22" />
                    <stop offset="30%" stopColor="#052e16" />
                    <stop offset="60%" stopColor="#064e3b" />
                    <stop offset="100%" stopColor="#065f46" />
                  </linearGradient>

                 
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <filter id="textGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

             
                <ellipse cx="70" cy="65" rx="40" ry="35" fill="url(#heartGlow)" opacity="0.5" className="animate-pulse" />

            
                <path d="M70,50 C55,25 20,25 20,50 C20,75 70,115 70,115 C70,115 120,75 120,50 C120,25 85,25 70,50 Z"
                  fill="url(#heartGradient)"
                  filter="url(#glow)"
                  className="animate-pulse">
                  <animateTransform attributeName="transform"
                    attributeType="XML"
                    type="scale"
                    values="1;1.03;1"
                    dur="2.5s"
                    repeatCount="indefinite" />
                </path>

            
                <path d="M50,40 C47,35 40,35 40,40 C40,45 50,55 50,55 C50,55 60,45 60,40 C60,35 53,35 50,40 Z"
                  fill="rgba(255,255,255,0.2)"
                  opacity="0.6" />

        
                <g filter="url(#glow)">
                  <polyline points="130,65 155,65 170,45 185,85 200,40 215,90 230,65 300,65"
                    stroke="url(#pulseGradient)"
                    strokeWidth="5"
                    fill="none"
                    strokeLinecap="round">
                    <animate attributeName="stroke-dasharray"
                      values="0,250;125,125;250,0;0,250"
                      dur="3.5s"
                      repeatCount="indefinite" />
                    <animate attributeName="opacity"
                      values="0.7;1;0.8;0.7"
                      dur="2s"
                      repeatCount="indefinite" />
                  </polyline>
                </g>

            
                <text x="60" y="165" fontSize="68" fontWeight="900" fill="url(#textGradient)"
                  fontFamily="system-ui, -apple-system, sans-serif"
                  filter="url(#textGlow)">
                  AIpathy
                </text>

               
                <g opacity="0.6">
                  <circle cx="500" cy="50" r="3" fill="#059669" className="animate-pulse" />
                  <circle cx="520" cy="80" r="2" fill="#047857" className="animate-ping" />
                  <circle cx="480" cy="100" r="4" fill="#065f46" className="animate-pulse" />
                </g>
              </svg>

            
              <div className="absolute -top-6 -left-6 w-10 h-10 text-green-500 opacity-70">
                <Leaf className="w-full h-full transform rotate-12" />
              </div>
              <div className="absolute -top-4 -right-12 w-8 h-8 text-green-600 opacity-60">
                <Leaf className="w-full h-full transform -rotate-45" />
              </div>
              <div className="absolute -bottom-8 left-16 w-9 h-9 text-green-700 opacity-80">
                <Leaf className="w-full h-full transform rotate-90" />
              </div>
              <div className="absolute -bottom-4 -right-8 w-7 h-7 text-green-500 opacity-50">
                <Leaf className="w-full h-full transform -rotate-12" />
              </div>
            </div>
          </div>

          <h1 className="text-6xl md:text-7xl font-bold mb-8 text-gray-900">
            Nasıl Çalışır?
          </h1>

          <p className="text-2xl md:text-3xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
            Yapay zeka destekli ruh sağlığı platformu ile
            <span className="text-green-600 font-semibold"> kişiselleştirilmiş </span>
            destek alın
          </p>

          <div className="flex justify-center">
            <a
              href="https://www.youtube.com/watch?v=ZkTvw3usMw4&ab_channel=TEDxTalks"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-green-600 text-green-700 px-12 py-4 rounded-full text-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300"
            >
              Demoyu İzle
            </a>
          </div>

        </div>
      </div>

      {/* Analiz İşleme Bölümü*/}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold mb-8">
              <Leaf className="w-5 h-5 mr-2" />
              Analiz Süreci
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              4 Adımda Kapsamlı Analiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Modern teknoloji ile ruh sağlığınız detaylı şekilde analiz edilir
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {analysisSteps.map((step, index) => (
              <div
                key={index}
                className="relative group cursor-pointer transition-all duration-300 hover:scale-105"
                onMouseEnter={() => setActiveStep(index)}
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                  <div className="absolute -top-4 -right-4 bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl shadow-lg">
                    {index + 1}
                  </div>

                  <div className="bg-green-600 p-4 rounded-2xl text-white mb-6 w-fit">
                    {step.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{step.description}</p>

                  <div className="flex items-center text-green-600 font-medium">
                    <Star className="w-4 h-4 mr-2" />
                    {step.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Özellikler */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hem kullanıcılar hem de uzmanlar için tasarlanmış kapsamlı araçlar
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-green-600 text-white p-3 rounded-2xl">
                    {category.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900">{category.category}</h3>
                </div>

                <div className="space-y-6">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="group bg-gray-50 rounded-2xl p-6 border border-gray-200 hover:bg-gray-100 hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div className="bg-green-600 text-white p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-xl font-semibold mb-2 text-gray-900">
                            {item.title}
                          </h4>
                          <p className="text-gray-600">
                            {item.desc}
                          </p>
                        </div>
                        <ArrowRight className="w-5 h-5 text-green-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Güvenlik */}
      <div className="py-20 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full text-lg font-semibold mb-8">
                <Shield className="w-5 h-5 mr-2" />
                Güvenlik & Gizlilik
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Verileriniz Güvende
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tüm kişisel verileriniz end-to-end şifreleme ile korunur. KVKK ve GDPR uyumlu güvenlik protokollerimiz ile gizliliğiniz garanti altındadır.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">256-bit SSL şifreleme</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">KVKK & GDPR uyumlu</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <span className="text-gray-700 font-medium">Zero-knowledge architecture</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-600 text-lg italic">
                  "Ruhsal iyi oluşunuz için güvenli bir platform"
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-200">
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-600 text-white rounded-2xl p-6">
                    <Lock className="w-12 h-12 mb-4" />
                    <div className="text-2xl font-bold">256-bit</div>
                    <div className="text-green-100">Şifreleme</div>
                  </div>
                  <div className="bg-green-700 text-white rounded-2xl p-6">
                    <Eye className="w-12 h-12 mb-4" />
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-green-100">Gizlilik</div>
                  </div>
                  <div className="bg-green-800 text-white rounded-2xl p-6">
                    <CheckCircle className="w-12 h-12 mb-4" />
                    <div className="text-2xl font-bold">KVKK</div>
                    <div className="text-green-100">Uyumlu</div>
                  </div>
                  <div className="bg-green-900 text-white rounded-2xl p-6">
                    <Shield className="w-12 h-12 mb-4" />
                    <div className="text-2xl font-bold">24/7</div>
                    <div className="text-green-100">Korumalı</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 text-lg">
            © 2025 AIpathy - Ruh sağlığı desteğinin yeni yolu
          </p>
        </div>
      </div>
    </div>
  );
};

export default AIpathyNasilCalisir;