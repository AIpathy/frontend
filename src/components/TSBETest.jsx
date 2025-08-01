import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Bu olay benim davranışlarımdan dolayı yaşandı.",
  "Doğru şeyi yapacağım konusunda kendime güvenemiyorum.",
  "Ben zayıf bir insanım.",
  "Öfkemi kontrol edemeyip korkunç bir şey yapabilirim.",
  "En küçük üzüntüyle bile başa çıkamam.",
  "Eskiden mutlu bir insandım şimdiyse hep mutsuzum.",
  "İnsanlara güvenilmez.",
  "Her zaman tetikte olmalıyım.",
  "İçimde bir şeylerin öldüğünü hissediyorum.",
  "Size kimin zarar vereceğini asla bilemezsiniz.",
  "Çok dikkatli olmalıyım çünkü bundan sonra ne olacağı hiç belli olmaz.",
  "Ben yetersizim.",
  "Eğer olayı düşünürsem, bununla başa çıkamayabilirim.",
  "Böyle bir insan olduğum için bu olay benim başıma geldi.",
  "Bu olaydan dolayı verdiğim tepkiler git gide delirdiğimi gösteriyor.",
  "Bir daha asla normal duygular hissedemeyeceğim.",
  "Dünya tehlikeli bir yerdir.",
  "Bir başkası olsa bu olayın olmasını engelleyebilirdi.",
  "Bundan sonrası için kalıcı olarak zarar gördüm.",
  "Kendimi insan değil, eşya gibi hissediyorum.",
  "Benim yerimde başkası olsa bu duruma düşmezdi.",
  "İnsanlara güvenemem.",
  "Kendimi yalnız ve diğer insanlardan uzak hissediyorum.",
  "Bir geleceğim kalmadı.",
  "Kötü şeylerin başıma gelmesini engelleyemem.",
  "İnsanlar göründükleri gibi değildir.",
  "Yaşadığım olay hayatımı mahvetti.",
  "Bende yanlış giden bir şeyler var.",
  "Bu olaydan beri verdiğim tepkiler, benim olayla başa çıkmayı beceremediğimi gösteriyor.",
  "Bu olayın gerçekleşmesine neden olan, benimle ilgili bir şeyler var.",
  "Artık kendimi tanıyamıyorum.",
  "Kendime güvenemiyorum.",
  "Bundan sonra artık güzel bir şeyler yaşamam mümkün değil.",
  "Bu olayla ilgili düşüncelerime tahammül edemeyip dağılabilirim.",
  "Duygularımı kontrol edemeyeceğim ve korkunç bir şey olacak.",
  "İnsanın başına ne zaman kötü bir şey geleceği asla bilinemez."
];

const OPTIONS = [
  { value: 1, label: "Kesinlikle katılmıyorum" },
  { value: 2, label: "Katılmıyorum" },
  { value: 3, label: "Kararsızım" },
  { value: 4, label: "Katılıyorum" },
  { value: 5, label: "Kesinlikle katılıyorum" }
];

function getResultText(score) {
  if (score <= 50) return "Düşük travma sonrası biliş düzeyi";
  if (score <= 80) return "Orta düzeyde travma sonrası biliş";
  if (score <= 120) return "Yüksek travma sonrası biliş düzeyi";
  return "Çok yüksek travma sonrası biliş düzeyi";
}

export default function TSBETest() {
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

        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200/50 p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-3xl">🧠</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Travma Sonrası Bilişler Envanteri (TSBE)
              </h1>
              <p className="text-gray-600 text-lg">
                Test Sonucunuz
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-8 border-2 border-green-200/50">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-700 mb-4">
                  {totalScore}
                </div>
                <div className="text-2xl font-semibold text-gray-800 mb-2">
                  {getResultText(totalScore)}
                </div>
                <div className="text-gray-600">
                  Toplam Puan: {totalScore} / {QUESTIONS.length * 5}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sonuç Açıklaması</h3>
                <p className="text-gray-700 leading-relaxed">
                  {totalScore <= 50 && "Travma sonrası bilişleriniz düşük düzeyde. Bu, travmatik olaydan sonra olumsuz düşüncelerinizin az olduğunu gösterir."}
                  {totalScore > 50 && totalScore <= 80 && "Travma sonrası bilişleriniz orta düzeyde. Bazı olumsuz düşünceler yaşadığınızı gösterir."}
                  {totalScore > 80 && totalScore <= 120 && "Travma sonrası bilişleriniz yüksek düzeyde. Travmatik olaydan sonra önemli olumsuz düşünceler yaşadığınızı gösterir."}
                  {totalScore > 120 && "Travma sonrası bilişleriniz çok yüksek düzeyde. Travmatik olaydan sonra yoğun olumsuz düşünceler yaşadığınızı gösterir."}
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Öneriler</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Profesyonel psikolojik destek almayı düşünebilirsiniz</li>
                  <li>• Travma sonrası stres bozukluğu (TSSB) konusunda uzman desteği</li>
                  <li>• Bilişsel davranışçı terapi (BDT) faydalı olabilir</li>
                  <li>• Kendi kendine yardım teknikleri öğrenebilirsiniz</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 text-center">
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
      </div>
    );
  }

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

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200/50 p-8 md:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
              <span className="text-3xl">🧠</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Travma Sonrası Bilişler Envanteri (TSBE)
            </h1>
            <p className="text-gray-600 text-lg">
              Son 1 ay içinde yaşadığınız travmatik bir olayla ilgili düşüncelerinizi değerlendirin
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
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {QUESTIONS[currentQuestion]}
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
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-green-500 shadow-lg scale-105"
                    : "bg-white/80 text-gray-700 border-gray-200 hover:border-green-300 hover:bg-green-50/50"
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
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
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
                    : "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
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