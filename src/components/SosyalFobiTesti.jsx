import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import SosyalFobiSonucGrafik from "./SosyalFobiSonucGrafik";

const QUESTIONS = [
  "Hazırlık yapmadan bir toplantıda ya da kalabalık içinde söz alıp konuşmam gerektiğinde kendimi kaygılı hissederim.",
  "Seyirci önünde konuşmak, hareket etmek ya da performans sergilemek beni kaygılandırır.",
  "Bir grubun dikkatinin tamamen üzerimde olması beni tedirgin eder.",
  "Bir gruba önceden hazırlanmış sözlü bilgi sunmam gerektiğinde kaygılanırım.",
  "Birisi beni izlerken çalışmak beni rahatsız eder.",
  "Gözlendiğimi bilerek yazı yazmak beni gerer.",
  "Yeteneklerimin veya bilgilerimin sınanması (örneğin test, sunum, performans) beni kaygılandırır.",
  "Tanımadığım bir kişiyle yüz yüze konuşmakta zorlanırım.",
  "Tanımadığım bir kişiyi telefonla aramak ya da onunla telefonda konuşmak beni tedirgin eder.",
  "Konuşurken ne söyleyeceğimi bilememekten korkarım.",
  "Başkalarıyla konuşmakta genel olarak zorlanırım.",
  "Garip göründüğümü düşündüğümde kendimi ifade etmekte zorlanırım.",
  "Farklı bir görüşte olduğumda bunu ifade etmekte zorlanırım.",
  "Tanımadığım bir kişinin gözlerinin içine bakmak beni kaygılandırır.",
  "Az tanıdığım biriyle selamlaşmak konusunda kararsızlık yaşarım.",
  "Sosyal ortamlarda biriyle yalnız kalmak beni gerer.",
  "Karşı cinsten hoşlandığım biriyle konuşmak beni çok kaygılandırır.",
  "Romantik veya cinsel bir ilişki başlatmak amacıyla biriyle tanışmaya çalışmak benim için zordur.",
  "Öğretmen, yönetici veya başka bir otoriteyle konuşmak beni gerer.",
  "Yetkili birinden bir şey istemek veya şikâyet dile getirmekten kaçınırım.",
  "Satın aldığım bir ürünü iade etmekten çekinirim.",
  "Yabancılarla konuşmak beni kaygılandırır.",
  "Israrcı bir satış temsilcisine karşı koymakta zorlanırım.",
  "Umumi telefonları kullanmak benim için kaygı vericidir.",
  "Sosyal ortamlarda hislerim hakkında konuşmak beni gerer.",
  "Umumi yerlerde (restoran, kafe vb.) yemek yemek beni rahatsız eder.",
  "Toplum içinde bir şeyler içmekten kaçınırım.",
  "Umumi tuvaletleri kullanmak benim için zordur.",
  "Eğlence, parti, doğum günü gibi sosyal etkinliklere katılmak beni kaygılandırır.",
  "Sosyal ortamlarda rahat davranamam, gergin hissederim.",
  "Evde misafir ağırlamak beni tedirgin eder.",
  "Küçük grup aktivitelerine katılmakta zorlanırım.",
  "Sosyal ortamlarda önemsenmemekten endişe duyarım.",
  "Yaşıtlarımla arkadaşlık kurmak benim için kolay değildir.",
  "Tanıdığım birini sokakta görünce selam verip konuşmakta zorlanırım.",
  "Tanımadığım insanların olduğu ortamlara karışmak beni kaygılandırır.",
  "Bir grup içinde yer almak konusunda gerginlik yaşarım.",
  "Bir gruba dahil olduğumda önemsenmeme korkusu yaşarım.",
  "Sosyal ortamlarda utandırıcı bir şey söyleme korkusu yaşarım.",
  "Sosyal olarak hata yapma korkusu beni engeller.",
  "İnsanların benimle ilgili ne düşündüğünü fazla önemserim.",
  "Başkaları içerideyken bir odaya girmek beni gerer.",
  "Bir parti düzenlemek ya da organizasyon yapmak beni kaygılandırır.",
  "Birlikte çalıştığım insanlarla bir araya gelmekte zorlanırım."
];

const OPTIONS = [
  { value: 0, label: "Hiç kaygı duymam / Hiç rahatsızlık hissetmem" },
  { value: 1, label: "Çok az kaygı duyarım / Neredeyse hiç rahatsız olmam" },
  { value: 2, label: "Orta düzeyde kaygı duyarım / Beni bir miktar rahatsız eder" },
  { value: 3, label: "Kaygılanırım / Belirgin şekilde rahatsızlık duyarım" },
  { value: 4, label: "Çok fazla kaygı duyarım / Aşırı derecede rahatsız olurum" }
];

function getResultText(score) {
  if (score <= 44) return "Düşük sosyal fobi eğilimi";
  if (score <= 88) return "Orta düzeyde sosyal fobi eğilimi";
  return "Yüksek sosyal fobi eğilimi";
}

export default function SosyalFobiTesti() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);

  // Kullanıcı tipine göre geri dönüş yolu
  const userType = localStorage.getItem("userType");
  const backPath = userType === "doctor" ? "/doctor" : "/dashboard";

  const handleChange = (qIdx, value) => {
    const newAnswers = [...answers];
    newAnswers[qIdx] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const totalScore = answers.reduce((sum, v) => sum + (v !== null ? Number(v) : 0), 0);
  const allAnswered = answers.every((v) => v !== null);

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
        <h2 className="text-2xl font-bold text-[#265d5c] mb-4">Sosyal Fobi Testi</h2>
        <p className="mb-4 text-gray-700">Aşağıdaki durumlarda son zamanlarda ne kadar kaygılandığınızı veya rahatsızlık hissettiğinizi işaretleyin:</p>
        <form onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="mb-6">
              <div className="font-semibold mb-2">{idx + 1}. {q}</div>
              <div className="flex flex-col gap-2">
                {OPTIONS.map((opt) => (
                  <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt.value}
                      checked={answers[idx] === opt.value}
                      onChange={() => handleChange(idx, opt.value)}
                      required
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
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

            <SosyalFobiSonucGrafik score={totalScore} />
          </div>
        )}
      </div>
    </div>
  );
} 