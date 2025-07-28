import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import OKBSonucGrafik from "./OKBSonucGrafik";

const QUESTIONS = [
  "Paraya dokunduğumda ellerimi kirlenmiş hissederim.",
  "Vücut salgılarıyla temasla giysilerimin kirlenebileceğini düşünürüm.",
  "Yabancıların dokunduğu nesnelere dokunmakta zorlanırım.",
  "Çöpe veya kirli şeylere dokunmakta zorlanırım.",
  "Hastalık kapmaktan korktuğum için umumi tuvaletlerden kaçınırım.",
  "Bulaşıcı hastalık korkusuyla halka açık telefonları kullanmam.",
  "Ellerimi gereğinden fazla yıkarım.",
  "Kirlenmiş hissettiğimde derhal temizlenirim.",
  "Mikrop kaptığımı düşünerek hemen yıkanırım.",
  "Hayvan temasında yıkanma veya giysi değiştirme ihtiyacı hissederim."
];

const OPTIONS = [
  { value: 4, label: "Aşırı" },
  { value: 3, label: "Epeyce Çok" },
  { value: 2, label: "Çok" },
  { value: 1, label: "Çok Az" },
  { value: 0, label: "Hiç" }
];

export default function OKBTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const handleChange = (qIdx, value) => {
    const updated = [...answers];
    updated[qIdx] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const totalScore = answers.reduce((sum, val) => sum + (val ?? 0), 0);
  const allAnswered = answers.every((val) => val !== null);

  const getResultText = () => {
    if (totalScore <= 13) return "Düşük OKB Belirtisi";
    if (totalScore <= 26) return "Orta Düzey OKB Belirtisi";
    return "Yüksek Düzey OKB Belirtisi – Uzman desteği önerilir.";
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <Link to={backPath} className="absolute top-6 left-6 text-gray-700 hover:text-[#265d5c] text-2xl flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20">
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4 text-center">
          OKB Belirti Testi (10 Soru)
        </h2>
        <p className="mb-6 text-gray-700 text-center">
          Lütfen aşağıdaki 10 ifadeyi okuyarak size en uygun seçeneği işaretleyin.
        </p>

        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="flex flex-wrap gap-4">
                {OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2">
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
              disabled={!allAnswered}
              className="bg-[#265d5c] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full"
            >
              Sonuçları Göster
            </button>
          )}
        </form>

        {submitted && (
          <div className="mt-8 border-t pt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#265d5c]">Toplam Puan: {totalScore}</div>
              <div className="text-lg mt-2 text-gray-800">{getResultText()}</div>
            </div>

            <OKBSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
