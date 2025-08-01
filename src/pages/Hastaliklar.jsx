import React, { useState, useEffect } from "react";
import { ArrowLeft, ChevronDown, Search, Filter, Leaf, TreePine } from "lucide-react";

const disorders = [
  // Test Sonuçları
  {
    title: "Depresyon Testi Sonrasında Ne Olur?",
    description: "Depresyon testi sonucunuz değerlendirilir ve size uygun destek seçenekleri sunulur. Profesyonel yardım almanızı önerdiğimiz durumlar hakkında bilgi alırsınız.",
    emoji: "🌱",
    category: "test-sonuclari"
  },
  {
    title: "Anksiyete Testi Nasıl Değerlendirilir?",
    description: "Anksiyete testi sonuçlarınızın anlamı ve bir sonraki adımlar. Skorunuza göre önerilen destek seçenekleri ve profesyonel yardım alma zamanı.",
    emoji: "🍀",
    category: "test-sonuclari"
  },
  {
    title: "Test Sonuçlarım Güvenilir mi?",
    description: "Online testlerin sınırları ve güvenilirliği. Hangi durumlarda profesyonel değerlendirme gerektiği ve testlerin doğru kullanımı.",
    emoji: "🌿",
    category: "test-sonuclari"
  },
  {
    title: "ADHD Testi Sonuçları Nasıl Yorumlanır?",
    description: "ADHD tarama testi sonuçlarınızın anlamı ve bir sonraki adımlar. Dikkat eksikliği belirtilerinin değerlendirilmesi ve profesyonel yardım süreci.",
    emoji: "🌾",
    category: "test-sonuclari"
  },
  {
    title: "Kişilik Bozukluğu Testi Sonrasında Ne Yapılır?",
    description: "Kişilik bozukluğu tarama testi sonuçlarınızın değerlendirilmesi. Hangi durumda uzman desteği alınmalı ve tedavi süreci nasıl başlar.",
    emoji: "🌳",
    category: "test-sonuclari"
  },

  // Ruh Sağlığı Bozuklukları
  {
    title: "Majör Depresif Bozukluk",
    description: "Majör depresyonun belirtileri, nedenleri ve tedavi seçenekleri. Sürekli üzüntü, umutsuzluk, enerji kaybı ve günlük aktivitelerde zorlanma gibi semptomları tanıyın.",
    emoji: "🌲",
    category: "ruh-sagligi-bozukluklari"
  },
  {
    title: "Bipolar Bozukluk (Manik Depresif)",
    description: "Bipolar bozukluk, manik ve depresif dönemlerin ardışık yaşandığı bir ruh sağlığı durumudur. Tip 1 ve Tip 2 bipolar bozukluk arasındaki farklar ve tedavi yaklaşımları.",
    emoji: "🍃",
    category: "ruh-sagligi-bozukluklari"
  },
  {
    title: "Şizofreni",
    description: "Şizofreninin pozitif ve negatif belirtileri. Halüsinasyonlar, delüzyonlar, düşünce bozuklukları ve sosyal geri çekilme gibi semptomların erken tanınması.",
    emoji: "🌴",
    category: "ruh-sagligi-bozukluklari"
  },
  {
    title: "Borderline Kişilik Bozukluğu",
    description: "Sınırda kişilik bozukluğunun belirtileri ve tedavisi. İlişkilerde istikrarsızlık, kimlik krizi, impulsivite ve terk edilme korkusu gibi semptomlar.",
    emoji: "🌿",
    category: "ruh-sagligi-bozukluklari"
  },
  {
    title: "Antisosyal Kişilik Bozukluğu",
    description: "Antisosyal kişilik bozukluğunun karakteristik özellikleri. Başkalarının haklarını hiçe sayma, manipülatif davranışlar ve empati eksikliği.",
    emoji: "🍂",
    category: "ruh-sagligi-bozukluklari"
  },
  {
    title: "Narsisistik Kişilik Bozukluğu",
    description: "Aşırı benmerkezcilik, empati eksikliği ve üstünlük kompleksi ile karakterize olan kişilik bozukluğu. Belirtileri ve başa çıkma stratejileri.",
    emoji: "🌺",
    category: "ruh-sagligi-bozukluklari"
  },

  // Anksiyete Bozuklukları
  {
    title: "Yaygın Anksiyete Bozukluğu",
    description: "Sürekli ve kontrol edilemeyen endişe durumu. Günlük yaşamı etkileyen aşırı kaygı, fiziksel gerginlik ve konsantrasyon zorluğu belirtileri.",
    emoji: "🌱",
    category: "anksiyete-bozukluklari"
  },
  {
    title: "Sosyal Anksiyete Bozukluğu",
    description: "Sosyal ortamlarda yaşanan yoğun korku ve kaygı durumu. Yargılanma korkusu, toplum önünde konuşma kaygısı ve sosyal kaçınma davranışları.",
    emoji: "🌸",
    category: "anksiyete-bozukluklari"
  },
  {
    title: "Panik Bozukluk",
    description: "Tekrarlayan panik ataklar ve bunlara bağlı yaşam tarzı değişiklikleri. Ani korku, kalp çarpıntısı, nefes darlığı ve ölüm korkusu semptomları.",
    emoji: "🌻",
    category: "anksiyete-bozukluklari"
  },
  {
    title: "Agorafobi",
    description: "Açık alanlara veya kaçışın zor olduğu ortamlara karşı yoğun korku. Toplu taşıma, kalabalık yerler ve evden çıkma konusunda yaşanan zorluklar.",
    emoji: "🌿",
    category: "anksiyete-bozukluklari"
  },
  {
    title: "Spesifik Fobiler",
    description: "Belirli nesne veya durumlara karşı aşırı ve mantıksız korku. Hayvan fobisi, yükseklik korkusu, kan fobisi gibi yaygın fobi türleri.",
    emoji: "🍀",
    category: "anksiyete-bozukluklari"
  },
  {
    title: "Sağlık Anksiyetesi (Hipokondri)",
    description: "Ciddi hastalığa yakalanma konusunda aşırı endişe. Fiziksel belirtileri yanlış yorumlama ve sürekli tıbbi kontrol arama davranışları.",
    emoji: "🌾",
    category: "anksiyete-bozukluklari"
  },

  // Obsesif Kompulsif Bozukluklar
  {
    title: "Obsesif Kompulsif Bozukluk (OKB)",
    description: "İstenmeyen düşünceler (obsesyonlar) ve tekrarlayan davranışlar (kompulsyonlar) ile karakterize bozukluk. Temizlik, sayma, kontrol etme ritüelleri.",
    emoji: "🌿",
    category: "obsesif-kompulsif"
  },
  {
    title: "Beden Dismorfik Bozukluğu",
    description: "Görünüşle ilgili aşırı endişe ve algılanan kusurlarla sürekli meşguliyet. Aynaya bakma, groomıng ritüelleri ve sosyal kaçınma davranışları.",
    emoji: "🌹",
    category: "obsesif-kompulsif"
  },
  {
    title: "Saç Yolma Bozukluğu (Trikotillomani)",
    description: "Saçları yolma isteğine karşı koyamama. Stres durumlarında artan davranış ve bunun sonucunda oluşan saç kaybı ile başa çıkma yöntemleri.",
    emoji: "🌱",
    category: "obsesif-kompulsif"
  },
  {
    title: "Biriktirme Bozukluğu",
    description: "Eşyaları atmakta güçlük çekme ve aşırı biriktirme davranışı. Yaşam alanının kullanılamaz hale gelmesi ve sosyal izolasyon.",
    emoji: "🌳",
    category: "obsesif-kompulsif"
  },

  // Travma ve Stres Bozuklukları
  {
    title: "Travma Sonrası Stres Bozukluğu (TSSB)",
    description: "Ciddi travmatik olaylar sonrası gelişen bozukluk. Flashback'ler, kabus görme, kaçınma davranışları ve aşırı uyarılmışlık belirtileri.",
    emoji: "🌿",
    category: "travma-stres"
  },
  {
    title: "Akut Stres Bozukluğu",
    description: "Travmatik olay sonrası ilk ay içinde gelişen semptomlar. Dissosiyatif belirtiler, yeniden yaşama ve kaçınma davranışları.",
    emoji: "🌾",
    category: "travma-stres"
  },
  {
    title: "Yas Bozukluğu",
    description: "Sevilen birinin kaybı sonrası normal yas sürecinden farklı olarak uzayan ve işlevselliği bozan yas tepkileri. Karmaşık yas ve tedavi yaklaşımları.",
    emoji: "🌸",
    category: "travma-stres"
  },
  {
    title: "Uyum Bozukluğu",
    description: "Yaşam değişikliklerine uyum sağlamada yaşanan zorluklar. İş değişikliği, taşınma, ilişki sorunları gibi stres faktörlerine tepki.",
    emoji: "🍃",
    category: "travma-stres"
  },

  // Nörogelişimsel Bozukluklar
  {
    title: "Dikkat Eksikliği Hiperaktivite Bozukluğu (DEHB)",
    description: "Dikkat eksikliği, hiperaktivite ve dürtüsellik ile karakterize bozukluk. Çocukluk çağında başlayıp yetişkinliğe kadar devam edebilen semptomlar.",
    emoji: "🌻",
    category: "norogelisimsel"
  },
  {
    title: "Otizm Spektrum Bozukluğu",
    description: "Sosyal iletişim güçlükleri ve tekrarlayan davranış kalıpları ile karakterize bozukluk. Erken tanı ve müdahale programları.",
    emoji: "🌺",
    category: "norogelisimsel"
  },
  {
    title: "Öğrenme Bozuklukları",
    description: "Okuma, yazma, matematik gibi akademik becerilerde yaşanan spesifik güçlükler. Disleksi, disgrafya ve diskalkuli türleri.",
    emoji: "🌿",
    category: "norogelisimsel"
  },
  {
    title: "Tourette Sendromu",
    description: "Motor ve vokal tiklerle karakterize nörolojik bozukluk. Ani, tekrarlayan hareketler ve sesler ile başa çıkma stratejileri.",
    emoji: "🌱",
    category: "norogelisimsel"
  },

  // Yeme Bozuklukları
  {
    title: "Anoreksiya Nervoza",
    description: "Vücut ağırlığını düşük tutma obsesyonu ve beden imajı bozukluğu. Aşırı diyet, egzersiz ve vücut ağırlığı korkusu ile ilgili semptomlar.",
    emoji: "🌾",
    category: "yeme-bozukluklari"
  },
  {
    title: "Bulimiya Nervoza",
    description: "Aşırı yeme nöbetleri ve telafi edici davranışlar. Kusma, laksatif kullanımı ve aşırı egzersiz gibi kompulsif davranışlar.",
    emoji: "🌿",
    category: "yeme-bozukluklari"
  },
  {
    title: "Aşırı Yeme Bozukluğu",
    description: "Kontrol kaybı ile karakterize tekrarlayan aşırı yeme nöbetleri. Duygusal yeme, suçluluk hissi ve kilo alımı sorunları.",
    emoji: "🍃",
    category: "yeme-bozukluklari"
  },
  {
    title: "Pika",
    description: "Besin olmayan maddeleri sürekli yeme davranışı. Çocukluk çağında daha yaygın olan bu bozukluğun nedenleri ve tedavi yaklaşımları.",
    emoji: "🌱",
    category: "yeme-bozukluklari"
  },

  // Uyku Bozuklukları
  {
    title: "İnsomnia (Uykusuzluk)",
    description: "Uyku başlatma, sürdürme veya erken uyanma sorunları. Kronik uykusuzluğun nedenleri ve uyku hijyeni teknikleri.",
    emoji: "🌙",
    category: "uyku-bozukluklari"
  },
  {
    title: "Narkolepsi",
    description: "Gündüz aşırı uyku hali ve ani uyku atakları. Katapleksi, uyku felci ve hipnagojik halüsinasyonlar gibi eşlik eden semptomlar.",
    emoji: "🌟",
    category: "uyku-bozukluklari"
  },
  {
    title: "Uyku Apnesi",
    description: "Uyku sırasında nefes alımının durması. Horlama, gündüz yorgunluğu ve dikkat sorunları ile ilişkili uyku bozukluğu.",
    emoji: "🌛",
    category: "uyku-bozukluklari"
  },
  {
    title: "Uyku Yürüme (Somnambulizm)",
    description: "Derin uyku sırasında yürüme ve aktivite gerçekleştirme. Güvenlik önlemleri ve aile yakınlarının alması gereken tedbirler.",
    emoji: "🌜",
    category: "uyku-bozukluklari"
  },

  // Başa Çıkma Stratejileri
  {
    title: "Sosyal Anksiyete ile Başa Çıkma",
    description: "Sosyal ortamlarda yaşanan anksiyeteyi yönetme stratejileri. Kendini ifade etme becerileri ve özgüven geliştirme teknikleri.",
    emoji: "🌻",
    category: "basa-cikma"
  },
  {
    title: "Stres Yönetimi Teknikleri",
    description: "Günlük yaşamda stresle başa çıkma yöntemleri. Nefes egzersizleri, meditasyon, ilerleyici kas gevşemesi ve mindfulness teknikleri.",
    emoji: "🧘‍♀️",
    category: "basa-cikma"
  },
  {
    title: "Öfke Kontrolü Stratejileri",
    description: "Öfke nöbetlerini yönetme ve kontrol altına alma teknikleri. Bilişsel teknikler, gevşeme egzersizleri ve iletişim becerileri.",
    emoji: "🌿",
    category: "basa-cikma"
  },
  {
    title: "Uyku Hijyeni ve Ruh Sağlığı",
    description: "Kaliteli uykunun ruh sağlığı üzerindeki etkisi. Uyku düzeninizi düzenleme ve uyku kalitesini artırma yöntemleri.",
    emoji: "🌙",
    category: "basa-cikma"
  },
  {
    title: "Mindfulness ve Meditasyon",
    description: "Şimdiki ana odaklanma teknikleri. Mindfulness meditasyonu, nefes farkındalığı ve günlük yaşamda farkındalık pratikleri.",
    emoji: "🧘‍♀️",
    category: "basa-cikma"
  },
  {
    title: "Bilişsel Davranışçı Teknikler",
    description: "Olumsuz düşünce kalıplarını değiştirme stratejileri. Düşünce kaydı, davranışsal deneyimler ve problem çözme becerileri.",
    emoji: "🌱",
    category: "basa-cikma"
  },

  // Acil Durum
  {
    title: "Panik Atak Sırasında Ne Yapmalı?",
    description: "Panik atak yaşadığınızda uygulanabilecek nefes teknikleri ve sakinleşme yöntemleri. 4-7-8 nefes tekniği ve grounding egzersizleri.",
    emoji: "🚨",
    category: "acil-durum"
  },
  {
    title: "İntihar Düşünceleri ile Başa Çıkma",
    description: "İntihar düşünceleri yaşadığınızda nasıl yardım alacağınız ve acil durum hatları. Kendinizi veya sevdiklerinizi koruma stratejileri.",
    emoji: "🆘",
    category: "acil-durum"
  },
  {
    title: "Maniak Dönem Acil Müdahale",
    description: "Bipolar bozukluğun manik döneminde alınması gereken acil önlemler. Uyku, beslenme ve güvenlik tedbirleri.",
    emoji: "⚡",
    category: "acil-durum"
  },
  {
    title: "Psikotik Belirtiler ve Acil Yardım",
    description: "Halüsinasyon ve delüzyon yaşayan kişilere nasıl yaklaşılmalı. Acil psikiyatri servisleri ve müdahale süreci.",
    emoji: "🚑",
    category: "acil-durum"
  },
  {
    title: "Aile İçi Şiddet Acil Durum",
    description: "Aile içi şiddet durumunda alınması gereken acil önlemler. Güvenlik planı oluşturma ve destek hatları.",
    emoji: "🛡️",
    category: "acil-durum"
  }
];

function FloatingLeaf({ delay = 0, size = 'small' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  };

  return (
    <div 
      className={`absolute text-green-300/40 ${sizeClasses[size]} animate-pulse`}
      style={{
        animation: `float ${8 + Math.random() * 4}s ease-in-out infinite ${delay}s`,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`
      }}
    >
      <Leaf className="w-full h-full" />
    </div>
  );
}

function ForestBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
  
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 animate-pulse" 
           style={{ animationDuration: '8s' }} />
      
 
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-green-200/30 to-transparent" />
      
      
      {[...Array(20)].map((_, i) => (
        <FloatingLeaf 
          key={i} 
          delay={i * 0.3} 
          size={['small', 'medium', 'large'][Math.floor(Math.random() * 3)]}
        />
      ))}
      
     
      <div className="absolute bottom-0 left-10 text-green-200/20">
        <TreePine className="w-16 h-24 animate-sway" />
      </div>
      <div className="absolute bottom-0 right-20 text-green-200/20">
        <TreePine className="w-20 h-28 animate-sway" style={{ animationDelay: '1s' }} />
      </div>
      <div className="absolute bottom-0 left-1/3 text-green-200/20">
        <TreePine className="w-12 h-20 animate-sway" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
}

function Hastaliklar() {
  const [expandedCard, setExpandedCard] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const categories = [
    { id: 'all', name: 'Tümü', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', count: disorders.length },
    { id: 'test-sonuclari', name: 'Test Sonuçları', color: 'bg-green-100 text-green-700 border-green-200', count: disorders.filter(d => d.category === 'test-sonuclari').length },
    { id: 'ruh-sagligi-bozukluklari', name: 'Ruh Sağlığı', color: 'bg-teal-100 text-teal-700 border-teal-200', count: disorders.filter(d => d.category === 'ruh-sagligi-bozukluklari').length },
    { id: 'anksiyete-bozukluklari', name: 'Anksiyete', color: 'bg-lime-100 text-lime-700 border-lime-200', count: disorders.filter(d => d.category === 'anksiyete-bozukluklari').length },
    { id: 'obsesif-kompulsif', name: 'Obsesif Kompulsif', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', count: disorders.filter(d => d.category === 'obsesif-kompulsif').length },
    { id: 'travma-stres', name: 'Travma & Stres', color: 'bg-green-100 text-green-700 border-green-200', count: disorders.filter(d => d.category === 'travma-stres').length },
    { id: 'norogelisimsel', name: 'Nörogelişimsel', color: 'bg-teal-100 text-teal-700 border-teal-200', count: disorders.filter(d => d.category === 'norogelisimsel').length },
    { id: 'yeme-bozukluklari', name: 'Yeme Bozuklukları', color: 'bg-lime-100 text-lime-700 border-lime-200', count: disorders.filter(d => d.category === 'yeme-bozukluklari').length },
    { id: 'uyku-bozukluklari', name: 'Uyku Bozuklukları', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', count: disorders.filter(d => d.category === 'uyku-bozukluklari').length },
    { id: 'basa-cikma', name: 'Başa Çıkma', color: 'bg-green-100 text-green-700 border-green-200', count: disorders.filter(d => d.category === 'basa-cikma').length },
    { id: 'acil-durum', name: 'Acil Durum', color: 'bg-orange-100 text-orange-700 border-orange-200', count: disorders.filter(d => d.category === 'acil-durum').length }
  ];

  const filteredDisorders = disorders.filter(disorder => {
    const categoryMatch = activeCategory === 'all' || disorder.category === activeCategory;
    
    // Arama terimini normalize et (Türkçe karakterler ve büyük/küçük harf)
    const normalizedSearchTerm = searchTerm.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
    
    const normalizedTitle = disorder.title.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
    
    const normalizedDescription = disorder.description.toLowerCase()
      .replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c');
    
    const searchMatch = normalizedTitle.includes(normalizedSearchTerm) ||
                       normalizedDescription.includes(normalizedSearchTerm);
    
    return categoryMatch && searchMatch;
  });

  const toggleCard = (index) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <ForestBackground />
      
      {/* Header */}
      <div className="relative bg-white/70 backdrop-blur-md shadow-lg border-b border-green-200/50">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={handleGoBack}
              className="flex items-center gap-3 px-6 py-3 bg-emerald-500/20 hover:bg-emerald-500/30 rounded-full transition-all duration-300 border border-emerald-300/50 shadow-lg hover:shadow-xl group backdrop-blur-sm"
            >
              <ArrowLeft className="w-5 h-5 text-emerald-700 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-semibold text-emerald-800">Ana Sayfaya Dön</span>
            </button>
            
            {/* Arama barı */}
            <div className="relative max-w-lg w-full mx-6">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-green-600 w-5 h-5" />
              <input
                type="text"
                placeholder="Doğada aradığınızı bulun..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-green-200/50 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-400 text-sm bg-white/80 backdrop-blur-sm focus:bg-white/90 transition-all duration-300 shadow-lg"
              />
            </div>
            
            <div className="text-sm text-green-700 bg-green-100/80 backdrop-blur-sm px-4 py-2 rounded-full border-2 border-green-200/50 shadow-lg">
              <span className="font-bold">{filteredDisorders.length}</span> yaprak
            </div>
          </div>
        </div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-12">
        {/* Ana Başlık */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-green-800 mb-6 tracking-tight animate-fade-in">
            Psikolojik <span className="text-emerald-600 animate-pulse">Hastalıklar</span>
          </h1>
          <p className="text-xl text-green-700 max-w-4xl mx-auto leading-relaxed backdrop-blur-sm bg-white/30 rounded-2xl p-6 border border-green-200/50 shadow-lg">
            Ruh sağlığının doğal çözümlerini keşfedin. Her bilgi bir ağaç, her çözüm bir yaprak gibi 
            <span className="text-emerald-700 font-semibold"> büyüyen bir orman</span> yaratıyoruz.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-3 text-green-600 text-sm bg-green-100/50 backdrop-blur-sm rounded-full px-4 py-2 border border-green-200/50 shadow-lg">
              <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse shadow-lg shadow-emerald-500/50"></div>
              <span>Sürekli büyüyen bilgi ormanı</span>
            </div>
          </div>
        </div>

        {/* Kategori Filtreleme */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-300/50 shadow-lg backdrop-blur-sm">
              <Filter className="w-5 h-5 text-emerald-700" />
            </div>
            <span className="text-xl font-bold text-green-800">Kategoriler</span>
          </div>
          <div className="flex flex-wrap gap-4">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-3 px-6 py-4 rounded-2xl text-sm font-semibold transition-all duration-500 hover:scale-105 hover:shadow-xl border-2 backdrop-blur-sm ${
                  activeCategory === category.id 
                    ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-green-900 shadow-2xl shadow-emerald-500/30 border-emerald-400 animate-pulse' 
                    : `${category.color} hover:shadow-2xl shadow-lg hover:bg-opacity-80`
                }`}
              >
                <Leaf className={`w-4 h-4 ${activeCategory === category.id ? 'animate-spin' : 'animate-bounce'}`} />
                <span>{category.name}</span>
                <span className={`text-xs px-3 py-1.5 rounded-full font-bold shadow-inner ${
                  activeCategory === category.id 
                    ? 'bg-white/30 text-green 900 border border-white/40'
                    : 'bg-white/80 text-green-700 border border-green-300/50'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sonuç Bilgileri */}
        {searchTerm && (
          <div className="mb-8 p-6 bg-gradient-to-r from-green-100/80 to-emerald-100/80 border-2 border-green-300/50 rounded-2xl shadow-xl backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center border border-green-300/50 shadow-lg">
                <Search className="w-5 h-5 text-green-700" />
              </div>
              <p className="text-green-800 font-semibold text-lg">
                "<span className="font-bold text-emerald-700">{searchTerm}</span>" için {filteredDisorders.length} yaprak bulundu
              </p>
            </div>
          </div>
        )}

        {/* SSS Kartları */}
        <div className="space-y-6">
          {filteredDisorders.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-40 h-40 bg-gradient-to-br from-green-200/50 to-emerald-200/50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl backdrop-blur-sm border-2 border-green-300/50 animate-pulse">
                <Search className="w-16 h-16 text-green-500" />
              </div>
              <h3 className="text-3xl font-bold text-green-800 mb-4">Bu dal boş görünüyor</h3>
              <p className="text-green-600 text-xl">Başka bir dal aramayı veya farklı bir orman bölgesi keşfetmeyi deneyin.</p>
            </div>
          ) : (
            filteredDisorders.map((disorder, index) => {
              const isExpanded = expandedCard === index;
              const categoryInfo = categories.find(cat => cat.id === disorder.category);
              
              return (
                <div
                  key={index}
                  className={`bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border-2 border-green-200/50 overflow-hidden transition-all duration-500 hover:shadow-2xl hover:border-emerald-300/70 ${
                    isExpanded ? 'shadow-2xl ring-4 ring-emerald-500/30 scale-[1.02] bg-white/90' : 'hover:scale-[1.01]'
                  }`}
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                  }}
                >
                  <button
                    onClick={() => toggleCard(index)}
                    className="w-full p-8 text-left flex items-center justify-between hover:bg-gradient-to-r hover:from-green-50/50 hover:to-emerald-50/50 transition-all duration-400"
                  >
                    <div className="flex items-center space-x-6 flex-1">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-500 to-green-600 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 hover:scale-110 transition-transform duration-300 border-2 border-emerald-400/50">
                        <span className="text-3xl animate-bounce" style={{ animationDelay: `${index * 0.1}s` }}>
                          {disorder.emoji}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-green-800 mb-3 leading-tight">
                          {disorder.title}
                        </h3>
                        <p className="text-green-700 line-clamp-2 leading-relaxed text-lg">
                          {disorder.description.substring(0, 120)}...
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ml-6">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-400 border-2 backdrop-blur-sm ${
                        isExpanded ? 'bg-emerald-500/20 rotate-180 border-emerald-400/50 shadow-lg' : 'bg-green-100/50 hover:bg-green-200/50 border-green-300/50 shadow-md'
                      }`}>
                        <ChevronDown className={`w-6 h-6 transition-colors duration-300 ${
                          isExpanded ? 'text-emerald-700' : 'text-green-600'
                        }`} />
                      </div>
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="px-8 pb-8 animate-fade-in">
                      <div className="pl-22">
                        <div className="border-l-4 border-emerald-400 pl-8 bg-gradient-to-r from-emerald-50/60 to-transparent rounded-r-2xl py-8 backdrop-blur-sm border-t border-emerald-200/50 border-b border-emerald-200/50">
                          <p className="text-green-800 leading-relaxed text-lg mb-8 font-medium">
                            {disorder.description}
                          </p>
                          <div className="flex flex-wrap gap-4">
                            <span className={`px-5 py-3 rounded-full text-sm font-bold shadow-lg border-2 backdrop-blur-sm ${categoryInfo?.color || 'bg-green-100 text-green-700 border-green-200'}`}>
                              <Leaf className="w-4 h-4 inline mr-2" />
                              {categoryInfo?.name}
                            </span>
                            <span className="px-5 py-3 rounded-full text-sm font-bold bg-gradient-to-r from-green-200/80 to-emerald-200/80 text-green-800 shadow-lg border-2 border-green-300/50 backdrop-blur-sm">
                              <TreePine className="w-4 h-4 inline mr-2" />
                              Ruh Sağlığı 
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="mt-24 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gradient-to-r from-emerald-100/80 to-green-100/80 rounded-3xl p-10 border-2 border-emerald-300/50 shadow-2xl backdrop-blur-md">
              <div className="mb-6">
                <TreePine className="w-16 h-16 text-emerald-600 mx-auto animate-sway" />
              </div>
              <h3 className="text-3xl font-bold text-green-800 mb-6">
                Bilginin Rehberliğinde İyileşin
              </h3>
              <p className="text-green-700 leading-relaxed mb-8 text-lg font-medium">
                Bu bilgi ormanı size yol gösterir, ancak profesyonel bir rehberin 
                deneyimi her zaman en değerli hazinedir. Doğanın gücü ile uzman desteğini birleştirin.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <div className="flex items-center gap-3 text-sm text-green-600 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-300/50 shadow-lg">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Doğal Çözümler</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-600 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-300/50 shadow-lg">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Uzman Onaylı</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-green-600 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-green-300/50 shadow-lg">
                  <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Sürekli Büyüyen</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes sway {
          0%, 100% { transform: rotate(-2deg); }
          50% { transform: rotate(2deg); }
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-sway {
          animation: sway 4s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default Hastaliklar;