import { useState } from "react";
import ApiService from "../services/api";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async (credentials) => {
    setLoading(true);
    setError("");

    try {
      const response = await ApiService.login(credentials);

      // Token'ı localStorage'a kaydet
      localStorage.setItem('token', response.token);
      // Backend'ten gelen userType'ı kullan
      const userType = response?.user?.userType || "user";
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify({
        ...response.user,
        rank: response.user.rank
      }));

      // Dashboard'a yönlendir
      if (response.user.userType === 'doctor') {
        navigate("/doctor");
      } else {
        navigate("/dashboard");
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
      // Backend'ten gelen userType'ı kullan
      const userType = loginResponse?.user?.userType || "user";
      localStorage.setItem('userType', userType);
      localStorage.setItem('userData', JSON.stringify({
        ...loginResponse.user,
        rank: loginResponse.user.rank       
      }));

      if (loginResponse.user.userType === 'doctor') {
        navigate("/doctor");
      } else {
        navigate("/dashboard");
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