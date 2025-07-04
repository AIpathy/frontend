# 🟩 AIpathy Frontend Teknik Plan

## Genel Bakış

🟢 Canlı Demo: [https://seninsiten.com](https://seninsiten.com)

**AIpathy**, ses ve yüz mimiklerinden duygu analizi ile psikolojik test sonuçlarını birleştirerek ruh hali değerlendirmesi yapan; hem danışanlara hem de doktorlara özel arayüzler sunan, yenilikçi ve erişilebilir bir psikolojik destek platformudur.

---

## ⚙️ Teknoloji ve Yapı

| Alan              | Tercih / Açıklama                                                                             |
|-------------------|----------------------------------------------------------------------------------------------|
| **Framework**     | React.js                                                                                      |
| **Build Tool**    | Vite                                                                                          |
| **Stil**          | Tailwind CSS                                                                                  |
| **Yazı Tipi**     | Google Fonts – Montserrat                                                                     |
| **Renk Paleti**   | ![#1c1c1e](https://via.placeholder.com/10/1c1c1e/000000?text=+) `#1c1c1e` (arka plan), ![#30614F](https://via.placeholder.com/10/30614F/000000?text=+) `#30614F` (yeşil), ![#f5f5f5](https://via.placeholder.com/10/f5f5f5/000000?text=+) `#f5f5f5` (metin) |
| **Responsive**    | Tailwind Flex/Grid                                                                            |
| **Router**        | React Router DOM (giriş, kayıt, dashboard, vs.)                                               |
| **State Yönetimi**| useState + useEffect<br/>(İleri aşama: Context API)                                           |
| **Animasyon**     | Tailwind transition, hover effects                                                            |
| **Yayınlama**     | Plesk panel ile manuel dağıtım                                                                |

---

## 🖼️ Assets (Varlıklar)

| Dosya        | Açıklama                                         |
|--------------|--------------------------------------------------|
| `hero.png`   | Ana sayfa üst görseli (hero banner)              |
| `logo.png`   | Marka logosu (navbar ve kartlarda kullanılır)    |

---

## 🧩 Bileşenler (Components)

| Dosya                 | Açıklama                                               |
|-----------------------|--------------------------------------------------------|
| `Button.jsx`          | Ortak stilde buton bileşeni (CTA, form butonları)      |
| `Footer.jsx`          | Alt bilgi alanı (gizlilik, kaynak linkleri)            |
| `Header.jsx`          | Üst menü, logo, Giriş/Kayıt yönlendirme                |
| `Hero.jsx`            | Açılış metni, giriş cümlesi ve görsel alan             |
| `HeroInteractive.jsx` | Etkileşimli ana sayfa içeriği, kullanıcı yönlendirme   |

---

## 📁 Temel Dosyalar

| Dosya           | Açıklama                                           |
|-----------------|----------------------------------------------------|
| `App.jsx`       | Sayfaların bir araya geldiği kök bileşen           |
| `main.jsx`      | React DOM render noktası (`<App />`)               |
| `index.css`     | Tailwind’in import edildiği global stil dosyası    |
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

