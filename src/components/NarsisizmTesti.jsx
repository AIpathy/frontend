import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import NarsisizmSonucGrafik from "./NarsisizmSonucGrafik";

const QUESTIONS = [
  "Kendimi özel, önemli ve diğer insanlardan üstün biri olarak görürüm.",
  "Büyük başarılar, zenginlik ya da ün elde edeceğime dair sık sık hayaller kurarım.",
  "Genellikle başarılarımı olduğundan büyük gösteririm ya da başarı elde etmişim gibi davranırım.",
  "Bir toplulukta dikkatleri üzerime çekmekten ve övgü almaktan hoşlanırım.",
  "İnsanların beni fark etmesini, özel davranmasını ve takdir etmesini beklerim.",
  "Liderlik rollerinde kendimi rahat hissederim ve başkalarını yönetme konusunda iyiyimdir.",
  "Başarılı olmak için güçlü bir motivasyona sahibim.",
  "İnsanların çoğundan daha yetenekli, daha zeki ya da daha becerikli olduğuma inanırım.",
  "Başkalarının duygularına, ihtiyaçlarına veya sorunlarına genellikle ilgisizimdir.",
  "İnsanları sadece bana faydası olduğu sürece dinlerim ya da dikkate alırım.",
  "Sempati ya da empati göstermek benim için zordur.",
  "Kendi hedeflerime ulaşmak için insanları kullanmakta ya da yönlendirmekte başarılıyımdır.",
  "İnsanları kolayca etkileyebileceğime ya da yönlendirebileceğime inanırım.",
  "Benden aşağı gördüğüm kişilerle vakit geçirmek istemem.",
  "Eleştirildiğimde dışarıdan sakin görünsem de içten içe kırılırım.",
  "Haksızlığa uğradığımı sık sık düşünürüm.",
  "Eleştiriler karşısında öfkemi kontrol etmekte zorlandığım olur.",
  "Kendime güvenimi korumak için başkalarının onayına ya da iltifatına ihtiyaç duyarım.",
  "Başkalarının benim hakkımda ne düşündüğüyle fazlasıyla ilgilenirim.",
  "Beni yeterince takdir etmediklerinde ciddi biçimde rahatsız olurum.",
  "Başkalarının başarısı beni kıskandırır veya rahatsız eder.",
  "Rekabeti severim ama kaybetmeye tahammül edemem.",
  "Kendimden daha başarılı olanları küçümsemeye eğilimliyimdir.",
  "Kuralların bazen benim için esnetilmesi gerektiğini düşünürüm.",
  "Adalet ya da eşitlikten çok, ayrıcalık kazanmayı önemserim."
];

const OPTIONS = [
  { value: 0, label: "Kesinlikle Katılmıyorum" },
  { value: 1, label: "Katılmıyorum" },
  { value: 2, label: "Kararsızım" },
  { value: 3, label: "Katılıyorum" },
  { value: 4, label: "Kesinlikle Katılıyorum" }
];

function getResultText(score) {
  if (score <= 25) return "Düşük narsisizm eğilimi";
  if (score <= 50) return "Orta düzeyde narsisizm eğilimi";
  return "Yüksek narsisizm eğilimi";
}

export default function NarsisizmTesti() {
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
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4">Narsisizm Testi</h2>
        <p className="mb-4 text-gray-700">Talimatlar: Lütfen aşağıdaki her bir ifadeyi okuyun ve son iki hafta içinde bu ifadenin sizi ne kadar iyi tanımladığını düşünerek size en uygun seçeneği işaretleyin. Yanlış cevap yoktur, sadece sizin için en doğru olanı seçin.</p>
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

            <NarsisizmSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
} 