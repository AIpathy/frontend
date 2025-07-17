import React, { useState, useEffect } from "react";
import { LogOut, User, Activity, Camera, Mic, FileText, Settings, Search, Users, TrendingUp, AlertCircle, Clock, Bot } from "lucide-react";
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

  // API'den veri yükleme
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/auth';
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
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #f5f5f5 60%, #e0e7ef 100%)' }}
    >
      {/* Header */}
      <header
        className="backdrop-blur-md border-b border-[#3CB97F]/20"
        style={{ background: 'linear-gradient(135deg, #ececec 60%, #e0e7ef 100%)' }}
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm">AIpathy Doktor Paneli</h1>
          </div>
          <div className="flex items-center space-x-4">
            <AlertManager onAlertClick={(alert) => {
              // Alert'e tıklandığında hasta detaylarını göster
              if (alert.patientId) {
                loadPatientDetails(alert.patientId);
              }
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
        <aside
          className="w-64 min-h-screen"
          style={{ background: 'linear-gradient(135deg, #f5faff 60%, #e0e7ef 100%)' }}
        >
          <div className="p-6">
            {/* Doktor Profili */}
            <div className="bg-white/80 rounded-lg p-4 mb-6 shadow-md">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#3CB97F] rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold">{formatDoctorName(doctor.name, doctor.expertiseLevel)}</h3>
                  <p className="text-gray-500 text-sm">{doctor.specialization}</p>
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
                <span className={activeTab === "patients" ? "" : "text-gray-800"}>Hastalar</span>
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
                <span className={activeTab === "analytics" ? "" : "text-gray-800"}>Analitik</span>
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
                onClick={() => setActiveTab("alerts")}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === "alerts"
                    ? "bg-[#3CB97F] text-white"
                    : "text-gray-300 hover:bg-[#18181b]/50"
                }`}
              >
                <AlertCircle className="w-5 h-5" />
                <span className={activeTab === "alerts" ? "" : "text-gray-800"}>Uyarılar</span>
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
              <div className="mb-6">
                <h2 className="text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Hasta Listesi</h2>
                <div className="h-1 w-16 bg-[#3CB97F] rounded-full mb-4" />
                <div className="relative mt-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Hasta ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-[#f5f5f5] rounded-lg text-gray-800 placeholder-gray-400 border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#3CB97F] transition-colors"
                  />
                </div>
              </div>

              {/* Hasta Kartları */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPatients.map((patient) => (
                  <div
                    key={patient.id}
                    className="bg-white/90 rounded-xl p-6 shadow-md cursor-pointer hover:bg-white transition-all duration-200"
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
              <h2 className="text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Analitik</h2>
              <div className="h-1 w-16 bg-[#3CB97F] rounded-full mb-4" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#e6eaf3] rounded-xl p-6 shadow-md transition-colors duration-200 hover:bg-[#f0f2f8]">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Toplam Hasta</p>
                      <p className="text-2xl font-bold text-[#3CB97F]">{stats.totalPatients || patients.length}</p>
                    </div>
                    <Users className="w-8 h-8 text-[#3CB97F]" />
                  </div>
                </div>

                <div className="bg-[#e6eaf3] rounded-xl p-6 shadow-md transition-colors duration-200 hover:bg-[#f0f2f8]">
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

                <div className="bg-[#e6eaf3] rounded-xl p-6 shadow-md transition-colors duration-200 hover:bg-[#f0f2f8]">
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

              <div className="bg-[#e6eaf3] rounded-xl p-6 shadow-md transition-colors duration-200 hover:bg-[#f0f2f8]">
                <h3 className="text-xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-4">Hasta Aktivite Özeti</h3>
                <div className="space-y-4">
                  {patients.map((patient) => (
                    <div key={patient.id} className="flex items-center justify-between p-3 bg-white/70 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(patient.status)}`}></div>
                        <span className="text-gray-800 font-medium">{patient.name}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{patient.analyses.length} analiz</span>
                        <span>Son: {formatTimestamp(patient.lastActivity)}</span>
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
              <h2 className="text-3xl font-extrabold text-[#3CB97F] tracking-wide drop-shadow-sm mb-2">Uyarılar</h2>
              <div className="h-1 w-16 bg-[#3CB97F] rounded-full mb-4" />
              
              <div className="bg-[#e6eaf3] rounded-xl p-6 shadow-md transition-colors duration-200 hover:bg-[#f0f2f8]">
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