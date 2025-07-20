import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Duygusal tepkilerim genellikle çok yoğun ve hızlı değişen bir yapıya sahip mi?",
  "İlişkilerimde genellikle çok yoğun ve dengesiz bir seyir mi var? Birini aniden yüceltip sonra aniden değersizleştirdiğim oluyor mu?",
  "Kendime zarar verme düşüncelerim veya intihar girişimlerim oldu mu ya da bu konuda tehditlerde bulundum mu?",
  "Boşlukta hissetme, anlamsızlık veya kimlik belirsizliği yaşadığım oluyor mu?",
  "Öfkemi kontrol etmekte zorlandığım, sık sık yoğun öfke patlamaları yaşadığım oluyor mu?",
  "Gerçek dışı olayları (örneğin, şüphecilik, paranoya) veya geçici kopuklukları (örneğin, kendimi veya çevremi gerçek dışı hissetme) yaşadığım oluyor mu?",
  "Kendime veya başkalarına zarar verebilecek dürtüsel davranışlarda (örneğin, pervasız araç kullanma, madde kullanımı, aşırı yemek yeme, güvenli olmayan cinsel ilişkiler, aşırı para harcama) bulunduğum oldu mu?",
  "Terk edilmekten aşırı derecede korktuğum ve bu korkuyu önlemek için çaresizce çabaladığım oluyor mu?",
  "Stres altında geçici olarak halüsinasyonlar veya hezeyanlar gibi psikotik belirtiler yaşadığım oluyor mu?",
  "Kronik bir boşluk hissi yaşıyor muyum?"
];

const OPTIONS = [
  { value: 1, label: "Evet" },
  { value: 0, label: "Hayır" }
];

function getResultText(score) {
  if (score >= 7) return "7 veya daha fazla 'Evet' yanıtı, Borderline Kişilik Bozukluğu kriterlerini karşılama olasılığının yüksek olduğuna işaret edebilir.";
  if (score >= 4) return "Bazı BKB belirtileri olabilir, ancak kesin tanı için uzman görüşü gereklidir.";
  return "BKB ile ilişkili belirti düzeyi düşük görünüyor.";
}

export default function MSIBPDTest() {
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

  const totalScore = answers.reduce((sum, v) => sum + (v === 1 ? 1 : 0), 0);
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
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4">MSI-BPD (McLean Tarama Enstrümanı) Testi</h2>
        <p className="mb-4 text-gray-700">Talimatlar: Lütfen aşağıdaki her bir ifadeyi okuyun ve son iki hafta içinde bu durumun sizin için geçerli olup olmadığını düşünerek "Evet" veya "Hayır" seçeneğini işaretleyin.</p>
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="flex flex-row gap-4">
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
            <div className="text-xl font-bold text-[#3CB97F]">Toplam Evet Sayısı: {totalScore}</div>
            <div className="text-lg mt-2">{getResultText(totalScore)}</div>
          </div>
        )}
      </div>
    </div>
  );
} 