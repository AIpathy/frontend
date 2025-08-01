import React, { useState, useEffect } from "react";
import { LogOut, User, Activity, Mic, FileText, Settings, Search, Users, TrendingUp, AlertCircle, Clock, Bot, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "./Button";
import AlertManager from "./AlertManager";
import ApiService from "../services/api";
import { formatTimestamp, getRiskLevelColor, getStatusColor, getAnalysisTypeName, getRiskLevelName, capitalizeName, formatDoctorName } from "../utils/helpers";
import AIInteraction from "./AIInteraction";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState("patients");
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
    // hasta verileri
  const [patients, setPatients] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({});

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    specialization: "",
    expertiseLevel: ""
  });

  const [sidebarOpen, setSidebarOpen] = useState(true);

  // API'den veri yükleme
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.hash = '#/auth';
        return;
      }

      try {
        const patientsData = await ApiService.getPatients(token);
        setPatients(patientsData);
      } catch (e) {
        setError('Hasta verileri yüklenemedi');
      }

      try {
        const statsData = await ApiService.getDashboardStats(token, 'doctor');
        setStats(statsData);
      } catch (e) {
        setError('İstatistikler yüklenemedi');
      }

      try {
        const alertsData = await ApiService.getAlerts(token);
        setAlerts(alertsData);
      } catch (e) {
        setAlerts([]); // Hata olsa bile boş bırak
      }

      try {
        const profileData = await ApiService.getUserProfile(token);
        setDoctor(profileData);
      } catch (e) {
        setError('Profil yüklenemedi');
      }

      setLoading(false);
    };

    loadData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
    window.location.hash = '#/';
  };

  const getAnalysisIcon = (type) => {
    switch (type) {
      case 'voice': return <Mic className="w-4 h-4" />;
      case 'phq9': return <FileText className="w-4 h-4" />;
      case 'beck_anxiety': return <Activity className="w-4 h-4" />;
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
                <AlertManager onAlertClick={(alert) => {
                  // Alert'e tıklandığında hasta detaylarını göster
                  if (alert.patientId) {
                    loadPatientDetails(alert.patientId);
                  }
                }} />
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
              {/* Doktor Profili */}
              <div className="bg-white/80 rounded-full px-2 py-1.5 mb-6 shadow-lg shadow-[#3CB97F]/10 overflow-hidden w-full flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#3CB97F] rounded-full flex items-center justify-center">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <span className="text-base font-semibold text-[#696969] leading-tight">{formatDoctorName(doctor.name, doctor.expertiseLevel)}</span>
                  <p className="text-gray-500 text-sm">{doctor.specialization}</p>
                </div>
              </div>
                          {/* Navigasyon */}
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("patients")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "patients"
                      ? "bg-[#3CB97F] text-white"
                      : "text-[#3CB97F] hover:bg-[#3CB97F]/10"
                  }`}
                >
                  <Users className="w-5 h-5" />
                  <span className={activeTab === "patients" ? "" : "text-[#3CB97F]"}>Hastalar</span>
                </button>

                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "analytics"
                      ? "bg-[#3CB97F] text-white"
                      : "text-[#3CB97F] hover:bg-[#3CB97F]/10"
                  }`}
                >
                  <TrendingUp className="w-5 h-5" />
                  <span className={activeTab === "analytics" ? "" : "text-[#3CB97F]"}>Analitik</span>
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
                  onClick={() => setActiveTab("alerts")}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === "alerts"
                      ? "bg-[#3CB97F] text-white"
                      : "text-[#3CB97F] hover:bg-[#3CB97F]/10"
                  }`}
                >
                  <AlertCircle className="w-5 h-5" />
                  <span className={activeTab === "alerts" ? "" : "text-[#3CB97F]"}>Uyarılar</span>
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

          {!loading && !error && activeTab === "patients" && (
            <div className="space-y-6">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Hasta Listesi</h2>
                <div className="h-1 w-12 md:w-16 bg-[#3CB97F] rounded-full mb-4" />
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Hasta ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-white/90 backdrop-blur-sm rounded-xl text-gray-800 placeholder-gray-400 border border-[#3CB97F]/20 focus:outline-none focus:ring-2 focus:ring-[#3CB97F] transition-colors"
                  />
                </div>
              </div>

              {/* Hasta Kartları */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-green-200/50 cursor-pointer hover:bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    onClick={() => loadPatientDetails(patient.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}></div>
                        <h3 className="text-gray-800 font-semibold">{patient.name}</h3>
                      </div>
                      <span className={`text-sm font-medium ${getRiskLevelColor(patient.riskLevel)}`}>{getRiskLevelName(patient.riskLevel)}</span>
                    </div>
                    <div className="space-y-2 text-sm text-gray-500">
                      <p>{patient.email}</p>
                      <p>Yaş: {patient.age}</p>
                      <p>Son aktivite: {formatTimestamp(patient.lastActivity)}</p>
                      <p>Analiz sayısı: {patient.analyses.length}</p>
                    </div>
                    <div className="mt-4 pt-4 border-t border-[#3CB97F]/20">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Ortalama skor:</span>
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
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-green-200/50 mt-6">
                  <div className="flex items-center justify-between mb-4 md:mb-6">
                    <h3 className="text-xl md:text-2xl font-bold text-[#3CB97F]">{selectedPatient.name} - Detaylar</h3>
                    <button
                      onClick={() => setSelectedPatient(null)}
                      className="group bg-white/80 backdrop-blur-sm rounded-xl p-3 shadow-lg shadow-[#3CB97F]/10 hover:shadow-xl hover:scale-105 transition-all duration-300 border border-[#3CB97F]/20 hover:border-[#3CB97F]/40"
                    >
                      <span className="text-[#3CB97F] font-semibold">Kapat</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <h4 className="text-lg font-semibold text-[#3CB97F] mb-4">Hasta Bilgileri</h4>
                      <div className="space-y-2 text-gray-700">
                        <p><span className="text-[#3CB97F] font-semibold">E-posta:</span> {selectedPatient.email}</p>
                        <p><span className="text-[#3CB97F] font-semibold">Yaş:</span> {selectedPatient.age}</p>
                        <p><span className="text-[#3CB97F] font-semibold">Risk Seviyesi:</span> 
                          <span className={`ml-2 ${getRiskLevelColor(selectedPatient.riskLevel)}`}>
                            {getRiskLevelName(selectedPatient.riskLevel)}
                          </span>
                        </p>
                        <p><span className="text-[#3CB97F] font-semibold">Son Aktivite:</span> {formatTimestamp(selectedPatient.lastActivity)}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-[#3CB97F] mb-4">Analiz Geçmişi</h4>
                      <div className="space-y-3 max-h-64 overflow-y-auto">
                        {selectedPatient.analyses.map((analysis) => (
                          <div key={analysis.id} className="bg-white/70 backdrop-blur-sm rounded-xl p-3 border border-green-200/50">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                {getAnalysisIcon(analysis.type)}
                                <span className="text-[#3CB97F] font-medium">
                                  {getAnalysisTypeName(analysis.type)}
                                </span>
                              </div>
                              <span className="text-[#3CB97F] font-semibold">{analysis.score}/10</span>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">{analysis.details}</p>
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
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Analitik</h2>
              <div className="h-1 w-12 md:w-16 bg-[#3CB97F] rounded-full mb-4" />
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-green-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden w-40 h-40 md:w-48 md:h-48 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <div className="min-w-[3rem] h-12 px-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-3">
                      <Users className="w-6 h-6 text-[#3CB97F]" />
                    </div>
                    <p className="text-[#3CB97F] text-xs font-medium mb-1">Toplam Hasta</p>
                    <p className="text-lg font-bold text-[#3CB97F]">{stats.totalPatients || patients.length}</p>
                  </div>
                </div>

                <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-green-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden w-40 h-40 md:w-48 md:h-48 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <div className="min-w-[3rem] h-12 px-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-3">
                      <span className="text-[#3CB97F] text-sm font-bold whitespace-nowrap">
                        {stats.weeklyAnalyses || patients.reduce((sum, patient) => sum + (patient.analyses?.length || 0), 0)}
                      </span>
                    </div>
                    <p className="text-[#3CB97F] text-xs font-medium mb-1">Bu Hafta Analiz</p>
                    <p className="text-lg font-bold text-[#3CB97F]">
                      {stats.weeklyAnalyses || patients.reduce((sum, patient) => sum + (patient.analyses?.length || 0), 0)}
                    </p>
                  </div>
                </div>

                <div className="group bg-white/95 backdrop-blur-xl rounded-2xl p-4 shadow-xl border-2 border-green-200/50 hover:shadow-2xl hover:scale-105 transition-all duration-500 overflow-hidden w-40 h-40 md:w-48 md:h-48 mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-2xl" />
                  <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
                    <div className="min-w-[3rem] h-12 px-3 bg-gradient-to-br from-teal-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500 mb-3">
                      <AlertCircle className="w-6 h-6 text-[#3CB97F]" />
                    </div>
                    <p className="text-[#3CB97F] text-xs font-medium mb-1">Yüksek Risk</p>
                    <p className="text-lg font-bold text-[#3CB97F]">
                      {stats.highRiskPatients || patients.filter(p => p.riskLevel === 'high').length}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-green-200/50 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-105 max-w-md mx-auto">
                <h3 className="text-lg md:text-xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-4 text-center">Hasta Aktivite Özeti</h3>
                <div className="space-y-3 md:space-y-4 max-h-80 overflow-y-auto">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex flex-col space-y-2 p-3 md:p-4 bg-white/70 backdrop-blur-sm rounded-xl border border-green-200/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}></div>
                          <span className="text-gray-800 font-medium">{patient.name}</span>
                        </div>
                        <span className="text-[#3CB97F] font-semibold text-sm">{patient.analyses.length} analiz</span>
                      </div>
                      <div className="text-xs md:text-sm text-gray-500">
                        Son aktivite: {formatTimestamp(patient.lastActivity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI Asistan Sekmesi */}
          {!loading && !error && activeTab === "ai-assistant" && (
            <div className="-m-6 h-[calc(100vh-120px)]">
              <AIInteraction doctorMode={true} />
            </div>
          )}

          {!loading && !error && activeTab === "alerts" && (
            <div className="space-y-6">
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Uyarılar</h2>
              <div className="h-1 w-12 md:w-16 bg-[#3CB97F] rounded-full mb-4" />
              
              <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 md:p-6 shadow-xl border-2 border-green-200/50 transition-all duration-300 hover:bg-white hover:shadow-2xl hover:scale-105">
                <div className="space-y-3 md:space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-red-500/20 border border-red-500/30 rounded-xl">
                      <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-400" />
                      <div className="flex-1">
                        <h4 className="text-red-600 font-semibold text-sm md:text-base">{alert.title}</h4>
                        <p className="text-gray-600 text-xs md:text-sm">{alert.message}</p>
                        <p className="text-gray-500 text-xs">Oluşturulma: {formatTimestamp(alert.createdAt)}</p>
                      </div>
                      <button 
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-semibold transition-colors"
                        onClick={() => setSelectedPatient(alert.patient)}
                      >
                        İncele
                      </button>
                    </div>
                  ))}
                  
                  {alerts.length === 0 && (
                    <div className="text-center py-8">
                      <AlertCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-gray-500">Aktif uyarı bulunmuyor.</p>
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