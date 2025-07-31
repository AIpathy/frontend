import React, { useState, useEffect } from 'react';
import { ArrowLeft, Heart, Brain, Users, Shield, Zap, ChevronRight, Star, Target, Eye, MessageSquare, Leaf, TreePine, Sparkles, Monitor, Lock, BarChart3, Settings, Code, Database } from 'lucide-react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float opacity-30"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: `${4 + Math.random() * 3}s`
          }}
        >
          {i % 3 === 0 ? (
            <Leaf className="w-6 h-6 text-emerald-600" />
          ) : i % 3 === 1 ? (
            <TreePine className="w-8 h-8 text-green-600" />
          ) : (
            <Sparkles className="w-5 h-5 text-emerald-500" />
          )}
        </div>
      ))}
    </div>
  );

  const MouseFollower = () => (
    <div 
      className="fixed pointer-events-none z-0 opacity-20"
      style={{
        left: mousePosition.x - 50,
        top: mousePosition.y - 50,
        transition: 'all 0.3s ease-out'
      }}
    >
      <div className="w-24 h-24 bg-gradient-to-r from-emerald-400/30 to-green-400/30 rounded-full animate-pulse"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-forest-100 relative overflow-hidden">
      <FloatingElements />
      <MouseFollower />
      
      
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-600/20 animate-pulse-slow"></div>
        <div className="absolute inset-0 bg-gradient-radial from-emerald-500/15 to-transparent animate-spin-slow"></div>
        <div className="absolute inset-0 bg-gradient-conic from-emerald-500/10 to-transparent animate-rotate-slow"></div>
      </div>

     
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

      
      <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
        <div 
          className="text-center mb-20"
          id="hero"
          style={{ transform: `translateY(${scrollY * 0.15}px)` }}
        >
          <div className={`inline-flex items-center gap-4 bg-white/90 backdrop-blur-xl px-12 py-6 rounded-full text-3xl font-bold mb-8 shadow-2xl relative overflow-hidden transition-all duration-1000 border border-emerald-200 animate-glow ${isVisible.hero ? 'animate-bounce-in' : 'opacity-0 translate-y-10'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 animate-pulse-slow"></div>
            <div className="flex items-center gap-2 relative z-10">
              <Heart className="w-12 h-12 animate-heartbeat text-emerald-700 fill-emerald-700" />
              <svg className="w-16 h-8" viewBox="0 0 64 32">
                <path d="M2 16 L12 16 L16 8 L20 24 L24 12 L28 20 L32 16 L62 16" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                      className="text-emerald-700 animate-draw-line"
                />
              </svg>
            </div>
            <span className="relative z-10 text-gray-800 animate-text-shimmer">
              <span className="text-emerald-700">AI</span>pathy
            </span>
          </div>
          
          <h1 className={`text-6xl md:text-7xl font-bold text-gray-800 mb-8 leading-tight transition-all duration-1200 delay-300 ${isVisible.hero ? 'animate-slide-up-stagger' : 'opacity-0 translate-y-20'}`}>
            Psikolojik Sağlığı{' '}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-emerald-700 bg-clip-text text-transparent animate-gradient-flow">
                Teknolojiyle
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full animate-expand-wave"></div>
            </span>{' '}
            Buluşturan Platform
          </h1>
          
          <p className={`text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed transition-all duration-1200 delay-600 ${isVisible.hero ? 'animate-fade-in-up' : 'opacity-0'}`}>
            🌿 Modern yaşamın getirdiği stres, yalnızlık ve anksiyete ile mücadele eden bireylere yapay zeka destekli, bilimsel ve erişilebilir psikolojik destek sunuyoruz.
          </p>
          
          <div className={`mt-8 transition-all duration-1200 delay-900 ${isVisible.hero ? 'animate-bounce-in-delayed' : 'opacity-0 scale-90'}`}>
            <div className="flex justify-center items-center gap-4">
              <TreePine className="w-16 h-16 text-emerald-600 animate-sway-gentle" />
              <Brain className="w-14 h-14 text-green-600 animate-pulse-glow" />
              <TreePine className="w-16 h-16 text-emerald-600 animate-sway-gentle" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>

        {/* Görev ve vizyon */}
        <div id="mission-vision" className="grid lg:grid-cols-2 gap-12 mb-24">
          <div className={`group relative bg-gradient-to-br from-white/95 to-emerald-50/90 backdrop-blur-xl border-2 border-emerald-300 rounded-3xl p-12 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-700 hover:-translate-y-4 hover:scale-105 overflow-hidden ${isVisible['mission-vision'] ? 'animate-slide-right-bounce' : 'opacity-0 -translate-x-20'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 animate-pulse-subtle"></div>
            <div className="absolute top-4 right-4 opacity-20">
              <Target className="w-32 h-32 animate-spin-slow text-emerald-600" />
            </div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-emerald-100 rounded-2xl backdrop-blur-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-float-gentle">
                <Target className="w-10 h-10 text-emerald-700 animate-pulse-glow" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 animate-text-glow">Misyonumuz</h3>
            </div>
            <p className="text-xl leading-relaxed text-gray-700 relative z-10">
              🎯 Ruh sağlığını teknolojiyle destekleyerek, herkesin psikolojik destek süreçlerine adil, etkili ve kesintisiz biçimde erişmesini sağlamak. Bilimsel temellere, etik ilkelere ve kullanıcı deneyimine dayalı bir yapı oluşturarak, psikolojik desteğin kalitesini artırmayı hedefliyoruz.
            </p>
          </div>
          
          <div className={`group relative bg-gradient-to-br from-white/95 to-green-50/90 backdrop-blur-xl border-2 border-green-300 rounded-3xl p-12 shadow-2xl hover:shadow-green-500/50 transition-all duration-700 hover:-translate-y-4 hover:scale-105 overflow-hidden ${isVisible['mission-vision'] ? 'animate-slide-left-bounce' : 'opacity-0 translate-x-20'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-green-50/50 to-emerald-50/50 animate-pulse-subtle"></div>
            <div className="absolute top-4 right-4 opacity-20">
              <Eye className="w-32 h-32 animate-float text-green-600" />
            </div>
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="p-3 bg-green-100 rounded-2xl backdrop-blur-sm group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 animate-float-gentle" style={{ animationDelay: '0.5s' }}>
                <Eye className="w-10 h-10 text-green-700 animate-blink" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800 animate-text-glow">Vizyonumuz</h3>
            </div>
            <p className="text-xl leading-relaxed text-gray-700 relative z-10">
              🌍 AIpathy'yi yalnızca Türkiye'de değil, küresel ölçekte hizmet veren, yapay zeka destekli psikolojik analiz ve destek alanında öncü bir marka haline getirmek. Dijital psikoloji alanında hem akademik hem teknolojik katkılar sunarak, bu alandaki dönüşümün bir parçası olmayı amaçlıyoruz.
            </p>
          </div>
        </div>

        {/* Nasıl Çalışır */}
        <div id="how-it-works" className="mb-24">
          <h2 className={`text-5xl font-bold text-center text-gray-800 mb-16 transition-all duration-1000 animate-text-glow ${isVisible['how-it-works'] ? 'animate-slide-up-bounce' : 'opacity-0 translate-y-10'}`}>
            🔧 Nasıl Çalışır?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                icon: Users, 
                title: '1. Danışan Modülü', 
                desc: 'Yapay zeka destekli testlerle ruhsal durum analizi, uzman eşleştirme ve çoklu iletişim kanalları', 
                color: 'emerald', 
                delay: '0s',
                features: ['AI destekli ön analiz', 'Akıllı uzman eşleştirme', 'Yazılı/Sesli/Görüntülü iletişim']
              },
              { 
                icon: Monitor, 
                title: '2. Uzman Paneli', 
                desc: 'Test sonuçlarını grafiksel görüntüleme, seans yönetimi ve detaylı danışan takibi', 
                color: 'green', 
                delay: '0.3s',
                features: ['Grafiksel analiz paneli', 'Randevu ve seans yönetimi', 'Kişiye özel notlar']
              },
              { 
                icon: Brain, 
                title: '3. AI Analiz Sistemi', 
                desc: 'NLP ve duygu analizi ile ses/metin değerlendirmesi ve sürekli öğrenen yapay zeka', 
                color: 'emerald', 
                delay: '0.6s',
                features: ['NLP tabanlı analiz', 'Duygu yoğunluk ölçümü', 'Sürekli öğrenen AI']
              }
            ].map((module, index) => (
              <div 
                key={index}
                className={`group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-700 hover:-translate-y-6 hover:scale-105 overflow-hidden ${isVisible['how-it-works'] ? 'animate-bounce-in-stagger' : 'opacity-0 scale-90'}`}
                style={{ animationDelay: module.delay }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/30 to-green-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-subtle"></div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Sparkles className="w-20 h-20 animate-spin-slow" />
                </div>
                
                <div className={`relative bg-gradient-to-br from-emerald-100 to-emerald-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 shadow-xl hover:shadow-emerald-500/50 overflow-hidden animate-float-gentle`}>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/30 to-green-400/30 animate-pulse-glow"></div>
                  <module.icon className={`w-10 h-10 text-emerald-700 relative z-10 group-hover:animate-pulse-bright`} />
                </div>
                
                <h4 className="font-bold text-gray-800 mb-4 text-xl group-hover:text-emerald-700 transition-colors text-center animate-text-glow">{module.title}</h4>
                <p className="text-gray-600 leading-relaxed mb-6 text-center">{module.desc}</p>
                
                <div className="space-y-2">
                  {module.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-600 group-hover:translate-x-2 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                      <ChevronRight className={`w-4 h-4 text-emerald-600 animate-pulse-gentle`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tecknolojik altyapı */}
        <div id="tech-stack" className={`mb-24 transition-all duration-1000 ${isVisible['tech-stack'] ? 'animate-slide-up-wave' : 'opacity-0 translate-y-20'}`}>
          <h2 className="text-5xl font-bold text-center text-gray-800 mb-16 animate-text-glow">⚡ Teknolojik Altyapı</h2>
          <div className="bg-gradient-to-br from-white/90 to-emerald-50/80 backdrop-blur-xl rounded-3xl p-12 shadow-2xl border border-emerald-200 hover:border-emerald-400 transition-all duration-700 hover:shadow-emerald-500/25 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 animate-pulse-subtle"></div>
            <div className="absolute top-8 right-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Code className="w-32 h-32 animate-spin-slow" />
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
              {[
                { 
                  title: 'Backend & Database', 
                  icon: Database,
                  items: ['Node.js + Express', 'MySQL Database', 'JWT Authentication'], 
                  color: 'emerald' 
                },
                { 
                  title: 'Frontend & UI', 
                  icon: Monitor,
                  items: ['React + TailwindCSS', 'Chart.js Grafikleri', 'i18n Çok Dilli Destek'], 
                  color: 'green' 
                },
                { 
                  title: 'AI & Security', 
                  icon: Shield,
                  items: ['NLP Duygu Analizi', 'HTTPS + End-to-End Şifreleme', 'Docker Mikroservis'], 
                  color: 'emerald' 
                }
              ].map((tech, index) => (
                <div key={index} className="group/tech">
                  <div className="flex items-center gap-3 mb-8">
                    <div className={`p-3 bg-emerald-100 rounded-2xl group-hover/tech:scale-110 group-hover/tech:rotate-12 transition-all duration-500 animate-float-gentle`} style={{ animationDelay: `${index * 0.2}s` }}>
                      <tech.icon className={`w-8 h-8 text-emerald-700 animate-pulse-glow`} />
                    </div>
                    <h4 className={`text-2xl font-bold text-gray-800 group-hover/tech:text-emerald-700 transition-colors animate-text-glow`}>{tech.title}</h4>
                  </div>
                  <ul className="space-y-4">
                    {tech.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 group-hover/tech:translate-x-3 transition-transform duration-300" style={{ animationDelay: `${i * 0.1}s` }}>
                        <ChevronRight className={`w-5 h-5 text-emerald-600 group-hover/tech:scale-125 transition-transform animate-pulse-gentle`} />
                        <span className="text-gray-600 group-hover/tech:text-gray-800 transition-colors">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Önemli Özellikler */}
        <div id="features" className="mb-24">
          <h2 className={`text-5xl font-bold text-center text-gray-800 mb-16 transition-all duration-1000 animate-text-glow ${isVisible.features ? 'animate-slide-up-bounce' : 'opacity-0 translate-y-10'}`}>
            ✨ Neden Bizi Tercih Etmelisiniz?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Brain, title: 'Kişiselleştirilmiş Eşleştirme', desc: 'Her danışan için en uygun uzmanı yapay zeka ile belirliyoruz', color: 'emerald' },
              { icon: BarChart3, title: 'Anında Geri Bildirim', desc: 'Test sonuçları grafiklerle anlık olarak sunulur, kendinizi analiz edebilirsiniz', color: 'green' },
              { icon: Settings, title: 'Uzmanlara Özel Araçlar', desc: 'Psikologların danışan takibini verimli yapabilmeleri için gelişmiş kontrol paneli', color: 'emerald' },
              { icon: Star, title: 'Bilimsel Temelli', desc: 'WHO ve akademik kaynaklara dayalı testler kullanıyoruz', color: 'green' },
              { icon: Lock, title: 'Gizlilik Önceliğimizdir', desc: 'Kişisel verileriniz sadece size ve uzmanınıza görünür, üçüncü kişilerle paylaşılmaz', color: 'emerald' },
              { icon: Zap, title: 'Sürekli Öğrenen AI', desc: 'Yapay zeka sistemi sürekli öğrenir ve daha isabetli değerlendirmeler yapar', color: 'green' }
            ].map((feature, index) => (
              <div 
                key={index}
                className={`group relative bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-500/25 transition-all duration-700 hover:-translate-y-6 hover:scale-105 overflow-hidden ${isVisible.features ? 'animate-slide-up-stagger' : 'opacity-0 translate-y-20'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-green-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-subtle"></div>
                <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles className="w-16 h-16 animate-spin-slow" />
                </div>
                
                <div className={`p-4 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-2xl w-fit mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 relative z-10 animate-float-gentle`} style={{ animationDelay: `${index * 0.1}s` }}>
                  <feature.icon className={`w-12 h-12 text-emerald-700 group-hover:animate-pulse-bright`} />
                </div>
                
                <h4 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-emerald-700 transition-colors relative z-10 animate-text-glow">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed relative z-10">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Hedef Kitle */}
        <div id="audience" className={`relative bg-gradient-to-br from-white/95 to-emerald-50/90 backdrop-blur-xl border-2 border-emerald-300 rounded-3xl p-16 text-center mb-24 overflow-hidden transition-all duration-1000 shadow-2xl hover:shadow-emerald-500/50 hover:scale-105 ${isVisible.audience ? 'animate-slide-up-bounce' : 'opacity-0 translate-y-20'}`}>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 animate-pulse-subtle"></div>
          <div className="absolute top-8 left-8 opacity-20">
            <TreePine className="w-32 h-32 animate-sway-gentle text-emerald-600" />
          </div>
          <div className="absolute bottom-8 right-8 opacity-20">
            <Brain className="w-32 h-32 animate-pulse-glow text-green-600" />
          </div>
          
          <h2 className="text-5xl font-bold mb-12 relative z-10 text-gray-800 animate-text-glow">🎯 Kimler İçin?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {[
              { icon: Users, title: 'Destek Arayan Bireyler', desc: 'Psikolojik destek almak isteyen tüm bireyler için kapsamlı çözümler', delay: '0s' },
              { icon: Brain, title: 'Öğrenci ve Çalışanlar', desc: 'Üniversite öğrencileri, çalışanlar, ebeveynler ve ergenler', delay: '0.2s' },
              { icon: Monitor, title: 'Sağlık Profesyonelleri', desc: 'Dijital hasta takip platformu arayan psikologlar ve terapistler', delay: '0.4s' },
              { icon: Shield, title: 'Sağlık Kurumları', desc: 'Klinik süreçlerine dijital analiz desteği eklemek isteyen kurumlar', delay: '0.6s' }
            ].map((audience, index) => (
              <div 
                key={index}
                className={`group bg-white/80 backdrop-blur-xl rounded-2xl p-8 hover:bg-white/90 transition-all duration-500 hover:-translate-y-4 hover:scale-110 border border-emerald-200 hover:border-emerald-400 hover:shadow-xl hover:shadow-emerald-500/25 ${isVisible.audience ? 'animate-bounce-in-stagger' : 'opacity-0 scale-90'}`}
                style={{ animationDelay: audience.delay }}
              >
                <div className="p-4 bg-gradient-to-br from-emerald-100 to-green-100 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500 border border-emerald-200 animate-float-gentle" style={{ animationDelay: `${index * 0.2}s` }}>
                  <audience.icon className="w-12 h-12 text-emerald-700 group-hover:animate-pulse-bright" />
                </div>
                <h4 className="font-bold mb-3 text-xl text-gray-800 group-hover:text-emerald-700 transition-colors animate-text-glow">{audience.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">{audience.desc}</p>
              </div>
            ))}
          </div>
        </div>

     
        <div id="cta" className={`text-center relative overflow-hidden transition-all duration-1000 ${isVisible.cta ? 'animate-bounce-in-delayed' : 'opacity-0 scale-90'}`}>
          <div className="bg-gradient-to-br from-white/95 to-emerald-50/90 backdrop-blur-xl border-2 border-emerald-300 rounded-3xl p-16 shadow-2xl hover:shadow-emerald-500/50 transition-all duration-700 hover:scale-105 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 animate-pulse-subtle"></div>
            <div className="absolute top-8 left-8 opacity-20">
              <TreePine className="w-32 h-32 animate-sway-gentle text-emerald-600" />
            </div>
            <div className="absolute bottom-8 right-8 opacity-20">
              <Sparkles className="w-24 h-24 animate-spin-slow text-green-600" />
            </div>
            <h2 className="text-5xl font-bold mb-8 relative z-10 text-gray-800 animate-text-glow">🌿 Teknoloji ile Ruh Sağlığı Yolculuğunuza Başlayın</h2>
            <p className="text-2xl mb-12 text-gray-700 relative z-10">AIpathy ile bilimsel temelli, yapay zeka destekli psikolojik destek alın.</p>
            <button className="group relative bg-gradient-to-r from-emerald-600 to-green-600 text-white px-12 py-6 rounded-full font-bold text-xl hover:from-emerald-700 hover:to-green-700 transition-all duration-500 shadow-2xl hover:shadow-emerald-500/50 hover:scale-110 overflow-hidden animate-pulse-glow">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 to-green-400/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              <span className="relative z-10 text-green-800">🚀 Hemen Başlayın</span>
            </button>
          </div>
        </div>
      </div>


      <footer className="mt-32 py-16 text-center text-gray-600 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="flex items-center gap-2 p-3 bg-white/90 rounded-2xl shadow-lg border border-emerald-200 animate-float-gentle">
              <Heart className="w-8 h-8 text-emerald-700 animate-heartbeat fill-emerald-700" />
              <svg className="w-12 h-6" viewBox="0 0 48 24">
                <path d="M2 12 L8 12 L12 6 L16 18 L20 9 L24 15 L28 12 L46 12" 
                      stroke="currentColor" 
                      strokeWidth="2" 
                      fill="none" 
                      className="text-emerald-700 animate-draw-line"
                />
              </svg>
            </div>
            <span className="font-bold text-2xl text-gray-800 animate-text-shimmer">
              <span className="text-emerald-700">AI</span>pathy
            </span>
          </div>
          <p className="text-lg">© 2025 AIpathy. Tüm hakları saklıdır.</p>
          <p className="mt-2 text-emerald-600 font-medium animate-text-glow">🌿 Teknoloji yalnızca makineler için değil, insan ruhu için de çalışmalı.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes sway-gentle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3); }
          50% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-in-delayed {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes bounce-in-stagger {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          60% { opacity: 1; transform: scale(1.05) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slide-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up-bounce {
          0% { opacity: 0; transform: translateY(40px); }
          60% { opacity: 1; transform: translateY(-5px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up-stagger {
          0% { opacity: 0; transform: translateY(50px) scale(0.9); }
          70% { opacity: 1; transform: translateY(-10px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes slide-up-wave {
          0% { opacity: 0; transform: translateY(60px) rotateX(30deg); }
          60% { opacity: 1; transform: translateY(-10px) rotateX(-5deg); }
          100% { opacity: 1; transform: translateY(0) rotateX(0deg); }
        }
        @keyframes slide-right-bounce {
          0% { opacity: 0; transform: translateX(-40px) scale(0.9); }
          60% { opacity: 1; transform: translateX(5px) scale(1.02); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes slide-left-bounce {
          0% { opacity: 0; transform: translateX(40px) scale(0.9); }
          60% { opacity: 1; transform: translateX(-5px) scale(1.02); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient-flow {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes expand-wave {
          0% { width: 0%; transform: scaleY(0.5); }
          50% { transform: scaleY(1.5); }
          100% { width: 100%; transform: scaleY(1); }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
          50% { text-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4); }
        }
        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4); }
        }
        @keyframes pulse-bright {
          0%, 100% { filter: brightness(1); }
          50% { filter: brightness(1.3) saturate(1.2); }
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes blink {
          0%, 90%, 100% { opacity: 1; }
          95% { opacity: 0.3; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-3deg); }
          75% { transform: rotate(3deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes pulse-gentle {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 1; }
        }
        @keyframes draw-line {
          0% { stroke-dasharray: 0 100; }
          100% { stroke-dasharray: 100 0; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 5px rgba(34, 197, 94, 0.3); }
          50% { box-shadow: 0 0 20px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.6); }
        }

        .animate-float { animation: float 4s ease-in-out infinite; }
        .animate-sway-gentle { animation: sway-gentle 4s ease-in-out infinite; }
        .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
        .animate-bounce-in-delayed { animation: bounce-in-delayed 1s ease-out; }
        .animate-bounce-in-stagger { animation: bounce-in-stagger 1s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-slide-up-bounce { animation: slide-up-bounce 1s ease-out; }
        .animate-slide-up-stagger { animation: slide-up-stagger 1s ease-out; }
        .animate-slide-up-wave { animation: slide-up-wave 1.2s ease-out; }
        .animate-slide-right-bounce { animation: slide-right-bounce 1s ease-out; }
        .animate-slide-left-bounce { animation: slide-left-bounce 1s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 1s ease-out; }
        .animate-gradient-flow { 
          background-size: 200% 200%; 
          animation: gradient-flow 3s ease infinite; 
        }
        .animate-expand-wave { animation: expand-wave 1.5s ease-out; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-text-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(34, 197, 94, 0.4), transparent);
          background-size: 200% 100%;
          animation: text-shimmer 2s ease-in-out infinite;
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-pulse-bright { animation: pulse-bright 2s ease-in-out infinite; }
        .animate-pulse-subtle { animation: pulse-subtle 3s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-rotate-slow { animation: rotate-slow 15s linear infinite; }
        .animate-heartbeat { animation: heartbeat 1.5s ease-in-out infinite; }
        .animate-blink { animation: blink 3s ease-in-out infinite; }
        .animate-wiggle { animation: wiggle 0.5s ease-in-out; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 3s ease-in-out infinite; }
        .animate-pulse-gentle { animation: pulse-gentle 2s ease-in-out infinite; }
        .animate-draw-line { 
          stroke-dasharray: 100;
          animation: draw-line 2s ease-in-out infinite; 
        }
        .animate-glow { animation: glow 2s ease-in-out infinite; }
        .bg-forest-100 { background-color: #f0f9f0; }
        .bg-gradient-radial { background: radial-gradient(circle at center, var(--tw-gradient-stops)); }
        .bg-gradient-conic { background: conic-gradient(var(--tw-gradient-stops)); }
      `}</style>
    </div>
  );
};

export default About;