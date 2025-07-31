import React, { useState, useEffect } from 'react';
import { Info, Users, Clock, Brain, ChevronDown, ChevronUp, Star, Award, Target, ArrowLeft, Sparkles, Zap, Shield, Leaf, TreePine, Mountain, Search, Filter, Calendar, TrendingUp, Heart, Compass, Trees, Sprout } from 'lucide-react';

const PsychologicalTests = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedTest, setExpandedTest] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const tests = [
    {
      id: 1,
      title: "Anksiyete Testi",
      subtitle: "GAD-7",
      description: "Anksiyete düzeyinizi ölçen kısa bir test. Doğanın huzuru eşliğinde kendinizi keşfedin.",
      duration: "5-7 dk",
      questions: "7 soru",
      completed: "2.5M+",
      category: "Ruh Sağlığı",
      difficulty: "Kolay",
      icon: "🌱",
      treeIcon: "🌿",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      color: "emerald",
      detailedInfo: {
        purpose: "Genel anksiyete bozukluğu belirtilerini değerlendirmek için geliştirilmiştir.",
        scoring: "0-4: Minimal anksiyete, 5-9: Hafif anksiyete, 10-14: Orta anksiyete, 15-21: Şiddetli anksiyete",
        reliability: "Yüksek güvenilirlik ve geçerlilik, %95 doğruluk oranı",
        targetGroup: "18+ yaş, genel popülasyon"
      }
    },
    {
      id: 2,
      title: "Depresyon Testi",
      subtitle: "PHQ-9",
      description: "Depresyon belirtilerini değerlendirin. Ormanın derinliklerinde kendinizi tanıyın.",
      duration: "8-10 dk",
      questions: "9 soru",
      completed: "5.2M+",
      category: "Ruh Sağlığı",
      difficulty: "Orta",
      icon: "🌿",
      treeIcon: "🌳",
      gradient: "from-emerald-400 via-green-500 to-forest-600",
      color: "green",
      detailedInfo: {
        purpose: "Majör depresyon episodlarını taramak ve şiddetini ölçmek için kullanılır.",
        scoring: "0-4: Minimal, 5-9: Hafif, 10-14: Orta, 15-19: Orta-şiddetli, 20-27: Şiddetli depresyon",
        reliability: "Klinik ortamlarda yaygın kullanım, %88 sensitivite",
        targetGroup: "Erişkinler ve adolesanlar"
      }
    },
    {
      id: 3,
      title: "Travma Sonrası Stres Testi",
      subtitle: "PCL-5",
      description: "TSSB belirtilerini analiz edin. Eski çınarlar gibi güçlü kalın.",
      duration: "12-15 dk",
      questions: "10 soru",
      completed: "1.8M+",
      category: "Travma",
      difficulty: "Zor",
      icon: "🌲",
      treeIcon: "🌲",
      gradient: "from-green-600 via-emerald-700 to-teal-800",
      color: "forest",
      detailedInfo: {
        purpose: "Travma sonrası stres bozukluğu belirtilerini değerlendirmek için tasarlanmıştır.",
        scoring: "33+ puan TSSB olasılığını gösterir",
        reliability: "DSM-5 kriterlerine uygun",
        targetGroup: "Travma yaşamış bireyler"
      }
    },
    {
      id: 4,
      title: "Sosyal Kaygı Testi",
      subtitle: "SIAS",
      description: "Sosyal fobi düzeyinizi ölçün. Yapraklar gibi hafif ve özgür hissedin.",
      duration: "10-12 dk",
      questions: "20 soru",
      completed: "950K+",
      category: "Sosyal",
      difficulty: "Orta",
      icon: "🍃",
      treeIcon: "🌾",
      gradient: "from-lime-400 via-green-500 to-emerald-600",
      color: "lime",
      detailedInfo: {
        purpose: "Sosyal durumlarda yaşanan kaygı ve kaçınma davranışlarını ölçer.",
        scoring: "Yüksek puanlar sosyal kaygı bozukluğunu işaret eder",
        reliability: "Klinik ve araştırma alanında güvenilir",
        targetGroup: "Sosyal kaygı yaşayan bireyler"
      }
    },
    {
      id: 5,
      title: "Borderline Kişilik Testi",
      subtitle: "BPD",
      description: "Borderline eğilimleri değerlendirin. Karmaşık dal yapıları gibi kendinizi anlayın.",
      duration: "25-30 dk",
      questions: "53 soru",
      completed: "720K+",
      category: "Kişilik",
      difficulty: "Zor",
      icon: "🌳",
      treeIcon: "🌴",
      gradient: "from-emerald-500 via-green-600 to-teal-700",
      color: "emerald",
      detailedInfo: {
        purpose: "Borderline kişilik bozukluğu özelliklerini sistematik olarak değerlendirir.",
        scoring: "Çok boyutlu analiz ile detaylı profil çıkarır",
        reliability: "Klinik tanı sürecine destek sağlar",
        targetGroup: "Kişilik bozuklukları şüphesi olan bireyler"
      }
    },
    {
      id: 6,
      title: "DEHB Testi",
      subtitle: "ADHD",
      description: "Dikkat eksikliği ve hiperaktivite belirtilerini ölçün. Esintide dans eden çimenler gibi.",
      duration: "8-10 dk",
      questions: "10 soru",
      completed: "1.2M+",
      category: "Nörogelişim",
      difficulty: "Kolay",
      icon: "🌾",
      treeIcon: "🌱",
      gradient: "from-green-300 via-lime-400 to-emerald-500",
      color: "lime",
      detailedInfo: {
        purpose: "Dikkat eksikliği ve hiperaktivite bozukluğu belirtilerini tarar.",
        scoring: "Dikkat eksikliği ve hiperaktivite alt boyutlarını ayrı ayrı değerlendirir",
        reliability: "Erişkin DEHB tanısında yardımcı",
        targetGroup: "Dikkat ve odaklanma problemi yaşayan bireyler"
      }
    },
    {
      id: 7,
      title: "Narsisizm Testi",
      subtitle: "NPI",
      description: "Narsisistik özelliklerinizi değerlendirin. Kendini beğenmiş orkide gibi mi?",
      duration: "12-15 dk",
      questions: "25 soru",
      completed: "890K+",
      category: "Kişilik",
      difficulty: "Orta",
      icon: "🌺",
      treeIcon: "🌸",
      gradient: "from-green-400 via-emerald-500 to-lime-600",
      color: "green",
      detailedInfo: {
        purpose: "Narsisistik kişilik özelliklerini ölçen standart araç.",
        scoring: "0-40 arasında puanlama, yüksek puanlar narsisistik eğilimleri gösterir",
        reliability: "Akademik araştırmalarda yaygın kullanım",
        targetGroup: "Kişilik özelliklerini merak eden bireyler"
      }
    },
    {
      id: 8,
      title: "Beck Anksiyete Testi",
      subtitle: "BAI",
      description: "Fiziksel ve bilişsel kaygı belirtilerini ölçün. Sakin orman gölü gibi dingin olun.",
      duration: "8-10 dk",
      questions: "20 soru",
      completed: "1.1M+",
      category: "Ruh Sağlığı",
      difficulty: "Kolay",
      icon: "🌸",
      treeIcon: "💚",
      gradient: "from-emerald-300 via-green-400 to-teal-500",
      color: "teal",
      detailedInfo: {
        purpose: "Anksiyetenin somatik belirtilerine odaklanır.",
        scoring: "0-7: Minimal, 8-15: Hafif, 16-25: Orta, 26-63: Şiddetli anksiyete",
        reliability: "Panic bozukluk ve genel anksiyete ayırımında etkili",
        targetGroup: "Fiziksel anksiyete belirtileri yaşayan bireyler"
      }
    },
    {
      id: 9,
      title: "Sosyal Fobi Testi",
      subtitle: "SPIN",
      description: "Sosyal fobiye dair detaylı analiz. Çekingen menekşe mi, yoksa cesur kaplan mı?",
      duration: "18-22 dk",
      questions: "43 soru",
      completed: "670K+",
      category: "Sosyal",
      difficulty: "Zor",
      icon: "🌻",
      treeIcon: "🌿",
      gradient: "from-green-500 via-emerald-600 to-forest-700",
      color: "emerald",
      detailedInfo: {
        purpose: "Sosyal fobi şiddetini ve alt tiplerini kapsamlı olarak değerlendirir.",
        scoring: "Çok detaylı alt boyut analizi sunar",
        reliability: "Sosyal kaygı bozukluğu tanısında altın standart",
        targetGroup: "Sosyal durumlarda yoğun korku yaşayan bireyler"
      }
    },
    {
      id: 10,
      title: "Alkol Bağımlılığı Testi",
      subtitle: "AUDIT",
      description: "Alkol kullanım düzeyinizi ölçün. Temiz dere suyu gibi berrak yaşayın.",
      duration: "5-7 dk",
      questions: "10 soru",
      completed: "540K+",
      category: "Bağımlılık",
      difficulty: "Orta",
      icon: "🌵",
      treeIcon: "💧",
      gradient: "from-teal-400 via-green-500 to-emerald-600",
      color: "teal",
      detailedInfo: {
        purpose: "Alkol kullanım bozukluklarını tarama ve risk değerlendirmesi.",
        scoring: "0-7: Düşük risk, 8-15: Riskli kullanım, 16-19: Zararlı kullanım, 20+: Bağımlılık",
        reliability: "DSÖ tarafından onaylanmış standart araç",
        targetGroup: "Alkol kullanımı olan bireyler"
      }
    },
    {
      id: 11,
      title: "Sözel Zeka Testi",
      subtitle: "Sözel Zeka",
      description: "Sözel becerilerinizi değerlendirin. Bilge baykuş gibi konuşun.",
      duration: "10-12 dk",
      questions: "10 soru",
      completed: "2.1M+",
      category: "Zeka",
      difficulty: "Orta",
      icon: "🌼",
      treeIcon: "🦉",
      gradient: "from-lime-400 via-green-500 to-emerald-600",
      color: "lime",
      detailedInfo: {
        purpose: "Dil yetisi, kelime bilgisi ve sözel akıl yürütme becerilerini ölçer.",
        scoring: "Yaş normlarına göre standart puanlama",
        reliability: "Eğitim ve kariyer planlamasında yardımcı",
        targetGroup: "Sözel yeteneklerini merak eden herkes"
      }
    },
    {
      id: 12,
      title: "Duygusal Zeka Testi",
      subtitle: "EQ",
      description: "Duygularınızı anlama ve yönetme yetinizi analiz edin. Çiçekler gibi hassas olun.",
      duration: "8-10 dk",
      questions: "10 soru",
      completed: "1.3M+",
      category: "Zeka",
      difficulty: "Kolay",
      icon: "🌷",
      treeIcon: "🌺",
      gradient: "from-green-300 via-emerald-400 to-teal-500",
      color: "emerald",
      detailedInfo: {
        purpose: "Duygusal farkındalık, empati ve sosyal becerileri değerlendirir.",
        scoring: "Dört ana boyutta detaylı analiz sunar",
        reliability: "İş yaşamı ve kişisel gelişimde kullanışlı",
        targetGroup: "Duygusal becerilerini geliştirmek isteyenler"
      }
    },
    {
      id: 13,
      title: "OKB Testi",
      subtitle: "Y-BOCS",
      description: "Takıntı ve kontrol davranışlarını analiz edin. Düzenli gül bahçesi gibi mi?",
      duration: "8-10 dk",
      questions: "10 soru",
      completed: "780K+",
      category: "Ruh Sağlığı",
      difficulty: "Orta",
      icon: "🌹",
      treeIcon: "🌹",
      gradient: "from-emerald-400 via-green-500 to-teal-600",
      color: "emerald",
      detailedInfo: {
        purpose: "Obsesif kompulsif bozukluk belirtilerinin şiddetini ölçer.",
        scoring: "Obsesyonlar ve kompulsiyonlar ayrı ayrı değerlendirilir",
        reliability: "OKB tanı ve tedavi takibinde standart",
        targetGroup: "Takıntılı düşünce ve davranışları olan bireyler"
      }
    },
    {
      id: 14,
      title: "Karmaşık Yas Testi",
      subtitle: "ICG-5",
      description: "Yas sürecinizin karmaşıklık düzeyini ölçün. Dökülen yapraklar gibi doğal süreç.",
      duration: "3-5 dk",
      questions: "5 soru",
      completed: "450K+",
      category: "Travma",
      difficulty: "Kolay",
      icon: "🍀",
      treeIcon: "🍂",
      gradient: "from-green-400 via-emerald-500 to-teal-600",
      color: "green",
      detailedInfo: {
        purpose: "Normal yas sürecinden karmaşık yas bozukluğunu ayırt eder.",
        scoring: "Kısa ve etkili tarama aracı",
        reliability: "Yas danışmanlığında yol gösterici",
        targetGroup: "Kayıp yaşamış ve yas sürecinde olan bireyler"
      }
    },
    {
      id: 15,
      title: "Toksik İlişki Testi",
      subtitle: "İlişki Sağlığı",
      description: "İlişkinizdeki sağlıksız dinamikleri değerlendirin. Zehirli sarmaşık mı sağlıklı gül mü?",
      duration: "10-12 dk",
      questions: "15 soru",
      completed: "920K+",
      category: "İlişkiler",
      difficulty: "Orta",
      icon: "🌾",
      treeIcon: "💔",
      gradient: "from-green-500 via-emerald-600 to-teal-700",
      color: "emerald",
      detailedInfo: {
        purpose: "İlişkideki manipülasyon, kontrol ve sağlıksız örüntüleri tespit eder.",
        scoring: "İlişki sağlığı göstergeleri üzerinden analiz",
        reliability: "Çift terapisinde başlangıç değerlendirmesi",
        targetGroup: "İlişki problemleri yaşayan bireyler"
      }
    },
    {
      id: 16,
      title: "Kumar Riski Testi",
      subtitle: "PGSI",
      description: "Kumar alışkanlıklarınızı analiz edin. Riskli yollar yerine güvenli patikalar seçin.",
      duration: "8-10 dk",
      questions: "10 soru",
      completed: "280K+",
      category: "Bağımlılık",
      difficulty: "Orta",
      icon: "🌿",
      treeIcon: "🛤️",
      gradient: "from-teal-400 via-green-500 to-emerald-600",
      color: "teal",
      detailedInfo: {
        purpose: "Kumar oynama davranışlarının problemli olup olmadığını değerlendirir.",
        scoring: "Risk düzeylerine göre kategorilendirme",
        reliability: "Bağımlılık tedavi merkezlerinde kullanılır",
        targetGroup: "Kumar oynayan bireyler"
      }
    }
  ];

  const categories = ['All', ...new Set(tests.map(test => test.category))];

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      test.category.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || test.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (testId) => {
    setExpandedTest(expandedTest === testId ? null : testId);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Kolay': return 'from-green-300 to-emerald-400';
      case 'Orta': return 'from-emerald-400 to-green-500';
      case 'Zor': return 'from-green-600 to-emerald-700';
      default: return 'from-green-400 to-emerald-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-green-100/30 via-emerald-100/20 to-teal-100/30"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-8xl animate-sway">🌲</div>
          <div className="absolute top-20 right-20 text-6xl animate-float" style={{ animationDelay: '1s' }}>🌳</div>
          <div className="absolute bottom-20 left-20 text-7xl animate-sway" style={{ animationDelay: '2s' }}>🌿</div>
          <div className="absolute bottom-10 right-10 text-5xl animate-float" style={{ animationDelay: '0.5s' }}>🍃</div>
          <div className="absolute top-1/2 left-1/4 text-6xl animate-sway" style={{ animationDelay: '1.5s' }}>🌾</div>
          <div className="absolute top-1/3 right-1/3 text-8xl animate-float" style={{ animationDelay: '3s' }}>🌴</div>
          <div className="absolute top-3/4 left-1/3 text-4xl animate-sway" style={{ animationDelay: '2.5s' }}>🌱</div>
          <div className="absolute bottom-1/3 right-1/4 text-5xl animate-float" style={{ animationDelay: '4s' }}>🌺</div>
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-green-400 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-1/5 w-3 h-3 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-teal-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-3/4 right-1/2 w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className={`relative z-10 max-w-7xl mx-auto px-6 py-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Header  */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border border-emerald-200 hover:border-emerald-300 overflow-hidden animate-bounce-subtle"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
            <ArrowLeft className="w-6 h-6 text-emerald-700 group-hover:-translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10 animate-wiggle" />
            <span className="font-semibold text-gray-800 relative z-10 group-hover:text-emerald-800 transition-colors">
               Ana Sayfaya Dön
            </span>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
          </button>

          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-6 mb-8">
              <div className="relative">
                <Trees className="w-20 h-20 text-green-600 animate-sway" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-ping"></div>
              </div>
              <h1 className="text-7xl font-black bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent animate-gradient">
                🌲 Psikolojik Testler 🌿
              </h1>
              <div className="relative">
                <Leaf className="w-20 h-20 text-emerald-600 animate-float" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-teal-500 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
              </div>
            </div>
            <p className="text-2xl text-green-800/90 max-w-5xl mx-auto leading-relaxed font-medium">
              🌳 Doğanın büyülü atmosferinde zihinsel sağlığınızı keşfedin. Ormanın derinliklerinde kendinizi tanıyın, 16 profesyonel testle içsel yolculuğunuza çıkın. 🍃
            </p>
            <div className="flex items-center justify-center gap-2 mt-4 text-green-700">
              <Sprout className="w-5 h-5 animate-pulse" />
              <span className="text-lg italic">Her test bir tohum, her sonuç bir çiçek</span>
              <Sprout className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Arama and Filtreleme  */}
        <div className="mb-12 space-y-6">
        
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-emerald-400 rounded-3xl blur opacity-50"></div>
            <div className="relative bg-white/90 backdrop-blur-xl border-3 border-green-300 rounded-3xl p-2 shadow-2xl">
              <div className="flex items-center px-6 py-4">
                <Search className="w-7 h-7 text-green-600 mr-4" />
                <input
                  type="text"
                  placeholder="🔍 Ormanın hangi köşesinde hangi testi arıyorsunuz..."
                  className="flex-1 bg-transparent text-green-800 placeholder-green-600/70 outline-none text-lg font-medium"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex items-center gap-2">
                  <TreePine className="w-6 h-6 text-green-500 animate-sway" />
                  <Leaf className="w-6 h-6 text-emerald-500 animate-float" />
                </div>
              </div>
            </div>
          </div>

       
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 border-2 ${selectedCategory === category
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-green-900 shadow-lg scale-105 border-green-400'
                    : 'bg-green-100/80 text-green-800 hover:bg-green-200/80 border-green-300 hover:border-green-400 hover:scale-105'
                  }`}
              >
                🌿 {category === 'All' ? 'Tüm Orman' : category}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredTests.map((test, index) => (
            <div
              key={test.id}
              className={`group relative bg-white/90 backdrop-blur-sm border-3 border-green-200 rounded-3xl p-6 hover:bg-white/95 hover:border-green-400 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:shadow-green-500/20 ${isLoaded ? 'animate-fade-in-up' : 'opacity-0'
                }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${test.gradient} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-500`}></div>

              <div className="relative flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="text-5xl animate-float" style={{ animationDelay: `${index * 200}ms` }}>
                    {test.icon}
                  </div>
                  <div className="text-3xl animate-sway" style={{ animationDelay: `${index * 150}ms` }}>
                    {test.treeIcon}
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full text-sm font-bold  bg-gradient-to-r ${getDifficultyColor(test.difficulty)} shadow-lg border-2 border-white/20`}>
                  🌱 {test.difficulty}
                </div>
              </div>

              <div className="relative">
                <h3 className="text-xl font-bold mb-3 text-green-800 group-hover:text-green-600 transition-colors">
                  {test.title}
                </h3>

                <div className="flex items-center gap-2 mb-4">
                  <span className={`px-4 py-2 bg-gradient-to-r ${test.gradient} text-white rounded-full text-sm font-bold shadow-lg border-2 border-white/30`}>
                    🌿 {test.subtitle}
                  </span>
                </div>

                <span className="text-green-700/80 text-sm font-bold bg-green-100 px-3 py-2 rounded-xl border-2 border-green-200">
                  🌳 {test.category}
                </span>

                <p className="text-green-800/90 mt-4 mb-5 leading-relaxed text-sm font-medium">
                  {test.description}
                </p>

                <div className="flex items-center gap-3 mb-5 text-xs">
                  <div className="flex items-center gap-2 bg-green-100 px-3 py-2 rounded-xl border-2 border-green-200">
                    <Clock className="w-4 h-4 text-green-600" />
                    <span className="text-green-800 font-bold">{test.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-100 px-3 py-2 rounded-xl border-2 border-emerald-200">
                    <Brain className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-800 font-bold">{test.questions}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-teal-100 px-3 py-2 rounded-xl border-2 border-teal-200">
                    <Users className="w-4 h-4 text-teal-600" />
                    <span className="text-teal-800 font-bold">{test.completed}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleExpand(test.id)}
                  className={`w-full bg-gradient-to-r ${test.gradient} text-white py-4 rounded-2xl font-bold transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center justify-center gap-3 relative overflow-hidden group border-2 border-white/30`}
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <TreePine className="w-5 h-5 relative z-10 animate-sway" />
                  <span className="relative z-10 text-lg">
                    {expandedTest === test.id ? '🌲 Gizle' : '🌿 Ormanı Keşfet'}
                  </span>
                  {expandedTest === test.id ? (
                    <ChevronUp className="w-5 h-5 relative z-10" />
                  ) : (
                    <ChevronDown className="w-5 h-5 relative z-10" />
                  )}
                </button>

                {expandedTest === test.id && (
                  <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl border-3 border-green-200 animate-slide-down shadow-inner">
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <Target className="w-6 h-6 text-green-600 mt-1 flex-shrink-0 animate-pulse" />
                        <div>
                          <h4 className="font-bold text-green-800 mb-2 text-lg">🎯 Ormanın Amacı</h4>
                          <p className="text-sm text-green-700 leading-relaxed">{test.detailedInfo.purpose}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Star className="w-6 h-6 text-emerald-600 mt-1 flex-shrink-0 animate-spin" style={{ animationDuration: '4s' }} />
                        <div>
                          <h4 className="font-bold text-emerald-800 mb-2 text-lg">⭐ Doğal Puanlama</h4>
                          <p className="text-sm text-emerald-700 leading-relaxed">{test.detailedInfo.scoring}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Shield className="w-6 h-6 text-teal-600 mt-1 flex-shrink-0 animate-pulse" />
                        <div>
                          <h4 className="font-bold text-teal-800 mb-2 text-lg">🛡️ Ormanın Güvencesi</h4>
                          <p className="text-sm text-teal-700 leading-relaxed">{test.detailedInfo.reliability}</p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <Users className="w-6 h-6 text-green-600 mt-1 flex-shrink-0 animate-bounce" />
                        <div>
                          <h4 className="font-bold text-green-800 mb-2 text-lg">👥 Orman Sakinleri</h4>
                          <p className="text-sm text-green-700 leading-relaxed">{test.detailedInfo.targetGroup}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredTests.length === 0 && (
          <div className="text-center mt-20 animate-fade-in">
            <div className="relative inline-block mb-8">
              <div className="text-9xl animate-sway">🌲</div>
              <div className="absolute -top-4 -right-4 text-4xl animate-float">🔍</div>
            </div>
            <div className="text-4xl font-bold text-green-800 mb-4">🌿 Ormanda Kaybolmuş Gibisin!</div>
            <div className="text-green-700/80 text-xl max-w-2xl mx-auto leading-relaxed">
              Farklı arama terimleri ile yolunu bulmaya çalış. Ormanın derinliklerinde aradığın test mutlaka var! 🧭🌳
            </div>
            <div className="flex items-center justify-center gap-3 mt-6 text-6xl">
              <span className="animate-bounce">🌱</span>
              <span className="animate-pulse">🍃</span>
              <span className="animate-sway">🌿</span>
            </div>
          </div>
        )}

        <div className="mt-20 grid md:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 backdrop-blur-sm border-3 border-green-300 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-5xl mb-4 animate-float">🌲</div>
            <div className="text-3xl font-black text-green-800">16+</div>
            <div className="text-green-700 font-bold">Doğal Test</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-100 to-teal-100 backdrop-blur-sm border-3 border-emerald-300 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-5xl mb-4 animate-sway">🌿</div>
            <div className="text-3xl font-black text-emerald-800">10M+</div>
            <div className="text-emerald-700 font-bold">Orman Ziyaretçisi</div>
          </div>
          <div className="bg-gradient-to-br from-teal-100 to-green-100 backdrop-blur-sm border-3 border-teal-300 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-5xl mb-4 animate-pulse">⚡</div>
            <div className="text-3xl font-black text-teal-800">5-30</div>
            <div className="text-teal-700 font-bold">Dakika Yolculuk</div>
          </div>
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 backdrop-blur-sm border-3 border-green-300 rounded-3xl p-8 text-center shadow-xl">
            <div className="text-5xl mb-4 animate-bounce">🎯</div>
            <div className="text-3xl font-black text-green-800">%95</div>
            <div className="text-green-700 font-bold">Doğal Doğruluk</div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-green-100/80 to-emerald-100/80 backdrop-blur-xl border-3 border-green-300 rounded-3xl p-10 max-w-5xl mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-6 mb-6">
              <Trees className="w-12 h-12 text-green-600 animate-sway" />
              <h3 className="text-3xl font-black text-green-800">🌲 Ormanın Büyülü Yolculuğu Başlıyor 🌿</h3>
              <Leaf className="w-12 h-12 text-emerald-600 animate-float" />
            </div>
            <p className="text-green-800/90 leading-relaxed text-lg font-medium">
              Her test, kendinizi daha iyi tanımanız için özel olarak tasarlanmış bir orman yolu.
              Doğanın huzuru eşliğinde, profesyonel rehberlik ile zihinsel sağlığınızı anlayın ve geliştirin.
              🌳 Ormanın derinliklerinde saklı olan gerçek benliğinizi keşfedin! 🍃
            </p>
            <div className="flex items-center justify-center gap-4 mt-6 text-4xl">
              <span className="animate-bounce">🌱</span>
              <span className="animate-sway">🌿</span>
              <span className="animate-float">🌳</span>
              <span className="animate-pulse">🍃</span>
              <span className="animate-bounce">🌺</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from { 
            opacity: 0; 
            transform: translateY(40px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-down {
          from { 
            opacity: 0; 
            transform: translateY(-15px);
            max-height: 0;
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
            max-height: 600px;
          }
        }
        
        @keyframes sway {
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-down {
          animation: slide-down 0.5s ease-out;
        }
        
        .animate-sway {
          animation: sway 3s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .animate-gradient {
          animation: gradient 4s ease infinite;
          background-size: 200% 200%;
        }
        
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default PsychologicalTests;