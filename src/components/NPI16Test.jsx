import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  ["İnsanlar bana bakmaya eğilimlidir.", "İnsanlar bana bakmaya eğilimli değildir."],
  ["Ben özel bir insan olduğumu düşünüyorum.", "Ben çoğu insandan daha iyi veya daha kötü değilim."],
  ["Herkes hikayelerimi dinlemeyi sever.", "Bazen iyi hikayeler anlatırım."],
  ["Genellikle hak ettiğim saygıyı görürüm.", "Hak ettiğim saygıyı görmekte ısrar ederim."],
  ["İnsanlar üzerinde otorite sahibi olmayı severim.", "Emir almaktan çekinmem."],
  ["Harika bir insan olacağım.", "Başarılı olmayı umuyorum."],
  ["İstediğim herkesi her şeye inandırabilirim.", "İnsanlar bazen söylediklerime inanır."],
  ["Diğer insanlardan çok şey beklerim.", "Diğer insanlar için bir şeyler yapmayı severim."],
  ["Dikkat merkezi olmayı gerçekten severim.", "Kalabalığa karışmayı tercih ederim."],
  ["Olağanüstü bir insanım.", "Ben diğer herkes gibiyim."],
  ["Her zaman ne yaptığımı bilirim.", "Bazen ne yaptığım konusunda emin değilimdir."],
  ["İnsanları manipüle etmeyi kolay bulurum.", "İnsanları manipüle ettiğimi fark ettiğimde hoşlanmam."],
  ["İnsanlar her zaman benim otoritemi tanıyor gibi görünüyor.", "Otorite sahibi olmak benim için o kadar da önemli değil."],
  ["İyi olduğumu biliyorum çünkü herkes bana öyle söylüyor.", "İnsanlar iltifat ettiğinde bazen utanırım."],
  ["Fırsat bulursam gösteriş yapmaya eğilimliyimdir.", "Gösteriş yapmamaya çalışırım."],
  ["Diğer insanlardan daha yetenekliyim.", "Diğer insanlardan öğreneceğim çok şey var."]
];

// Her soruda narsistik yanıt hangi seçenek? (0: ilk, 1: ikinci)
const NARCISSISTIC_ANSWERS = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
// Bilimsel orijinalde bazı sorularda narsistik yanıt ikinci seçenek olabilir, gerekirse bu dizi güncellenebilir.

function getResultText(score) {
  if (score <= 5) return "Düşük narsisizm";
  if (score <= 10) return "Orta düzeyde narsisizm";
  return "Yüksek narsisizm";
}

export default function NPI16Test() {
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

  // Narsistik yanıtı seçtiyse 1 puan, değilse 0 puan
  const totalScore = answers.reduce((sum, v, idx) => sum + (v === NARCISSISTIC_ANSWERS[idx] ? 1 : 0), 0);
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
        <h2 className="text-2xl font-bold text-[#3CB97F] mb-4">NPI-16 (Narsistik Kişilik Envanteri) Testi</h2>
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((pair, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. Aşağıdaki ifadelerden sizi daha iyi tanımlayanı seçin:</div>
              <div className="flex flex-col gap-2">
                {pair.map((opt, optIdx) => (
                  <label key={optIdx} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={optIdx}
                      checked={answers[idx] === optIdx}
                      onChange={() => handleChange(idx, optIdx)}
                      required
                    />
                    <span>{opt}</span>
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