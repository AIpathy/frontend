import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Başladığınız işleri tamamlamakta veya birden fazla işi planlayarak yürütmekte ne sıklıkla zorlanırsınız?",
  "Organizasyon gerektiren bir iş yapmanız zorunlu olduğunda işlerinizi sıraya koymakta ne sıklıkla zorluk yaşarsınız?",
  "Yükümlülüklerinizi ve randevularınızı hatırlamakta ne sıklıkla sorun yaşarsınız?",
  "Çok fazla düşünmeyi ve konsantrasyonu gerektiren bir işe başlamakta ne sıklıkla gecikir ya da kaçınırsınız?",
  "Uzun süre oturmanız gerektiğinde ya da dinlenirken ne sıklıkla huzursuzlaşır, kıpır kıpır olur veya el/ayak hareketleri yaparsınız?",
  "Ne sıklıkla kendinizi aşırı aktif ve sanki motor takılmış gibi bir şeyler yapmak zorunda hissedersiniz?",
  "Sıkıcı veya zor bir proje üzerinde çalışırken ne sıklıkla dikkatsizce hatalar yaparsınız?",
  "Ortamda dikkat dağıtıcı unsurlar (gürültü, konuşmalar, tekrar eden işler) olduğunda dikkatinizi sürdürmekte ne sıklıkla zorlanırsınız?",
  "Evde veya işte eşyaları bulmakta ya da nereye koyduğunuzu hatırlamakta ne sıklıkla güçlük yaşarsınız?",
  "Toplantı veya benzer bir durumda oturmanız gerektiğinde yerinizden kalkma ihtiyacı hisseder misiniz?",
  "Kendinize ait boş zamanlarınızda gevşemekte ve rahatlamakta zorlanır mısınız?",
  "Sosyal ortamlarda bulunduğunuzda, ne sıklıkla çok konuştuğunuzu fark edersiniz?",
  "Karşınızdaki kişi konuşmasını bitirmeden sözünü kesme ya da soruyu erken yanıtlama eğiliminiz ne sıklıktadır?",
  "Sıra beklemeniz gereken durumlarda (örneğin konuşma sırası, kuyruk) ne sıklıkla sabırsızlanırsınız?",
  "Başka bir işle meşgul olduklarında diğer insanları araya girip engeller misiniz?",
  "Okulda, evde ya da işte zor ya da ilginç olmayan şeylerin ilgimi çektiğini fark ediyorum.",
  "Yazılı materyalleri çok ilginç ya da çok kolay olmadıkça okumakta zorlanıyorum.",
  "Çabuk heyecanlanıp, çabuk sakinleşiyorum.",
  "Genellikle huzursuzum ve küçük şeyler beni sinirlendiriyor.",
  "Düşünmeden söylediğim şeyleri daha sonra inkâr ederim.",
  "Kötü sonuçlara yol açabileceğini düşünmeden hızlı kararlar alırım.",
  "İnsanlarla ilişkilerim, önce konuşup sonra düşünme eğilimim nedeniyle zarar görüyor.",
  "Ruh halim iniş çıkışlarla doludur.",
  "Kolaylıkla hayal kırıklığına uğruyorum.",
  "Kırılgan biriyim ve birçok şey beni kolaylıkla incitiyor.",
  "Her zaman bir yere gidecek gibiyim.",
  "Kafamda çok fazla takıntı var.",
  "Zihnime işlevselliğini yitirecek kadar çok gereksiz şeyler dolar.",
  "Düşüncelerim zihnimde topların duvara çarpması gibi çarpışarak dolaşır.",
  "Beynim aynı anda birden çok kanalın gösterildiği bir televizyon ekranı gibidir.",
  "Gündüz hayal görmeyi engelleyemiyorum.",
  "Beynimin organize olamayan çalışma şeklinden dolayı stres yaşıyorum.",
  "Genellikle huzurlu olsam da aniden yoğun öfke ya da sinir yaşayabiliyorum.",
  "Dikkatsizlik nedeniyle genellikle olayları ya da insanları yanlış anlıyorum.",
  "Kararsızlık nedeniyle önemsiz işlerde bile zaman kaybediyorum.",
  "Duygularımı bastırmak yerine ani tepkiler verir, sonra pişman olurum."
];

const OPTIONS = [
  { value: 1, label: "Hiç bir zaman" },
  { value: 2, label: "Nadiren" },
  { value: 3, label: "Ara sıra" },
  { value: 4, label: "Sıklıkla" },
  { value: 5, label: "Çok sık" }
];

function getResultText(score) {
  if (score <= 80) return "Düşük DEHB belirtileri - Normal düzeyde";
  if (score <= 120) return "Hafif DEHB belirtileri - Dikkatli olmalısınız";
  if (score <= 150) return "Orta düzeyde DEHB belirtileri - Profesyonel destek önerilir";
  return "Yüksek DEHB belirtileri - Mutlaka profesyonel yardım alın";
}

export default function DEHBTest() {
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
                DEHB (Dikkat Eksikliği ve Hiperaktivite Bozukluğu) Testi
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
                  {totalScore <= 80 && "DEHB belirtileriniz düşük düzeyde. Günlük yaşamınızı etkileyen önemli bir sorun görünmüyor."}
                  {totalScore > 80 && totalScore <= 120 && "DEHB belirtileriniz hafif düzeyde. Bazı dikkat ve hiperaktivite sorunları yaşayabilirsiniz."}
                  {totalScore > 120 && totalScore <= 150 && "DEHB belirtileriniz orta düzeyde. Günlük yaşamınızı etkileyen dikkat ve hiperaktivite sorunları yaşayabilirsiniz."}
                  {totalScore > 150 && "DEHB belirtileriniz yüksek düzeyde. Bu belirtiler günlük yaşamınızı önemli ölçüde etkileyebilir."}
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Öneriler</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Profesyonel psikolojik destek almayı düşünebilirsiniz</li>
                  <li>• Dikkat ve konsantrasyon teknikleri öğrenebilirsiniz</li>
                  <li>• Zaman yönetimi ve organizasyon becerileri geliştirin</li>
                  <li>• Stres yönetimi ve gevşeme teknikleri faydalı olabilir</li>
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
              DEHB (Dikkat Eksikliği ve Hiperaktivite Bozukluğu) Testi
            </h1>
            <p className="text-gray-600 text-lg">
              Dikkat ve hiperaktivite belirtilerinizi değerlendirin
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