import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    key: "sozel",
    title: "Sözel/Dilsel Zeka",
    questions: [
      "Kitaplar benim için çok önemlidir.",
      "Şarkı söylerken kulağa hoş gelen bir sesim vardır.",
      "Tekerlemeler, komik şiirler veya kelime oyunları ile eğlenirim.",
      "Konuşmalarımda uygun kelimeleri seçmeye özen gösteririm.",
      "Yeni kelimeler öğrenmekten keyif alırım.",
      "Yazı yazmak benim için kolaydır.",
      "Şiir veya hikâye yazmayı denerim.",
      "Dinlediğim hikâyeleri kolayca hatırlarım.",
      "Anlatım gücüm kuvvetlidir.",
      "Kelimeler türetme ya da sözcük bulmacalarından hoşlanırım."
    ]
  },
  {
    key: "mantiksal",
    title: "Mantıksal/Matematiksel Zeka",
    questions: [
      "Sayıları zihnimde kolaylıkla hesaplayabilirim.",
      "Problemleri mantıklı adımlarla çözmeyi severim.",
      "Matematiksel işlemler benim için kolaydır.",
      "Olaylardaki neden-sonuç ilişkilerini analiz ederim.",
      "Bilimdeki yeni gelişmelerle ilgilenirim.",
      "Aletlerin nasıl çalıştığını anlamak isterim.",
      "Olaylara yapı, düzen veya mantıksal sıralama ararım.",
      "Konuşmalarımda, okuduğum veya duyduğum şeye sıkça başvururum.",
      "Harita ve grafik okumada iyiyimdir.",
      "Sayısal verilerle çalışmaktan hoşlanırım."
    ]
  },
  {
    key: "gorsel",
    title: "Görsel/Mekansal Zeka",
    questions: [
      "Gözlerimi kapattığımda sıkça net resimler görürüm.",
      "Kavramları zihnimde yazmadan önce canlandırabilirim.",
      "Zihnimde objelerin şeklini ve yerini canlandırabilirim.",
      "Üç boyutlu düşünme yeteneğim gelişmiştir.",
      "Resim çizmeyi veya bir şeyler karalamayı severim.",
      "Görsel detaylara dikkat ederim.",
      "Bir şeye yukarıdan kuşbakışı bakıldığında nasıl görüneceğini kolayca hayal ederim.",
      "Fotoğraf çekmekten veya resim yapmaktan hoşlanırım.",
      "İçinde çok resim bulunan okuma materyallerini tercih ederim.",
      "Renklere ve desenlere karşı duyarlıyım."
    ]
  },
  {
    key: "bedensel",
    title: "Bedensel/Kinestetik Zeka",
    questions: [
      "Düzenli olarak fiziksel etkinliklerle uğraşırım.",
      "Spor yapmaktan büyük keyif alırım.",
      "Uzun süre hareketsiz oturmak zor gelir.",
      "Bedenimi ifade aracı olarak kullanabilirim.",
      "Fiziksel koordinasyonum iyidir.",
      "Dans etmek ya da fiziksel aktivitelerde bulunmak hoşuma gider.",
      "Yeni şeyleri deneyerek öğrenmeyi tercih ederim.",
      "El becerisi gerektiren hobilerim vardır.",
      "Model inşa etmek veya el işi etkinliklerden hoşlanırım.",
      "Koşu yerine grup sporlarını tercih ederim."
    ]
  },
  {
    key: "muziksel",
    title: "Müziksel/Ritmik Zeka",
    questions: [
      "Müzik olmadan hayat zevksiz olur.",
      "Çok sayıda şarkı melodisini bilirim.",
      "Müzik dinlerken duygularım değişir.",
      "Melodileri kolayca hatırlarım.",
      "Tempo tutabilirim (davul, tamburin gibi).",
      "Farklı müzik türlerine ilgiliyimdir.",
      "Bir müzik aleti çalıyorum.",
      "Şarkı sözü ezberlemekte iyiyim.",
      "Kulağa hoş gelen sesim var.",
      "Kendi kendime melodiler oluşturmaya çalışırım."
    ]
  },
  {
    key: "kisilerarasi",
    title: "Kişilerarası Zeka",
    questions: [
      "İş ve arkadaş çevremde görüşlere başvururum.",
      "Yakın arkadaşlarım en az üç kişidir.",
      "Sosyal etkinliklerden hoşlanırım.",
      "Kalabalık ortamlarda rahat hissederim.",
      "İnsan ilişkilerinde başarılıyımdır.",
      "Başkalarının duygularını anlayabilirim.",
      "Topluluk önünde konuşmaktan çekinmem.",
      "Kolay iletişim kurarım.",
      "Ekip çalışmalarında aktif rol alırım.",
      "Diğerlerine yardım etmeyi severim."
    ]
  },
  {
    key: "icsel",
    title: "İçsel Zeka",
    questions: [
      "Yalnız kalıp düşünmeyi severim.",
      "Güçlü ve zayıf yönlerimin farkındayım.",
      "Kendi kararlarımı almaktan çekinmem.",
      "İçsel motivasyonum yüksektir.",
      "Kendime zaman ayırmak önemlidir.",
      "Hayat hakkında düzenli düşünürüm.",
      "Meditasyon veya derin düşünmeye zaman ayırırım.",
      "Kendi değerlerime göre hareket ederim.",
      "İçsel duygularımı analiz etmeyi severim.",
      "Gelecek için önemli hedeflerim vardır."
    ]
  },
  {
    key: "dogasal",
    title: "Doğasal Zeka",
    questions: [
      "Her tür hayvanı severim.",
      "Doğada ve dışarda olmayı severim.",
      "Koleksiyon hobim (taş, pul, kelebek vb.) vardır.",
      "Bitki yetiştirme veya bahçe hobisine ilgiliyim.",
      "Doğal yaşamı gözlemlemekten hoşlanırım.",
      "Doğaya karşı meraklıyımdır.",
      "Çevreyi koruma konusunda duyarlıyımdır.",
      "Hayvanları gözlemlemekten keyif alırım.",
      "Kendimi doğanın içindeymiş gibi hissederim.",
      "Doğal ortamda vakit geçirmek bana iyi gelir."
    ]
  }
];

const OPTIONS = [
  { value: 1, label: "Hiç uygun değil" },
  { value: 2, label: "Az uygun" },
  { value: 3, label: "Kararsızım" },
  { value: 4, label: "Oldukça uygun" },
  { value: 5, label: "Tamamen uygun" }
];

// Tüm soruları düz bir diziye çevir
const ALL_QUESTIONS = CATEGORIES.flatMap(category => 
  category.questions.map(question => ({
    question,
    category: category.key,
    categoryTitle: category.title
  }))
);

function getResultText(scores) {
  const maxScore = Math.max(...Object.values(scores));
  const dominantIntelligence = Object.keys(scores).find(key => scores[key] === maxScore);
  
  const intelligenceNames = {
    sozel: "Sözel/Dilsel",
    mantiksal: "Mantıksal/Matematiksel",
    gorsel: "Görsel/Mekansal",
    bedensel: "Bedensel/Kinestetik",
    muziksel: "Müziksel/Ritmik",
    kisilerarasi: "Kişilerarası",
    icsel: "İçsel",
    dogasal: "Doğasal"
  };
  
  return `En güçlü zeka alanınız: ${intelligenceNames[dominantIntelligence]}`;
}

export default function CokluZekaTesti() {
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

  const allAnswered = answers.every((v) => v !== null);
  const currentAnswer = answers[currentQuestion];
  const currentQuestionData = ALL_QUESTIONS[currentQuestion];

  // Kategori bazlı puanları hesapla
  const calculateScores = () => {
    const scores = {};
    CATEGORIES.forEach(category => {
      const categoryQuestions = ALL_QUESTIONS.filter(q => q.category === category.key);
      const categoryAnswers = categoryQuestions.map((_, index) => {
        const globalIndex = ALL_QUESTIONS.findIndex(q => q.category === category.key) + index;
        return answers[globalIndex];
      });
      scores[category.key] = categoryAnswers.reduce((sum, val) => sum + (val !== null ? Number(val) : 0), 0);
    });
    return scores;
  };

  const scores = calculateScores();

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
                Çoklu Zeka Testi
              </h1>
              <p className="text-gray-600 text-lg">
                Test Sonucunuz
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-8 border-2 border-green-200/50">
              <div className="text-center">
                <div className="text-2xl font-semibold text-gray-800 mb-4">
                  {getResultText(scores)}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Zeka Alanları Puanlarınız</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {CATEGORIES.map(category => (
                    <div key={category.key} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-gray-800">{category.title}</span>
                        <span className="text-lg font-bold text-green-600">{scores[category.key]}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-green-500 to-emerald-600 h-2 rounded-full"
                          style={{ width: `${(scores[category.key] / 50) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sonuç Açıklaması</h3>
                <p className="text-gray-700 leading-relaxed">
                  Çoklu zeka kuramına göre her insanın farklı zeka alanları vardır. Bu test sonucu, 
                  hangi zeka alanlarınızın daha güçlü olduğunu göstermektedir. En yüksek puan aldığınız 
                  alan, sizin en güçlü zeka alanınızdır ve bu alanda daha başarılı olabilirsiniz.
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Öneriler</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Güçlü zeka alanlarınızı geliştirmeye odaklanın</li>
                  <li>• Zayıf alanlarınızı da geliştirmek için çaba gösterin</li>
                  <li>• Öğrenme stillerinizi zeka alanlarınıza göre şekillendirin</li>
                  <li>• Kariyer seçimlerinizde zeka alanlarınızı göz önünde bulundurun</li>
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
              Çoklu Zeka Testi
            </h1>
            <p className="text-gray-600 text-lg">
              8 farklı zeka alanınızı değerlendirin
            </p>
          </div>

          {/* Category Info */}
          <div className="mb-6">
            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 border-2 border-green-200/50">
              <h3 className="text-lg font-semibold text-green-800">
                {currentQuestionData.categoryTitle}
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