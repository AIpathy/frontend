import React, { useState, useEffect } from "react";
import ApiService from "../services/api";
import Button from "./Button";
import { LogOut, Trash2, Save, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom"; 

function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await ApiService.getUserProfile(token);
        setProfile(data);
        setForm({ name: data.name || "", email: data.email || "" });
      } catch (e) {
        setError("Profil bilgileri yüklenemedi.");
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const token = localStorage.getItem("token");
      await ApiService.updateUserProfile({ name: form.name, email: form.email }, token);
      setProfile({ ...profile, name: form.name, email: form.email });
      setEditMode(false);
      setSuccess("Profil başarıyla güncellendi.");
    } catch (e) {
      setError("Profil güncellenemedi.");
    }
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    if (passwords.new !== passwords.confirm) {
      setError("Yeni şifreler eşleşmiyor.");
      setLoading(false);
      return;
    }
    try {
      // ApiService ve şifre güncelleme fonksiyonu eklenecek
      const token = localStorage.getItem("token");
      await ApiService.updateUserProfile({ password: passwords.new, currentPassword: passwords.current }, token);
      setSuccess("Şifre başarıyla değiştirildi.");
      setPasswords({ current: "", new: "", confirm: "" });
    } catch (e) {
      setError("Şifre güncellenemedi.");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userData");
    window.location.href = "/";
  };

  const handleDeleteAccount = () => {
    // onay modalı ve ApiService.deleteUser gibi bir fonksiyon gerekli
    alert("Hesap silme özelliği demo amaçlıdır. Backend desteği pek yakında gelecek.");
  };

  const userType = localStorage.getItem("userType");    
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  return (
    <div className="min-h-screen bg-gradient-to-tr from-indigo-900 to-green-700 flex items-center justify-center py-10">
    {/* Sol üst geri ok */}
    <Link
      to={backPath}
      className="absolute top-6 left-6 text-white hover:text-green-400 transition-colors text-2xl flex items-center gap-2"
      title="Dashboard'a Dön"
    >
      <ArrowLeft className="w-6 h-6" />
      <span className="hidden sm:inline">Dashboard</span>
    </Link>

    <div className="bg-[#232325] rounded-xl shadow-lg p-8 w-full max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Ayarlar</h2>
      {error   && <p className="text-red-400 text-center mb-4">{error}</p>}
      {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        {/* Profil Bilgileri */}
        <form onSubmit={handleSave} className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-300 mb-1">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="px-4 py-2 rounded bg-[#18181b] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 rounded bg-[#18181b] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button type="submit" className="flex-1 bg-green-600 hover:bg-green-700">
              <Save className="w-4 h-4 mr-1" /> Kaydet
            </Button>
          </div>
        </form>

        {/* Şifre Değiştir */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-8">
          <div className="text-lg text-white font-semibold mb-2">Şifre Değiştir</div>
          <input
            type="password"
            name="current"
            placeholder="Mevcut Şifre"
            value={passwords.current}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#18181b] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            autoComplete="current-password"
          />
          <input
            type="password"
            name="new"
            placeholder="Yeni Şifre"
            value={passwords.new}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#18181b] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirm"
            placeholder="Yeni Şifre (Tekrar)"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#18181b] text-white w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            autoComplete="new-password"
          />
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
            Şifreyi Güncelle
          </Button>
        </form>

        {/* Hesap İşlemleri */}
        <div className="flex flex-col gap-2 mt-6">
          <Button className="bg-red-600 hover:bg-red-700 w-full" onClick={handleDeleteAccount}>
            <Trash2 className="w-4 h-4 mr-1" /> Hesabı Sil
          </Button>
          <Button className="bg-gray-700 hover:bg-gray-800 w-full" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-1" /> Çıkış Yap
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;