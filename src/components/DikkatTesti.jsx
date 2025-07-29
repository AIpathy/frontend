import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import DikkatSonucGrafik from "./DikkatSonucGrafik";

const QUESTIONS = [
  "Dikkatiniz kolayca dağılır mı?",
  "Uzun süre bir işe odaklanmakta zorlanır mısınız?",
  "Görevleri tamamlamadan bırakır mısınız?",
  "Unutkanlık problemleri yaşıyor musunuz?",
  "Detaylara dikkat etmeme eğiliminde misiniz?",
  "Sıklıkla eşyalarınızı kaybeder misiniz?",
  "Yapmanız gereken işleri erteleyip son dakikaya bırakır mısınız?",
  "Zihniniz sık sık başka yerlere kayar mı?",
  "Konuşurken dikkat dağınıklığı yaşar mısınız?",
  "Talimatları izlemekte zorlanır mısınız?"
];

const OPTIONS = [
  { value: 0, label: "Hiç" },
  { value: 1, label: "Bazen" },
  { value: 2, label: "Sıklıkla" },
  { value: 3, label: "Her zaman" }
];

export default function DikkatTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (qIdx, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIdx] = value;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const totalScore = answers.reduce((sum, val) => sum + (val ?? 0), 0);
  const allAnswered = answers.every((val) => val !== null);
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-[#3CB97F] transition-colors text-2xl flex items-center gap-2"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20">
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4 text-center">
          Dikkat Eksikliği Testi
        </h2>
        <p className="mb-6 text-gray-700 text-center">
          Aşağıdaki {QUESTIONS.length} ifadeyi dikkatlice okuyun ve size en uygun cevabı seçin.
        </p>

        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((question, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {question}</div>
              <div className="space-y-2">
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
              className="bg-[#3CB97F] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full disabled:opacity-50"
            >
              Sonuçları Göster
            </button>
          )}
        </form>

        {submitted && (
          <div className="mt-8 border-t pt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#3CB97F]">Toplam Puan: {totalScore}</div>
            </div>
            <DikkatSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
