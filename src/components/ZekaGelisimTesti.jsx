import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import ZekaGelisimSonucGrafik from "./ZekaGelisimSonucGrafik";

const QUESTIONS = [
  "Yeni bilgileri kolayca öğrenebilir misiniz?",
  "Bir problemi çözerken farklı yollar denemeyi sever misiniz?",
  "Anlatılan bir konuyu hızla kavrar mısınız?",
  "Karar verirken mantığınızı kullanır mısınız?",
  "Geçmişte öğrendiğiniz bilgileri yeni durumlarda kullanabilir misiniz?",
  "Bir olayın neden-sonuç ilişkisini kolayca anlayabilir misiniz?",
  "Yeni kavramları öğrenirken heyecan duyar mısınız?",
  "Zor konuları başkalarına kolayca açıklayabilir misiniz?",
  "Farklı fikirleri karşılaştırıp analiz edebilir misiniz?",
  "Karmaşık bir durumu sadeleştirip anlayabilir misiniz?"
];

const OPTIONS = [
  { value: 0, label: "Hiç Katılmıyorum" },
  { value: 1, label: "Katılmıyorum" },
  { value: 2, label: "Kararsızım" },
  { value: 3, label: "Katılıyorum" },
  { value: 4, label: "Tamamen Katılıyorum" }
];

export default function ZekaGelisimTesti() {
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

  const totalScore = answers.reduce((sum, v) => sum + (v !== null ? Number(v) : 0), 0);
  const allAnswered = answers.every((v) => v !== null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-[#3CB97F] text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-16">
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4">Zeka ve Gelişim Testi</h2>
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, i) => (
            <div key={i} className="mb-6">
              <div className="font-semibold mb-2">{i + 1}. {q}</div>
              <div className="flex flex-row gap-4 flex-wrap">
                {OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${i}`}
                      value={opt.value}
                      checked={answers[i] === opt.value}
                      onChange={() => handleChange(i, opt.value)}
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
          <div className="mt-8 border-t pt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#3CB97F]">Toplam Puan: {totalScore}</div>
            </div>
            <ZekaGelisimSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
