import React from 'react';
import { ArrowLeft, Shield, Lock, Eye, Users, Database, Server, Mail } from 'lucide-react';

const GizlilikPolitikasi = () => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
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
            
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-emerald-600" />
              <h1 className="text-2xl font-bold text-emerald-800">Gizlilik Politikası</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Başlık */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-4 bg-white/90 backdrop-blur-xl px-8 py-4 rounded-full text-2xl font-bold mb-8 shadow-2xl border border-emerald-200">
            <Shield className="w-8 h-8 text-emerald-700" />
            <span className="text-emerald-800">AIpathy Gizlilik Politikası</span>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            <strong>Son Güncelleme:</strong> 2 Ağustos 2025
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-600" />
              <span>Alan Adları: https://aipathy.xyz & https://ml.aipathy.xyz</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-600" />
              <span>İletişim: info@aipathy.xyz</span>
            </div>
          </div>
        </div>

        {/* İçerik */}
        <div className="space-y-8">
          {/* Giriş */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-4 flex items-center gap-3">
              <Lock className="w-6 h-6" />
              Giriş
            </h2>
            <p className="text-gray-700 leading-relaxed">
              AIpathy olarak, kullanıcılarımızın gizliliğine ve kişisel verilerinin güvenliğine büyük önem veriyoruz. 
              Bu Gizlilik Politikası, platformumuzu kullanırken sağladığınız verilerin nasıl toplandığını, işlendiğini, 
              saklandığını ve korunduğunu açıklar. Politika; 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK), 
              Avrupa Birliği Genel Veri Koruma Tüzüğü (GDPR) ve yürürlükteki diğer mevzuatlara uygun olarak hazırlanmıştır.
            </p>
          </div>

          {/* 1. Toplanan Veriler */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
              <Database className="w-6 h-6" />
              1. Toplanan Veriler
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-3">a) Kullanıcı Tarafından Sağlanan Bilgiler</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>İsim, soyisim, e-posta adresi</li>
                  <li>Kayıt veya iletişim formlarındaki diğer bilgiler</li>
                  <li>Psikolojik test cevapları (örneğin: Anksiyete, Depresyon, Borderline vb.)</li>
                  <li>Ses kayıtları (duygu analizi ve sohbet amaçlı)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-emerald-700 mb-3">b) Otomatik Olarak Toplanan Teknik Veriler</h3>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>IP adresi</li>
                  <li>Cihaz ve tarayıcı bilgileri</li>
                  <li>Çerezler ve benzeri teknolojiler yoluyla kullanıcı davranışı</li>
                  <li>Site kullanım istatistikleri</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Verilerin Kullanım Amaçları */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
              <Eye className="w-6 h-6" />
              2. Verilerin Kullanım Amaçları
            </h2>
            <p className="text-gray-700 mb-4">
              Toplanan kişisel veriler, aşağıdaki amaçlarla işlenebilir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Kullanıcı hesaplarının oluşturulması ve yönetimi</li>
              <li>Psikolojik test sonuçlarının analiz edilerek değerlendirilmesi</li>
              <li>AI destekli sohbet ve duygu analizi sağlanması</li>
              <li>Hizmetlerin geliştirilmesi, hataların tespiti ve kullanıcı deneyiminin iyileştirilmesi</li>
              <li>Teknik destek ve müşteri hizmetleri</li>
              <li>Yasal yükümlülüklerin yerine getirilmesi</li>
              <li>(Kullanıcının açık rızası halinde) bilgilendirme ve pazarlama faaliyetleri</li>
            </ul>
          </div>

          {/* 3. Verilerin Paylaşımı */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
              <Users className="w-6 h-6" />
              3. Verilerin Paylaşımı
            </h2>
            <p className="text-gray-700 mb-4">
              AIpathy, kullanıcı verilerini aşağıdaki durumlar dışında üçüncü kişilerle paylaşmaz, satmaz veya kiralamaz:
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">Hizmet sunumu için gerekli olması halinde:</h3>
                <p className="text-gray-700 ml-4">Örneğin Google Gemini AI ve ElevenLabs gibi API sağlayıcılarla sınırlı kapsamda paylaşım yapılabilir.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">Yasal yükümlülük:</h3>
                <p className="text-gray-700 ml-4">Resmi mercilerden gelen geçerli talepler doğrultusunda paylaşım olabilir.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-emerald-700 mb-2">Kullanıcının açık rızası durumunda:</h3>
                <p className="text-gray-700 ml-4">Onay verilmedikçe üçüncü taraflarla pazarlama/analiz amacıyla paylaşım yapılmaz.</p>
              </div>
            </div>
          </div>

          {/* 4. Veri Güvenliği */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
              <Shield className="w-6 h-6" />
              4. Veri Güvenliği
            </h2>
            <p className="text-gray-700 mb-4">
              Verileriniz, modern güvenlik uygulamaları çerçevesinde korunur:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Docker tabanlı microservice mimarisi ile servisler izole edilmiştir.</li>
              <li>Verilere erişim, rol tabanlı kontrol sistemleriyle sınırlandırılmıştır.</li>
              <li>Şifreli bağlantılar (HTTPS), şifrelenmiş veritabanı alanları ve şifrelenmiş parola saklama uygulanır.</li>
              <li>Sistem düzenli olarak güvenlik açısından gözden geçirilir.</li>
            </ul>
          </div>

          {/* 5. Veri Saklama Süresi */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">5. Veri Saklama Süresi</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Veriler, yalnızca hizmet sunumu ve yasal gereklilikler süresince saklanır.</li>
              <li>Kullanıcının talebi doğrultusunda veya artık işleme amacı kalmadığında güvenli şekilde silinir.</li>
              <li>Test sonuçları, kullanıcı hesabı var oldukça saklanır.</li>
            </ul>
          </div>

          {/* 6. Kullanıcı Hakları */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">6. Kullanıcı Hakları</h2>
            <p className="text-gray-700 mb-4">
              KVKK ve GDPR kapsamında her kullanıcı aşağıdaki haklara sahiptir:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>Kişisel verilerine erişme</li>
              <li>Hatalı ya da eksik verilerin düzeltilmesini talep etme</li>
              <li>Verilerin silinmesini veya işlenmesinin kısıtlanmasını isteme</li>
              <li>İşlemeye itiraz etme</li>
              <li>Verilerini farklı bir hizmet sağlayıcısına taşıma (veri taşınabilirliği)</li>
              <li>Daha önce verdiği rızayı geri çekme</li>
            </ul>
            <p className="text-gray-700 mt-4">
              Bu hakları kullanmak için bizimle <strong>info@aipathy.xyz</strong> adresinden iletişime geçebilirsiniz.
            </p>
          </div>

          {/* 7. Çerezler ve İzleme Teknolojileri */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">7. Çerezler ve İzleme Teknolojileri</h2>
            <p className="text-gray-700">
              AIpathy, kullanıcı deneyimini iyileştirmek, performans ve kullanım verilerini analiz etmek için çerezler kullanır. 
              Kullanıcılar tarayıcı ayarları üzerinden çerez tercihlerini yönetebilir.
            </p>
          </div>

          {/* 8. Çocukların Gizliliği */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">8. Çocukların Gizliliği</h2>
            <p className="text-gray-700">
              AIpathy, 13 yaşından küçük çocuklardan bilerek bilgi toplamaz. Böyle bir durum tespit edilirse, 
              veriler derhal sistemden silinir.
            </p>
          </div>

          {/* 9. Üçüncü Taraf Servisler */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">9. Üçüncü Taraf Servisler</h2>
            <p className="text-gray-700">
              AIpathy platformunda kullanılan bazı üçüncü taraf hizmet sağlayıcılar (Google Gemini AI, ElevenLabs vb.) 
              kendi gizlilik politikalarına sahiptir. AIpathy, bu hizmet sağlayıcıların veri işleme yöntemlerinden 
              doğan sorumlulukları üstlenmez.
            </p>
          </div>

          {/* 10. Politika Güncellemeleri */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">10. Politika Güncellemeleri</h2>
            <p className="text-gray-700">
              Gizlilik Politikası zaman zaman güncellenebilir. Güncellemeler web sitemizde yayınlanır ve önemli 
              değişikliklerde kullanıcılar e-posta veya platform içi bildirim ile bilgilendirilir.
            </p>
          </div>

          {/* 11. İletişim */}
          <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-xl border border-emerald-200">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6 flex items-center gap-3">
              <Mail className="w-6 h-6" />
              11. İletişim
            </h2>
            <p className="text-gray-700 mb-4">
              Herhangi bir soru veya talebiniz için bizimle iletişime geçebilirsiniz:
            </p>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold">
              <Mail className="w-5 h-5" />
              <span>📧 E-posta: info@aipathy.xyz</span>
            </div>
          </div>

          {/* Sonuç */}
          <div className="bg-gradient-to-r from-emerald-100 to-green-100 rounded-3xl p-8 shadow-xl border border-emerald-300">
            <p className="text-gray-700 text-center font-medium">
              Bu politika ile AIpathy platformunu kullanarak, kişisel verilerinizin bu belge kapsamında işlenmesini kabul etmiş olursunuz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GizlilikPolitikasi; 