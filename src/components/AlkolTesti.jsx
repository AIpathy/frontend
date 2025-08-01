import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    key: "tuketim",
    title: "Alkol Tüketim Sıklığı ve Miktarı",
    questions: [
      "Alkollü içecekleri ne sıklıkla tüketirsiniz?",
      "Alkol aldığınızda genellikle günde kaç standart içki içersiniz?",
      "Bir oturuşta 3 veya daha fazla standart içki içtiğiniz olur mu?",
      "Bir seferde 6 veya daha fazla standart içki içtiğiniz olur mu?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Ayda bir" },
      { value: 2, label: "Ayda birkaç kez" },
      { value: 3, label: "Haftada birkaç kez" },
      { value: 4, label: "Her gün veya neredeyse her gün" }
    ]
  },
  {
    key: "kontrol",
    title: "Kontrol Kaybı ve İsteksiz Tüketim",
    questions: [
      "İstediğinizden daha fazla miktarda ya da daha uzun süre alkol tükettiğiniz zamanlar oldu mu?",
      "Alkol almayı bırakmaya çalıştığınız ama başaramadığınız oldu mu?",
      "Planladığınızdan daha fazla alkol tükettiğiniz olur mu?",
      "Alkol tüketimini durdurmakta veya sınırlamakta zorlanıyor musunuz?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Sık Sık" },
      { value: 3, label: "Her Zaman" }
    ]
  },
  {
    key: "sosyal",
    title: "Sosyal, Mesleki ve Akademik Etkiler",
    questions: [
      "Alkol nedeniyle işe, okula veya günlük sorumluluklara daha az zaman ayırdığınız oldu mu?",
      "Alkol nedeniyle iş/okul performansınız olumsuz etkilendi mi?",
      "Alkol kullanımı, arkadaşlarınızla veya ailenizle olan ilişkilerinizi olumsuz etkiledi mi?",
      "Alkol kullanımı nedeniyle sosyal etkinliklerden veya zevk aldığınız aktivitelerden uzaklaştınız mı?",
      "Alkol almaya başladıktan sonra durmayı başaramadığınız zamanlar oldu mu?",
      "Alkol kullandığınız için çevrenizden (aile, arkadaş, sağlık çalışanı) içmeyi bırakmanız yönünde uyarı aldınız mı?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Sık Sık" },
      { value: 3, label: "Her Zaman" }
    ]
  },
  {
    key: "psikolojik",
    title: "Psikolojik ve Duygusal Nedenler",
    questions: [
      "Kendinize güveninizi artırmak veya daha rahat hissetmek için alkol kullandığınız olur mu?",
      "Sosyal ortamlarda rahatlamak veya utangaçlığı yenmek için alkol içtiğiniz olur mu?",
      "Alkolü stres, baskı veya sıkıntılardan kaçmak için kullandığınız olur mu?",
      "Alkol kullanmadığınızda huzursuzluk, sinirlilik, gerginlik hissediyor musunuz?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Sık Sık" },
      { value: 3, label: "Her Zaman" }
    ]
  },
  {
    key: "fiziksel",
    title: "Fiziksel ve Duygusal Sonuçlar",
    questions: [
      "Alkol aldıktan sonra kendinizi suçlu, pişman veya depresif hissettiğiniz olur mu?",
      "Alkol etkisinde davranışlarınız yüzünden başınızın derde girdiği (hastane, tutuklama vb.) oldu mu?",
      "Alkol aldıktan sonra bir önceki geceyi hatırlayamadığınız olur mu?",
      "Alkollü olduğunuz için sizin ya da başkasının yaralanmasına neden olduğunuz oldu mu?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Sık Sık" },
      { value: 3, label: "Her Zaman" }
    ]
  },
  {
    key: "dayaniklilik",
    title: "Fiziksel Dayanıklılık ve Yoksunluk",
    questions: [
      "Önceden aldığınız etkiyi hissedebilmek için zamanla daha fazla alkol almak zorunda kaldığınız oldu mu?",
      "Alkol kullanmadığınız zamanlarda titreme, terleme, huzursuzluk, uykusuzluk gibi yoksunluk belirtileri yaşadınız mı?",
      "Aşırı içki sonrası sabahında kendinize gelmek için tekrar alkol aldığınız oldu mu?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Sık Sık" },
      { value: 3, label: "Her Zaman" }
    ]
  },
  {
    key: "cevre",
    title: "Sosyal Çevre ve Davranış",
    questions: [
      "Yalnız içtiğiniz olur mu?",
      "Artık içemeyecek hale gelene kadar içtiğiniz olur mu?",
      "İçtiğinizde kendinizi daha önemli veya güçlü hissettiğiniz olur mu?",
      "Alkol aldığınızda insanlarla daha iyi anlaştığınızı düşünüyor musunuz?",
      "Daha çok alkol tüketen arkadaş çevresiyle vakit geçirmeye başladınız mı?"
    ],
    options: [
      { value: 0, label: "Hiç" },
      { value: 1, label: "Nadiren" },
      { value: 2, label: "Sık Sık" },
      { value: 3, label: "Her Zaman" }
    ]
  },
  {
    key: "degerlendirme",
    title: "Ek Gözlem ve Değerlendirme",
    questions: [
      "Son bir yıl içinde alkol kullanımı ilişkilerinizi, iş ya da okul yaşantınızı olumsuz etkiledi mi?",
      "Alkol nedeniyle daha önce arkadaş kaybettiniz mi?",
      "Alkol almak sizi maddi açıdan zorluyor mu?",
      "Alkol almayı bir sorun olarak görüyor musunuz?"
    ],
    options: [
      { value: 0, label: "Hayır" },
      { value: 1, label: "Bir ölçüde" },
      { value: 2, label: "Evet" }
    ]
  }
];

// Tüm soruları düz bir diziye çevir
const ALL_QUESTIONS = CATEGORIES.flatMap(category => 
  category.questions.map(question => ({
    question,
    category: category.key,
    options: category.options
  }))
);

function getResultText(score) {
  if (score <= 20) return "Düşük risk - Alkol kullanımınız kontrollü görünüyor";
  if (score <= 40) return "Orta risk - Alkol kullanımınızda dikkatli olmalısınız";
  if (score <= 60) return "Yüksek risk - Alkol kullanımınız problematik olabilir";
  return "Çok yüksek risk - Profesyonel yardım almanız önerilir";
}

export default function AlkolTesti() {
  const [answers, setAnswers] = useState(Array(ALL_QUESTIONS.length).fill(null));
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
        if (currentQuestion < ALL_QUESTIONS.length - 1) {
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
    if (currentQuestion < ALL_QUESTIONS.length - 1) {
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
  const currentQuestionData = ALL_QUESTIONS[currentQuestion];

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
                <span className="text-3xl">🍺</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Alkol Kullanım Testi
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
                  Toplam Puan: {totalScore} / {ALL_QUESTIONS.length * 3}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sonuç Açıklaması</h3>
                <p className="text-gray-700 leading-relaxed">
                  {totalScore <= 20 && "Alkol kullanımınız kontrollü görünüyor. Mevcut kullanım düzeyinizi sürdürmeye devam edebilirsiniz."}
                  {totalScore > 20 && totalScore <= 40 && "Alkol kullanımınızda dikkatli olmalısınız. Kullanım miktarınızı ve sıklığınızı gözden geçirmeniz önerilir."}
                  {totalScore > 40 && totalScore <= 60 && "Alkol kullanımınız problematik olabilir. Kullanımınızı azaltmayı düşünebilir veya profesyonel destek alabilirsiniz."}
                  {totalScore > 60 && "Alkol kullanımınız yüksek risk taşıyor. Profesyonel yardım almanız önerilir. Bir uzmanla görüşmek faydalı olabilir."}
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Öneriler</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Alkol kullanımınızı takip edin ve günlük limitler belirleyin</li>
                  <li>• Alkol kullanımınızı azaltmak için stratejiler geliştirin</li>
                  <li>• Profesyonel psikolojik destek almayı düşünebilirsiniz</li>
                  <li>• Alkol bağımlılığı konusunda uzman desteği</li>
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
              <span className="text-3xl">🍺</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Alkol Kullanım Testi
            </h1>
            <p className="text-gray-600 text-lg">
              Alkol kullanım alışkanlıklarınızı değerlendirin
            </p>
          </div>

          {/* Category Info */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border-2 border-green-200/50">
              <h3 className="text-lg font-semibold text-green-800">
                {CATEGORIES.find(cat => cat.key === currentQuestionData.category)?.title}
              </h3>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Soru {currentQuestion + 1} / {ALL_QUESTIONS.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                %{Math.round(((currentQuestion + 1) / ALL_QUESTIONS.length) * 100)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / ALL_QUESTIONS.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {currentQuestionData.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {currentQuestionData.options.map((option) => (
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
              {answers.filter(a => a !== null).length} / {ALL_QUESTIONS.length} cevaplandı
            </div>

            {currentQuestion < ALL_QUESTIONS.length - 1 ? (
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