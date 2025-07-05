# 🟩 AIpathy Frontend

## 🟢 Genel Bakış

🟢 **Canlı Demo**: [https://heuristic-yalow.162-55-2-145.plesk.page](https://heuristic-yalow.162-55-2-145.plesk.page)

**AIpathy**, ses ve yüz mimiklerinden duygu analizi ile psikolojik test sonuçlarını birleştirerek ruh hali değerlendirmesi yapan; hem danışanlara hem de doktorlara özel arayüzler sunan, yenilikçi ve erişilebilir bir psikolojik destek platformudur.

### ✨ Öne Çıkan Özellikler
- 🔐 **Dual Authentication**: Kullanıcı ve doktor girişi
- 📊 **Interactive Dashboards**: Gerçek zamanlı hasta takibi
- 🎤 **Voice Analysis**: Ses kaydı ve analizi
- 📷 **Facial Analysis**: Yüz mimik analizi
- 📋 **Psychological Tests**: PHQ-9, GAD-7 testleri
- 📈 **Real-time Statistics**: Detaylı raporlama
- 📱 **Responsive Design**: Mobil uyumlu arayüz

---

## ⚙️ Teknoloji Stack

| Alan              | Teknoloji / Açıklama                                                                             |
|-------------------|----------------------------------------------------------------------------------------------|
| **Framework**     | React.js 19.1.0                                                                                      |
| **Build Tool**    | Vite 7.0.0                                                                                          |
| **Styling**       | Tailwind CSS 4.1.11                                                                                  |
| **Router**        | React Router DOM 7.6.3                                                                               |
| **Icons**         | Lucide React 0.525.0                                                                                 |
| **Font**          | Google Fonts – Montserrat                                                                     |
| **Testing**       | Jest + React Testing Library                                                                         |
| **Deployment**    | Plesk Panel                                                                                          |

### 🎨 Tasarım Sistemi
- **Renk Paleti**: `#1c1c1e` (arka plan), `#30614F` (yeşil), `#f5f5f5` (metin)
- **Typography**: Montserrat font family
- **Responsive**: Tailwind Flex/Grid sistemleri
- **Animations**: Tailwind transitions ve hover effects

---

## 🖼️ Assets (Varlıklar)

| Dosya        | Açıklama                                         |
|--------------|--------------------------------------------------|
| `hero.png`   | Ana sayfa üst görseli (hero banner)              |
| `logo.png`   | Marka logosu (navbar ve kartlarda kullanılır)    |

---

## 🧩 Bileşenler (Components)

### 🔐 Kimlik Doğrulama
- **Auth.jsx** : Giriş/kayıt formu, form validasyonu, JWT token yönetimi

### 📊 Dashboard Sistemleri
- **Dashboard.jsx** : Kullanıcı dashboard'u, analiz sonuçları, istatistikler
- **DoctorDashboard.jsx** : Doktor dashboard'u, hasta yönetimi, alarm sistemi

### 🎨 UI Bileşenleri
- **Header.jsx**: Üst menü, logo, navigasyon
- **Footer.jsx**: Alt bilgi alanı, linkler
- **Button.jsx**: Ortak buton bileşeni
- **Hero.jsx**: Ana sayfa hero bölümü
- **HeroInteractive.jsx**: Etkileşimli ana sayfa içeriği
- **HeroDemo.jsx**: Demo animasyonları

---

## 📁 Temel Dosyalar

| Dosya           | Açıklama                                           |
|-----------------|----------------------------------------------------|
| `App.jsx`       | Sayfaların bir araya geldiği kök bileşen           |
| `main.jsx`      | React DOM render noktası (`<App />`)               |
| `index.css`     | Tailwind'in import edildiği global stil dosyası    |
| `index.html`    | HTML giriş noktası (`root` div içerir)             |

---

## 🛠️ Yapılandırma & Proje Dosyaları

| Dosya                 | Açıklama                                               |
|-----------------------|--------------------------------------------------------|
| `tailwind.config.js`  | Tailwind özel ayarları (renk, font, custom config)     |
| `postcss.config.mjs`  | Tailwind + autoprefixer ayarları                      |
| `package.json`        | Projede yüklü paketler ve script'ler                  |
| `package-lock.json`   | NPM bağımlılıklarının tam sürüm bilgisi               |
| `README.md`           | Proje açıklaması ve kurulum notları                    |

---

## 📂 Örnek Klasör Yapısı

```shell
src/
 ├── assets/
 │    ├── hero.png
 │    └── logo.png
 ├── components/
 │    ├── Button.jsx
 │    ├── Footer.jsx
 │    ├── Header.jsx
 │    ├── Hero.jsx
 │    └── HeroInteractive.jsx
 ├── App.jsx
 ├── main.jsx
 └── index.css
frontend/
 └── index.html
tailwind.config.js
postcss.config.mjs
package.json
package-lock.json
README.md


```

---

## 📡 API Entegrasyonu

### 📡 API Servis Sınıfı (api.js - 199 satır)
- **Authentication**: Login, register, token management
- **Patient Management**: Hasta listesi, detaylar, CRUD işlemleri
- **Analysis**: Ses, yüz, test analizleri
- **Dashboard**: İstatistikler ve raporlar
- **File Upload**: Ses/video dosya yükleme

### 🔗 Desteklenen Endpoint'ler
- `POST /auth/login` - Kullanıcı girişi
- `POST /auth/register` - Kullanıcı kaydı
- `GET /patients` - Hasta listesi (doktorlar için)
- `POST /analyses/voice` - Ses analizi
- `POST /analyses/facial` - Yüz analizi
- `POST /analyses/test` - Test analizi
- `GET /dashboard/stats` - Dashboard istatistikleri

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Kurulum
```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build önizleme
npm run preview
```

### Environment Variables
```env
VITE_API_URL=http://localhost:3001/api
```


## 📊 Özellikler

### 👥 Kullanıcı Özellikleri
- ✅ Ses analizi
- ✅ Yüz analizi
- ✅ Psikolojik test çözme
- ✅ Analiz geçmişi görüntüleme
- ✅ Kişisel dashboard

### 👨‍⚕️ Doktor Özellikleri
- ✅ Hasta listesi yönetimi
- ✅ Hasta detayları görüntüleme
- ✅ Analiz sonuçları takibi
- ✅ Risk seviyesi değerlendirmesi
- ✅ Alarm sistemi

### 🔧 Teknik Özellikler
- ✅ JWT tabanlı authentication
- ✅ Responsive design
- ✅ Modern UI/UX
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation

---

## 🛠️ Geliştirme


### Test Stratejisi
- Jest + React Testing Library
- Component testing
- API integration testing
- User interaction testing

---

## 📈 Deployment

### Deployment Platform
- **Platform**: Plesk Panel , Git CICD Operasyonu
- **URL**: https://heuristic-yalow.162-55-2-145.plesk.page
- **Status**: ✅ Canlı

---

## 📚 Dokümantasyon

- **API Documentation**: `API_DOCUMENTATION.md`
- **Setup Guide**: frontend/README.md

## Version

- **Proje**: AIpathy
- **Versiyon**: 1.0.0
- **Durum**: ✅ Production Ready
- **Son Güncelleme**: 2025

---

*Bu proje, modern web teknolojileri kullanılarak geliştirilmiş, kullanıcı dostu ve erişilebilir bir psikolojik destek platformudur.*