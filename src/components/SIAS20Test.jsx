import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Yeni insanlarla tanışmaktan çekinirim.",
  "İnsanların beni yargılayacağından endişelenirim.",
  "Grubun dikkatini çekecek bir şey söylemekten kaçınırım.",
  "Konuşma sırasında ne söyleyeceğimi bilemeyeceğimden korkarım.",
  "Sosyal olaylardan mümkün olduğunca kaçınırım.",
  "Başka insanlarla etkileşim kurarken utangaç ve gergin hissederim.",
  "İnsanlarla ilk tanıştığımda kendimi iyi ifade edemediğimi hissederim.",
  "Sosyal durumlarda ne yapmam gerektiğini bilmekte zorlanırım.",
  "İnsanlarla sohbet etmeye başlamakta veya sürdürmekte zorlanırım.",
  "Bir toplantıda konuşmak zorunda kaldığımda endişelenirim.",
  "Yeni bir grup insana katılmak benim için streslidir.",
  "Konuşurken kızaracağımdan ya da titrememden korkarım.",
  "İnsanların gözlerinin içine bakmakta zorlanırım.",
  "İnsanlarla sohbet ederken rahat hissedemem.",
  "İnsanların yanında yemek yemek veya bir şeyler içmek benim için zorlayıcıdır.",
  "Bir hata yapmaktan veya aptalca bir şey söylemekten korkarım.",
  "Sosyal ortamlarda kendime güvenmiyorum.",
  "Başkalarının benim hakkımda olumsuz düşüneceğinden endişelenirim.",
  "İnsanların önünde performans sergilemek (konuşma yapmak, sunum yapmak vb.) benim için çok zordur.",
  "Bir grup içinde sessiz kalmayı tercih ederim."
];

const OPTIONS = [
  { value: 0, label: "Hiç Katılmıyorum" },
  { value: 1, label: "Biraz Katılıyorum" },
  { value: 2, label: "Orta Derecede Katılıyorum" },
  { value: 3, label: "Oldukça Katılıyorum" },
  { value: 4, label: "Tamamen Katılıyorum" }
];

function getResultText(score) {
  if (score <= 20) return "Düşük sosyal anksiyete";
  if (score <= 40) return "Orta düzeyde sosyal anksiyete";
  if (score <= 60) return "Yüksek sosyal anksiyete";
  return "Çok yüksek sosyal anksiyete";
}

export default function SIAS20Test() {
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
        className="absolute top-6 left-6 text-gray-700 hover:text-[#3CB97F] transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-16">
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4">SIAS (Sosyal Anksiyete Derecelendirme Ölçeği) Testi</h2>
        <p className="mb-4 text-gray-700">Talimatlar: Lütfen aşağıdaki her bir ifadeyi okuyun ve son bir hafta içinde bu durumun sizi ne kadar iyi tanımladığını düşünerek size en uygun seçeneği işaretleyin. Yanlış cevap yoktur, sadece sizin için en doğru olanı seçin.</p>
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
              className="bg-[#3CB97F] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full disabled:opacity-50"
              disabled={!allAnswered}
            >
              Sonuçları Göster
            </button>
          )}
        </form>
        {submitted && (
          <div className="mt-8 text-center">
            <div className="text-xl font-bold text-[#3CB97F]">Toplam Puan: {totalScore}</div>
            <div className="text-lg mt-2">{getResultText(totalScore)}</div>
          </div>
        )}
      </div>
    </div>
  );
} 