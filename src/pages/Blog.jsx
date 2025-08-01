import React, { useState, useEffect } from "react";
import { Search, Calendar, Clock, ArrowRight, Heart, Brain, Users, Lightbulb, Shield, Star, Home, ChevronUp, ArrowLeft } from "lucide-react";

const sampleArticles = [
  // Anksiyete 
  {
    id: "1",
    title: "Anksiyete ile Baş Etme: 7 Etkili Teknik",
    category: "Anksiyete",
    summary: "Günlük yaşamda anksiyeteyi yönetmek için kanıtlanmış stratejiler ve nefes teknikleri.",
    content: "Anksiyete modern yaşamın kaçınılmaz bir parçası haline geldi. Bu yazımızda, günlük yaşamda anksiyeteyi yönetmek için kanıtlanmış 7 etkili tekniği detaylı olarak inceliyoruz. Nefes teknikleri, mindfulness uygulamaları ve bilişsel davranışçı terapi yaklaşımları ile anksiyetenizi kontrol altına alabilirsiniz. Uzmanlarımızın önerdiği bu stratejiler, binlerce kişi tarafından başarıyla uygulanmıştır.",
    date: "2025-07-29",
    readTime: "5 dk",
    featured: true,
    author: "Dr. Ayşe Demir",
    tags: ["mindfulness", "nefes teknikleri", "stres yönetimi"]
  },
  {
    id: "2",
    title: "Sosyal Anksiyete: Sebepleri ve Çözümleri",
    category: "Anksiyete",
    summary: "Sosyal ortamlarda yaşanan kaygının altında yatan nedenler ve başa çıkma yolları.",
    content: "Sosyal anksiyete, insanların sosyal durumlardan kaçınmasına neden olan yaygın bir durumdur. Bu makalede, sosyal anksiyetenin kök nedenlerini ve etkili tedavi yöntemlerini ele alıyoruz. Uzmanlarımızın önerileri doğrultusunda hazırlanan praktik çözümler ile sosyal hayatınızı yeniden kazanabilirsiniz.",
    date: "2025-07-25",
    readTime: "7 dk",
    featured: false,
    author: "Psikolog Mehmet Kaya",
    tags: ["sosyal fobi", "özgüven", "iletişim"]
  },
  {
    id: "3",
    title: "Panik Atak Sırasında Ne Yapmalı?",
    category: "Anksiyete",
    summary: "Panik atak anında uygulanabilecek acil müdahale teknikleri ve önleme stratejileri.",
    content: "Panik atak yaşayan kişiler için hayat kurtarıcı olabilecek teknikler. Ani korku ve endişe dalgasının üstesinden gelmek için uygulanabilecek acil müdahale yöntemleri ve uzun vadeli önleme stratejileri hakkında detaylı bilgiler.",
    date: "2025-07-20",
    readTime: "4 dk",
    featured: false,
    author: "Dr. Zeynep Özkan",
    tags: ["panik atak", "acil müdahale", "sakinleşme"]
  },
  {
    id: "4",
    title: "Genel Anksiyete Bozukluğu Belirtileri",
    category: "Anksiyete",
    summary: "GAB'ın tanı kriterleri, belirtileri ve tedavi seçenekleri hakkında kapsamlı bilgi.",
    content: "Genel Anksiyete Bozukluğu (GAB) sürekli endişe halini ifade eder. Bu yazımızda GAB'ın tanı kriterleri, belirtileri ve modern tedavi yaklaşımları hakkında kapsamlı bilgiler sunuyoruz.",
    date: "2025-07-15",
    readTime: "6 dk",
    featured: false,
    author: "Prof. Dr. Ali Vural",
    tags: ["GAB", "tanı", "tedavi"]
  },
  {
    id: "5",
    title: "Anksiyete ve Uyku İlişkisi",
    category: "Anksiyete",
    summary: "Anksiyetenin uyku kalitesine etkisi ve uyku hijyeni ile anksiyeteyi azaltma yolları.",
    content: "Anksiyete ve uyku bozuklukları sıklıkla bir arada görülür. Kaliteli uykunun anksiyete üzerindeki olumlu etkilerini ve uyku hijyeni kurallarını detaylı olarak inceliyoruz.",
    date: "2025-07-10",
    readTime: "5 dk",
    featured: false,
    author: "Dr. Fatma Sezen",
    tags: ["uyku", "hijyen", "rahatlama"]
  },

  // Depresyon 
  {
    id: "6",
    title: "Depresyonun Erken Uyarı İşaretleri",
    category: "Depresyon",
    summary: "Depresyonu erken dönemde fark etmek için dikkat edilmesi gereken belirtiler.",
    content: "Depresyon sessizce gelişen ve yaşam kalitesini ciddi şekilde etkileyen bir durumdur. Erken tanı ve müdahale, tedavi sürecinde kritik önem taşır. Bu yazımızda depresyonun erken uyarı işaretlerini ve fark edilmesi gereken değişiklikleri detaylı olarak ele alıyoruz.",
    date: "2025-07-28",
    readTime: "6 dk",
    featured: true,
    author: "Dr. Emre Yılmaz",
    tags: ["erken tanı", "belirtiler", "farkındalık"]
  },
  {
    id: "7",
    title: "Mevsimsel Depresyon ve Işık Terapisi",
    category: "Depresyon",
    summary: "Kış aylarında artan depresif belirtiler ve doğal ışığın ruh hali üzerindeki etkisi.",
    content: "Mevsimsel Affektif Bozukluk (SAD) özellikle kış aylarında görülür. Işık terapisi ve doğal çözümler ile mevsimsel depresyonun üstesinden gelme yolları.",
    date: "2025-07-22",
    readTime: "5 dk",
    featured: false,
    author: "Psikolog Selin Arslan",
    tags: ["mevsimsel", "ışık terapisi", "vitamin D"]
  },
  {
    id: "8",
    title: "Postpartum Depresyon: Anne Olmanın Gölgesi",
    category: "Depresyon",
    summary: "Doğum sonrası depresyon belirtileri, nedenleri ve tedavi yaklaşımları.",
    content: "Doğum sonrası depresyon, yeni annelerin yaşayabileceği ciddi bir durumdur. Bu makalede postpartum depresyonun belirtileri, risk faktörleri ve etkili tedavi seçeneklerini inceliyoruz.",
    date: "2025-07-18",
    readTime: "8 dk",
    featured: false,
    author: "Dr. Aylin Koc",
    tags: ["postpartum", "annelik", "destek"]
  },
  {
    id: "9",
    title: "Depresyon ve Beslenme İlişkisi",
    category: "Depresyon",
    summary: "Beslenme alışkanlıklarının ruh hali üzerindeki etkisi ve iyileştirici besinler.",
    content: "Beslenme ile ruh hali arasında güçlü bir bağlantı bulunmaktadır. Doğru beslenme alışkanlıkları ile depresif belirtileri azaltmak ve genel sağlığı iyileştirmek mümkündür.",
    date: "2025-07-12",
    readTime: "7 dk",
    featured: false,
    author: "Diyetisyen Merve Tan",
    tags: ["beslenme", "serotonin", "sağlıklı yaşam"]
  },
  {
    id: "10",
    title: "Genç Yetişkinlerde Depresyon",
    category: "Depresyon",
    summary: "18-25 yaş aralığındaki bireylerde depresyon belirtileri ve başa çıkma stratejileri.",
    content: "Genç yetişkinlik dönemi birçok değişim ve stres faktörü içerir. Bu kritik dönemde depresyonla başa çıkma stratejileri ve destek alma yolları.",
    date: "2025-07-08",
    readTime: "6 dk",
    featured: false,
    author: "Psikolog Burak Eren",
    tags: ["genç yetişkin", "üniversite", "kariyer stresi"]
  },

  // Teknoloji ve Psikoloji 
  {
    id: "11",
    title: "Yapay Zeka Destekli Terapi: Geleceğin Tedavisi",
    category: "Teknoloji",
    summary: "AI teknolojisinin psikolojik tedavilerde kullanımı ve dijital terapinin avantajları.",
    content: "Yapay zeka teknolojisi, psikolojik destek alanında devrim yaratıyor. Dijital terapi platformları ve AI destekli tedavi yöntemlerinin geleceği ve etkinliği hakkında kapsamlı bir inceleme.",
    date: "2025-07-26",
    readTime: "8 dk",
    featured: true,
    author: "Dr. Tech. Cem Özdemir",
    tags: ["yapay zeka", "dijital terapi", "teknoloji"]
  },
  {
    id: "12",
    title: "Sosyal Medya ve Ruh Sağlığı",
    category: "Teknoloji",
    summary: "Sosyal medya kullanımının mental sağlık üzerindeki pozitif ve negatif etkileri.",
    content: "Sosyal medya platformları günlük yaşamımızın ayrılmaz parçası haline geldi. Bu yazımızda sosyal medyanın ruh sağlığı üzerindeki etkilerini ve sağlıklı kullanım stratejilerini ele alıyoruz.",
    date: "2025-07-19",
    readTime: "6 dk",
    featured: false,
    author: "Psikolog Deniz Yurt",
    tags: ["sosyal medya", "dijital detoks", "kıyaslama"]
  },
  {
    id: "13",
    title: "Online Terapi vs Yüz Yüze Terapi",
    category: "Teknoloji",
    summary: "Dijital terapinin geleneksel terapiye kıyasla avantaj ve dezavantajları.",
    content: "Pandemi ile birlikte online terapi seçenekleri yaygınlaştı. Online ve yüz yüze terapi seçeneklerinin karşılaştırmalı analizi ve hangisinin size uygun olduğunu belirleme yolları.",
    date: "2025-07-14",
    readTime: "7 dk",
    featured: false,
    author: "Dr. Özlem Kara",
    tags: ["online terapi", "erişilebilirlik", "etkililik"]
  },
  {
    id: "14",
    title: "Mental Sağlık Uygulamaları Rehberi",
    category: "Teknoloji",
    summary: "Ruh sağlığını destekleyen mobil uygulamalar ve seçim kriterleri.",
    content: "Akıllı telefonlar üzerinden mental sağlık desteği almak mümkün. En etkili mental sağlık uygulamaları ve seçim yaparken dikkat edilmesi gereken kriterler.",
    date: "2025-07-05",
    readTime: "5 dk",
    featured: false,
    author: "Yazılım Uzmanı Kerem Bal",
    tags: ["mobil uygulama", "self-help", "dijital sağlık"]
  },

  // Stres Yönetimi 
  {
    id: "15",
    title: "İş Stresi ile Başa Çıkma Stratejileri",
    category: "Stres Yönetimi",
    summary: "Çalışma hayatında karşılaşılan stres faktörleri ve etkili yönetim teknikleri.",
    content: "İş hayatında stres kaçınılmaz bir realite, ancak yönetilebilir. Çalışma ortamında stres kaynaklarını belirleme ve etkili başa çıkma stratejileri ile iş-yaşam dengesini kurma yolları.",
    date: "2025-07-24",
    readTime: "6 dk",
    featured: false,
    author: "İş Psikologu Nalan Sur",
    tags: ["iş stresi", "work-life balance", "verimlilik"]
  },
  {
    id: "16",
    title: "Mindfulness ve Meditasyon Rehberi",
    category: "Stres Yönetimi",
    summary: "Farkındalık temelli yaşam ve meditasyon pratiğinin stress azaltıcı etkisi.",
    content: "Mindfulness, şimdiki ana odaklanma sanatıdır. Meditasyon ve farkındalık pratikleri ile stresi azaltma ve yaşam kalitesini artırma teknikleri.",
    date: "2025-07-16",
    readTime: "5 dk",
    featured: false,
    author: "Meditasyon Eğitmeni Ayşe Gül",
    tags: ["mindfulness", "meditasyon", "farkındalık"]
  },
  {
    id: "17",
    title: "Kronik Stresin Vücut Üzerindeki Etkileri",
    category: "Stres Yönetimi",
    summary: "Uzun süreli stresin fiziksel ve mental sağlık üzerindeki olumsuz sonuçları.",
    content: "Kronik stres, vücudumuzun alarm sisteminin sürekli aktif kalması demektir. Bu yazımızda kronik stresin vücut ve zihin üzerindeki etkilerini ve korunma yollarını inceliyoruz.",
    date: "2025-07-11",
    readTime: "7 dk",
    featured: false,
    author: "Dr. Hasan Yılmaz",
    tags: ["kronik stres", "fiziksel sağlık", "kortizol"]
  },

  // İlişkiler ve İletişim 
  {
    id: "18",
    title: "Sağlıklı İlişkilerin Temelleri",
    category: "İlişkiler",
    summary: "Romantik ilişkilerde güven, iletişim ve karşılıklı saygının önemi.",
    content: "Sağlıklı ilişkiler, her iki tarafın da mutlu olduğu dengeli bağlardır. İlişkilerde güven inşası, etkili iletişim ve karşılıklı saygının nasıl geliştirileceği hakkında uzman önerileri.",
    date: "2025-07-21",
    readTime: "8 dk",
    featured: false,
    author: "Çift Terapisti Dr. Elif Ay",
    tags: ["ilişkiler", "iletişim", "güven"]
  },
  {
    id: "19",
    title: "Çocuklarla Etkili İletişim",
    category: "İlişkiler",
    summary: "Farklı yaş gruplarındaki çocuklarla sağlıklı iletişim kurma yöntemleri.",
    content: "Çocuklarla kurulan iletişim, onların gelişimini doğrudan etkiler. Yaş gruplarına göre etkili iletişim stratejileri ve sağlıklı ebeveyn-çocuk ilişkisi kurma yolları.",
    date: "2025-07-13",
    readTime: "6 dk",
    featured: false,
    author: "Çocuk Psikologu Dr. Murat Öz",
    tags: ["çocuk psikolojisi", "ebeveynlik", "iletişim"]
  },
  {
    id: "20",
    title: "Sınırları Koruma Sanatı",
    category: "İlişkiler",
    summary: "Kişisel sınırların belirlenmesi ve korunmasının mental sağlık üzerindeki etkisi.",
    content: "Sağlıklı sınırlar, kişisel refahımızın temel taşlarından biridir. Kişisel sınırları belirleme, koruma ve başkalarına iletme konusunda pratik rehber.",
    date: "2025-07-07",
    readTime: "5 dk",
    featured: false,
    author: "Terapist Gizem Kul",
    tags: ["kişisel sınırlar", "self-care", "özgüven"]
  }
];

function Blog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hepsi");
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ["Hepsi", ...new Set(sampleArticles.map((a) => a.category))];

  const filtered = sampleArticles.filter((a) => {
    const matchesCategory = selectedCategory === "Hepsi" || a.category === selectedCategory;
    const matchesSearch = a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase()) ||
      a.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredArticles = sampleArticles.filter(article => article.featured);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Anksiyete': return <Heart className="w-4 h-4" />;
      case 'Depresyon': return <Brain className="w-4 h-4" />;
      case 'Teknoloji': return <Lightbulb className="w-4 h-4" />;
      case 'Stres Yönetimi': return <Shield className="w-4 h-4" />;
      case 'İlişkiler': return <Users className="w-4 h-4" />;
      default: return <Star className="w-4 h-4" />;
    }
  };

  const handleArticleClick = (article) => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedArticle(article);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const handleBackToHome = () => {
    setIsLoading(true);
    setTimeout(() => {
      setSelectedArticle(null);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 200);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-emerald-700 font-medium animate-pulse">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (selectedArticle) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 animate-fade-in">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="flex gap-4 mb-8 animate-slide-down">
            <button
              onClick={handleBackToHome}
              className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-sm text-emerald-800 border border-emerald-200 rounded-xl hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-300 shadow-sm hover:shadow-md group transform hover:scale-105"
            >
              <Home className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Ana Sayfa
            </button>
            <button
              onClick={() => setSelectedArticle(null)}
              className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md group transform hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              Blog Listesi
            </button>
          </div>

          <article className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-emerald-100 p-8 animate-slide-up">
            <div className="flex items-center gap-2 text-emerald-700 mb-6 animate-slide-left">
              {getCategoryIcon(selectedArticle.category)}
              <span className="text-sm font-semibold bg-emerald-100 px-3 py-1 rounded-full">
                {selectedArticle.category}
              </span>
            </div>

            <h1 className="text-4xl font-bold text-green-800 mb-6 leading-tight animate-slide-right">
              {selectedArticle.title}
            </h1>

            <div className="flex items-center gap-6 text-sm text-emerald-700 mb-8 animate-fade-in-delayed">
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                <Calendar className="w-4 h-4" />
                {selectedArticle.date}
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 px-3 py-2 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                <Clock className="w-4 h-4" />
                {selectedArticle.readTime} okuma
              </div>
              <div className="font-semibold text-green-900 bg-green-100 px-4 py-2 rounded-full shadow-sm border border-green-200 hover:bg-green-200 transition-colors duration-300">
                {selectedArticle.author}
              </div>
            </div>

            <div className="text-xl text-emerald-900 mb-8 leading-relaxed bg-gradient-to-br from-emerald-100 to-green-50 p-6 rounded-xl border-l-4 border-emerald-500 shadow-sm animate-slide-up-delayed">
              {selectedArticle.summary}
            </div>

            <div className="prose prose-lg max-w-none text-emerald-900 leading-relaxed animate-fade-in-slow">
              <p className="text-lg mb-6">{selectedArticle.content}</p>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 my-8 hover:bg-green-100 transition-colors duration-300">
                <p className="text-green-800 italic">
                  Bu makale sürekli güncellenmekte olup, en güncel bilgiler için uzman desteği almanız önerilir.
                  Kişisel durumunuz için mutlaka bir sağlık profesyoneli ile görüşünüz.
                </p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-emerald-200 animate-slide-up-slow">
              <h3 className="text-lg font-semibold text-emerald-800 mb-4">Etiketler</h3>
              <div className="flex flex-wrap gap-3">
                {selectedArticle.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-emerald-100 text-emerald-800 text-sm rounded-full border border-emerald-200 hover:bg-emerald-200 hover:text-emerald-900 transition-all duration-300 cursor-pointer transform hover:scale-105 animate-bounce-gentle"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Back Button */}
        <div className="relative pt-8 pb-16 z-10 animate-slide-down">
          <div className="max-w-7xl mx-auto px-6">
            <button
              onClick={() => window.history.back()}
              className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/95 backdrop-blur-xl rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 border border-emerald-200 hover:border-emerald-300 overflow-hidden animate-bounce-subtle transform hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-green-500/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></div>
              <ArrowLeft className="w-6 h-6 text-emerald-700 group-hover:-translate-x-2 group-hover:scale-110 transition-all duration-300 relative z-10" />
              <span className="font-semibold text-gray-800 relative z-10 group-hover:text-emerald-800 transition-colors">Ana Sayfaya Dön</span>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></div>
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight text-center">
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-text-shimmer">
              Mental
            </span>
            <br />
            <span className="bg-gradient-to-r from-emerald-600 via-green-500 to-teal-600 bg-clip-text text-transparent animate-pulse">
              Sağlık
            </span>
            <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent animate-text-shimmer">
              {" "}Blog
            </span>
          </h1>

          <p className="text-xl text-emerald-700 max-w-3xl mx-auto leading-relaxed animate-fade-in-delayed">
            Uzmanlarımızdan mental sağlık, kişisel gelişim ve yaşam kalitesi hakkında
            <span className="font-semibold text-emerald-800"> güncel ve bilimsel bilgiler</span>
          </p>
          <div className="mt-8 h-1 w-24 bg-gradient-to-r from-emerald-500 to-green-500 mx-auto rounded-full animate-width-expand"></div>
        </div>

        {/* Öne Çıkan Makaleler */}
        {selectedCategory === "Hepsi" && (
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-emerald-800 mb-8 flex items-center gap-3 animate-slide-left">
              <Star className="w-8 h-8 text-amber-500 fill-current animate-spin-slow" />
              Öne Çıkan Makaleler
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="group bg-gradient-to-br from-white/95 to-emerald-50/95 backdrop-blur-sm border-2 border-emerald-200 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer transform hover:-translate-y-2 animate-slide-up-stagger hover:border-emerald-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => handleArticleClick(article)}
                >
                  <div className="flex items-center gap-3 text-emerald-700 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-300 group-hover:scale-110 transform">
                      {getCategoryIcon(article.category)}
                    </div>
                    <span className="text-sm font-semibold">{article.category}</span>
                    <div className="ml-auto p-1 bg-amber-100 rounded-full animate-pulse">
                      <Star className="w-4 h-4 fill-current text-amber-500" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-emerald-700 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between text-xs text-emerald-600 mb-4">
                    <span className="font-medium bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors duration-300">{article.author}</span>
                    <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors duration-300">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {article.tags.slice(0, 2).map((tag, tagIndex) => (
                        <span key={tagIndex} className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full hover:bg-emerald-200 transition-colors duration-300">
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Arama ve Filtreler */}
        <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="relative mb-8">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-500 w-5 h-5 animate-pulse" />
            <input
              type="text"
              placeholder="Makale, yazar veya etiket ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-6 py-4 border-2 border-emerald-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-emerald-200 focus:border-emerald-400 bg-white/90 backdrop-blur-sm text-emerald-800 placeholder-emerald-500 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
            />
          </div>

          <div className="flex flex-wrap gap-4">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 text-sm font-semibold transition-all duration-300 transform hover:-translate-y-1 animate-slide-up-stagger ${selectedCategory === cat
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-lg hover:bg-emerald-700 hover:shadow-xl scale-105"
                  : "bg-white/90 backdrop-blur-sm text-emerald-700 border-emerald-300 hover:bg-emerald-50 hover:border-emerald-400 shadow-sm hover:shadow-md"
                  }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {cat !== "Hepsi" && getCategoryIcon(cat)}
                {cat} ({cat === "Hepsi" ? sampleArticles.length : sampleArticles.filter(a => a.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        {/* Makale Listesi */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          {filtered.map((article, index) => (
            <div
              key={article.id}
              className="group bg-white/95 backdrop-blur-sm border border-emerald-200 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer transform hover:-translate-y-1 animate-slide-up-stagger hover:border-emerald-300"
              style={{ animationDelay: `${index * 0.05}s` }}
              onClick={() => handleArticleClick(article)}
            >
              <div className="flex items-center gap-3 text-emerald-700 mb-4">
                <div className="p-2 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors duration-300 group-hover:scale-110 transform">
                  {getCategoryIcon(article.category)}
                </div>
                <span className="text-sm font-semibold">{article.category}</span>
                {article.featured && (
                  <div className="ml-auto p-1 bg-amber-100 rounded-full animate-pulse">
                    <Star className="w-4 h-4 fill-current text-amber-500" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-emerald-800 mb-3 group-hover:text-emerald-600 transition-colors duration-300 line-clamp-2">
                {article.title}
              </h3>

              <p className="text-emerald-700 text-sm mb-6 line-clamp-3 leading-relaxed">
                {article.summary}
              </p>

              <div className="flex items-center justify-between text-xs text-emerald-600 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                    <Calendar className="w-3 h-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg hover:bg-emerald-100 transition-colors duration-300">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-3 py-1 rounded-full hover:bg-emerald-100 transition-colors duration-300">
                  {article.author}
                </span>
                <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition-transform duration-300" />
              </div>

              <div className="flex flex-wrap gap-2">
                {article.tags.slice(0, 2).map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full border border-emerald-200 hover:bg-emerald-200 transition-colors duration-200 transform hover:scale-105"
                  >
                    #{tag}
                  </span>
                ))}
                {article.tags.length > 2 && (
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs rounded-full border border-emerald-200 hover:bg-emerald-200 transition-colors duration-200">
                    +{article.tags.length - 2}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sonuç Bulunamadı */}
        {filtered.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-12 shadow-lg border border-emerald-200">
              <Search className="w-20 h-20 mx-auto mb-6 text-emerald-300 animate-bounce" />
              <h3 className="text-2xl font-bold text-emerald-700 mb-4">Makale Bulunamadı</h3>
              <p className="text-emerald-600 max-w-md mx-auto leading-relaxed">
                Arama kriterlerinizle eşleşen makale bulunamadı. Farklı anahtar kelimeler veya kategoriler deneyebilirsiniz.
              </p>
              <button
                onClick={() => { setSearch(""); setSelectedCategory("Hepsi"); }}
                className="mt-6 px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105"
              >
                Tüm Makaleleri Göster
              </button>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-20 pt-12 border-t border-emerald-200 text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200 hover:border-emerald-300 transition-colors duration-300">
            <h3 className="text-xl font-bold text-emerald-800 mb-4">Daha Fazla İçerik İçin</h3>
            <p className="text-emerald-700 mb-4 max-w-2xl mx-auto leading-relaxed">
              Mental sağlık yolculuğunuzda size eşlik etmek için düzenli olarak yeni makaleler yayınlıyoruz.
              En güncel içeriklerden haberdar olmak için blog sayfamızı favorilerinize ekleyin.
            </p>
            <div className="inline-flex items-center gap-2 text-emerald-800 font-semibold bg-white px-6 py-3 rounded-xl border border-emerald-200 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105">
              <Star className="w-5 h-5 text-amber-500 fill-current animate-spin-slow" />
              Toplam {sampleArticles.length} makale mevcut
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 bg-emerald-600 text-white rounded-full shadow-lg hover:bg-emerald-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 animate-bounce z-50 hover:scale-110"
          >
            <ChevronUp className="w-6 h-6" />
          </button>
        )}
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-subtle {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-3px);
          }
          60% {
            transform: translateY(-1px);
          }
        }

        @keyframes text-shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        @keyframes width-expand {
          from {
            width: 0;
          }
          to {
            width: 6rem;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
          animation-fill-mode: both;
        }

        .animate-slide-left {
          animation: slide-left 0.5s ease-out;
        }

        .animate-slide-right {
          animation: slide-right 0.5s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.4s ease-out;
          animation-fill-mode: both;
        }

        .animate-fade-in-delayed {
          animation: fade-in 0.8s ease-out 0.3s both;
        }

        .animate-fade-in-slow {
          animation: fade-in 1s ease-out 0.5s both;
        }

        .animate-slide-up-delayed {
          animation: slide-up 0.6s ease-out 0.2s both;
        }

        .animate-slide-up-slow {
          animation: slide-up 0.8s ease-out 0.4s both;
        }

        .animate-slide-up-stagger {
          animation: slide-up 0.4s ease-out both;
        }

        .animate-bounce-subtle {
          animation: bounce-subtle 2s infinite;
        }

        .animate-text-shimmer {
          background: linear-gradient(90deg, #1f2937, #374151, #1f2937);
          background-size: 200% 100%;
          animation: text-shimmer 3s infinite;
          -webkit-background-clip: text;
          background-clip: text;
        }

        .animate-width-expand {
          animation: width-expand 1s ease-out 0.5s both;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f0fdf4;
        }

        ::-webkit-scrollbar-thumb {
          background: #10b981;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #059669;
        }
      `}</style>
    </div>
  );
}

export default Blog;