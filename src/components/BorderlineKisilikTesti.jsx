import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import BorderlineSonucGrafik from "./BorderlineSonucGrafik";

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
  // 12a özel soru
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
  const [submitted, setSubmitted] = useState(false);

  // Kullanıcı tipine göre geri dönüş yolu
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const handleChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleQ12aChange = (value) => {
    setQ12a(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // 12. soruya Evet ise 12a gösterilecek, ardından 13. soruya geçilecek
  const renderQuestions = () => {
    const items = [];
    let displayNumber = 1;
    for (let i = 0; i < QUESTIONS.length; i++) {
      // 12. sorudan sonra özel durum
      if (i === 12) {
        // 12a sadece 12. soruya Evet denirse gösterilsin
        if (answers[11] === 1) {
          items.push(
            <div key={"12a"} className="mb-6">
              <div className="font-semibold mb-2">12a. {QUESTIONS[12]}</div>
              <div className="flex flex-row gap-4 flex-wrap">
                {Q12A_OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="q12a"
                      value={opt.value}
                      checked={q12a === opt.value}
                      onChange={() => handleQ12aChange(opt.value)}
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }
        // 12a'yı atla, 13. soruya geç
        continue;
      }
      // 12a'yı atla (index 12) - 12. soruya Hayır denirse 12a hiç gösterilmesin
      if (i === 12 && answers[11] !== 1) continue;
      // Normal sorular
      let label;
      if (i === 12 && answers[11] === 1) {
        // 12a gösterildi, şimdi 13. soruya geçiyoruz
        label = `13. ${QUESTIONS[i]}`;
        displayNumber = 14;
      } else {
        label = `${displayNumber}. ${QUESTIONS[i]}`;
        displayNumber++;
      }
      items.push(
        <div key={i} className="mb-6">
          <div className="font-semibold mb-2">{label}</div>
          <div className="flex flex-row gap-4 flex-wrap">
            {OPTIONS.map((opt) => (
              <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={`q${i}`}
                  value={opt.value}
                  checked={answers[i] === opt.value}
                  onChange={() => handleChange(i, opt.value)}
                  required
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        </div>
      );
    }
    return items;
  };

  // 12a hariç toplam puan
  const totalScore = answers.reduce((sum, v, idx) => {
    // 12a (index 12) puana dahil edilmez
    if (idx === 12) return sum;
    return sum + (v !== null ? Number(v) : 0);
  }, 0);
  // Formun tamamlanmış sayılması için: 12. soruya Evet ise 12a da zorunlu, Hayır ise 12a hiç sorulmaz
  const allAnswered = answers.every((v, idx) => (idx === 12 ? true : v !== null)) && (answers[11] !== 1 || q12a !== null);

  return (
    <div className="min-h-screen bg-[#f5f5f5] relative">
      {/* Sol üst geri ok */}
      <Link
        to={backPath}
        className="absolute top-6 left-6 text-gray-700 hover:text-[#265d5c] transition-colors text-2xl flex items-center gap-2"
        title="Dashboard'a Dön"
      >
        <ArrowLeft className="w-6 h-6" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      <div className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md mt-16">
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4">Borderline Kişilik Bozukluğu Testi</h2>
        <p className="mb-4 text-gray-700">Talimatlar: Lütfen aşağıdaki her bir ifadeyi okuyun ve son iki hafta içinde bu ifadenin sizi ne kadar iyi tanımladığını düşünerek size en uygun seçeneği işaretleyin. Her soru için "Hayır yaşamadım" (0) veya "Evet yaşadım" (1) seçeneğini işaretleyin.</p>
        <form onSubmit={handleSubmit}>
          {renderQuestions()}
          {!submitted && (
            <button
              type="submit"
              className="bg-[#265d5c] hover:bg-[#267a56] text-white px-6 py-2 rounded-lg font-semibold w-full disabled:opacity-50"
              disabled={!allAnswered}
            >
              Sonuçları Göster
            </button>
          )}
        </form>
        {submitted && (
          <div className="mt-8 border-t pt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-[#265d5c]">Toplam Puan: {totalScore}</div>
              <div className="text-lg mt-2 text-gray-800">{getResultText(totalScore)}</div>
            </div>

            <BorderlineSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
} 