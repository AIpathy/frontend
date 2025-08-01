import React, { useState, useEffect, useRef } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Input from "./forms/Input";
import PasswordInput from "./forms/PasswordInput";
import Select from "./forms/Select";
import UserTypeSelector from "./forms/UserTypeSelector";
import SubmitButton from "./forms/SubmitButton";
import { useAuth } from "../hooks/useAuth";
import { validateAuthForm } from "../utils/validation";

const LeafIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center text-2xl">
    🍃
  </div>
);

const HeartPulseIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center text-2xl">
    💚
  </div>
);

const ShieldCheckIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center text-2xl">
    🛡️
  </div>
);

const BotIcon = () => (
  <div className="w-8 h-8 flex items-center justify-center text-2xl">
    🤖
  </div>
);

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [isDoctor, setIsDoctor] = useState(null);
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
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isVisible, setIsVisible] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const containerRef = useRef(null);

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

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);

    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    // Animation time tracker
    const timeInterval = setInterval(() => {
      setCurrentTime(prev => prev + 0.016); // ~60fps
    }, 16);

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearTimeout(timer);
      clearInterval(timeInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

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
    
    // Kullanıcı tipi seçilmemişse hata göster
    if (isDoctor === null) {
      setErrors({ general: 'Lütfen kullanıcı tipini seçiniz.' });
      return;
    }
    
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
      ref={containerRef}
      className="w-full min-h-screen bg-white relative overflow-hidden"
    >
      {/* Ultra-premium forest atmosphere */}
      <div className="absolute inset-0">
        {/* Dynamic forest depth layers */}
        <div className="absolute inset-0">
          {/* Depth layer 1 - Far forest */}
          <div className="absolute inset-0 opacity-8">
            {[...Array(15)].map((_, i) => (
              <div
                key={`far-tree-${i}`}
                className="absolute opacity-20"
                style={{
                  left: `${5 + i * 6}%`,
                  top: `${20 + Math.sin(i * 0.7) * 15}%`,
                  transform: `scale(${0.6 + Math.sin(currentTime * 0.5 + i) * 0.1}) translateY(${Math.sin(currentTime * 0.3 + i) * 3}px)`,
                  filter: 'blur(1px)'
                }}
              >
                <div className="text-4xl text-green-600">🌲</div>
              </div>
            ))}
          </div>

          {/* Depth layer 2 - Mid forest */}
          <div className="absolute inset-0 opacity-15">
            {[...Array(10)].map((_, i) => (
              <div
                key={`mid-tree-${i}`}
                className="absolute opacity-30"
                style={{
                  left: `${8 + i * 8}%`,
                  top: `${10 + Math.sin(i * 1.2) * 20}%`,
                  transform: `scale(${0.8 + Math.sin(currentTime * 0.4 + i) * 0.15}) translateY(${Math.sin(currentTime * 0.6 + i) * 5}px)`,
                  filter: 'blur(0.5px)'
                }}
              >
                <div className="text-5xl text-emerald-600">🌳</div>
              </div>
            ))}
          </div>

          {/* Floating magical elements */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={`magic-${i}`}
                className="absolute animate-float-magic"
                style={{
                  left: `${10 + (i * 4) % 80}%`,
                  top: `${15 + (i * 5) % 70}%`,
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${6 + (i % 4) * 2}s`,
                  transform: `scale(${0.5 + Math.sin(currentTime + i) * 0.3})`
                }}
              >
                <div className="text-2xl opacity-30">
                  {i % 6 === 0 ? '✨' : i % 6 === 1 ? '🍃' : i % 6 === 2 ? '🌿' : i % 6 === 3 ? '💫' : i % 6 === 4 ? '🍀' : '⭐'}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div 
          className="absolute transition-all duration-1000 ease-out"
          style={{
            width: '120vw',
            height: '120vh',
            background: `
              radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, 
                rgba(34, 197, 94, 0.15) 0%, 
                rgba(16, 185, 129, 0.08) 30%, 
                rgba(20, 184, 166, 0.05) 50%, 
                transparent 70%)
            `,
            left: '-10vw',
            top: '-10vh',
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute transition-all duration-1500 ease-out"
          style={{
            width: '80vw',
            height: '80vh',
            background: `
              radial-gradient(ellipse at ${mousePos.x + 15}% ${mousePos.y - 10}%, 
                rgba(22, 163, 74, 0.12) 0%, 
                rgba(5, 150, 105, 0.06) 40%, 
                transparent 70%)
            `,
            left: '10vw',
            top: '10vh',
            filter: 'blur(60px)',
          }}
        />
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 75%, rgba(34, 197, 94, 0.03) 0%, transparent 50%),
              radial-gradient(circle at 75% 25%, rgba(16, 185, 129, 0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(20, 184, 166, 0.02) 0%, transparent 50%)
            `,
            backgroundSize: '400px 400px, 600px 600px, 800px 800px',
            animation: 'organic-flow 20s ease-in-out infinite'
          }}
        />
      </div>

      {/* Home button */}
      <a 
        href="/" 
        className="absolute top-8 left-8 z-50 group"
        title="Anasayfa"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-800 to-emerald-700 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 border-2 border-green-200">
            <Home className="w-8 h-8 text-green-700 group-hover:text-green-800 transition-colors" />
          </div>
        </div>
      </a>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div 
            className={`transition-all duration-1200 ease-out ${
              isVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            }`}
          >
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full border-2 border-green-200 shadow-lg mb-8 hover:shadow-xl hover:scale-105 transition-all duration-500 backdrop-blur-sm">
                <div className="animate-spin-slow">
                  <LeafIcon />
                </div>
                <span className="text-green-800 font-bold text-base tracking-wide">
                  AIpathy × Ruhsal Denge
                </span>
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}} />
                </div>
              </div>
              
              <h1 className="text-5xl font-black leading-none mb-4">
                <span className="block bg-gradient-to-r from-green-900 via-emerald-800 to-teal-700 bg-clip-text text-transparent drop-shadow-sm">
                  {showForgotPassword 
                    ? "Şifremi Unuttum" 
                    : (isLogin ? "Giriş Yap" : "Kayıt Ol")
                  }
                </span>
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {showForgotPassword 
                  ? "E-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim"
                  : "AIpathy ile ruhsal yolculuğunuza başlayın"
                }
              </p>
            </div>

            {/* Form container */}
            <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-10 border-2 border-green-200/50 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden relative">
              
              {/* Form background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50 opacity-0 hover:opacity-100 transition-all duration-700 rounded-3xl" />
              
              {/* Şifremi unuttum modunda geri dön butonu */}
              {showForgotPassword && (
                <button
                  onClick={handleBackToLogin}
                  className="flex items-center gap-3 text-green-700 hover:text-green-800 mb-6 transition-all duration-300 group relative z-30"
                >
                  <div className="bg-green-100 rounded-full p-2 group-hover:bg-green-200 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                  </div>
                  <span className="font-semibold">Giriş ekranına dön</span>
                </button>
              )}
              
              {/* Kullanıcı Tipi Seçimi */}
              {!showForgotPassword && (
                <div className="mb-8 relative z-20">
                  <UserTypeSelector isDoctor={isDoctor} setIsDoctor={setIsDoctor} />
                </div>
              )}

              <form className="flex flex-col gap-6 relative z-10" onSubmit={handleSubmit} noValidate>
                {/* Ad Soyad (sadece kayıt modunda) */}
                {!isLogin && !showForgotPassword && (
                  <>
                    <div className="group">
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
                    </div>
                    
                    {/* Uzmanlık alanı sadece doktor için */}
                    {isDoctor && (
                      <>
                        <div className="group">
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
                        </div>
                        
                        {/* Uzmanlık seviyesi seçimi */}
                        {form.specialization && (
                          <div className="group">
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
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
                
                {/* E-posta */}
                <div className="group">
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
                </div>
                
                {/* Şifre (şifremi unuttum modunda gizli) */}
                {!showForgotPassword && (
                  <div className="group">
                    <PasswordInput
                      name="password"
                      placeholder="Şifre"
                      maxLength={32}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      value={form.password}
                      onChange={handleChange}
                      error={errors.password}
                    />
                    <div className="text-xs text-gray-500 mt-2 flex items-center gap-2">
                      <ShieldCheckIcon />
                      <span>Şifre en az 6 karakter olmalıdır.</span>
                    </div>
                  </div>
                )}
                
                {/* Şifre Doğrulama (sadece kayıt modunda) */}
                {!isLogin && !showForgotPassword && (
                  <div className="group">
                    <PasswordInput
                      name="confirmPassword"
                      placeholder="Şifre Tekrar"
                      maxLength={32}
                      autoComplete="new-password"
                      value={form.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                    />
                  </div>
                )}
                
                {/* Submit Butonu */}
                <div className="mt-8 flex justify-center">
                  <SubmitButton 
                    loading={loading} 
                    isForgotPassword={showForgotPassword}
                    isLogin={isLogin}
                  >
                    <span>{getSubmitButtonText()}</span>
                  </SubmitButton>
                </div>
              </form>
              
              {/* Başarı mesajı */}
              {successMessage && (
                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-2 border-green-200 rounded-2xl text-green-800 text-center font-semibold shadow-lg">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-2xl">✅</div>
                    <span>Başarılı!</span>
                  </div>
                  {successMessage}
                </div>
              )}
              
              {/* Genel hata mesajı */}
              {errors.general && (
                <div className="mt-6 p-4 bg-gradient-to-r from-red-100 to-pink-100 border-2 border-red-200 rounded-2xl text-red-800 text-center font-semibold shadow-lg">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="text-2xl">⚠️</div>
                    <span>Hata!</span>
                  </div>
                  {errors.general}
                </div>
              )}
              
              {/* Alt linkler */}
              <div className="text-center mt-8 space-y-4 relative z-20">
                {!showForgotPassword && isLogin && (
                  <button
                    className="text-green-700 hover:text-green-800 font-semibold text-sm transition-all duration-300 hover:scale-105 block w-full relative z-30"
                    onClick={handleForgotPassword}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <BotIcon />
                      <span>Şifremi unuttum</span>
                    </div>
                  </button>
                )}
                
                {!showForgotPassword && (
                  <button
                    className="text-green-700 hover:text-green-800 font-semibold text-sm transition-all duration-300 hover:scale-105 block w-full relative z-30"
                    onClick={handleToggleMode}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <LeafIcon />
                      <span>
                        {isLogin ? "Hesabın yok mu? Kayıt Ol" : "Zaten hesabın var mı? Giriş Yap"}
                      </span>
                    </div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float-magic {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) rotate(0deg) scale(1);
          }
          25% { 
            transform: translateY(-15px) translateX(8px) rotate(90deg) scale(1.1);
          }
          50% { 
            transform: translateY(-8px) translateX(-5px) rotate(180deg) scale(0.9);
          }
          75% { 
            transform: translateY(-20px) translateX(3px) rotate(270deg) scale(1.05);
          }
        }
        
        @keyframes pulse-gentle {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.1);
            opacity: 0.8;
          }
        }
        
        @keyframes organic-flow {
          0%, 100% { 
            transform: translateX(0%) translateY(0%) rotate(0deg);
          }
          33% { 
            transform: translateX(2%) translateY(-1%) rotate(1deg);
          }
          66% { 
            transform: translateX(-1%) translateY(2%) rotate(-1deg);
          }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-magic {
          animation: float-magic 10s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 4s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}

export default Auth; 