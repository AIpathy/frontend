import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";


const ChevronDownIcon = ({ isOpen }) => (
  <div className={`text-2xl transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`}>
    ⌄
  </div>
);

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const questions = [
  {
    question: "AIpathy testi yaptıktan sonra nasıl sonuç alırım?",
    answer: "Test tamamlandıktan sonra sonuç grafiğiniz otomatik olarak görüntülenir. Detaylı analiz raporunuz e-posta adresinize de gönderilir. Ayrıca profil sayfanızdan geçmiş test sonuçlarınıza da erişebilirsiniz.",
    icon: "🌱",
    category: "test",
    tags: ["sonuç", "rapor", "grafik"]
  },
  {
    question: "AIpathy testleri ücretsiz mi?",
    answer: "AIpathy testleri tamamen ücretsizdir ve dilediğiniz kadar kullanabilirsiniz. Premium özellikler için gelecekte farklı planlar sunulacaktır ancak temel testler her zaman ücretsiz kalacaktır.",
    icon: "🍃",
    category: "pricing",
    tags: ["ücret", "bedava", "premium"]
  },
  {
    question: "AIpathy'de verilerim güvende mi?",
    answer: "Tüm verileriniz GDPR uyumlu şekilde şifrelenmiş olarak saklanır. Kişisel bilgileriniz hiçbir şekilde üçüncü taraflarla paylaşılmaz. AIpathy'de gizliliğiniz bizim önceliğimizdir.",
    icon: "🛡️",
    category: "security",
    tags: ["güvenlik", "gizlilik", "veri"]
  },
  {
    question: "AIpathy sesli analiz özelliği nasıl çalışır?",
    answer: "Sesli analizde, konuşmanızdan alınan veriler yapay zeka modelimizle değerlendirilir. Ses tonu, konuşma hızı, duraklama süresi ve kelime seçimleri analiz edilir. Mikrofon izni vermeniz yeterlidir.",
    icon: "🎋",
    category: "features",
    tags: ["ses", "analiz", "mikrofon"]
  },
  {
    question: "AIpathy'de kaç farklı test türü mevcut?",
    answer: "Şu anda sesli analiz, mimik analizi, yazılı değerlendirme, davranış analizi ve sosyal etkileşim testi olmak üzere 5 ana test türümüz bulunmaktadır. Her ay yeni test türleri eklenmektedir.",
    icon: "🌿",
    category: "features",
    tags: ["test türü", "özellik", "analiz"]
  },
  {
    question: "AIpathy sonuçlarım ne kadar doğru?",
    answer: "AI modelimiz %94 doğruluk oranıyla çalışmaktadır ve sürekli geliştirilmektedir. Ancak sonuçlar kişisel değerlendirme amaçlıdır ve profesyonel tıbbi teşhis yerine geçmez. Ciddi durumlar için mutlaka uzmana başvurun.",
    icon: "🌳",
    category: "accuracy",
    tags: ["doğruluk", "güvenilirlik", "tıbbi"]
  },
  {
    question: "AIpathy test sonuçlarımı nasıl yorumlamalıyım?",
    answer: "Her test sonucu detaylı açıklamalar ve önerilerle birlikte gelir. Renkli grafikler ve yüzdelik dilimler sonuçları anlamanızı kolaylaştırır. Ayrıca AI asistanımız size kişiselleştirilmiş öneriler sunar.",
    icon: "🌲",
    category: "results",
    tags: ["yorum", "grafik", "öneri"]
  },
  {
    question: "AIpathy testimi kaç kez tekrarlayabilirim?",
    answer: "Testleri istediğiniz kadar tekrarlayabilirsiniz. Hatta düzenli aralıklarla test yapmanızı öneririz çünkü bu sayede duygusal durumunuzdaki değişimleri takip edebilirsiniz. Minimum 24 saat ara vermenizi tavsiye ederiz.",
    icon: "🔄",
    category: "usage",
    tags: ["tekrar", "sıklık", "takip"]
  },
  {
    question: "AIpathy'nin mobil uygulaması var mı?",
    answer: "Evet! iOS ve Android için optimize edilmiş mobil uygulamamız mevcuttur. Web versiyonunun tüm özelliklerine ek olarak push bildirimleri ve offline test yapma imkanı sunuyoruz.",
    icon: "🌾",
    category: "platform",
    tags: ["mobil", "uygulama", "ios", "android"]
  },
  {
    question: "AIpathy hangi yaş grupları için uygun?",
    answer: "AIpathy testleri 16 yaş ve üzeri kullanıcılar için tasarlanmıştır. 16-18 yaş arası kullanıcılar için ebeveyn onayı gereklidir. Çocuklar için özel bir sürüm geliştirilmektedir.",
    icon: "🌺",
    category: "age",
    tags: ["yaş", "çocuk", "yetişkin"]
  },
  {
    question: "AIpathy'de teknik sorun yaşarsam ne yapmalıyım?",
    answer: "Teknik sorunlar durumunda sayfayı yenilemeyi deneyin. Sorun devam ederse 7/24 canlı destek hattımızdan yardım alabilirsiniz. Test verileriniz otomatik olarak kaydedilir, kaldığınız yerden devam edebilirsiniz.",
    icon: "🛠️",
    category: "support",
    tags: ["teknik", "sorun", "destek"]
  },
  {
    question: "AIpathy sonuçlarımı sosyal medyada paylaşabilir miyim?",
    answer: "Evet! Kişisel bilgileriniz gizlenerek, sadece genel sonuç grafiğinizi sosyal medyada paylaşabilirsiniz. Paylaşım öncesi önizleme yaparak neyin görüneceğini kontrol edebilirsiniz.",
    icon: "🌸",
    category: "sharing",
    tags: ["paylaşım", "sosyal medya", "gizlilik"]
  }
];

const categories = [
  { id: "all", label: "Tümü", icon: "🌍" },
  { id: "test", label: "Test İşlemleri", icon: "🌱" },
  { id: "features", label: "Özellikler", icon: "🌿" },
  { id: "security", label: "Güvenlik", icon: "🛡️" },
  { id: "results", label: "Sonuçlar", icon: "🌳" },
  { id: "support", label: "Destek", icon: "🌲" }
];

function Faq() {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredQuestions, setFilteredQuestions] = useState(questions);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    let filtered = questions;

    if (selectedCategory !== "all") {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(q =>
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredQuestions(filtered);
    setOpenIndex(null);
  }, [searchTerm, selectedCategory]);

  return (
    <section className="w-full bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-24 px-6 relative overflow-hidden">

      {/* Animated Forest Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large floating elements */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-emerald-400/15 to-green-600/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-forest-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-green-400/10 to-teal-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>

        {/* Animated leaves */}
        <div className="absolute top-20 left-1/4 w-4 h-4 text-green-500/40 animate-bounce delay-300 text-2xl">🍃</div>
        <div className="absolute top-40 right-1/3 w-4 h-4 text-emerald-500/40 animate-bounce delay-700 text-2xl">🌿</div>
        <div className="absolute bottom-32 left-1/3 w-4 h-4 text-green-600/40 animate-bounce delay-1000 text-2xl">🌱</div>
        <div className="absolute top-60 left-1/2 w-4 h-4 text-teal-500/40 animate-bounce delay-1500 text-2xl">🌲</div>

        {/* Floating particles */}
        <div className="absolute top-32 right-1/5 w-2 h-2 bg-emerald-400/30 rounded-full animate-float"></div>
        <div className="absolute bottom-40 right-2/3 w-3 h-3 bg-green-500/30 rounded-full animate-float delay-1000"></div>
        <div className="absolute top-3/4 left-1/5 w-2 h-2 bg-teal-400/30 rounded-full animate-float delay-500"></div>
      </div>

      <div className="min-h-screen bg-gray-50">
        <div className="relative pt-8 pb-16 z-10">
          <div className="max-w-7xl mx-auto px-6">
            <button
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/90 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border border-emerald-200 hover:border-emerald-300 overflow-hidden animate-bounce-subtle"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              <ArrowLeft className="w-6 h-6 text-emerald-700 group-hover:-translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10 animate-wiggle" />
              <span className="font-semibold text-gray-800 relative z-10 group-hover:text-emerald-800 transition-colors">
                Ana Sayfaya Dön
              </span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            </button>
          </div>
        </div>



        {/* Header Section */}
        <div className="text-center mb-16 space-y-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md rounded-full border-2 border-emerald-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
            <div className="text-2xl animate-spin-slow">🌿</div>
            <span className="text-green-800 font-bold text-sm tracking-wide">AIpathy - SIKÇA SORULAN SORULAR</span>
          </div>

          <h2 className="text-6xl md:text-7xl font-bold text-green-900 leading-tight">
            Soru{" "}
            <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 animate-gradient-x">
              Bankası
              <div className="absolute -bottom-3 left-0 right-0 h-2 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full opacity-70 animate-pulse"></div>
            </span>
          </h2>

          <p className="text-green-700 text-xl max-w-3xl mx-auto leading-relaxed">
            AIpathy ile duygusal zekanızı keşfedin. Doğanın huzuru eşliğinde
            sorularınızın cevaplarını bulun ve iç dünyanızı keşfetmeye başlayın.
          </p>

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon />
              </div>
              <input
                type="text"
                placeholder="Orman derinliklerinde arayın..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/90 backdrop-blur-sm border-2 border-emerald-200/50 rounded-2xl shadow-xl focus:ring-4 focus:ring-emerald-300/50 focus:border-emerald-400/70 transition-all duration-500 text-green-800 placeholder-green-500 group-hover:shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-100/20 to-green-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-full border-2 transition-all duration-500 hover:scale-110 hover:rotate-2 ${selectedCategory === category.id
                      ? "bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white border-transparent shadow-xl shadow-green-300/50"
                      : "bg-white/70 text-green-700 border-emerald-200/50 hover:bg-white/90 hover:border-emerald-300/70 shadow-lg"
                    }`}
                >
                  <span className="text-lg animate-bounce">{category.icon}</span>
                  <span className="font-semibold text-sm">{category.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Items */}
        <div className="max-w-5xl mx-auto space-y-6">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-8xl mb-6 animate-bounce">🌲</div>
              <h3 className="text-2xl font-bold text-green-800 mb-4">Orman sessizliğe gömülmüş</h3>
              <p className="text-green-600 text-lg">Arama kriterlerinizi değiştirerek yeni yollar keşfedin.</p>
            </div>
          ) : (
            filteredQuestions.map((q, index) => (
              <div
                key={index}
                className={`group relative bg-white/90 backdrop-blur-lg rounded-3xl border-2 transition-all duration-700 shadow-xl hover:shadow-2xl overflow-hidden ${openIndex === index
                    ? "border-emerald-400/80 shadow-emerald-200/50 scale-105 bg-gradient-to-r from-white/95 to-emerald-50/95"
                    : "border-emerald-200/50 hover:border-emerald-300/70 hover:scale-102"
                  }`}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  animation: 'fadeInUp 0.8s ease-out forwards'
                }}
              >

                {/* Animated background overlay */}
                <div className={`absolute inset-0 bg-gradient-to-r from-emerald-100/30 via-green-100/30 to-teal-100/30 transition-all duration-700 ${openIndex === index ? "opacity-100 animate-pulse" : "opacity-0"
                  }`}></div>

                {/* Floating nature elements */}
                <div className={`absolute top-4 right-4 text-2xl transition-all duration-500 ${openIndex === index ? "animate-spin-slow" : "group-hover:animate-bounce"
                  }`}>
                  🌿
                </div>

                {/* Question Header */}
                <button
                  onClick={() => toggle(index)}
                  className="relative z-10 flex justify-between items-center w-full text-left p-8 group-hover:bg-white/50 transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-5 rounded-3xl bg-gradient-to-br from-emerald-500 via-green-500 to-teal-500 text-white shadow-2xl transition-all duration-500 ${openIndex === index ? "scale-125 rotate-12 shadow-emerald-300/50" : "group-hover:scale-110 group-hover:-rotate-6"
                      }`}>
                      <span className="text-3xl filter drop-shadow-lg">{q.icon}</span>
                    </div>
                    <span className="text-green-900 font-bold text-xl md:text-2xl leading-relaxed pr-4">
                      {q.question}
                    </span>
                  </div>

                  <div className={`p-4 rounded-full transition-all duration-500 ${openIndex === index
                      ? "bg-emerald-500 text-white shadow-xl shadow-emerald-300/50 scale-110"
                      : "bg-emerald-100 text-green-700 group-hover:bg-emerald-200 group-hover:scale-125"
                    }`}>
                    <ChevronDownIcon isOpen={openIndex === index} />
                  </div>
                </button>

                {/* Answer Content */}
                <div className={`relative z-10 overflow-hidden transition-all duration-800 ease-in-out ${openIndex === index
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                  }`}>
                  <div className="px-8 pb-10">
                    <div className="ml-24 pl-8 border-l-4 border-gradient-to-b from-emerald-400 to-green-500 relative">
                      <div className="absolute -left-2.5 top-0 w-5 h-5 bg-emerald-400 rounded-full animate-pulse shadow-lg"></div>
                      <div className="absolute -left-1.5 top-2 w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>

                      <p className="text-green-800 leading-relaxed text-lg mb-6 font-medium">
                        {q.answer}
                      </p>

                      <div className="flex flex-wrap gap-3">
                        {q.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-4 py-2 bg-gradient-to-r from-emerald-100 to-green-100 text-green-700 text-sm font-semibold rounded-full border-2 border-emerald-200/50 hover:scale-105 transition-transform duration-300 shadow-lg"
                          >
                            🌱 #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative animated dots */}
                <div className="absolute bottom-4 right-4 opacity-40">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-200"></div>
                    <div className="w-3 h-3 bg-teal-400 rounded-full animate-pulse delay-400"></div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-24">
          <div className="inline-flex flex-col items-center gap-8 p-10 bg-white/90 backdrop-blur-lg rounded-3xl border-2 border-emerald-200/50 shadow-2xl hover:shadow-3xl transition-all duration-700 hover:scale-105 relative overflow-hidden">

            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/50 to-green-50/50 animate-pulse"></div>

            <div className="relative z-10 text-6xl animate-bounce">🌳</div>
            <div className="relative z-10 space-y-3">
              <h3 className="text-green-900 font-bold text-2xl">
                AIpathy Ormanında Kayboldum?
              </h3>
              <p className="text-green-700 text-lg">
                Rehber ekibimiz size yol göstermeye hazır 🧭
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-6">
              <button className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 font-bold text-lg hover:-rotate-2">
                <span className="text-2xl animate-bounce">💬</span>
                <span>Canlı Rehber</span>
              </button>
              <button className="inline-flex items-center gap-4 px-8 py-4 bg-white border-3 border-emerald-400 text-emerald-600 rounded-full shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-110 font-bold text-lg hover:bg-emerald-500 hover:text-white hover:rotate-2">
                <span className="text-2xl animate-bounce delay-300">📧</span>
                <span>Mesaj Gönder</span>
              </button>
            </div>

            {/* Floating elements around CTA */}
            <div className="absolute -top-2 -left-2 text-2xl animate-bounce delay-500">🌿</div>
            <div className="absolute -top-2 -right-2 text-2xl animate-bounce delay-700">🍃</div>
            <div className="absolute -bottom-2 -left-2 text-2xl animate-bounce delay-1000">🌱</div>
            <div className="absolute -bottom-2 -right-2 text-2xl animate-bounce delay-1200">🌲</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
          background-size: 200% 200%;
        }
        
        .border-l-4 {
          border-left-width: 4px;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .scale-102 {
          transform: scale(1.02);
        }
        
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
      `}</style>
    </section >
  );
}

export default Faq;