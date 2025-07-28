import React, { useState, useEffect } from "react";
import ApiService from "../services/api";
import Button from "./Button";
import { LogOut, Trash2, Save, X, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { capitalizeName, formatDoctorName } from "../utils/helpers";

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
    window.location.hash = '#/';
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
        window.location.hash = '#/';
      } catch (e) {
        setError("Hesap silinemedi.");
      } finally {
        setLoading(false);
      }
    }
  };

  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  return (
    <div className="min-h-screen flex items-center justify-center py-10" style={{ background: 'linear-gradient(135deg, #f5f5f5 60%, #e0e7ef 100%)' }}>
      {/* Sol üst geri ok */}
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-[#265d5c] transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="bg-white/90 rounded-xl shadow-lg p-8 w-full max-w-lg border border-[#e0e7ef]">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Ayarlar</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && <p className="text-green-600 text-center mb-4">{success}</p>}

        {/* Profil Bilgileri */}
        <form onSubmit={handleSave} className="space-y-4 mb-8">
          <div>
            <label className="block text-gray-700 mb-1">Hesap Adı</label>
            <input
              type="text"
              name="name"
              value={userType === "doctor" ? formatDoctorName(form.name, profile.expertiseLevel) : capitalizeName(form.name)}
              onChange={handleChange}
              className="px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 w-full border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#265d5c]"
              readOnly
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">E-posta</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 w-full border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#265d5c]"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <button
              type="submit"
              className="p-2 rounded-full bg-[#d4d4d4] hover:bg-[#c7c7c7] transition w-full text-[#265d5c] font-semibold"
            >
              Şifreyi Güncelle
            </button>
          </div>
        </form>

        {/* Şifre Değiştir */}
        <form onSubmit={handlePasswordSubmit} className="space-y-4 mb-8">
          <div className="text-lg text-gray-800 font-semibold mb-2">Şifre Değiştir</div>
          <input
            type="password"
            name="current"
            placeholder="Mevcut Şifre"
            value={passwords.current}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 w-full border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#265d5c]"
            autoComplete="current-password"
          />
          <input
            type="password"
            name="new"
            placeholder="Yeni Şifre"
            value={passwords.new}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 w-full border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#265d5c]"
            autoComplete="new-password"
          />
          <input
            type="password"
            name="confirm"
            placeholder="Yeni Şifre (Tekrar)"
            value={passwords.confirm}
            onChange={handlePasswordChange}
            className="px-4 py-2 rounded bg-[#f5f5f5] text-gray-800 w-full border border-[#e0e7ef] focus:outline-none focus:ring-2 focus:ring-[#265d5c]"
            autoComplete="new-password"
          />
          <button
            type="submit"
            className="p-2 rounded-full bg-[#d4d4d4] hover:bg-[#c7c7c7] transition w-full flex justify-center items-center text-[#265d5c]"
          >
            <Save className="w-5 h-5 mr-2" />
            Şifreyi Güncelle
          </button>

        </form>

        {/* Hesap İşlemleri */}
        <div className="flex flex-col gap-2 mt-6">
          <button
            onClick={handleDeleteAccount}
            className="p-2 rounded-full bg-[#d4d4d4] hover:bg-[#c7c7c7] transition w-full flex justify-center items-center text-red-600"
          >
            <Trash2 className="w-5 h-5 mr-2" />
            Hesabı Sil
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full bg-[#d4d4d4] hover:bg-[#c7c7c7] transition w-full flex justify-center items-center text-[#265d5c]"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Çıkış Yap
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;