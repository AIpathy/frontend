# AIpathy Frontend

## Proje Özeti

AIpathy, ses ve yüz mimiklerinden duygu analizi ile psikolojik test sonuçlarını birleştirerek ruh hali değerlendirmesi yapan; hem danışanlara hem de doktorlara özel arayüzler sunan bir psikolojik destek platformudur.

## Kullanılan Teknolojiler

- React.js 19.1.0
- Vite 7.0.0
- Tailwind CSS 4.1.11
- React Router DOM 7.6.3
- Lucide React 0.525.0
- Jest + React Testing Library
- GitHub Actions (CI/CD, otomatik deploy)
- GitHub Pages (statik hosting)

## Kurulum ve Geliştirme

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Kurulum

```bash
npm install
```

### Geliştirme Sunucusu

```bash
npm run dev
```

- Localde çalışırken uygulama `http://localhost:5173/` adresinde açılır.

### Production Build

```bash
npm run build
```

- Build edilen dosyalar `dist/` klasörüne çıkar.
- Vite base path otomatik olarak localde `/`, productionda `/frontend/` olur.

### Build Önizleme

```bash
npm run preview
```

## Router ve Base Path Ayarı

- Vite config dosyasında base path dinamik olarak ayarlanır:
  ```js
  base: process.env.NODE_ENV === 'production' ? '/frontend/' : '/',
  ```
- React Router'da basename ayarı yapılmalı:
  ```jsx
  <Router basename={import.meta.env.BASE_URL}>
  ```

## Otomatik Deploy (GitHub Pages)

- `.github/workflows/deploy.yml` ile GitHub Actions üzerinden otomatik build ve deploy yapılır.
- GitHub Pages ayarlarında **Source: GitHub Actions** seçili olmalı.
- Main branch'e push sonrası otomatik olarak site güncellenir.
- Canlı demo: [https://aipathy.github.io/frontend/](https://aipathy.github.io/frontend/)