import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import PCL5SonucGrafik from "./PCL5SonucGrafik";

const QUESTIONS = [
  "Travmatik olaya dair istemeden aklıma gelen, rahatsız edici anılar, düşünceler veya görüntüler.",
  "Travmatik olayın kötü rüyalarını görmek.",
  "Travmatik olayla ilgili düşünceler, duygular veya anılar hakkında konuşmaktan kaçınmak.",
  "Travmatik olayla ilgili yerlerden, insanlardan veya durumlardan kaçınmak.",
  "Kendime, başkalarına veya dünyaya karşı olumsuz inançlar (örneğin, 'ben kötüyüm', 'kimseye güvenemem', 'dünya tehlikeli bir yer').",
  "Çevremden veya başkalarından kopuk hissetmek.",
  "Duygularımı (örneğin, mutluluk, sevgi) yaşamakta zorlanmak.",
  "Kolayca irkilmek veya şaşırmak.",
  "Sinirli veya öfkeli patlamalar yaşamak.",
  "Konsantre olmakta zorlanmak."
];

const OPTIONS = [
  { value: 0, label: "Hiç Rahatsız Olmadım" },
  { value: 1, label: "Biraz Rahatsız Oldum" },
  { value: 2, label: "Orta Derecede Rahatsız Oldum" },
  { value: 3, label: "Oldukça Rahatsız Oldum" },
  { value: 4, label: "Aşırı Derecede Rahatsız Oldum" }
];

function getResultText(score) {
  if (score <= 10) return "Düşük TSSB belirtisi";
  if (score <= 20) return "Orta düzeyde TSSB belirtisi";
  if (score <= 30) return "Yüksek TSSB belirtisi";
  return "Çok yüksek TSSB belirtisi";
}

export default function PCL5Test() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  // Kullanıcı tipine göre geri dönüş yolu
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const handleChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const totalScore = answers.reduce((sum, v) => sum + (v !== null ? Number(v) : 0), 0);
  const allAnswered = answers.every((v) => v !== null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      {/* Sol üst geri ok */}
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-[#265d5c] transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-16">
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4">PCL-5 (TSSB Kontrol Listesi) Testi</h2>
        <p className="mb-4 text-gray-700">Talimatlar: Lütfen aşağıdaki her bir ifadeyi okuyun ve son bir ay içinde bir travmatik deneyiminizle ilgili olarak bu durumların sizi ne kadar rahatsız ettiğini düşünerek size en uygun seçeneği işaretleyin.</p>
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="flex flex-row gap-4 flex-wrap">
                {OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt.value}
                      checked={answers[idx] === opt.value}
                      onChange={() => handleChange(idx, opt.value)}
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          {!submitted && (
            <button
              type="submit"
              className="bg-[#265d5c] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full disabled:opacity-50"
              disabled={!allAnswered}
            >
              Sonuçları Göster
            </button>
          )}
        </form>
        {submitted && (
          <div className="mt-8 border-t pt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#265d5c]">Toplam Puan: {totalScore}</div>
              <div className="text-lg mt-2 text-gray-800">{getResultText(totalScore)}</div>
            </div>

            <PCL5SonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
} 