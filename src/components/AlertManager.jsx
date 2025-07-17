import React, { useState, useEffect } from "react";
import { Bell, AlertCircle, CheckCircle, X, Clock, Trash2 } from "lucide-react";
import ApiService from "../services/api";

function AlertManager({ onAlertClick }) {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const alertsData = await ApiService.getAlerts(token);
      setAlerts(alertsData);
      setUnreadCount(alertsData.filter(alert => !alert.isRead).length);
    } catch (error) {
      setError('Uyarılar yüklenemedi');
      console.error('Alerts loading error:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (alertId) => {
    try {
      const token = localStorage.getItem('token');
      await ApiService.markAlertAsRead(alertId, token);
      
      // Update local state
      setAlerts(prev => 
        prev.map(alert => 
          alert.id === alertId ? { ...alert, isRead: true } : alert
        )
      );
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const token = localStorage.getItem('token');
      const unreadAlerts = alerts.filter(alert => !alert.isRead);
      
      await Promise.all(
        unreadAlerts.map(alert => ApiService.markAlertAsRead(alert.id, token))
      );
      
      setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Mark all as read error:', error);
    }
  };

  const deleteOne = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await ApiService.deleteAlert(id, token);
      setAlerts((prev) => prev.filter((a) => a.id !== id));
      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Delete alert error:", err);
    }
  };

  const deleteAll = async () => {
    try {
      const token = localStorage.getItem('token');
      await ApiService.deleteAllAlerts(token);
      setAlerts([]);
      setUnreadCount(0);
    } catch (err) {
      console.error('Tüm uyarıları silme hatası:', err);
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'risk':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      case 'inactivity':
        return <Clock className="w-5 h-5 text-yellow-400" />;
      case 'score_change':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      default:
        return <AlertCircle className="w-5 h-5 text-blue-400" />;
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'risk':
        return 'border-red-500/30 bg-red-500/10';
      case 'inactivity':
        return 'border-yellow-500/30 bg-yellow-500/10';
      case 'score_change':
        return 'border-green-500/30 bg-green-500/10';
      default:
        return 'border-blue-500/30 bg-blue-500/10';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Az önce';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} saat önce`;
    } else {
      return date.toLocaleDateString('tr-TR');
    }
  };

  return (
    <div className="relative">
      {/* Zil */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-[#3CB97F] hover:text-[#2d8f5f]"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>
  
      {/* Dropdown */}
      {showDropdown && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Modal arka planı */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setShowDropdown(false)} />
          {/* Modal kutusu */}
          <div className="relative w-full max-w-md mx-auto bg-white/90 rounded-2xl shadow-2xl border border-[#e0e7ef] flex flex-col max-h-[90vh] my-auto">
            {/* Kapat butonu */}
            <button onClick={() => setShowDropdown(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10" title="Kapat" style={{background: 'rgba(255,255,255,0.7)', borderRadius: '9999px', padding: '2px'}}>
              <X className="w-6 h-6" />
            </button>
            {/* Başlık */}
            <div className="p-6 border-b border-[#e0e7ef] flex justify-between items-center">
              <h3 className="text-gray-800 font-semibold text-lg">Uyarılar</h3>
              <div className="flex gap-3">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-[#3CB97F] text-xs hover:underline"
                  >
                    Tümünü okundu yap
                  </button>
                )}
                {alerts.length > 0 && (
                  <button
                    onClick={deleteAll}
                    className="text-red-400 text-xs hover:underline"
                  >
                    Tümünü sil
                  </button>
                )}
              </div>
            </div>
            {/* İçerik */}
            <div className="overflow-y-auto p-6 flex-1">
              {loading ? (
                <div className="text-center text-gray-400">Yükleniyor…</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : alerts.length === 0 ? (
                <div className="text-center">
                  <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-1" />
                  <p className="text-gray-400 text-sm">Uyarı yok</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 border-l-4 ${getAlertColor(alert.type)} ${!alert.is_read ? "bg-[#f5f5f5]" : "bg-white/80"} hover:bg-[#e0e7ef] transition-colors cursor-pointer mb-3 rounded-lg`}
                    onClick={() => {
                      if (!alert.is_read) markAsRead(alert.id);
                      window.location.hash = `#/alert/${alert.id}`;
                    }}
                  >
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <p className="text-gray-800 text-sm font-medium truncate">
                            {alert.title || "Uyarı"}
                          </p>
                          {!alert.is_read && (
                            <span className="w-2 h-2 bg-red-400 rounded-full mt-1"></span>
                          )}
                        </div>
                        <p className="text-gray-500 text-xs line-clamp-2">
                          {alert.message}
                        </p>
                        <p className="text-gray-400 text-xs">
                          {formatTimestamp(alert.created_at)}
                        </p>
                      </div>
                      {/* Okundu */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(alert.id);
                        }}
                        className="text-gray-400 hover:text-gray-800 ml-1"
                        title="Okundu yap"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      {/* Sil */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteOne(alert.id);
                        }}
                        className="text-red-500 hover:text-red-700 ml-1"
                        title="Sil"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
  
      {/* Backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );  
}

export default AlertManager;