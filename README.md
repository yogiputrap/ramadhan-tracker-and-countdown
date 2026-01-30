# Ramadhan Tracker and Countdown 1447H

Progressive Web App untuk countdown Ramadhan 1447H dengan fitur lengkap tracker aktivitas, jadwal sholat, doa-doa, dan kalkulator zakat.

## 🌙 Features

### 🏠 Home
- **Countdown Timer** - Hitung mundur menuju Ramadhan 1447H (18 Februari 2026)
  - Real-time countdown dengan days, hours, minutes, seconds
  - Exact time calculation untuk akurasi maksimal
- **Digital Clock** - Jam digital dengan tampilan pixel-style
- **Calendar View** - Kalender dinamis dengan highlight tanggal hari ini
- **Daily Quotes** - 30 kutipan Islami yang berganti setiap hari
- **Share Card** - Generate dan share countdown card ke sosial media

### 🤲 Doa
- **Kumpulan Doa Ramadhan** - 16 doa lengkap dengan:
  - Teks Arab asli
  - Transliterasi Latin
  - Terjemahan Bahasa Indonesia
- **Kategori Doa**:
  - Menyambut Ramadhan
  - Niat Puasa & Sahur
  - Berbuka Puasa
  - Lailatul Qadar
  - Setelah Tarawih
  - Zakat & Sedekah (Niat Zakat Fitrah, Doa Membayar Zakat, dll)
- **Filter Kategori** - Horizontal scrollable chips untuk navigasi mudah

### 📊 Tracker
- **Prayer Times** - Jadwal sholat otomatis berdasarkan lokasi
  - Auto-detect lokasi dengan Haversine formula
  - Manual city selection (14 kota besar Indonesia)
  - Reverse geocoding dengan OpenStreetMap
  - Real-time countdown ke sholat berikutnya
- **Activity Tracker** - Todo list aktivitas Ramadhan
  - Add, edit, delete tasks
  - Mark as complete
  - LocalStorage persistence

### 💰 Kalkulator Zakat & Fidyah
- **Zakat Fitrah Calculator**
  - Input jumlah anggota keluarga
  - Harga beras per orang (default: Rp47.000 BAZNAS 2025)
  - Info waktu pembayaran (Wajib, Afdal, Mubah)
  - Dalil Al-Quran (QS. Al-Baqarah: 43)
- **Zakat Mal Calculator**
  - Input total harta/penghasilan per tahun
  - Nisab checker (85 gram emas)
  - Auto-calculate 2.5% jika mencapai nisab
  - Dalil Al-Quran (QS. At-Taubah: 103)
- **Fidyah Calculator**
  - Input jumlah hari hutang puasa
  - Besaran fidyah per hari (default: Rp50.000)
  - Info siapa yang wajib bayar fidyah
  - Dalil Al-Quran (QS. Al-Baqarah: 184)
- **8 Golongan Penerima Zakat (Asnaf)**
  - Penjelasan lengkap setiap golongan
  - Dalil QS. At-Taubah: 60

### 📱 PWA Features
- **Install Prompt** - Notifikasi install app di mobile
- **Offline Support** - Service worker untuk caching
- **Home Screen Icon** - Install sebagai aplikasi native
- **Responsive Design** - Mobile-first, tablet, desktop optimized

## 🚀 Tech Stack

### Core
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Runtime**: Node.js

### Styling & UI
- **CSS Framework**: Tailwind CSS
- **Animation**: Framer Motion
- **Icons**: Heroicons (SVG)
- **Fonts**: Inter (UI), Amiri (Arabic)

### PWA & Performance
- **PWA**: Service Worker + Web Manifest
- **Image Generation**: html2canvas (Share Card)
- **Optimization**: CSS animations (lightweight, no heavy JS)

### APIs & Services
- **Prayer Times**: MyQuran API
- **Geocoding**: OpenStreetMap Nominatim API
- **Geolocation**: Browser Geolocation API
- **Device Orientation**: Gyroscope API (Qibla)

### Storage
- **LocalStorage**: Todo list, location preference, PWA prompt status

### Deployment
- **Platform**: Dokploy (Docker)
- **Container**: Docker with standalone output
- **Port**: 3000 (internal)

## 📱 Installation

### Development
```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:3002`

### Production Build
```bash
npm run build
npm start
```

### Docker Deployment
```bash
docker build -t ramadhan-app .
docker run -p 3000:3000 ramadhan-app
```

## 🎨 Design System

### Colors
- **Primary**: Spanish Green (#019147)
- **Accent**: Deep Saffron (#FF9822)
- **Background**: Gradient Gray (#f5f7fa → #e8ecf1)
- **Text**: Dark Gray (#1a1a1a)

### Typography
- **UI Font**: Inter (400, 500, 600, 700, 800)
- **Arabic Font**: Amiri (400, 700)

### Theme
- Clean, modern, minimalist
- Card-based layout
- Subtle shadows and gradients
- Smooth animations (0.2-0.3s duration)

## 📦 Project Structure

```
ramadhan-v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with PWA meta tags
│   │   ├── page.tsx         # Main page with routing
│   │   └── globals.css      # Global styles + animations
│   ├── components/
│   │   ├── CalendarCard.tsx      # Calendar with current date
│   │   ├── CountdownCard.tsx     # Main countdown display
│   │   ├── DigitalClock.tsx      # Digital clock widget
│   │   ├── TiltedQuoteCard.tsx   # Daily Islamic quotes
│   │   ├── FloatingNavbar.tsx    # Bottom navigation
│   │   ├── DoaSection.tsx        # Prayer collection
│   │   ├── TrackerSection.tsx    # Prayer times + todo list
│   │   ├── ZakatSection.tsx      # Zakat calculator
│   │   ├── ShareCard.tsx         # Social media share
│   │   └── InstallPrompt.tsx     # PWA install prompt
│   └── lib/
│       └── utils.ts              # Utility functions
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   ├── icon-192.png        # App icon 192x192
│   ├── icon-512.png        # App icon 512x512
│   └── apple-icon.png      # iOS app icon
├── Dockerfile              # Docker configuration
├── .dockerignore          # Docker ignore rules
├── COUNTDOWN_CALCULATION.md  # Countdown logic docs
├── ZAKAT_CALCULATOR.md       # Zakat calculator docs
├── PWA_SETUP.md             # PWA setup guide
├── DEPLOYMENT.md            # Deployment guide
└── package.json
```

## 🌐 PWA Features

Aplikasi ini adalah Progressive Web App yang bisa diinstall di mobile device:

### Android (Chrome/Edge)
1. Buka website di browser
2. Tunggu popup "Install Aplikasi"
3. Klik "Install"

### iOS (Safari)
1. Buka website di Safari
2. Tap Share button
3. Pilih "Add to Home Screen"

## 🔧 Configuration

### Environment Variables
```env
# Next.js
NEXT_PUBLIC_APP_URL=https://your-domain.com

# API Endpoints (using public APIs)
NEXT_PUBLIC_PRAYER_API=https://api.myquran.com/v2/sholat/jadwal
NEXT_PUBLIC_GEOCODING_API=https://nominatim.openstreetmap.org

# PWA Configuration
NEXT_PUBLIC_APP_NAME="Ramadhan 1447H Countdown"
NEXT_PUBLIC_APP_SHORT_NAME="Ramadhan 1447H"
NEXT_PUBLIC_THEME_COLOR="#019147"
```

### Prayer Times API
Menggunakan API dari MyQuran:
```
https://api.myquran.com/v2/sholat/jadwal/{city_id}/{year}/{month}/{date}
```

Mendukung 14 kota besar di Indonesia:
- Jakarta, Bandung, Surabaya, Yogyakarta
- Semarang, Medan, Makassar, Palembang
- Denpasar, Malang, Bogor, Depok
- Tangerang, Bekasi

### Geolocation
- **Prayer times**: Auto-detect kota terdekat dengan Haversine formula
- **Manual selection**: Modal untuk pilih kota manual
- **Reverse geocoding**: OpenStreetMap Nominatim API
- **Fallback**: Jakarta jika lokasi ditolak

### Zakat Calculator Standards
- **Zakat Fitrah**: Rp47.000/orang (BAZNAS 2025, Jabodetabek)
- **Nisab Zakat Mal**: 85 gram emas
- **Zakat Mal Rate**: 2.5% dari total harta
- **Fidyah**: Rp50.000/hari (BAZNAS 2025)

## 📝 LocalStorage

Data yang tersimpan di browser:
- `ramadhan-todos`: Activity tracker todo list
- `prayer-city-id`: Selected city ID for prayer times
- `prayer-city-name`: Selected city name
- `pwa-prompt-dismissed`: Status install prompt (timestamp)

## 🎯 Browser Support

### Desktop
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+

### Mobile
- ✅ Chrome Android 90+
- ✅ Safari iOS 14+
- ✅ Samsung Internet 14+
- ✅ Firefox Android 88+

### PWA Features Support
- ✅ Service Worker: All modern browsers
- ✅ Web Manifest: All modern browsers
- ✅ Install Prompt: Chrome/Edge Android, Safari iOS (manual)
- ✅ Geolocation: All modern browsers
- ⚠️ Gyroscope: Chrome/Safari (HTTPS required)

## 🚀 Performance

### Optimization Techniques
- CSS animations instead of JS (3x faster)
- Lightweight transitions (0.2-0.3s duration)
- Reduced animation delays (0.1s stagger)
- Will-change utilities for transform optimization
- Lazy loading for images
- Service worker caching for offline support

### Lighthouse Scores (Target)
- Performance: 90+
- Accessibility: 95+
- Best Practices: 95+
- SEO: 100
- PWA: 100

## 📚 Documentation

- [COUNTDOWN_CALCULATION.md](./COUNTDOWN_CALCULATION.md) - Countdown logic and calculation
- [ZAKAT_CALCULATOR.md](./ZAKAT_CALCULATOR.md) - Zakat calculator guide and references
- [PWA_SETUP.md](./PWA_SETUP.md) - PWA setup and configuration
- [DEPLOYMENT.md](./DEPLOYMENT.md) - Deployment guide for Dokploy
- [GENERATE_ICONS.md](./GENERATE_ICONS.md) - Icon generation guide

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 👨‍💻 Author

Created with ❤️ for Ramadhan 1447H

## 🙏 Acknowledgments

- **BAZNAS** - Zakat calculation standards
- **MyQuran API** - Prayer times data
- **OpenStreetMap** - Geocoding services
- **Muhammadiyah** - Ramadhan 1447H date determination

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For support, please open an issue in the GitHub repository.

## 🔮 Roadmap

### Future Enhancements
- [ ] Payment gateway integration for zakat
- [ ] Zakat history tracking
- [ ] Export zakat receipt
- [ ] Multi-language support (EN, AR)
- [ ] Dark mode
- [ ] Notification reminders
- [ ] Zakat profesi calculator
- [ ] Zakat perdagangan calculator

---

**Ramadhan Mubarak! 🌙✨**

**May this app help you prepare for and maximize the blessings of Ramadhan 1447H**
