import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import AlkolSonucGrafik from "./AlkolSonucGrafik";

const QUESTIONS = [
  "Alkol kullanımı nedeniyle günlük sorumluluklarınızı aksattığınız oldu mu?",
  "Alkol etkisindeyken tehlikeli bir durumda (örneğin araba kullanmak gibi) bulunduğunuz oldu mu?",
  "Alkol kullanımı nedeniyle başkalarıyla sorun yaşadığınız oldu mu?",
  "Bırakmak ya da azaltmak istediğiniz halde alkol kullanmaya devam ettiniz mi?",
  "Alkol almadığınızda huzursuzluk, titreme veya terleme gibi yoksunluk belirtileri yaşadınız mı?",
  "Alkolün etkisini hissetmek için her seferinde daha fazla miktarda içmeniz gerekti mi?",
  "Alkol kullanımı nedeniyle iş, okul veya sosyal hayatınızda olumsuz etkiler yaşadınız mı?",
  "Alkolü bırakmayı denediğiniz halde başarılı olamadığınız oldu mu?",
  "Alkol kullandığınız için pişmanlık duyduğunuz zamanlar oldu mu?",
  "Alkol kullanımı nedeniyle sağlık sorunları yaşadınız mı?"
];

const OPTIONS = [
  { value: 0, label: "Hiçbir zaman" },
  { value: 1, label: "Nadiren" },
  { value: 2, label: "Ara sıra" },
  { value: 3, label: "Sık sık" },
  { value: 4, label: "Her zaman" }
];

export default function AlkolTesti() {
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

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-[#265d5c] transition-colors text-2xl flex items-center gap-2"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-20">
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4 text-center">Alkol Bağımlılığı Testi</h2>
        <p className="mb-6 text-gray-700 text-center">
          Lütfen aşağıdaki 10 ifadeyi okuyarak, size ne kadar uygun olduğunu belirtiniz.
        </p>

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
              className="bg-[#265d5c] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full disabled:opacity-50"
              disabled={!allAnswered}
            >
              Sonuçları Göster
            </button>
          )}
        </form>

        {submitted && (
          <div className="mt-8 border-t pt-6">
            <AlkolSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
