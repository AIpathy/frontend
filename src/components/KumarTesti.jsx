import React, { useState, useMemo } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import KumarSonucGrafik from "./KumarSonucGrafik";

const QUESTIONS = [
  "Aileniz veya arkadaşlarınıza ne kadar kumar oynadığınız veya kumarda ne kadar para kaybettiğiniz konusunda yalan söylediniz mi?",
  "Kumarda kaybettiğiniz parayı kazanmak için tekrar kumar oynadığınız oldu mu?",
  "Kumar oynamanız nedeniyle ailenizin sizi eleştirdiği oldu mu?",
  "Kumar oynamanız nedeniyle ailenizle ilişkide sorun yaşadığınız oldu mu?",
  "Kumar oynamanız nedeniyle ekonomik sorunlar yaşadığınız oldu mu?",
  "Kumar oynamak amacıyla borç aldığınız oldu mu?",
  "Yaşamınızdaki ve ilişkilerinizdeki sorunlardan kaçmak veya unutmak amacıyla kumar oynadığınız oldu mu?",
  "Kumar oynadıktan sonra, kumar oynamanız ile ilişkili pişmanlık duyduğunuz oldu mu?",
  "Niyet ettiğinizden daha fazla kumar oynadığınız oldu mu?",
  "Kumar oynama davranışınız son bir aydır devam ediyor mu?"
];

const OPTIONS = [
  { value: 0, label: "Hiçbir zaman" },
  { value: 1, label: "Bazen" },
  { value: 2, label: "Neredeyse her zaman" }
];

export default function KumarTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const totalScore = useMemo(() => {
    return answers.reduce((sum, val, idx) => idx > 0 ? sum + (val ?? 0) : sum, 0); // 0. soru hariç
  }, [answers]);

  const resultText = useMemo(() => {
    if (totalScore < 5) return "Düşük Kumar Riski";
    if (totalScore < 9.5) return "Orta Kumar Riski";
    return "Yüksek Kumar Riski";
  }, [totalScore]);

  const handleChange = (qIdx, value) => {
    const updated = [...answers];
    updated[qIdx] = value;
    setAnswers(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    localStorage.setItem("kumarTestSkoru", totalScore.toString());
    localStorage.setItem("kumarTestSeviyesi", resultText);
  };

  const allAnswered = answers.every((val) => val !== null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <Link to={backPath} className="absolute top-6 left-6 text-gray-700 hover:text-[#3CB97F] text-2xl flex items-center gap-2">
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20">
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4 text-center">Kumar Risk Tarama Testi (KURT)</h2>
        <p className="mb-6 text-gray-700 text-center">Aşağıdaki ifadeleri okuyup size uygun olanı işaretleyiniz.</p>

        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="space-y-2">
                {OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-start space-x-2 text-gray-800">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt.value}
                      checked={answers[idx] === opt.value}
                      onChange={() => handleChange(idx, opt.value)}
                      className="mt-1"
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
              <div className="text-lg mt-2 text-gray-800">{resultText}</div>
            </div>
            <KumarSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
