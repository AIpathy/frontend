import React, { useState } from "react";
import { LogOut, User, Activity, Camera, Mic, FileText, Settings, Bell, Search } from "lucide-react";
import Button from "./Button";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [user] = useState({
    name: "Kullanıcı",
    email: "kullanici@example.com",
    lastLogin: "2024-01-15"
  });

  const handleLogout = () => {
    // Çıkış işlemi burada yapılacak
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 to-green-700">
      {/* Header */}
      <header className="bg-[#1c1c1e]/80 backdrop-blur-md border-b border-[#3CB97F]/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-[#3CB97F]">AIpathy Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button onClick={() => {}}>
              <Bell className="w-5 h-5 text-[#3CB97F]" />
            </Button>
            <Button onClick={() => {}}>
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
        <aside className="w-64 bg-[#232325]/80 backdrop-blur-md border-r border-[#3CB97F]/20 min-h-screen">
          <div className="p-6">
            {/* Kullanıcı Profili */}
            <div className="bg-[#18181b]/50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3CB97F] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{user.name}</h3>
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
                onClick={() => setActiveTab("voice")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "voice"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <Mic className="w-5 h-5" />
                <span>Ses Analizi</span>
              </button>

              <button
                onClick={() => setActiveTab("facial")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "facial"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <Camera className="w-5 h-5" />
                <span>Mimik Analizi</span>
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
        <main className="flex-1 p-6">
          {activeTab === "overview" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Genel Bakış</h2>
              
              {/* İstatistik Kartları */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Bu Hafta</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">5 Analiz</p>
                    </div>
                    <Activity className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Ortalama Skor</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">7.2/10</p>
                    </div>
                    <div className="w-8 h-8 bg-[#3CB97F] rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">7.2</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Son Güncelleme</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">2 saat önce</p>
                    </div>
                    <Bell className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>
              </div>

              {/* Son Aktiviteler */}
              <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-white mb-4">Son Aktiviteler</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-3 bg-[#18181b]/50 rounded-lg">
                    <Mic className="w-5 h-5 text-[#3CB97F]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Ses Analizi Tamamlandı</p>
                      <p className="text-gray-400 text-sm">2 saat önce</p>
                    </div>
                    <span className="text-[#3CB97F] font-semibold">8.5/10</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-[#18181b]/50 rounded-lg">
                    <Camera className="w-5 h-5 text-[#3CB97F]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Mimik Analizi Tamamlandı</p>
                      <p className="text-gray-400 text-sm">1 gün önce</p>
                    </div>
                    <span className="text-[#3CB97F] font-semibold">7.8/10</span>
                  </div>

                  <div className="flex items-center space-x-4 p-3 bg-[#18181b]/50 rounded-lg">
                    <FileText className="w-5 h-5 text-[#3CB97F]" />
                    <div className="flex-1">
                      <p className="text-white font-medium">PHQ-9 Testi Tamamlandı</p>
                      <p className="text-gray-400 text-sm">3 gün önce</p>
                    </div>
                    <span className="text-[#3CB97F] font-semibold">6.2/10</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "voice" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Ses Analizi</h2>
              
              <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                <div className="text-center space-y-4">
                  <Mic className="w-16 h-16 text-[#3CB97F] mx-auto" />
                  <h3 className="text-xl font-semibold text-white">Ses Kaydı Başlat</h3>
                  <p className="text-gray-400">10 saniye boyunca konuşun, duygu durumunuz analiz edilecek</p>
                  <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-8 py-3 rounded-lg">
                    Kayıt Başlat
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "facial" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white mb-6">Mimik Analizi</h2>
              
              <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                <div className="text-center space-y-4">
                  <Camera className="w-16 h-16 text-[#3CB97F] mx-auto" />
                  <h3 className="text-xl font-semibold text-white">Kamera Erişimi</h3>
                  <p className="text-gray-400">Yüz ifadelerinizi analiz etmek için kameraya erişim gerekiyor</p>
                  <Button className="bg-[#3CB97F] hover:bg-[#2d8f5f] text-white px-8 py-3 rounded-lg">
                    Analizi Başlat
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "tests" && (
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