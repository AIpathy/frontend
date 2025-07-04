import React, { useState } from "react";
import { Home } from "lucide-react";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

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
    if (!form.password) {
      newErrors.password = "Şifre gereklidir.";
    } else if (form.password.length < 8) {
      newErrors.password = "Şifre en az 8 karakter olmalı.";
    } else if (form.password.length > 32) {
      newErrors.password = "Şifre en fazla 32 karakter olabilir.";
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+=\-{}\[\]:;"'<>,.?/]{8,32}$/.test(form.password)) {
      newErrors.password = "Şifre en az bir büyük harf, bir küçük harf ve bir rakam içermeli. Sadece harf, rakam ve !@#$%^&*()_+=-{}[]:;\"'<>,.?/ karakterleri kullanılabilir.";
    }
    // Ad Soyad kontrolü (kayıt)
    if (!isLogin) {
      if (!form.name) {
        newErrors.name = "Ad Soyad gereklidir.";
      } else if (form.name.length > 40) {
        newErrors.name = "Ad Soyad en fazla 40 karakter olabilir.";
      } else if (!/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s'-]+$/.test(form.name)) {
        newErrors.name = "Ad Soyad sadece harf, boşluk ve - karakteri içerebilir.";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Giriş veya kayıt işlemi burada yapılacak
      // alert("Başarılı!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-900 to-green-700 relative">
      <a href="/" className="absolute top-6 left-6 text-white hover:text-green-400 transition-colors text-2xl" title="Anasayfa">
        <Home className="w-8 h-8" />
      </a>
      <div className="bg-[#232325] rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          {isLogin ? "Giriş Yap" : "Kayıt Ol"}
        </h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
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
          )}
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
          <div>
            <input
              type="password"
              name="password"
              placeholder="Şifre"
              maxLength={32}
              autoComplete={isLogin ? "current-password" : "new-password"}
              value={form.password}
              onChange={handleChange}
              className={`px-4 py-2 rounded bg-[#18181b] text-white focus:outline-none focus:ring-2 focus:ring-green-500 w-full ${errors.password ? 'border border-red-500' : ''}`}
            />
            <div className="text-xs text-red-400 mt-1 min-h-[18px]">{errors.password}</div>
            <div className="text-xs text-gray-400 mt-1">
              Şifre 8-32 karakter, en az bir büyük harf, bir küçük harf ve bir rakam içermelidir. Sadece harf, rakam ve !@#$%^&*()_+=-{}[]:;"'&lt;&gt;.,?/ karakterleri kullanılabilir.
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded transition-colors"
          >
            {isLogin ? "Giriş Yap" : "Kayıt Ol"}
          </button>
        </form>
        <div className="text-center mt-4">
          <button
            className="text-green-400 hover:underline text-sm"
            onClick={() => { setIsLogin(!isLogin); setForm({ name: "", email: "", password: "" }); setErrors({}); }}
          >
            {isLogin ? "Hesabın yok mu? Kayıt Ol" : "Zaten hesabın var mı? Giriş Yap"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Auth; 