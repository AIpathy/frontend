import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import TerkEdilmeSonucGrafik from "./TerkEdilmeSonucGrafik";

const QUESTIONS = [
  "Geceleri uykuya dalıncaya kadar annen veya babandan seninle kalmalarını ister misin?",
  "Doğum günü partisi veya oynamak için bir yere gittiğinde annen veya babanın tam zamanında gelip seni almaları için söz vermelerini ister misin?",
  "Odanda kimse yokken yalnız kalmaktan korkar mısın?",
  "Oynamak için en iyi arkadaşının evine yalnız başına gitmeye korkar mısın?",
  "Geceleri yalnız uyumaktan korkar mısın?",
  "Oyuna, doğum günü partisine veya okul sonrası aktivitelerine gittiğinde anne veya babanın seninle kalmasını ister misin?",
  "Annenin veya babanın senin görebildiğin bir yerde olup olmadığını sık sık kontrol eder misin?",
  "Okula giderken tek başına servise binmekten çekinir misin?",
  "Başına kötü şeyler gelebileceğinden kaygılanır mısın?",
  "Bütün gece rahat uyuyabilmek için anne veya babanın yanında olmasına ihtiyaç hisseder misin?",
  "Banyo yapmak, duş almak veya dişlerini fırçalamak için banyoda yalnız kalmaktan çekinir korkar mısın?",
  "Annen veya baban çalışmak veya işini yapmak için evden ayrılırken herhangi biriyle evde kalmaktan korkar mısın?",
  "Gündüzleri odanda yalnız olmaktan korkar mısın?",
  "Oynamak için iyi bir arkadaşının evine bırakılmaktan korkar mısın?"
];

const OPTIONS = [
  { value: 0, label: "Hiçbir zaman" },
  { value: 1, label: "Bazen" },
  { value: 2, label: "Sık sık" },
  { value: 3, label: "Her zaman" }
];

function getResultText(score) {
  if (score <= 14) return "Düşük Terk Edilme Kaygısı";
  if (score <= 28) return "Orta Terk Edilme Kaygısı";
  return "Yüksek Terk Edilme Kaygısı";
}

export default function TerkEdilmeTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

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
  const resultText = getResultText(totalScore);

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
          Terk Edilme Değerlendirme Ölçeği
        </h2>
        <p className="mb-6 text-gray-700 text-center">
          Lütfen aşağıdaki {QUESTIONS.length} ifadeyi okuyarak size ne kadar uygun olduğuna göre yanıtlayınız.
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
              <div className="text-lg mt-2 text-gray-800">{resultText}</div>
            </div>

            <TerkEdilmeSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
}
