import React, { useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Input from "./forms/Input";
import PasswordInput from "./forms/PasswordInput";
import Select from "./forms/Select";
import UserTypeSelector from "./forms/UserTypeSelector";
import SubmitButton from "./forms/SubmitButton";
import { useAuth } from "../hooks/useAuth";
import { validateAuthForm } from "../utils/validation";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    expertiseLevel: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { login, register, forgotPassword, loading, error } = useAuth();

  // Uzmanlık seviyeleri, unvanlar
  const expertiseLevels = {
    "Psikoloji": [
      "Psikolog",
      "Klinik Psikolog",
      "Uzman Klinik Psikolog",
      "Psikoterapist",
      "Çocuk ve Ergen Psikoloğu",
      "Aile Danışmanı",
      "Bilişsel Davranışçı Terapist",
      "Diğer"
    ],
    "Psikiyatri": [
      "Psikiyatrist",
      "Uzman Psikiyatrist",
      "Doçent Dr.",
      "Prof. Dr.",
      "Çocuk ve Ergen Psikiyatristi",
      "Yetişkin Psikiyatristi",
      "Nöropsikiyatrist",
      "Diğer"
    ]
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: undefined });
    setSuccessMessage("");
    
    // Uzmanlık alanı değiştiğinde uzmanlık seviyesini sıfırla
    if (name === "specialization") {
      setForm(prev => ({ ...prev, expertiseLevel: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateAuthForm(form, isLogin, isDoctor, showForgotPassword);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        if (showForgotPassword) {
          await forgotPassword(form.email);
          setSuccessMessage("Şifre sıfırlama bağlantısı e-posta adresinize gönderildi. Lütfen e-postanızı kontrol edin.");
          setForm({ name: "", email: "", password: "", confirmPassword: "" });
        } else if (isLogin) {
          await login({
            email: form.email,
            password: form.password,
            userType: isDoctor ? 'doctor' : 'user'
          });
        } else {
          const registerData = {
            name: form.name,
            email: form.email,
            password: form.password,
            userType: isDoctor ? 'doctor' : 'user',
            specialization: isDoctor ? form.specialization : undefined,
            expertiseLevel: isDoctor ? form.expertiseLevel : undefined
          };
          
          // Doktor için expertiseLevel'ı localStorage'a kaydet
          if (isDoctor && form.expertiseLevel) {
            localStorage.setItem('doctorExpertiseLevel', form.expertiseLevel);
          }
          
          await register(registerData);
        }
      } catch (error) {
        setErrors({ general: error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.' });
      }
    }
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
    setForm({ name: "", email: "", password: "", confirmPassword: "", specialization: "", expertiseLevel: "" });
    setErrors({});
    setSuccessMessage("");
  };

  const handleBackToLogin = () => {
    setShowForgotPassword(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "", specialization: "", expertiseLevel: "" });
    setErrors({});
    setSuccessMessage("");
  };

  const handleToggleMode = () => {
    setIsLogin(!isLogin);
    setShowForgotPassword(false);
    setForm({ name: "", email: "", password: "", confirmPassword: "", specialization: "", expertiseLevel: "" });
    setErrors({});
    setSuccessMessage("");
  };

  const getSubmitButtonText = () => {
    if (showForgotPassword) return "Şifre Sıfırlama Bağlantısı Gönder";
    return isLogin ? "Giriş Yap" : "Kayıt Ol";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{ background: 'linear-gradient(135deg, #f5f5f5 60%, #e0e7ef 100%)' }}
    >
      <a href="/" className="absolute top-6 left-6 text-gray-700 hover:text-green-400 transition-colors text-2xl" title="Anasayfa">
        <Home className="w-8 h-8" />
      </a>
      
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {/* Başlık */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
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
        
        {/* Kullanıcı Tipi Seçimi */}
        {!showForgotPassword && (
          <UserTypeSelector isDoctor={isDoctor} setIsDoctor={setIsDoctor} />
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {/* Ad Soyad (sadece kayıt modunda) */}
          {!isLogin && !showForgotPassword && (
            <>
              <Input
                type="text"
                name="name"
                placeholder="Ad Soyad"
                maxLength={40}
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />
              
              {/* Uzmanlık alanı sadece doktor için */}
              {isDoctor && (
                <>
                  <Select
                    name="specialization"
                    value={form.specialization}
                    onChange={handleChange}
                    error={errors.specialization}
                  >
                    <option value="">Uzmanlık Alanı Seçiniz</option>
                    <option value="Psikoloji">Psikoloji</option>
                    <option value="Psikiyatri">Psikiyatri</option>
                  </Select>
                  
                  {/* Uzmanlık seviyesi seçimi */}
                  {form.specialization && (
                    <Select
                      name="expertiseLevel"
                      value={form.expertiseLevel}
                      onChange={handleChange}
                      error={errors.expertiseLevel}
                    >
                      <option value="">Uzmanlık Seviyesi Seçiniz</option>
                      {expertiseLevels[form.specialization]?.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </Select>
                  )}
                </>
              )}
            </>
          )}
          
          {/* E-posta */}
          <Input
            type="email"
            name="email"
            placeholder="E-posta"
            maxLength={50}
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          
          {/* Şifre (şifremi unuttum modunda gizli) */}
          {!showForgotPassword && (
            <div>
              <PasswordInput
                name="password"
                placeholder="Şifre"
                maxLength={32}
                autoComplete={isLogin ? "current-password" : "new-password"}
                value={form.password}
                onChange={handleChange}
                error={errors.password}
              />
              <div className="text-xs text-gray-400 mt-1">
                Şifre en az 6 karakter olmalıdır.
              </div>
            </div>
          )}
          
          {/* Şifre Doğrulama (sadece kayıt modunda) */}
          {!isLogin && !showForgotPassword && (
            <PasswordInput
              name="confirmPassword"
              placeholder="Şifre Tekrar"
              maxLength={32}
              autoComplete="new-password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          )}
          
          {/* Submit Butonu */}
          <SubmitButton 
            loading={loading} 
            isForgotPassword={showForgotPassword}
            isLogin={isLogin}
          >
            {getSubmitButtonText()}
          </SubmitButton>
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