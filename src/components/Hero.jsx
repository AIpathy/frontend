import React from "react";

function Hero() {
  return (
    <main className="flex flex-col items-center text-center px-4 sm:px-6 py-10 sm:py-16 md:py-24 lg:py-28 flex-1 w-full max-w-full pb-24 sm:pb-32">
      <div className="-translate-y-[2cm] z-0 w-full flex flex-col items-center">
        
        {/* Giriş Bölümü */}
        <section className="w-full max-w-2xl bg-[#23272f]/70 rounded-2xl shadow-2xl shadow-black/30 p-10 my-[1cm] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_40px_0_#30614F70] hover:scale-105">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center text-[#3CB97F]">
            AIpathy · Ruh Halini Anlamanın Akıllı Yolu
          </h1>
          <p className="text-lg md:text-xl text-gray-300 text-center">
            Yapay zeka destekli ses, mimik ve test analizi ile ruh halini keşfet.
          </p>
        </section>

        {/* Biz Kimiz? */}
        <section className="w-full max-w-2xl bg-[#23272f]/70 rounded-2xl shadow-2xl shadow-black/30 p-10 my-[1cm] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_40px_0_#30614F70] hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-[#3CB97F]">Biz Kimiz?</h2>
          <p className="text-gray-300 text-base text-center leading-relaxed mt-4">
            AIpathy ekibi olarak, sivil hayatta ruh sağlığını önemseyen,<br />
            yapay zeka ile çözüm üretmeyi amaçlayan bir grup geliştiriciyiz.
          </p>
        </section>

        {/* Nasıl Çalışır? */}
        <section className="w-full max-w-6xl bg-[#23272f]/70 rounded-2xl shadow-2xl shadow-black/30 p-10 my-[1cm] backdrop-blur-md transition-all duration-300 hover:shadow-[0_8px_40px_0_#30614F70] hover:scale-105">
          <h2 className="text-3xl font-bold mb-8 text-center text-[#3CB97F]">Nasıl Çalışır?</h2>
          <div className="grid gap-[1cm] sm:grid-cols-2 md:grid-cols-3 w-full">
            {/* Ses Analizi Kartı */}
            <div className="bg-white/10 rounded-lg p-6 shadow-md flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2 text-center text-[#3CB97F]">Ses Analizi</h3>
              <p className="text-gray-300 text-sm text-center">
                10 saniyelik konuşma kaydın analiz edilerek duygu durumun metin üzerinden değerlendirilir.
              </p>
            </div>

            {/* Mimik Analizi Kartı */}
            <div className="bg-white/10 rounded-lg p-6 shadow-md flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2 text-center text-[#3CB97F]">Mimik Analizi</h3>
              <p className="text-gray-300 text-sm text-center">
                Kameradan alınan yüz ifadelerin yapay zeka ile analiz edilerek anlık duygu durumu çıkarılır.
              </p>
            </div>

            {/* PHQ-9 Testi Kartı */}
            <div className="bg-white/10 rounded-lg p-6 shadow-md flex flex-col items-center">
              <h3 className="text-xl font-semibold mb-2 text-center text-[#3CB97F]">PHQ-9 Testi</h3>
              <p className="text-gray-300 text-sm text-center">
                Günlük ruh halini ölçmek için uygulanan bilimsel testler üzerinden analiz yapılır.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Hero;
