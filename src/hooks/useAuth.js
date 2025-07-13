import { useState } from "react";
import ApiService from "../services/api";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = async (credentials) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await ApiService.login(credentials);
      
      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.token);
      localStorage.setItem('userType', credentials.userType);
      localStorage.setItem('userData', JSON.stringify(response.user));
      
      // Dashboard'a yönlendir
      if (credentials.userType === 'doctor') {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/dashboard";
      }
      
      return response;
    } catch (error) {
      setError(error.message || 'Giriş yapılamadı. Lütfen tekrar deneyin.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await ApiService.register(userData);
      
      // Başarılı kayıt sonrası giriş yap
      const loginResponse = await ApiService.login({
        email: userData.email,
        password: userData.password,
        userType: userData.userType
      });
      
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('userType', userData.userType);
      localStorage.setItem('userData', JSON.stringify(loginResponse.user));
      
      if (userData.userType === 'doctor') {
        window.location.href = "/doctor";
      } else {
        window.location.href = "/dashboard";
      }
      
      return response;
    } catch (error) {
      setError(error.message || 'Kayıt yapılamadı. Lütfen tekrar deneyin.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async (email) => {
    setLoading(true);
    setError("");
    
    try {
      const response = await ApiService.forgotPassword(email);
      return response;
    } catch (error) {
      setError(error.message || 'Şifre sıfırlama bağlantısı gönderilemedi.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    register,
    forgotPassword,
    loading,
    error
  };
}; 