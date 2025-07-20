import React, { useState, useEffect } from "react";
import { LogOut, User, Activity, Bot, FileText, Settings, Mic, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import AIInteraction from "./AIInteraction";
import ApiService from "../services/api";
import { formatTimestamp, getAnalysisTypeName, capitalizeName } from "../utils/helpers";
import dashboardLogo from "../assets/dashboardLogo.png";
import { useNavigate } from "react-router-dom";

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
    <div
      className="min-h-screen"
      style={{ background: 'radial-gradient(circle at center,rgb(187, 221, 209) 0%,rgb(238, 246, 242) 40%,rgb(204, 228, 223) 100%)' }}
    >
      {/* Header */}
      <header className="backdrop-blur-md border-b border-[#3CB97F]/20 relative z-10" style={{ background: 'linear-gradient(135deg,rgb(255, 255, 255) 60%, #e0e7ef 100%)', minHeight: 56 }}>
        <div className="flex items-center justify-between px-6 py-2">
          <div className="flex items-center space-x-4">
            <img src={dashboardLogo} alt="AIpathy Logo" className="w-20 h-auto" />
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => { window.location.hash = '#/settings'; }}>
              <Settings className="w-5 h-5 text-[#3CB97F]" />
            </Button>
            <Button onClick={handleLogout}>
              <LogOut className="w-5 h-5 text-[#3CB97F]" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar */}
        <aside
          className={`min-h-screen transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0 overflow-hidden'}`}
          style={{ background: 'linear-gradient(135deg,rgb(201, 221, 215) 60%,rgb(252, 253, 254) 100%)' }}
        >
          <div className={`p-6 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none select-none'}`}>
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
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <Activity className="w-5 h-5" />
                <span className={activeTab === "overview" ? "" : "text-gray-800"}>Genel Bakış</span>
              </button>

              <button
                onClick={() => setActiveTab("ai-assistant")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "ai-assistant"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <Bot className="w-5 h-5" />
                <span className={activeTab === "ai-assistant" ? "" : "text-gray-800"}>AI Asistan</span>
              </button>

              <button
                onClick={() => setActiveTab("tests")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "tests"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className={activeTab === "tests" ? "" : "text-gray-800"}>Testler</span>
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
        <main className={`flex-1 p-6 relative z-0 transition-all duration-300 ${sidebarOpen ? '' : 'ml-0'}`}>
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
              <h2 className="text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Genel Bakış</h2>
              <div className="h-1 w-16 bg-[#3CB97F] rounded-full mb-4" />
              {/* İstatistik Kartları */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Bu Hafta</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">{stats.weeklyAnalyses || analyses.length} Analiz</p>
                    </div>
                    <Activity className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>
                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Ortalama Skor</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">
                        {stats.averageScore ? `${stats.averageScore}/10` : analyses.length > 0 ? 
                          `${(analyses.reduce((sum, analysis) => sum + analysis.score, 0) / analyses.length).toFixed(1)}/10` : 
                          '0/10'}
                      </p>
                    </div>
                    <div className="w-8 h-8 bg-[#3CB97F] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {stats.averageScore || (analyses.length > 0 ? 
                          (analyses.reduce((sum, analysis) => sum + analysis.score, 0) / analyses.length).toFixed(1) : 
                          '0')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">Son Güncelleme</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">
                        {stats.lastUpdate || (analyses.length > 0 ? 
                          formatTimestamp(analyses[0].timestamp) : 
                          'Henüz analiz yok')}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>
              </div>
              {/* Son Aktiviteler */}
              <div className="bg-white/90 rounded-xl p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                  {analyses.slice(0, 5).map((analysis) => (
                    <div key={analysis.id} className="flex items-center space-x-4 p-3 bg-white/70 rounded-lg">
                      {analysis.type === 'voice' ? <Mic className="w-5 h-5 text-[#3CB97F]" /> :
                       analysis.type === 'facial' ? <Camera className="w-5 h-5 text-[#3CB97F]" /> :
                       <FileText className="w-5 h-5 text-[#3CB97F]" />}
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">
                          {getAnalysisTypeName(analysis.type)} Tamamlandı
                        </p>
                        <p className="text-gray-500 text-sm">{formatTimestamp(analysis.timestamp)}</p>
                      </div>
                      <span className="text-[#3CB97F] font-semibold">{analysis.score}/10</span>
                    </div>
                  ))}
                  {analyses.length === 0 && (
                    <div className="text-center py-8">
                      <p className="text-gray-400">Henüz analiz bulunmuyor.</p>
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
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Psikolojik Testler</h2>
              <div className="h-1 w-16 bg-[#3CB97F] rounded-full mb-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">PHQ-9 Testi</h3>
                    <p className="text-gray-500 text-sm">Depresyon şiddetini ölçen 9 soruluk test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/phq9-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <Activity className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">GAD-7 Testi</h3>
                    <p className="text-gray-500 text-sm">Anksiyete şiddetini ölçen 7 soruluk test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/gad7-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">Narsisizm Testi</h3>
                    <p className="text-gray-500 text-sm">Narsisizm eğilimini ölçen 25 maddelik test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/npi16-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">Borderline Kişilik Bozukluğu Testi</h3>
                    <p className="text-gray-500 text-sm">Borderline kişilik bozukluğu eğilimini ölçen 53 maddelik test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/msibpd-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">SIAS Testi</h3>
                    <p className="text-gray-500 text-sm">Sosyal anksiyete düzeyini ölçen 20 maddelik test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/sias20-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">PCL-5 Testi</h3>
                    <p className="text-gray-500 text-sm">Travma sonrası stres belirtilerini ölçen 10 maddelik test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/pcl5-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-white/90 rounded-xl p-6 shadow-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-gray-800">ICG-5 Testi</h3>
                    <p className="text-gray-500 text-sm">Karmaşık yas belirtilerini tarayan 5 maddelik test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg" onClick={() => navigate('/icg5-test')}>
                      Testi Başlat
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard; 