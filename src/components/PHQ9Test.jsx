import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Bir şeyler yapmaktan keyif alamamak veya ilgisiz kalmak.",
  "Keyifsiz, çökkün veya umutsuz hissetmek.",
  "Uykuya dalmakta zorlanmak veya uykuda kalmakta zorlanmak ya da çok uyumak.",
  "Yorgun hissetmek veya enerjisinin olmaması.",
  "İştahsızlık veya aşırı yemek yeme.",
  "Kendini kötü hissetmek - başarısız olduğunu veya kendini ya da ailesini hayal kırıklığına uğrattığını hissetmek.",
  "Yavaş hareket ettiğini veya konuştuğunu hissetmek ya da diğer insanların bunu fark edecek kadar huzursuz ve yerinde duramaz olmak.",
  "Bir şeye odaklanmakta zorlanmak, örneğin gazete okurken veya televizyon izlerken.",
  "Kendini öldürmeyi düşündüğünü veya bir şekilde kendine zarar vermeyi düşündüğünü hissetmek."
];

const OPTIONS = [
  { value: 0, label: "Hiç yok" },
  { value: 1, label: "Birkaç gün" },
  { value: 2, label: "Haftanın yarısından fazla gün" },
  { value: 3, label: "Neredeyse her gün" }
];

function getResultText(score) {
  if (score <= 4) return "Minimal depresyon";
  if (score <= 9) return "Hafif depresyon";
  if (score <= 14) return "Orta düzeyde depresyon";
  if (score <= 19) return "Orta-şiddetli depresyon";
  return "Şiddetli depresyon";
}

export default function PHQ9Test() {
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
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4">PHQ-9 (Hasta Sağlığı Anketi) Testi</h2>
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="flex flex-col gap-2">
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