import React, { useState, useEffect } from "react";
import { Bell, AlertCircle, CheckCircle, X, Clock } from "lucide-react";
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
      {/* Alert Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative p-2 text-[#3CB97F] hover:text-[#2d8f5f] transition-colors"
      >
        <Bell className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {showDropdown && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[#232325] rounded-lg shadow-lg border border-[#3CB97F]/20 z-50">
          <div className="p-4 border-b border-[#3CB97F]/20">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">Uyarılar</h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-[#3CB97F] text-sm hover:underline"
                >
                  Tümünü okundu işaretle
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {loading ? (
              <div className="p-4 text-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-[#3CB97F] mx-auto"></div>
                <p className="text-gray-400 text-sm mt-2">Yükleniyor...</p>
              </div>
            ) : error ? (
              <div className="p-4 text-center">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            ) : alerts.length === 0 ? (
              <div className="p-4 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">Uyarı bulunmuyor</p>
              </div>
            ) : (
              <div className="space-y-1">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-3 border-l-4 ${getAlertColor(alert.type)} ${
                      !alert.isRead ? 'bg-[#18181b]/50' : ''
                    } hover:bg-[#18181b]/30 transition-colors cursor-pointer`}
                    onClick={() => {
                      if (!alert.isRead) {
                        markAsRead(alert.id);
                      }
                      onAlertClick?.(alert);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <p className="text-white font-medium text-sm truncate">
                            {alert.title || 'Yeni Uyarı'}
                          </p>
                          {!alert.isRead && (
                            <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0 ml-2"></div>
                          )}
                        </div>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                          {alert.message}
                        </p>
                        <p className="text-gray-500 text-xs mt-1">
                          {formatTimestamp(alert.createdAt)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(alert.id);
                        }}
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Backdrop */}
      {showDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
}

export default AlertManager; 