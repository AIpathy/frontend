import React, { useState, useEffect } from "react";
import { LogOut, User, Activity, Camera, Mic, FileText, Settings, Bell, Search, Users, TrendingUp, AlertCircle } from "lucide-react";
import Button from "./Button";
import ApiService from "../services/api";
import { formatTimestamp, getRiskLevelColor, getStatusColor, getAnalysisTypeName, getRiskLevelName } from "../utils/helpers";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("patients");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    // Gerçek hasta verileri
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({});

  const [doctor, setDoctor] = useState({
    name: "Dr. Ayşe Özkan",
    email: "ayse.ozkan@hospital.com",
    specialization: "Psikiyatri"
  });

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

        // Hasta listesini yükle
        const patientsData = await ApiService.getPatients(token);
        setPatients(patientsData);

        // İstatistikleri yükle
        const statsData = await ApiService.getDashboardStats(token, 'doctor');
        setStats(statsData);

        // Uyarıları yükle
        const alertsData = await ApiService.getAlerts(token);
        setAlerts(alertsData);

        // Doktor profilini yükle
        const profileData = await ApiService.getUserProfile(token);
        setDoctor(profileData);

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

  const getAnalysisIcon = (type) => {
    switch (type) {
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'facial': return <Camera className="w-4 h-4" />;
      case 'phq9': return <FileText className="w-4 h-4" />;
      case 'gad7': return <Activity className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Hasta detaylarını yükle
  const loadPatientDetails = async (patientId) => {
    try {
      const token = localStorage.getItem('token');
      const patientData = await ApiService.getPatientById(patientId, token);
      const analysesData = await ApiService.getPatientAnalyses(patientId, token);
      
      setSelectedPatient({
        ...patientData,
        analyses: analysesData
      });
    } catch (error) {
      console.error('Patient details loading error:', error);
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 to-green-700">
      {/* Header */}
      <header className="bg-[#1c1c1e]/80 backdrop-blur-md border-b border-[#3CB97F]/20">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-[#3CB97F]">AIpathy Doktor Paneli</h1>
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
            {/* Doktor Profili */}
            <div className="bg-[#18181b]/50 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3CB97F] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{doctor.name}</h3>
                  <p className="text-gray-400 text-sm">{doctor.specialization}</p>
                </div>
              </div>
            </div>

            {/* Navigasyon */}
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("patients")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "patients"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <Users className="w-5 h-5" />
                <span>Hastalar</span>
              </button>

              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "analytics"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span>Analitik</span>
              </button>

              <button
                onClick={() => setActiveTab("alerts")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "alerts"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <AlertCircle className="w-5 h-5" />
                <span>Uyarılar</span>
              </button>
            </nav>
          </div>
        </aside>

        {/* Ana İçerik */}
        <main className="flex-1 p-6">
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

          {!loading && !error && activeTab === "patients" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">Hasta Listesi</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Hasta ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#232325]/70 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#3CB97F]"
                  />
                </div>
              </div>

              {/* Hasta Kartları */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md cursor-pointer hover:bg-[#232325]/90 transition-all duration-200"
                    onClick={() => loadPatientDetails(patient.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}></div>
                        <h3 className="text-white font-semibold">{patient.name}</h3>
                      </div>
                                             <span className={`text-sm font-medium ${getRiskLevelColor(patient.riskLevel)}`}>
                         {getRiskLevelName(patient.riskLevel)}
                       </span>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-400">
                      <p>{patient.email}</p>
                      <p>Yaş: {patient.age}</p>
                      <p>Son aktivite: {formatTimestamp(patient.lastActivity)}</p>
                      <p>Analiz sayısı: {patient.analyses.length}</p>
                    </div>

                    <div className="mt-4 pt-4 border-t border-[#3CB97F]/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Ortalama skor:</span>
                        <span className="text-[#3CB97F] font-semibold">
                          {(patient.analyses.reduce((sum, analysis) => sum + analysis.score, 0) / patient.analyses.length).toFixed(1)}/10
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Seçili Hasta Detayları */}
              {selectedPatient && (
                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md mt-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-white">{selectedPatient.name} - Detaylar</h3>
                    <Button onClick={() => setSelectedPatient(null)}>
                      Kapat
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Hasta Bilgileri</h4>
                      <div className="space-y-2 text-gray-300">
                        <p><span className="text-[#3CB97F]">E-posta:</span> {selectedPatient.email}</p>
                        <p><span className="text-[#3CB97F]">Yaş:</span> {selectedPatient.age}</p>
                                                 <p><span className="text-[#3CB97F]">Risk Seviyesi:</span> 
                           <span className={`ml-2 ${getRiskLevelColor(selectedPatient.riskLevel)}`}>
                             {getRiskLevelName(selectedPatient.riskLevel)}
                           </span>
                         </p>
                        <p><span className="text-[#3CB97F]">Son Aktivite:</span> {formatTimestamp(selectedPatient.lastActivity)}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-white mb-4">Analiz Geçmişi</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedPatient.analyses.map((analysis) => (
                          <div key={analysis.id} className="bg-[#18181b]/50 rounded-lg p-3">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getAnalysisIcon(analysis.type)}
                                                                 <span className="text-white font-medium">
                                   {getAnalysisTypeName(analysis.type)}
                                 </span>
                              </div>
                              <span className="text-[#3CB97F] font-semibold">{analysis.score}/10</span>
                            </div>
                            <p className="text-gray-400 text-sm mb-2">{analysis.details}</p>
                            <p className="text-gray-500 text-xs flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatTimestamp(analysis.timestamp)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {!loading && !error && activeTab === "analytics" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Analitik</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Toplam Hasta</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">{stats.totalPatients || patients.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Bu Hafta Analiz</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">
                        {stats.weeklyAnalyses || patients.reduce((sum, patient) => sum + (patient.analyses?.length || 0), 0)}
                      </p>
                    </div>
                    <Activity className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>

                <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Yüksek Risk</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">
                        {stats.highRiskPatients || patients.filter(p => p.riskLevel === 'high').length}
                      </p>
                    </div>
                    <AlertCircle className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>
              </div>

              <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                <h3 className="text-xl font-semibold text-white mb-4">Hasta Aktivite Özeti</h3>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-[#18181b]/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}></div>
                        <span className="text-white font-medium">{patient.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>{patient.analyses.length} analiz</span>
                        <span>Son: {formatTimestamp(patient.lastActivity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && !error && activeTab === "alerts" && (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Uyarılar</h2>
              
              <div className="bg-[#232325]/70 rounded-xl p-6 backdrop-blur-md">
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-4 p-4 bg-red-500/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="w-6 h-6 text-red-400" />
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{alert.title}</h4>
                        <p className="text-gray-300">{alert.message}</p>
                        <p className="text-gray-400 text-sm">Oluşturulma: {formatTimestamp(alert.createdAt)}</p>
                      </div>
                      <Button 
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2"
                        onClick={() => setSelectedPatient(alert.patient)}
                      >
                        İncele
                      </Button>
                    </div>
                  ))}
                  
                  {alerts.length === 0 && (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-gray-400">Aktif uyarı bulunmuyor.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default DoctorDashboard; 