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
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#232325] rounded-lg shadow-lg border border-[#3CB97F]/20 z-[9999]">
          {/* Başlık */}
          <div className="p-4 border-b border-[#3CB97F]/20 flex justify-between items-center">
            <h3 className="text-white font-semibold">Uyarılar</h3>
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
          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center text-gray-400">Yükleniyor…</div>
            ) : error ? (
              <div className="p-4 text-center text-red-400">{error}</div>
            ) : alerts.length === 0 ? (
              <div className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-1" />
                <p className="text-gray-400 text-sm">Uyarı yok</p>
              </div>
            ) : (
              alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 border-l-4 ${getAlertColor(alert.type)} ${
                    !alert.is_read ? "bg-[#18181b]/50" : ""
                  } hover:bg-[#18181b]/30 transition-colors cursor-pointer`}
                  onClick={() => {
                    if (!alert.is_read) markAsRead(alert.id);
                    // navigate detay sayfasına:
                    window.location.href = `/alert/${alert.id}`;
                  }}
                >
                  <div className="flex items-start gap-3">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="text-white text-sm font-medium truncate">
                          {alert.title || "Uyarı"}
                        </p>
                        {!alert.is_read && (
                          <span className="w-2 h-2 bg-red-400 rounded-full mt-1"></span>
                        )}
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {alert.message}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {formatTimestamp(alert.created_at)}
                      </p>
                    </div>
                    {/* Okundu */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        markAsRead(alert.id);
                      }}
                      className="text-gray-400 hover:text-white"
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
                      className="text-red-500 hover:text-red-300 ml-1"
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