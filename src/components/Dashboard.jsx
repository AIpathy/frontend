import React, { useState, useEffect } from "react";
import { LogOut, User, Activity, Bot, FileText, Settings, Mic, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import AIInteraction from "./AIInteraction";
import ApiService from "../services/api";
import { formatTimestamp, getAnalysisTypeName, capitalizeName } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const TEST_CATEGORIES = [
  {
    key: "kisilik",
    label: "Kişilik Bozuklukları ve Kişilik Testleri",
    tests: [
      {
        key: "borderline-kisilik-testi",
        title: "Borderline Kişilik Bozukluğu Testi",
        desc: "Borderline kişilik bozukluğu eğilimini ölçen 53 maddelik test",
        icon: "FileText",
        route: "/borderline-kisilik-testi"
      },
      {
        key: "narsisizm-testi",
        title: "Narsisizm Testi",
        desc: "Narsisizm eğilimini ölçen 25 maddelik test",
        icon: "FileText",
        route: "/narsisizm-testi"
      }
    ]
  },
  {
    key: "kiskanclik-takinti-okb",
    label: "Kıskançlık, Takıntı, OKB ve İlgili Testler",
    tests: [
      {
        key: "okb-test",
        title: "OKB Testi",
        desc: "Obsesif kompulsif bozukluk belirtilerini ölçen 37 maddelik test",
        icon: "FileText",
        route: "/okb-test"
      }
    ]
  },
  {
    key: "anksiyete",
    label: "Anksiyete ve Kaygı Bozuklukları",
    tests: [
      {
        key: "beck-anksiyete-olcegi",
        title: "Beck Anksiyete Ölçeği",
        desc: "Son 1 haftadaki anksiyete düzeyini ölçen 20 maddelik test",
        icon: "Activity",
        route: "/beck-anksiyete-olcegi"
      },
      {
        key: "sosyal-fobi-testi",
        title: "Sosyal Fobi Testi",
        desc: "Sosyal fobi/kaygı düzeyini ölçen 43 maddelik test",
        icon: "FileText",
        route: "/sosyal-fobi-testi"
      },
      {
        key: "sias20-test",
        title: "SIAS Testi",
        desc: "Sosyal anksiyete düzeyini ölçen 20 maddelik test",
        icon: "FileText",
        route: "/sias20-test"
      }
    ]
  },
  {
    key: "depresyon",
    label: "Depresyon ve Duygudurum Bozuklukları",
    tests: [
      {
        key: "phq9-test",
        title: "PHQ-9 Testi",
        desc: "Depresyon şiddetini ölçen 9 soruluk test",
        icon: "FileText",
        route: "/phq9-test"
      }
    ]
  },
  {
    key: "travma",
    label: "Travma, Stres ve Yas Testleri",
    tests: [
      {
        key: "pcl5-test",
        title: "PCL-5 Testi",
        desc: "Travma sonrası stres belirtilerini ölçen 10 maddelik test",
        icon: "FileText",
        route: "/pcl5-test"
      },
      {
        key: "icg5-test",
        title: "ICG-5 Testi",
        desc: "Karmaşık yas belirtilerini tarayan 5 maddelik test",
        icon: "FileText",
        route: "/icg5-test"
      },
      {
        key: "tsbe-test",
        title: "TSBE Testi",
        desc: "Travma sonrası bilişler envanteri 36 maddelik test",
        icon: "FileText",
        route: "/tsbe-test"
      }
    ]
  },
  {
    key: "madde-bagimliligi",
    label: "Madde ve Alkol Bağımlılığı Testleri",
    tests: [
      {
        key: "alkol-testi",
        title: "Alkol Kullanım Testi",
        desc: "Alkol kullanım alışkanlıklarını değerlendiren 36 maddelik test",
        icon: "FileText",
        route: "/alkol-testi"
      }
    ]
  },
  {
    key: "dikkat-hiperaktivite",
    label: "Dikkat Eksikliği, Hiperaktivite ve Nörogelişimsel Bozukluklar",
    tests: [
      {
        key: "dehb-test",
        title: "DEHB Testi",
        desc: "Dikkat eksikliği ve hiperaktivite bozukluğu belirtilerini ölçen 36 maddelik test",
        icon: "FileText",
        route: "/dehb-test"
      }
    ]
  },
  {
    key: "zeka-gelisim",
    label: "Zeka ve Gelişim Testleri",
    tests: [
      {
        key: "coklu-zeka-testi",
        title: "Çoklu Zeka Testi",
        desc: "8 farklı zeka alanını ölçen 80 maddelik test",
        icon: "FileText",
        route: "/coklu-zeka-testi"
      }
    ]
  },
  {
    key: "cinsel-saglik",
    label: "Cinsel Sağlık ve İlişki Testleri",
    tests: [
      {
        key: "golombok-test",
        title: "Golombok Testi",
        desc: "Cinsel memnuniyet ölçeği 28 maddelik test",
        icon: "FileText",
        route: "/golombok-test"
      }
    ]
  },
  {
    key: "duygusal-duzenleme",
    label: "Duygusal Düzenleme ve Öfke Yönetimi",
    tests: [
      {
        key: "ofke-testi",
        title: "Öfke Testi",
        desc: "Öfke düzeyini ve kontrolünü ölçen 34 maddelik test",
        icon: "FileText",
        route: "/ofke-testi"
      }
    ]
  },
  {
    key: "ozguven-duygusal-zeka",
    label: "Özgüven, Duygusal Zeka ve Empati Ölçekleri",
    tests: []
  },
  {
    key: "kiskanclik-takinti-okb",
    label: "Kıskançlık, Takıntı, OKB ve İlgili Testler",
    tests: []
  },
  {
    key: "cocuk-ergen",
    label: "Çocuk ve Ergen Testleri",
    tests: []
  },
  {
    key: "diger",
    label: "Diğer Testler ve Ölçekler",
    tests: []
  }
];

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    name: "Kullanıcı",
    email: "kullanici@example.com",
    lastLogin: "2024-01-15"
  });
  const [analyses, setAnalyses] = useState([]);
  const [stats, setStats] = useState({});
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(TEST_CATEGORIES[0].key);


  // API'den veri yükleme
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          window.location.hash = '#/auth';
          return;
        }

        // Kullanıcı profilini yükle
        const profileData = await ApiService.getUserProfile(token);
        setUser(profileData);

        // Kullanıcı analizlerini yükle
        const analysesData = await ApiService.getUserAnalyses(token);
        setAnalyses(analysesData);

        // Dashboard istatistiklerini yükle
        const statsData = await ApiService.getDashboardStats(token, 'user');
        setStats(statsData);

      } catch (error) {
        console.error('Data loading error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    window.location.hash = '#/';
  };



  return (
    <>
      <div
        className="min-h-screen"
        style={{ background: 'radial-gradient(circle at center,rgb(187, 221, 209) 0%,rgb(238, 246, 242) 40%,rgb(204, 228, 223) 100%)' }}
      >


        <div className="flex relative">
          {/* Sidebar */}
          <aside
            className={`min-h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'} fixed md:relative z-20 md:z-auto flex-shrink-0`}
            style={{ background: 'linear-gradient(135deg,rgb(201, 221, 215) 60%,rgb(252, 253, 254) 100%)' }}
          >
            <div className={`p-6 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'}`}>
              {/* Header Buttons */}
              <div className="flex justify-end space-x-3 mb-6">
                <button
                  onClick={() => { window.location.hash = '#/settings'; }}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-[#3CB97F]/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#3CB97F]/20 hover:border-[#3CB97F]/40"
                >
                  <Settings className="w-5 h-5 text-[#3CB97F] group-hover:text-[#267a56] transition-colors" />
                </button>
                <button
                  onClick={handleLogout}
                  className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-[#3CB97F]/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#3CB97F]/20 hover:border-[#3CB97F]/40"
                >
                  <LogOut className="w-5 h-5 text-[#3CB97F] group-hover:text-[#267a56] transition-colors" />
                </button>
              </div>
              {/* Kullanıcı Profili */}
              <div className="bg-white/80 rounded-full px-2 py-1.5 mb-6 shadow-lg shadow-[#3CB97F]/10 overflow-hidden w-full flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#3CB97F] rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <span className="text-base font-semibold text-[#696969] leading-tight">{capitalizeName(user.name)}</span>
              </div>
              {/* Navigasyon */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "overview"
                      ? "bg-[#3CB97F] text-white"
                      : "text-[#3CB97F] hover:bg-[#3CB97F]/10"
                  }`}
                >
                  <Activity className="w-5 h-5" />
                  <span className={activeTab === "overview" ? "" : "text-[#3CB97F]"}>Genel Bakış</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("ai-assistant");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "ai-assistant"
                      ? "bg-[#3CB97F] text-white"
                      : "text-[#3CB97F] hover:bg-[#3CB97F]/10"
                  }`}
                >
                  <Bot className="w-5 h-5" />
                  <span className={activeTab === "ai-assistant" ? "" : "text-[#3CB97F]"}>AI Asistan</span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab("tests");
                    setSidebarOpen(false);
                  }}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "tests"
                      ? "bg-[#3CB97F] text-white"
                      : "text-[#3CB97F] hover:bg-[#3CB97F]/10"
                  }`}
                >
                  <FileText className="w-5 h-5" />
                  <span className={activeTab === "tests" ? "" : "text-[#3CB97F]"}>Testler</span>
                </button>
              </nav>
            </div>
          </aside>
          {/* Sidebar toggle button */}
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="fixed z-30 flex items-center justify-center text-[#3CB97F] hover:text-[#267a56] transition"
            style={{ width: 20, height: 30, top: 72, left: sidebarOpen ? 256 : 0, background: 'none', border: 'none', boxShadow: 'none', padding: 0, transition: 'left 0.3s, color 0.2s' }}
            aria-label="Sidebar'ı gizle/göster"
          >
            {sidebarOpen ? <ChevronLeft className="w-8 h-8" strokeWidth={3} /> : <ChevronRight className="w-6 h-6" strokeWidth={3} />}
          </button>
          {/* Ana İçerik */}
          <main className={`flex-1 p-4 md:p-6 relative z-0 transition-all duration-300 ${sidebarOpen ? 'ml-0 md:ml-64' : 'ml-0'}`}>
            {loading && (
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3CB97F] mx-auto mb-4"></div>
                  <p className="text-gray-400">Veriler yükleniyor...</p>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
                <p className="text-red-400">Hata: {error}</p>
              </div>
            )}

            {!loading && !error && activeTab === "overview" && (
              <div className="space-y-6">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200/50 shadow-2xl">
                  {/* Background Effects */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 opacity-10">
                      {[...Array(8)].map((_, i) => (
                        <div
                          key={`bg-tree-${i}`}
                          className="absolute opacity-20"
                          style={{
                            left: `${10 + i * 12}%`,
                            top: `${20 + Math.sin(i * 0.7) * 10}%`,
                            transform: `scale(${0.6 + Math.sin(Date.now() * 0.001 + i) * 0.1})`,
                          }}
                        >
                          <div className="text-4xl text-green-600">🌲</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute inset-0">
                      {[...Array(12)].map((_, i) => (
                        <div
                          key={`float-${i}`}
                          className="absolute animate-pulse"
                          style={{
                            left: `${15 + (i * 6) % 70}%`,
                            top: `${25 + (i * 4) % 60}%`,
                            animationDelay: `${i * 0.3}s`,
                          }}
                        >
                          <div className="text-2xl opacity-30">
                            {i % 4 === 0 ? '✨' : i % 4 === 1 ? '🍃' : i % 4 === 2 ? '🌿' : '💫'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="relative z-10 p-12">
                    <div className="text-center space-y-6">
                      <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-200 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-500 backdrop-blur-sm">
                        <div className="animate-spin-slow">
                          <div className="w-8 h-8 flex items-center justify-center text-2xl">🍃</div>
                        </div>
                        <span className="text-[#3CB97F] font-bold text-base tracking-wide">
                          HOŞ GELDİNİZ, {capitalizeName(user.name)}
                        </span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#3CB97F] rounded-full animate-pulse" />
                          <div className="w-2 h-2 bg-[#267a56] rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* İstatistik Kartları */}
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-green-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden w-40 h-40 md:w-48 md:h-48 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                      <div className="min-w-[3rem] h-12 px-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-3">
                        <Activity className="w-6 h-6 text-[#3CB97F]" />
                      </div>
                      <p className="text-[#3CB97F] text-xs font-medium mb-1">Bu Hafta</p>
                      <p className="text-lg font-bold text-[#3CB97F]">
                        {stats.weeklyAnalyses || analyses.length} Analiz
                      </p>
                    </div>
                  </div>

                  <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-green-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden w-40 h-40 md:w-48 md:h-48 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                      <div className="min-w-[3rem] h-12 px-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-3">
                        <span className="text-[#3CB97F] text-sm font-bold whitespace-nowrap">
                          {stats.averageScore || (analyses.length > 0 ? 
                            (analyses.reduce((sum, analysis) => sum + analysis.score, 0) / analyses.length).toFixed(1) : 
                            '0')}
                        </span>
                      </div>
                      <p className="text-[#3CB97F] text-xs font-medium mb-1">Ortalama Skor</p>
                      <p className="text-lg font-bold text-[#3CB97F]">
                        {stats.averageScore ? `${stats.averageScore}/10` : analyses.length > 0 ? 
                          `${(analyses.reduce((sum, analysis) => sum + analysis.score, 0) / analyses.length).toFixed(1)}/10` : 
                          '0/10'}
                      </p>
                    </div>
                  </div>

                  <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-green-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden w-40 h-40 md:w-48 md:h-48 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                    <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                      <div className="min-w-[3rem] h-12 px-3 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-3">
                        <Activity className="w-6 h-6 text-[#3CB97F]" />
                      </div>
                      <p className="text-[#3CB97F] text-xs font-medium mb-1">Son Güncelleme</p>
                      <p className="text-sm font-bold text-[#3CB97F]">
                        {stats.lastUpdate || (analyses.length > 0 ? 
                          formatTimestamp(analyses[0].timestamp) : 
                          'Henüz analiz yok')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Son Aktiviteler */}
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-green-200/50">
                                      <div className="flex items-center gap-3 mb-4 md:mb-6">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Activity className="w-4 h-4 md:w-5 md:h-5 text-[#3CB97F]" />
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-[#3CB97F]">
                        Son Aktiviteler
                      </h3>
                    </div>
                  
                  <div className="space-y-3 md:space-y-4">
                    {analyses.slice(0, 5).map((analysis, index) => (
                      <div 
                        key={analysis.id} 
                        className="group flex items-center space-x-2 md:space-x-3 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200/50 hover:bg-white/90 hover:shadow-lg hover:scale-105 transition-all duration-300"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                          {analysis.type === 'voice' ? 
                            <Mic className="w-4 h-4 md:w-5 md:h-5 text-[#3CB97F]" /> :
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-[#3CB97F]" />
                          }
                        </div>
                        <div className="flex-1">
                          <p className="text-[#3CB97F] font-semibold text-base md:text-lg">
                            {getAnalysisTypeName(analysis.type)} Tamamlandı
                          </p>
                          <p className="text-gray-600 text-xs md:text-sm">{formatTimestamp(analysis.timestamp)}</p>
                        </div>
                        <div className="min-w-[3rem] h-10 md:h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300 px-2">
                          <span className="text-[#3CB97F] font-bold text-xs md:text-sm whitespace-nowrap">{analysis.score}/10</span>
                        </div>
                      </div>
                    ))}
                    {analyses.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Activity className="w-8 h-8 text-[#3CB97F]" />
                        </div>
                        <p className="text-[#3CB97F] text-lg font-medium">Henüz analiz bulunmuyor.</p>
                        <p className="text-gray-600 text-sm mt-2">İlk analizinizi başlatmak için AI Asistan'ı kullanın.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && activeTab === "ai-assistant" && (
              <div className="-m-6 h-[calc(100vh-120px)]">
                <AIInteraction />
              </div>
            )}

            {!loading && !error && activeTab === "tests" && (
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Psikolojik Testler</h2>
                <div className="h-1 w-12 md:w-16 bg-[#3CB97F] rounded-full mb-4" />
                {/* Kategori Seçimi - Tek Bar */}
                <div className="relative max-w-4xl mx-auto mb-6">
                  <div className="bg-white/90 backdrop-blur-sm border-2 border-[#3CB97F]/30 rounded-2xl p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                      {/* Sol Ok */}
                      <button
                        onClick={() => {
                          const currentIndex = TEST_CATEGORIES.findIndex(cat => cat.key === selectedCategory);
                          const prevIndex = currentIndex > 0 ? currentIndex - 1 : TEST_CATEGORIES.length - 1;
                          setSelectedCategory(TEST_CATEGORIES[prevIndex].key);
                        }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3CB97F]/10 hover:bg-[#3CB97F]/20 text-[#3CB97F] transition-colors"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      
                      {/* Kategori Adı */}
                      <div className="flex-1 text-center px-4">
                        <h3 className="text-lg font-bold text-[#3CB97F]">
                          {TEST_CATEGORIES.find(cat => cat.key === selectedCategory)?.label}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {TEST_CATEGORIES.find(cat => cat.key === selectedCategory)?.tests.length} test mevcut
                        </p>
                      </div>
                      
                      {/* Sağ Ok */}
                      <button
                        onClick={() => {
                          const currentIndex = TEST_CATEGORIES.findIndex(cat => cat.key === selectedCategory);
                          const nextIndex = currentIndex < TEST_CATEGORIES.length - 1 ? currentIndex + 1 : 0;
                          setSelectedCategory(TEST_CATEGORIES[nextIndex].key);
                        }}
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-[#3CB97F]/10 hover:bg-[#3CB97F]/20 text-[#3CB97F] transition-colors"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
                {/* Seçili Kategorinin Testleri */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {TEST_CATEGORIES.find(cat => cat.key === selectedCategory).tests.map(test => (
                    <div key={test.key} className="bg-white/90 rounded-xl p-4 md:p-6 shadow-md">
                    <div className="text-center space-y-3 md:space-y-4">
                        {test.icon === "Activity" ? <Activity className="w-10 h-10 md:w-12 md:h-12 text-[#3CB97F] mx-auto" /> : <FileText className="w-10 h-10 md:w-12 md:h-12 text-[#3CB97F] mx-auto" />}
                        <h3 className="text-base md:text-lg font-semibold text-gray-800">{test.title}</h3>
                        <p className="text-gray-500 text-xs md:text-sm">{test.desc}</p>
                        <div className="flex justify-center">
                          <button
                            type="button"
                            className="group relative bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white font-semibold py-3 px-6 md:py-4 md:px-8 rounded-2xl transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl hover:scale-105 overflow-hidden text-sm md:text-base"
                            onClick={() => navigate(test.route)}
                          >
                            {/* Gradient overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Shine effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            
                            {/* Content */}
                            <div className="relative z-10 flex items-center gap-3">
                              Testi Başlat
                            </div>
                          </button>
                        </div>
                    </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </>
  );
}

export default Dashboard; 