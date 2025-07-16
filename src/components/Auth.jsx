import React, { useState } from "react";
import { Home, ArrowLeft } from "lucide-react";
import Input from "./forms/Input";
import PasswordInput from "./forms/PasswordInput";
import Select from "./forms/Select";
import UserTypeSelector from "./forms/UserTypeSelector";
import SubmitButton from "./forms/SubmitButton";
import { useAuth } from "../hooks/useAuth";
import { validateAuthForm } from "../utils/validation";
import { rankMap } from "../utils/rankMap";

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
    rank: ""
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const { login, register, forgotPassword, loading, error } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
    setSuccessMessage("");
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
          await register({
            name: form.name,
            email: form.email,
            password: form.password,
            userType: isDoctor ? 'doctor' : 'user',
            specialization: isDoctor ? form.specialization : undefined,
            rank: isDoctor ? form.rank : undefined
          });
        }
      } catch (error) {
        setErrors({ general: error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.' });
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


  const handleSpecializationChange = (e) => {
    const specialization = e.target.value;
    setForm({
      ...form,
      specialization,
      rank: ""
    });
  };




  const getSubmitButtonText = () => {
    if (showForgotPassword) return "Şifre Sıfırlama Bağlantısı Gönder";
    return isLogin ? "Giriş Yap" : "Kayıt Ol";
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
                <Select
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  error={errors.specialization}
                >
                  <option value="">Uzmanlık Seçiniz</option>
                  <option value="Psikoloji">Psikoloji</option>
                  <option value="Psikiyatri">Psikiyatri</option>
                </Select>
              )}
            </>
          )}


          {/* RANK SELECT – yalnızca doktor ve specialization seçiliyse görünür */}
          {isDoctor && form.specialization && (
            <Select
              name="rank"
              value={form.rank}
              onChange={handleChange}
              error={errors.rank}
            >
              <option value="">Rütbe Seçiniz</option>
              {rankMap[form.specialization]?.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </Select>
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