import React, { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SchutteSonucGrafik from "./SchutteSonucGrafik";

const QUESTIONS = [
  "Duygularımı anlayabilirim.",
  "Duygularımı başkalarına ifade edebilirim.",
  "Karmaşık duygularımı yönetebilirim.",
  "Duygularımı kontrol altında tutabilirim.",
  "Empati kurabilirim.",
  "Duygularımın farkındayım.",
  "Başkalarının duygularını anlayabilirim.",
  "Stresle başa çıkabilirim.",
  "Motivasyonumu koruyabilirim.",
  "Olumsuz duygularımı dönüştürebilirim."
];

const OPTIONS = [
  { value: 1, label: "Hiç Katılmıyorum" },
  { value: 2, label: "Katılmıyorum" },
  { value: 3, label: "Kararsızım" },
  { value: 4, label: "Katılıyorum" },
  { value: 5, label: "Tamamen Katılıyorum" }
];

export default function SchutteTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const totalScore = useMemo(() => {
    return answers.reduce((sum, val) => sum + (val ?? 0), 0);
  }, [answers]);

  const resultText = useMemo(() => {
    if (totalScore <= 95) return "Düşük Duygusal Zeka";
    if (totalScore <= 120) return "Orta Duygusal Zeka";
    return "Yüksek Duygusal Zeka";
  }, [totalScore]);

  const allAnswered = answers.every((v) => v !== null);
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const handleChange = (idx, val) => {
    const updated = [...answers];
    updated[idx] = val;
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <Link to={backPath} className="absolute top-6 left-6 text-gray-700 hover:text-[#3CB97F] text-2xl flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20">
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4 text-center">Schutte Duygusal Zeka Testi</h2>

        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="space-y-1">
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
              className="bg-[#3CB97F] text-white w-full py-2 px-4 rounded hover:bg-[#267a56] disabled:opacity-50"
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
              <div className="text-lg mt-2 text-gray-800">{resultText}</div>
            </div>
            <SchutteSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
