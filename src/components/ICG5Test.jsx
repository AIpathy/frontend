import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Kaybettiğim kişiye dair yoğun bir özlem veya hasret hissediyorum.",
  "Durumu kabul etmekte zorlanıyorum; sanki gerçek değilmiş gibi hissediyorum.",
  "Kaybettiğim kişiye dair acı veren anılar zihnimi sürekli meşgul ediyor.",
  "Kaybettiğim kişi olmadan geleceğin anlamsız veya boş olduğunu hissediyorum.",
  "Yaşadığım kayıptan sonra hayatımı normal bir şekilde sürdürmekte veya yeni şeyler denemekte zorlanıyorum."
];

const OPTIONS = [
  { value: 0, label: "Hiç" },
  { value: 1, label: "Nadiren" },
  { value: 2, label: "Bazen" },
  { value: 3, label: "Sık Sık" },
  { value: 4, label: "Çok Sık / Neredeyse Her Zaman" }
];

function getResultText(score) {
  if (score < 5) return "Karmaşık yas belirtileri düşük düzeyde.";
  if (score < 10) return "Orta düzeyde karmaşık yas belirtileri.";
  return "Yüksek düzeyde karmaşık yas belirtileri. 10 ve üzeri puanlar profesyonel destek ihtiyacına işaret edebilir.";
}

export default function ICG5Test() {
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
        className="absolute top-6 left-6 text-gray-700 hover:text-[#3CB97F] transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-16">
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4">ICG-5 (Karmaşık Yas Ölçeği) Testi</h2>
        <p className="mb-4 text-gray-700">Talimatlar: Lütfen aşağıdaki her bir ifadeyi okuyun ve yaşadığınız kayıptan bugüne, bu durumun sizi ne kadar rahatsız ettiğini veya ne sıklıkta deneyimlediğinizi düşünerek size en uygun seçeneği işaretleyin.</p>
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
              className="bg-[#3CB97F] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full disabled:opacity-50"
              disabled={!allAnswered}
            >
              Sonuçları Göster
            </button>
          )}
        </form>
        {submitted && (
          <div className="mt-8 text-center">
            <div className="text-xl font-bold text-[#3CB97F]">Toplam Puan: {totalScore}</div>
            <div className="text-lg mt-2">{getResultText(totalScore)}</div>
          </div>
        )}
      </div>
    </div>
  );
} 