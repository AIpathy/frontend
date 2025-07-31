import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BeckSonucGrafik from "./BeckSonucGrafik";


const QUESTIONS = [
  "Bedeninizin herhangi bir yerinde uyuşma veya karıncalanma",
  "Sıcak basması veya ateş basmaları",
  "Bacaklarda halsizlik veya titreme hissi",
  "Kaslarınızı gevşetememe veya rahatlayamama",
  "Çok kötü bir şey olacakmış gibi hissetme veya endişe duyma",
  "Baş dönmesi, sersemlik ya da denge kaybı hissi",
  "Kalp çarpıntısı veya kalbin hızlı atması",
  "Dehşete kapılma ya da yoğun korku anları yaşama",
  "Sinirlilik, huzursuzluk veya çabuk öfkelenme",
  "Boğuluyormuş gibi olma hissi veya nefes almakta zorlanma",
  "Ellerde titreme veya genel titreklik",
  "Kontrolü kaybedecekmiş gibi olma korkusu",
  "Ölüm korkusu",
  "Mide rahatsızlığı, hazımsızlık ya da ani tuvalet ihtiyacı",
  "Baygınlık hissi veya bayılacakmış gibi olma",
  "Yüzde kızarma veya ani sıcaklık değişimleri",
  "Terleme (sıcaklıkla ilgili olmayan)",
  "Zihin karışıklığı, tükenmişlik hissi ya da dikkat dağınıklığı",
  "Görme bulanıklığı",
  "Uyku problemleri (uyuyamama, sık uyanma, dinlenememe)"
];

const OPTIONS = [
  { value: 0, label: "Hiç" },
  { value: 1, label: "Hafif düzeyde. Beni pek etkilemedi" },
  { value: 2, label: "Orta düzeyde. Hoş değildi ama katlanabildim" },
  { value: 3, label: "Ciddi düzeyde. Dayanmakta çok zorlandım" }
];

function getResultText(score) {
  if (score <= 7) return "Minimal / Yok";
  if (score <= 15) return "Hafif Düzeyde Anksiyete";
  if (score <= 25) return "Orta Düzeyde Anksiyete";
  return "Ciddi Düzeyde Anksiyete";
}

export default function BeckAnksiyeteOlcegi() {
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
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4">Beck Anksiyete Ölçeği</h2>
        <p className="mb-4 text-gray-700">Lütfen son 1 haftada aşağıdaki belirtileri ne düzeyde yaşadığınızı işaretleyin:</p>
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

            <BeckSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
} 