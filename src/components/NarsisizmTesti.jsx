import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

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
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [autoNext, setAutoNext] = useState(false);

  // Kullanıcı tipine göre geri dönüş yolu
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const handleAnswerChange = (value) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = value;
    setAnswers(newAnswers);
    
    // Otomatik geçiş için timer başlat
    setAutoNext(true);
  };

  // Otomatik geçiş efekti
  useEffect(() => {
    if (autoNext && answers[currentQuestion] !== null) {
      const timer = setTimeout(() => {
        if (currentQuestion < QUESTIONS.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Son soru cevaplandığında otomatik olarak sonuç ekranına geç
          setSubmitted(true);
        }
        setAutoNext(false);
      }, 800); // 0.8 saniye sonra otomatik geçiş

      return () => clearTimeout(timer);
    }
  }, [autoNext, answers, currentQuestion]);

  const handleNext = () => {
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setAutoNext(false); // Manuel geçişte otomatik geçişi iptal et
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setAutoNext(false); // Manuel geçişte otomatik geçişi iptal et
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const totalScore = answers.reduce((sum, v) => sum + (v !== null ? Number(v) : 0), 0);
  const allAnswered = answers.every((v) => v !== null);
  const currentAnswer = answers[currentQuestion];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 relative">
        <Link
          to={backPath}
          className="absolute top-6 left-6 text-gray-700 hover:text-green-600 transition-colors text-2xl flex items-center gap-2"
          title="Dashboard'a Dön"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>
        
        <div className="max-w-2xl mx-auto p-8 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl mt-16 border-2 border-green-200/50">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Test Sonucu</h2>
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-6">
              <div className="text-4xl font-bold text-green-700 mb-4">Toplam Puan: {totalScore}</div>
              <div className="text-2xl font-semibold text-gray-800 leading-relaxed break-words">{getResultText(totalScore)}</div>
            </div>
            <Link
              to={backPath}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 hover:from-green-700 hover:via-emerald-700 hover:to-teal-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Content */}
              <span className="relative z-10">Dashboard'a Dön</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 relative">
      {/* Sol üst geri ok */}
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-green-600 transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-4xl mx-auto p-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-800">Narsisizm Testi</h2>
            <span className="text-lg font-semibold text-gray-600">
              {currentQuestion + 1} / {QUESTIONS.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200/50 p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion + 1}. {QUESTIONS[currentQuestion]}
            </h3>
            
            <div className="space-y-4">
              {OPTIONS.map((option) => (
                <label 
                  key={option.value} 
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    currentAnswer === option.value
                      ? 'border-green-500 bg-green-50 shadow-lg'
                      : 'border-gray-200 hover:border-green-300'
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion}`}
                    value={option.value}
                    checked={currentAnswer === option.value}
                    onChange={() => handleAnswerChange(option.value)}
                    className="w-5 h-5 text-green-600 focus:ring-green-500"
                  />
                  <span className="text-lg font-medium text-gray-700">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                currentQuestion === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Önceki
            </button>

            <div className="flex gap-4">
              {currentQuestion < QUESTIONS.length - 1 ? (
                <button
                  onClick={handleNext}
                  disabled={!currentAnswer}
                  className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    !currentAnswer
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-105 shadow-lg'
                  }`}
                >
                  <span className="text-gray-800">Sonraki</span>
                  <ChevronRight className="w-5 h-5 text-gray-800" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                    !allAnswered
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:scale-105 shadow-lg'
                  }`}
                >
                  Sonuçları Göster
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 