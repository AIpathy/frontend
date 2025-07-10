import React, { useState } from "react";
import { Home, Mail, ArrowLeft, Eye, EyeOff } from "lucide-react";
import ApiService from "../services/api";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: ""
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};
    
    // E-posta kontrolü
    if (!form.email) {
      newErrors.email = "E-posta gereklidir.";
    } else if (!/^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(form.email)) {
      newErrors.email = "Geçerli bir e-posta adresi girin.";
    } else if (form.email.length > 50) {
      newErrors.email = "E-posta en fazla 50 karakter olabilir.";
    }
    
    // Şifre kontrolü
    if (!showForgotPassword) {
      if (!form.password) {
        newErrors.password = "Şifre gereklidir.";
      } else if (form.password.length < 6) {
        newErrors.password = "Şifre en az 6 karakter olmalı.";
      } else if (form.password.length > 32) {
        newErrors.password = "Şifre en fazla 32 karakter olabilir.";
      }
      
      // Şifre doğrulama kontrolü
      if (!isLogin) {
        if (!form.confirmPassword) {
          newErrors.confirmPassword = "Şifre doğrulama gereklidir.";
        } else if (form.password !== form.confirmPassword) {
          newErrors.confirmPassword = "Şifreler eşleşmiyor.";
        }
      }
    }
    
    // Ad Soyad kontrolü (kayıt)
    if (!isLogin && !showForgotPassword) {
      if (!form.name) {
        newErrors.name = "Ad Soyad gereklidir.";
      } else if (form.name.length > 40) {
        newErrors.name = "Ad Soyad en fazla 40 karakter olabilir.";
      } else if (!/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s'-]+$/.test(form.name)) {
        newErrors.name = "Ad Soyad sadece harf, boşluk ve - karakteri içerebilir.";
      }
      // Doktor ise uzmanlık kontrolü
      if (isDoctor && !form.specialization) {
        newErrors.specialization = "Uzmanlık alanı gereklidir.";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSuccessMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        if (showForgotPassword) {
          // Şifremi unuttum işlemi
          await ApiService.forgotPassword(form.email);
          setSuccessMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.");
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
        } else if (isLogin) {
          // Giriş işlemi
          const response = await ApiService.login({
            email: form.email,
            password: form.password,
            userType: isDoctor ? 'doctor' : 'user'
          });
          
          // Token'ı localStorage'a kaydet
          localStorage.setItem('token', response.token);
          localStorage.setItem('userType', isDoctor ? 'doctor' : 'user');
          localStorage.setItem('userData', JSON.stringify(response.user));
          
          // Dashboard'a yönlendir
          if (isDoctor) {
            window.location.href = "/doctor";
          } else {
            window.location.href = "/dashboard";
          }
        } else {
          // Kayıt işlemi
          const response = await ApiService.register({
            name: form.name,
            email: form.email,
            password: form.password,
            userType: isDoctor ? 'doctor' : 'user',
            specialization: isDoctor ? form.specialization : undefined // Uzmanlık gönder
          });
          
          // Başarılı kayıt sonrası giriş yap
          const loginResponse = await ApiService.login({
            email: form.email,
            password: form.password,
            userType: isDoctor ? 'doctor' : 'user'
          });
          
          localStorage.setItem('token', loginResponse.token);
          localStorage.setItem('userType', isDoctor ? 'doctor' : 'user');
          localStorage.setItem('userData', JSON.stringify(loginResponse.user));
          
          if (isDoctor) {
            window.location.href = "/doctor";
          } else {
            window.location.href = "/dashboard";
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        setErrors({ general: error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setSuccessMessage("");
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setSuccessMessage("");
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "" });
    setErrors({});
    setSuccessMessage("");
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 to-green-700 relative">
      <a href="/" className="absolute top-6 left-6 text-white hover:text-green-400 transition-colors text-2xl" title="Anasayfa">
        <Home className="w-8 h-8" />
      </a>
      <div className="bg-[#232325] rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {showForgotPassword 
            ? "Şifremi Unuttum" 
            : (isLogin ? "Giriş Yap" : "Kayıt Ol")
          }
        </h2>
        
        {/* Şifremi unuttum modunda geri dön butonu */}
        {showForgotPassword && (
          <button
            onClick={handleBackToLogin}
            className="flex items-center gap-2 text-green-400 hover:text-green-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Giriş ekranına dön
          </button>
        )}
        
        {/* Kullanıcı Tipi Seçimi (şifremi unuttum modunda gizli) */}
        {!showForgotPassword && (
          <div className="flex gap-2 mb-6">
            <button
              type="button"
              onClick={() => setIsDoctor(false)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                !isDoctor
                  ? "bg-[#3CB97F] text-white"
                  : "bg-[#18181b] text-gray-300 hover:bg-[#18181b]/80"
              }`}
            >
              Kullanıcı
            </button>
            <button
              type="button"
              onClick={() => setIsDoctor(true)}
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                isDoctor
                  ? "bg-[#3CB97F] text-white"
                  : "bg-[#18181b] text-gray-300 hover:bg-[#18181b]/80"
              }`}
            >
              Doktor
            </button>
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {/* Ad Soyad (sadece kayıt modunda) */}
          {!isLogin && !showForgotPassword && (
            <>
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Ad Soyad"
                  maxLength={40}
                  autoComplete="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`px-4 py-2 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${errors.name ? 'border border-red-500' : ''}`}
                />
                <div className="text-xs text-red-400 mt-1 min-h-[18px]">{errors.name}</div>
              </div>
              {/* Uzmanlık alanı sadece doktor için */}
              {isDoctor && (
                <div>
                  <select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    className={`px-4 py-2 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${errors.specialization ? 'border border-red-500' : ''}`}
                  >
                    <option value="">Uzmanlık Seçiniz</option>
                    <option value="Psikoloji">Psikoloji</option>
                    <option value="Psikiyatri">Psikiyatri</option>
                  </select>
                  <div className="text-xs text-red-400 mt-1 min-h-[18px]">{errors.specialization}</div>
                </div>
              )}
            </>
          )}
          
          {/* E-posta */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="E-posta"
              maxLength={50}
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={`px-4 py-2 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${errors.email ? 'border border-red-500' : ''}`}
            />
            <div className="text-xs text-red-400 mt-1 min-h-[18px]">{errors.email}</div>
          </div>
          
          {/* Şifre (şifremi unuttum modunda gizli) */}
          {!showForgotPassword && (
            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Şifre"
                  maxLength={32}
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  value={form.password}
                  onChange={handleChange}
                  className={`px-4 py-2 pr-10 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${errors.password ? 'border border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('password')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-xs text-red-400 mt-1 min-h-[18px]">{errors.password}</div>
              <div className="text-xs text-gray-400 mt-1">
                Şifre en az 6 karakter olmalıdır.
              </div>
            </div>
          )}
          
          {/* Şifre Doğrulama (sadece kayıt modunda) */}
          {!isLogin && !showForgotPassword && (
            <div>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Şifre Tekrar"
                  maxLength={32}
                  autoComplete="new-password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`px-4 py-2 pr-10 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${errors.confirmPassword ? 'border border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="text-xs text-red-400 mt-1 min-h-[18px]">{errors.confirmPassword}</div>
            </div>
          )}
          
          {/* Submit Butonu */}
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                İşleniyor...
              </>
            ) : (
              <>
                {showForgotPassword && <Mail className="w-4 h-4" />}
                {showForgotPassword 
                  ? "Şifre Sıfırlama Bağlantısı Gönder" 
                  : (isLogin ? "Giriş Yap" : "Kayıt Ol")
                }
              </>
            )}
          </button>
        </form>
        
        {/* Başarı mesajı */}
        {successMessage && (
          <div className="text-green-400 text-sm text-center mt-4 p-3 bg-green-900/20 rounded-lg">
            {successMessage}
          </div>
        )}
        
        {/* Genel hata mesajı */}
        {errors.general && (
          <div className="text-red-400 text-sm text-center mt-2">
            {errors.general}
          </div>
        )}
        
        {/* Alt linkler */}
        <div className="text-center mt-4 space-y-2">
          {!showForgotPassword && isLogin && (
            <button
              className="text-green-400 hover:underline text-sm block w-full"
              onClick={handleForgotPassword}
            >
              Şifremi unuttum
            </button>
          )}
          
          {!showForgotPassword && (
            <button
              className="text-green-400 hover:underline text-sm block w-full"
              onClick={handleToggleMode}
            >
              {isLogin ? "Hesabın yok mu? Kayıt Ol" : "Zaten hesabın var mı? Giriş Yap"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Auth; 