import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const QUESTIONS = [
  "Sık sık panik nöbetleri geçiririm.",
  "Son zamanlarda beni duygusal olarak etkileyen bir şey olmadı.",
  "Çoğu kez gerçekte kim olduğumu merak ederim.",
  "Çoğu kez başıma iş açacak riskli davranışlarda bulunurum.",
  "Başkaları bana yoğun ilgi gösterdiğinde kendimi boğulmuş hissederim.",
  "Bazen içimde bana ait olmayan başka bir kişi ortaya çıkar gibi hissederim.",
  "Gerçekte olmadığı halde acayip şekiller, görüntüler veya insanların ve nesnelerin görünüşlerinin değiştiğini gördüğüm/hissettiğim oldu.",
  "Bazen çevremdeki insanlar ve nesnelerin gerçek olmadığını hissederim.",
  "Başkalarına yönelik duygularım çok hızlı ve uçtan uca değişir (örneğin sevgi ile nefret arasında).",
  "Çoğu kez değersizlik ya da umutsuzluk hissine kapılırım.",
  "Çoğu kez paramı çarçur ederim ya da kumar oynarım.",
  "Gerçekte kimse olmadığı halde hakkımda konuşan sesler duydum.",
  "Aşağıdaki cümlelerden sizin için uygun olanı seçiniz:",
  "Gerçekte kimse olmadığı halde bazen içimden bir ses, bazen de dışarıdan bir ses duyduğum oldu.",
  "Yakın ilişkilerde hep incinirim.",
  "Bana uymayan biçimde hissettiğim ya da davrandığım oldu.",
  "Bir kukla gibi dışarıdan yönetiliyormuş ve yönlendiriliyormuş gibi hissettiğim oldu.",
  "Herhangi birine fiziksel olarak saldırıda bulunduğum oldu.",
  "Düşüncelerim başkaları tarafından okunuyormuş gibi hissettiğim oldu.",
  "Bazen gerçekte suç işlemediğim halde, sanki işlemişim gibi suçluluk hissederim.",
  "Bilerek kendime bedensel zarar verdiğim oldu.",
  "Bazen gerçekte olmadığı halde insanların ve nesnelerin görünümlerinin değiştiği hissine kapılırım.",
  "Yoğun dini uğraşlarım olmuştur.",
  "Duygusal ilişkilerimde çoğunlukla ne tür bir ilişki istediğimden emin olamam.",
  "Bazen bir kahin gibi gelecekle ilgili özel hislerim olur.",
  "Bir ilişki ilerledikçe kendimi kapana kısılmış gibi hissederim.",
  "Gerçekte kimse olmadığı halde bir başka insanın varlığını hissettiğim oldu.",
  "Bazen bedenim ya da bedenimin bir kısmı bana acayip veya değişmiş gibi görünür.",
  "İlişkiler çok ilerlerse, çoğunlukla koparma gereksinimi duyarım.",
  "Bazen birilerinin peşimde olduğu hissine kapılırım.",
  "Sık sık uyuşturucu kullanırım (esrar, hap gibi).",
  "Başkalarını kontrol altında tutmaktan hoşlanırım.",
  "Bazen özel biri olduğumu hissederim.",
  "Bazen dağılıyormuşum gibi hissederim.",
  "Bazen bana bir şeyin gerçekte mi yoksa yalnızca hayalimde mi olduğunu ayırt etmek zor gelir.",
  "Çoğu kez sonuçlarını düşünmeden içimden geldiği gibi davranırım.",
  "Bazen gerçek olmadığım duygusuna kapılırım.",
  "Bazen bedenim yokmuş ya da bir kısmı eksikmiş hissine kapılırım.",
  "Çoğu kez kabus görürüm.",
  "Çoğu kez başkaları bana gülüyormuş ya da hakkımda konuşuyormuş hissine kapılırım.",
  "Çoğu kez insanlar bana düşmanmış gibi gelir.",
  "İnsanların kendi düşüncelerini benim zihnime soktuklarını hissettiğim oldu.",
  "Çoğu kez gerçekten ne istediğimi bilmem.",
  "Geçmişte intihar girişiminde bulundum.",
  "Bazen ciddi bir hastalığım olduğuna inanırım.",
  "Alkol, uyuşturucu ya da hap alışkanlığım vardır.",
  "Bazen bir rüyada yaşıyormuş ya da yaşamım bir film şeridi gibi gözümün önünden geçiyormuş hissine kapılırım.",
  "Çoğu kez bir şeyler çalarım.",
  "Bazen öyle açlık nöbetlerim olur ki önüme gelen her şeyi silip süpürürüm.",
  "Politika, din, ahlak (iyi-kötü) konularıyla ilgili sorularda çoğu kez kendimi rahatsız hissederim.",
  "Bazen aklımdan birilerini öldürme düşüncesi geçer.",
  "Yasalarla başımın derde girdiği oldu.",
  "Geçmişte yukarıdaki deneyimlerden herhangi birini ilaç etkisi altında yaşadınız mı?",
  "Geçmişte yukarıdaki deneyimlerden herhangi birini psikoterapi sırasında yaşadınız mı?"
];

const OPTIONS = [
  { value: 0, label: "Hayır yaşamadım" },
  { value: 1, label: "Evet yaşadım" }
];

const Q12A_OPTIONS = [
  { value: 0, label: "Bu sesler benim dışımdan gelmiştir." },
  { value: 1, label: "Bu sesler içimden gelmiştir." }
];

function getResultText(score) {
  if (score <= 10) return "Düşük borderline eğilimi";
  if (score <= 25) return "Orta düzeyde borderline eğilimi";
  return "Yüksek borderline eğilimi";
}

export default function BorderlineKisilikTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [q12a, setQ12a] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [autoNext, setAutoNext] = useState(false);

  // Kullanıcı tipine göre geri dönüş yolu
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  // Soru listesini oluştur (12a dahil)
  const getQuestionList = () => {
    const questionList = [];
    for (let i = 0; i < QUESTIONS.length; i++) {
      if (i === 12) {
        // 12a sadece 12. soruya Evet denirse gösterilsin
        if (answers[11] === 1) {
          questionList.push({
            index: i,
            question: QUESTIONS[i],
            options: Q12A_OPTIONS,
            isSpecial: true
          });
        }
        continue;
      }
      // 12a'yı atla (index 12) - 12. soruya Hayır denirse 12a hiç gösterilmesin
      if (i === 12 && answers[11] !== 1) continue;
      
      questionList.push({
        index: i,
        question: QUESTIONS[i],
        options: OPTIONS,
        isSpecial: false
      });
    }
    return questionList;
  };

  const questionList = getQuestionList();
  const currentQuestionData = questionList[currentQuestion];

  const handleAnswerChange = (value) => {
    if (currentQuestionData.isSpecial) {
      setQ12a(value);
    } else {
      const newAnswers = [...answers];
      newAnswers[currentQuestionData.index] = value;
      setAnswers(newAnswers);
    }
    
    // Otomatik geçiş için timer başlat
    setAutoNext(true);
  };

  // Otomatik geçiş efekti
  useEffect(() => {
    if (autoNext) {
      const timer = setTimeout(() => {
        if (currentQuestion < questionList.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Son soru cevaplandığında otomatik olarak sonuç ekranına geç
          setSubmitted(true);
        }
        setAutoNext(false);
      }, 800); // 0.8 saniye sonra otomatik geçiş

      return () => clearTimeout(timer);
    }
  }, [autoNext, currentQuestion, questionList.length]);

  const handleNext = () => {
    if (currentQuestion < questionList.length - 1) {
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

  // 12a hariç toplam puan
  const totalScore = answers.reduce((sum, v, idx) => {
    // 12a (index 12) puana dahil edilmez
    if (idx === 12) return sum;
    return sum + (v !== null ? Number(v) : 0);
  }, 0);

  // Formun tamamlanmış sayılması için: 12. soruya Evet ise 12a da zorunlu, Hayır ise 12a hiç sorulmaz
  const allAnswered = answers.every((v, idx) => (idx === 12 ? true : v !== null)) && (answers[11] !== 1 || q12a !== null);
  
  const currentAnswer = currentQuestionData.isSpecial ? q12a : answers[currentQuestionData.index];

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
            <h2 className="text-2xl font-bold text-green-800">Borderline Kişilik Testi</h2>
            <span className="text-lg font-semibold text-gray-600">
              {currentQuestion + 1} / {questionList.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${((currentQuestion + 1) / questionList.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border-2 border-green-200/50 p-8">
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              {currentQuestion + 1}. {currentQuestionData.question}
            </h3>
            
            <div className="space-y-4">
              {currentQuestionData.options.map((option) => (
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
              {currentQuestion < questionList.length - 1 ? (
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