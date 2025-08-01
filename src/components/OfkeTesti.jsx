import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  { question: "Çabuk parlarım.", isNegative: true },
  { question: "Kızgın mizaçlıyımdır.", isNegative: true },
  { question: "Öfkesi burnunda bir insanım.", isNegative: true },
  { question: "Başkalarının hataları, yaptığım işi yavaşlatınca kızarım.", isNegative: true },
  { question: "Yaptığım iyi bir işten sonra takdir edilmemek canımı sıkar.", isNegative: true },
  { question: "Öfkelenince kontrolümü kaybederim.", isNegative: true },
  { question: "Öfkelendiğimde ağzıma geleni söylerim.", isNegative: true },
  { question: "Başkalarının önünde eleştirilmek beni çok hiddetlendirir.", isNegative: true },
  { question: "Engellendiğimde içimden birilerine vurmak gelir.", isNegative: true },
  { question: "Yaptığım iyi bir iş kötü değerlendirildiğinde çılgına dönerim.", isNegative: true },
  { question: "Öfkemi kontrol ederim.", isNegative: false },
  { question: "Kızgınlığımı gösteririm.", isNegative: true },
  { question: "Öfkemi içime atarım.", isNegative: true },
  { question: "Başkalarına karşı sabırlıyımdır.", isNegative: false },
  { question: "Somurtur ya da surat asarım.", isNegative: true },
  { question: "İnsanlardan uzak dururum.", isNegative: true },
  { question: "Başkalarına iğneli sözler söylerim.", isNegative: true },
  { question: "Soğukkanlılığımı korurum.", isNegative: false },
  { question: "Kapıları çarpmak gibi şeyler yaparım.", isNegative: true },
  { question: "İçin için köpürürüm ama gösteremem.", isNegative: true },
  { question: "Davranışlarımı kontrol ederim.", isNegative: false },
  { question: "Başkalarıyla tartışırım.", isNegative: true },
  { question: "İçimde, kimseye söyleyemediğim kinler beslerim.", isNegative: true },
  { question: "Beni çileden çıkaran her neyse saldırırım.", isNegative: true },
  { question: "Öfkem kontrolden çıkmadan kendimi durdurabilirim.", isNegative: false },
  { question: "Gizliden gizliye insanları epeyce eleştiririm.", isNegative: true },
  { question: "Belli ettiğimden daha öfkeliyimdir.", isNegative: true },
  { question: "Çoğu kimseye kıyasla daha çabuk sakinleşirim.", isNegative: false },
  { question: "Kötü şeyler söylerim.", isNegative: true },
  { question: "Hoşgörülü ve anlayışlı olmaya çalışırım.", isNegative: false },
  { question: "İçimden, insanların fark ettiğinden daha fazla sinirlenirim.", isNegative: true },
  { question: "Sinirlerime hakim olamam.", isNegative: true },
  { question: "Beni sinirlendirene, ne hissettiğimi söylerim.", isNegative: true },
  { question: "Kızgınlık duygularımı kontrol ederim.", isNegative: false }
];

const OPTIONS = [
  { value: 1, label: "Hiçbir zaman / Asla" },
  { value: 2, label: "Nadiren" },
  { value: 3, label: "Ara sıra" },
  { value: 4, label: "Çoğu zaman" }
];

function getResultText(score) {
  if (score <= 50) return "Düşük öfke düzeyi - İyi öfke kontrolü";
  if (score <= 70) return "Orta düzeyde öfke - Geliştirilebilir";
  if (score <= 90) return "Yüksek öfke düzeyi - Profesyonel destek önerilir";
  return "Çok yüksek öfke düzeyi - Acil profesyonel destek gerekli";
}

export default function OfkeTesti() {
  const [answers, setAnswers] = useState(Array(34).fill(null));
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

  // Puan hesaplama - negatif ifadeler için ters puanlama
  const calculateScore = () => {
    return answers.reduce((sum, answer, index) => {
      if (answer === null) return sum;
      const question = QUESTIONS[index];
      if (question.isNegative) {
        // Negatif ifadeler için normal puanlama (1-4)
        return sum + answer;
      } else {
        // Pozitif ifadeler için ters puanlama: 1->4, 2->3, 3->2, 4->1
        return sum + (5 - answer);
      }
    }, 0);
  };

  const totalScore = calculateScore();
  const allAnswered = answers.every((v) => v !== null);
  const currentAnswer = answers[currentQuestion];

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 relative">
        <Link
          to={backPath}
          className="absolute top-6 left-6 text-gray-700 hover:text-red-600 transition-colors text-2xl flex items-center gap-2"
          title="Dashboard'a Dön"
        >
          <ArrowLeft className="w-6 h-6" />
          <span className="hidden sm:inline">Dashboard</span>
        </Link>

        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-red-200/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl">😤</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Öfke Testi
              </h1>
              <p className="text-gray-600 text-lg">
                Test Sonucunuz
              </p>
            </div>

            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-2xl p-8 mb-8 border-2 border-red-200/50">
              <div className="text-center">
                <div className="text-6xl font-bold text-red-700 mb-4">
                  {totalScore}
                </div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">
                  {getResultText(totalScore)}
                </div>
                <div className="text-gray-600">
                  Toplam Puan: {totalScore} / {QUESTIONS.length * 4}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 border-2 border-red-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sonuç Açıklaması</h3>
                <p className="text-gray-700 leading-relaxed">
                  {totalScore <= 50 && "Öfke kontrolünüz iyi durumda. Sakin kalma ve duygularınızı yönetme konusunda başarılısınız."}
                  {totalScore > 50 && totalScore <= 70 && "Öfke düzeyiniz orta seviyede. Öfke yönetimi teknikleri öğrenerek kendinizi geliştirebilirsiniz."}
                  {totalScore > 70 && totalScore <= 90 && "Öfke düzeyiniz yüksek. Profesyonel destek alarak öfke kontrolü konusunda yardım alabilirsiniz."}
                  {totalScore > 90 && "Öfke düzeyiniz çok yüksek. Acil olarak profesyonel destek almanız önerilir."}
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-red-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Öneriler</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Derin nefes alma teknikleri öğrenin</li>
                  <li>• Öfke yönetimi kurslarına katılın</li>
                  <li>• Profesyonel psikolojik destek alın</li>
                  <li>• Fiziksel aktivite ile stres atın</li>
                  <li>• Meditasyon ve gevşeme teknikleri uygulayın</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link
                to={backPath}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-red-600 via-orange-600 to-red-700 hover:from-red-700 hover:via-orange-700 hover:to-red-800 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-orange-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Content */}
                <span className="relative z-10">Dashboard'a Dön</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 relative">
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-red-600 transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-red-200/50 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-3xl">😤</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Öfke Testi
            </h1>
            <p className="text-gray-600 text-lg">
              Öfke düzeyinizi değerlendirin
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Soru {currentQuestion + 1} / {QUESTIONS.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                %{Math.round(((currentQuestion + 1) / QUESTIONS.length) * 100)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-red-500 to-orange-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {QUESTIONS[currentQuestion].question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswerChange(option.value)}
                className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 text-left ${
                  currentAnswer === option.value
                    ? "bg-gradient-to-r from-red-500 to-orange-600 text-white border-red-500 shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 border-gray-200 hover:border-red-300 hover:bg-red-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option.label}</span>
                  {currentAnswer === option.value && (
                    <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                currentQuestion === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Önceki
            </button>

            <div className="text-sm text-gray-600">
              {answers.filter(a => a !== null).length} / {QUESTIONS.length} cevaplandı
            </div>

            {currentQuestion < QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={currentAnswer === null}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  currentAnswer === null
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700"
                }`}
              >
                Sonraki
                <ChevronRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                  !allAnswered
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-orange-600 text-white hover:from-red-600 hover:to-orange-700"
                }`}
              >
                Sonucu Gör
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 