import React, { useState, useEffect } from "react";
import { LogOut, User, Activity, Bot, FileText, Settings } from "lucide-react";
import Button from "./Button";
import AlertManager from "./AlertManager";
import AIInteraction from "./AIInteraction";
import ApiService from "../services/api";
import { formatTimestamp, getAnalysisTypeName, capitalizeName } from "../utils/helpers";

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


  // API'den veri yükleme
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        
        if (!token) {
          window.location.href = '/auth';
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



  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    window.location.href = "/";
  };



  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 to-green-700">
      {/* Header */}
      <header className="bg-[#1c1c1e]/80 backdrop-blur-md border-b border-[#3CB97F]/20 relative z-10">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-[#3CB97F]">AIpathy Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <AlertManager onAlertClick={(alert) => {
              // Alert'e tıklandığında yapılacak işlemler
              console.log('Alert clicked:', alert);
            }} />
            <Button onClick={() => { window.location.href = '/settings'; }}>
              <Settings className="w-5 h-5 text-[#3CB97F]" />
            </Button>
            <Button onClick={handleLogout}>
              <LogOut className="w-5 h-5 text-[#3CB97F]" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#232325]/80 backdrop-blur-md border-r border-[#3CB97F]/20 min-h-screen relative z-0">
          <div className="p-6">
            {/* Kullanıcı Profili */}
            <div className="bg-[#18181b]/50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3CB97F] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{capitalizeName(user.name)}</h3>
                  <p className="text-gray-400 text-sm">{user.email}</p>
                </div>
              </div>
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
                <span>Genel Bakış</span>
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
                <span>AI Asistan</span>
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
                <span>Testler</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Ana İçerik */}
        <main className="flex-1 p-6 relative z-0">
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
              <h2 className="text-3xl font-bold text-white mb-6">Genel Bakış</h2>
              
              {/* İstatistik Kartları */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Bu Hafta</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">{stats.weeklyAnalyses || analyses.length} Analiz</p>
                    </div>
                    <Activity className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Ortalama Skor</p>
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

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Son Güncelleme</p>
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
              <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-white mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                  {analyses.slice(0, 5).map((analysis) => (
                    <div key={analysis.id} className="flex items-center space-x-4 p-3 bg-[#18181b]/50 rounded-lg">
                      {analysis.type === 'voice' ? <Mic className="w-5 h-5 text-[#3CB97F]" /> :
                       analysis.type === 'facial' ? <Camera className="w-5 h-5 text-[#3CB97F]" /> :
                       <FileText className="w-5 h-5 text-[#3CB97F]" />}
                      <div className="flex-1">
                        <p className="text-white font-medium">
                          {getAnalysisTypeName(analysis.type)} Tamamlandı
                        </p>
                        <p className="text-gray-400 text-sm">{formatTimestamp(analysis.timestamp)}</p>
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
              <h2 className="text-3xl font-bold text-white mb-6">Psikolojik Testler</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="text-center space-y-4">
                    <FileText className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-white">PHQ-9 Testi</h3>
                    <p className="text-gray-400 text-sm">Depresyon şiddetini ölçen 9 soruluk test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg">
                      Testi Başlat
                    </Button>
                  </div>
                </div>

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="text-center space-y-4">
                    <Activity className="w-12 h-12 text-[#3CB97F] mx-auto" />
                    <h3 className="text-lg font-semibold text-white">GAD-7 Testi</h3>
                    <p className="text-gray-400 text-sm">Anksiyete şiddetini ölçen 7 soruluk test</p>
                    <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-6 py-2 rounded-lg">
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