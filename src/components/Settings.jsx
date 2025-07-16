import React, { useState, useEffect } from "react";
import ApiService from "../services/api";
import Button from "./Button";
import { LogOut, Trash2, Save, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { capitalizeName } from "../utils/helpers";

function Settings() {
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [preview, setPreview] = useState("");



  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await ApiService.getUserProfile(token);
        setProfile(data);
        setForm({ name: data.name || "", email: data.email || "" });
        setPreview(data.avatar_url || "");
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
      const token = localStorage.getItem("token");
      await ApiService.updatePassword(passwords.current, passwords.new, token);
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

  const handleDeleteAccount = async () => {
    if (window.confirm("Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.")) {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        await ApiService.deleteUser(token);
        localStorage.removeItem("token");
        localStorage.removeItem("userType");
        localStorage.removeItem("userData");
        window.location.href = "/";
      } catch (e) {
        setError("Hesap silinemedi.");
      } finally {
        setLoading(false);
      }
    }
  };


  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const token = localStorage.getItem('token');

    try {
      const { avatar_url } = await ApiService.uploadAvatar(file, token);

      // timestamp ekle (cache kırma)
      const timestampedUrl = avatar_url + '?t=' + Date.now();

      setPreview(timestampedUrl);
      setProfile(prev => ({ ...prev, avatar_url: timestampedUrl }));

      // localStorage da güncellenmeli
      const existing = JSON.parse(localStorage.getItem('userData') || '{}');
      localStorage.setItem('userData', JSON.stringify({ ...existing, avatar_url: timestampedUrl }));

      // Dashboard / DoctorDashboard tetikle
      window.dispatchEvent(new CustomEvent('avatar-updated', { detail: timestampedUrl }));

    } catch (err) {
      alert(err.message);
    }
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
        {error && <p className="text-red-400 text-center mb-4">{error}</p>}
        {success && <p className="text-green-400 text-center mb-4">{success}</p>}

        {/* Avatar Önizleme */}
        <div className="flex flex-col items-center mb-6">
          <label htmlFor="avatar" className="cursor-pointer">
            <img
              src={
                preview
                  ? `${import.meta.env.VITE_BACKEND_URL}${preview}`
                  : profile.avatar_url
                    ? `${import.meta.env.VITE_BACKEND_URL}${profile.avatar_url}`
                    : "/default-avatar.png"
              }
              alt="Avatar"
              className="w-24 h-24 rounded-full object-cover border-2 border-[#3CB97F] mb-2"
              onError={(e) => (e.currentTarget.src = "/default-avatar.png")}
            />
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleAvatarUpload}
            className="hidden"
          />
        </div>


        {/* Profil Bilgileri */}
        <form onSubmit={handleSave} className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-300 mb-1">Ad Soyad</label>
            <input
              type="text"
              name="name"
              value={capitalizeName(form.name)}
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