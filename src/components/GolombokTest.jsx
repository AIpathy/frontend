import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const WOMEN_QUESTIONS = [
  { question: "Cinsel yaşama karşı ilgisizlik duyar mısınız?", isNegative: true },
  { question: "Eşinize cinsel ilişkide nelerden hoşlanıp hoşlanmadığını sorar mısınız?", isNegative: false },
  { question: "Bir hafta boyunca ilişkiye girmediğiniz olur mu? (adet günleri, hastalık gibi nedenler dışında)", isNegative: true },
  { question: "Cinsel yönden kolaylıkla uyarılır mısınız?", isNegative: false },
  { question: "Ön sevişmeye yeterli zaman ayırıyor musunuz?", isNegative: false },
  { question: "Cinsel organınızın, eşinizin cinsel organının giremeyeceği kadar dar olduğunu düşünüyor musunuz?", isNegative: true },
  { question: "Partnerinizle sevişmekten kaçınır mısınız?", isNegative: true },
  { question: "Cinsel ilişki sırasında doyuma (orgazma) ulaşabilir misiniz?", isNegative: false },
  { question: "Partnerinize sarılmak/okşamak hoşunuza gider mi?", isNegative: false },
  { question: "Partnerinizle cinsel ilişkinizi tatminkar bulur musunuz?", isNegative: false },
  { question: "Gerekirse rahatsızlık ve acı duymaksızın, parmağınızı cinsel organınızın içine sokabilir misiniz?", isNegative: false },
  { question: "Partnerin cinsel organına dokunmaktan, okşamaktan rahatsız olur musunuz?", isNegative: true },
  { question: "Partnerin sevişme istemi sizi rahatsız eder mi?", isNegative: true },
  { question: "Orgazm olmanızın mümkün olmadığını düşünüyor musunuz?", isNegative: true },
  { question: "Haftada 2'den fazla ilişkiye girer misiniz?", isNegative: false },
  { question: "Cinsel ilişkinizle ilgili kendi isteğinizi partnerinizle paylaşabilir misiniz?", isNegative: false },
  { question: "Cinsel organınızın penetrasyona izin verdiğini düşünüyor musunuz?", isNegative: false },
  { question: "İlişkinizde sevgi ve şefkat eksikliği hisseder misiniz?", isNegative: true },
  { question: "Partnerinizin cinsel organınıza okşamasından zevk alır mısınız?", isNegative: false },
  { question: "Sevişmeyi reddettiğiniz olur mu?", isNegative: true },
  { question: "Klitorisin uyarılması ile orgazma ulaşır mısınız?", isNegative: false },
  { question: "Sadece cinsel birleşme süresi yeterli mi?", isNegative: false },
  { question: "Sevişme sırasında tiksinti duyar mısınız?", isNegative: true },
  { question: "Organınız penetrasyona derinden izin veriyor mu?", isNegative: false },
  { question: "Partneriniz sizi sevip okşaması hoşunuza gider mi?", isNegative: false },
  { question: "Sevişme sırasında vajinal ıslaklık olur mu?", isNegative: false },
  { question: "Cinsel birleşmeden hoşlanıyor musunuz?", isNegative: false },
  { question: "Orgazm oluyor musunuz?", isNegative: false }
];

const MEN_QUESTIONS = [
  { question: "Haftada 2'den fazla cinsel birleşmede bulunur musunuz?", isNegative: false },
  { question: "Cinsel isteklerinizi partnerinizle paylaşır mısınız?", isNegative: false },
  { question: "Kolay uyarılıyor musunuz?", isNegative: false },
  { question: "Boşalmayı geciktirebilir misiniz?", isNegative: false },
  { question: "Cinsel yaşamınızı monoton buluyor musunuz?", isNegative: true },
  { question: "Partnerin organına dokunmaktan,okşamaktan rahatsız olur musunuz?", isNegative: true },
  { question: "Sevişme sırasında tedirgin olur musunuz?", isNegative: true },
  { question: "Penis–vajina birleşmesinden zevk alır mısınız?", isNegative: false },
  { question: "Partnerin nelerden hoşlanıp hoşlanmadığını sorar mısınız?", isNegative: false },
  { question: "Sertleşme problemi yaşıyor musunuz?", isNegative: true },
  { question: "İlişkinizde sevgi ve şefkat eksikliğiniz var mı?", isNegative: true },
  { question: "Partnerin cinsel organınıza dokunmasından zevk alır mısınız?", isNegative: false },
  { question: "Erken boşalmayı kontrol edebilir misiniz?", isNegative: false },
  { question: "Sevişmekten kaçındığınız olur mu?", isNegative: true },
  { question: "Cinsel ilişkinizi tatminkâr buluyor musunuz?", isNegative: false },
  { question: "Ön sevişme sırasında sertleşiyor musunuz?", isNegative: false },
  { question: "Bir haftadır ilişkiye girmediğiniz oluyor mu? (hastalık gibi durumlar dışında)", isNegative: true },
  { question: "Sevişme başlatmayı siz mi yaparsınız?", isNegative: false },
  { question: "Partnerin sizi sevip, okşamasından hoşlanır mısınız?", isNegative: false },
  { question: "İstediğiniz sıklıkta ilişkiye giriyor musunuz?", isNegative: false },
  { question: "Sevişmeyi reddettiğiniz oluyor mu?", isNegative: true },
  { question: "Sertlik kaybolması yaşıyor musunuz?", isNegative: true },
  { question: "Boşalmadan hemen sonra istemeden boşalıyor musunuz?", isNegative: true },
  { question: "Sarılıp okşanmaktan zevk alır mısınız?", isNegative: false },
  { question: "Cinsel yaşama karşı ilgisizlik duyar mısınız?", isNegative: true },
  { question: "Cinsel organınız, eşinizin cinsel organına girmek üzereyken, istemeden boşalıyor musunuz?", isNegative: true },
  { question: "Tiksinti duyuyor musunuz?", isNegative: true }
];

const OPTIONS = [
  { value: 0, label: "Hiçbir zaman / Asla" },
  { value: 1, label: "Nadiren" },
  { value: 2, label: "Ara sıra" },
  { value: 3, label: "Sıklıkla" },
  { value: 4, label: "Her zaman" }
];

function getResultText(score, gender) {
  if (gender === 'female') {
    if (score <= 20) return "Düşük cinsel memnuniyet - Profesyonel destek önerilir";
    if (score <= 40) return "Orta düzeyde cinsel memnuniyet - Geliştirilebilir";
    if (score <= 60) return "İyi cinsel memnuniyet - Sağlıklı";
    return "Yüksek cinsel memnuniyet - Mükemmel";
  } else {
    if (score <= 25) return "Düşük cinsel memnuniyet - Profesyonel destek önerilir";
    if (score <= 50) return "Orta düzeyde cinsel memnuniyet - Geliştirilebilir";
    if (score <= 75) return "İyi cinsel memnuniyet - Sağlıklı";
    return "Yüksek cinsel memnuniyet - Mükemmel";
  }
}

export default function GolombokTest() {
  const [answers, setAnswers] = useState(Array(28).fill(null));
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [autoNext, setAutoNext] = useState(false);
  const [gender, setGender] = useState(null);

  // Kullanıcı tipine göre geri dönüş yolu
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const questions = gender === 'female' ? WOMEN_QUESTIONS : MEN_QUESTIONS;

  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
    setAnswers(Array(selectedGender === 'female' ? WOMEN_QUESTIONS.length : MEN_QUESTIONS.length).fill(null));
    setCurrentQuestion(0);
  };

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
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
        } else {
          // Son soru cevaplandığında otomatik olarak sonuç ekranına geç
          setSubmitted(true);
        }
        setAutoNext(false);
      }, 800); // 0.8 saniye sonra otomatik geçiş

      return () => clearTimeout(timer);
    }
  }, [autoNext, answers, currentQuestion, questions.length]);

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
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
      const question = questions[index];
      if (question.isNegative) {
        // Negatif ifadeler için ters puanlama: 0->4, 1->3, 2->2, 3->1, 4->0
        return sum + (4 - answer);
      } else {
        // Pozitif ifadeler için normal puanlama
        return sum + answer;
      }
    }, 0);
  };

  const totalScore = calculateScore();
  const allAnswered = answers.every((v) => v !== null);
  const currentAnswer = answers[currentQuestion];

  if (!gender) {
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
                <span className="text-3xl">💕</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Golombok Cinsel Memnuniyet Ölçeği
              </h1>
              <p className="text-gray-600 text-lg">
                Cinsel sağlığınızı değerlendirin
              </p>
            </div>

            <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-8 mb-8 border-2 border-green-200/50">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                Cinsiyetinizi seçin
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleGenderSelect('female')}
                  className="group relative inline-flex items-center gap-3 !bg-gradient-to-r !from-pink-400 !via-pink-400 !to-pink-500 hover:!from-pink-400 hover:!via-pink-500 hover:!to-pink-600 text-white px-8 py-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 !bg-gradient-to-r !from-pink-300 !via-pink-400 !to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Content */}
                  <span className="relative z-10">Kadın</span>
                </button>
                <button
                  onClick={() => handleGenderSelect('male')}
                  className="group relative inline-flex items-center gap-3 !bg-gradient-to-r !from-blue-400 !via-blue-400 !to-blue-500 hover:!from-blue-400 hover:!via-blue-500 hover:!to-blue-600 text-white px-8 py-6 rounded-2xl font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 !bg-gradient-to-r !from-blue-300 !via-blue-400 !to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {/* Content */}
                  <span className="relative z-10">Erkek</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
                <span className="text-3xl">💕</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Golombok Cinsel Memnuniyet Ölçeği
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
                  {getResultText(totalScore, gender)}
                </div>
                <div className="text-gray-600">
                  Toplam Puan: {totalScore} / {questions.length * 4}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Sonuç Açıklaması</h3>
                <p className="text-gray-700 leading-relaxed">
                  {totalScore <= (gender === 'female' ? 20 : 25) && "Cinsel memnuniyetiniz düşük düzeyde. Profesyonel destek almayı düşünebilirsiniz."}
                  {totalScore > (gender === 'female' ? 20 : 25) && totalScore <= (gender === 'female' ? 40 : 50) && "Cinsel memnuniyetiniz orta düzeyde. İlişkinizi geliştirmek için çaba gösterebilirsiniz."}
                  {totalScore > (gender === 'female' ? 40 : 50) && totalScore <= (gender === 'female' ? 60 : 75) && "Cinsel memnuniyetiniz iyi düzeyde. Sağlıklı bir cinsel yaşamınız var."}
                  {totalScore > (gender === 'female' ? 60 : 75) && "Cinsel memnuniyetiniz yüksek düzeyde. Mükemmel bir cinsel yaşamınız var."}
                </p>
              </div>

              <div className="bg-white/80 rounded-2xl p-6 border-2 border-green-200/50">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Öneriler</h3>
                <ul className="text-gray-700 space-y-2">
                  <li>• Partnerinizle açık iletişim kurun</li>
                  <li>• Cinsel sağlık konusunda bilgi edinin</li>
                  <li>• Gerekirse profesyonel destek alın</li>
                  <li>• İlişkinizi güçlendirmek için çaba gösterin</li>
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
              <span className="text-3xl">💕</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Golombok Cinsel Memnuniyet Ölçeği
            </h1>
            <p className="text-gray-600 text-lg">
              Cinsel sağlığınızı değerlendirin
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Soru {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                %{Math.round(((currentQuestion + 1) / questions.length) * 100)}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6 leading-relaxed">
              {questions[currentQuestion].question}
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
              {answers.filter(a => a !== null).length} / {questions.length} cevaplandı
            </div>

            {currentQuestion < questions.length - 1 ? (
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