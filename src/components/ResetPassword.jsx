import React, { useState } from "react";
import { Home, ArrowLeft, Eye, EyeOff } from "lucide-react";
import Input from "./forms/Input";
import PasswordInput from "./forms/PasswordInput";
import SubmitButton from "./forms/SubmitButton";
import ApiService from "../services/api";

function ResetPassword() {
  const [form, setForm] = useState({
    token: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // URL'den token'ı al
  const urlParams = new URLSearchParams(window.location.search);
  const tokenFromUrl = urlParams.get('token');

  React.useEffect(() => {
    if (tokenFromUrl) {
      setForm(prev => ({ ...prev, token: tokenFromUrl }));
    }
  }, [tokenFromUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!form.token) {
      newErrors.token = "Token gerekli";
    }

    if (!form.newPassword) {
      newErrors.newPassword = "Yeni şifre gerekli";
    } else if (form.newPassword.length < 6) {
      newErrors.newPassword = "Şifre en az 6 karakter olmalıdır";
    }

    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Şifre tekrarı gerekli";
    } else if (form.newPassword !== form.confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      await ApiService.resetPassword(form.token, form.newPassword);
      setSuccess(true);
    } catch (error) {
      setErrors({ general: error.message || 'Şifre sıfırlama başarısız oldu.' });
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 to-green-700">
        <div className="bg-[#232325] rounded-xl shadow-lg p-8 w-full max-w-md text-center">
          <div className="text-green-400 text-6xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-white mb-4">Şifre Başarıyla Sıfırlandı</h2>
          <p className="text-gray-400 mb-6">
            Yeni şifrenizle giriş yapabilirsiniz.
          </p>
          <button
            onClick={() => window.location.hash = '#/auth'}
            className="bg-[#265d5c] hover:bg-[#2d8f5f] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 to-green-700 relative">
      <a href="#/" className="absolute top-6 left-6 text-white hover:text-green-400 transition-colors text-2xl" title="Anasayfa">
        <Home className="w-8 h-8" />
      </a>
      
      <div className="bg-[#232325] rounded-xl shadow-lg p-8 w-full max-w-md">
        <button
          onClick={() => window.location.hash = '#/auth'}
          className="flex items-center gap-2 text-[#265d5c] hover:text-[#1f4d4c] mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Giriş ekranına dön
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Yeni Şifre Belirle
        </h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {/* Token (gizli) */}
          <Input
            type="hidden"
            name="token"
            value={form.token}
            onChange={handleChange}
          />

          {/* Yeni Şifre */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="newPassword"
              placeholder="Yeni Şifre"
              maxLength={32}
              autoComplete="new-password"
              value={form.newPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#18181b] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#265d5c] ${
                errors.newPassword ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.newPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
            )}
          </div>

          {/* Şifre Tekrar */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Şifre Tekrar"
              maxLength={32}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 bg-[#18181b] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#265d5c] ${
                errors.confirmPassword ? 'border-red-500' : 'border-gray-600'
              }`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="text-xs text-gray-400">
            Şifre en az 6 karakter olmalıdır.
          </div>

          {/* Submit Butonu */}
          <SubmitButton loading={loading}>
            Şifreyi Sıfırla
          </SubmitButton>
        </form>

        {/* Genel hata mesajı */}
        {errors.general && (
          <div className="text-red-400 text-sm text-center mt-4 p-3 bg-red-900/20 rounded-lg">
            {errors.general}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword; 