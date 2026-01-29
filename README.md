# Ramadhan Tracker and Countdown 1447H

Progressive Web App untuk countdown Ramadhan 1447H dengan fitur lengkap tracker aktivitas, jadwal sholat, doa-doa, dan kompas kiblat.

## 🌙 Features

- **Countdown Timer** - Hitung mundur menuju Ramadhan 1447H (18 Februari 2026)
- **Digital Clock** - Jam digital dengan tampilan pixel-style
- **Calendar View** - Kalender dinamis dengan highlight tanggal hari ini
- **Daily Quotes** - 30 kutipan Islami yang berganti setiap hari
- **Prayer Times** - Jadwal sholat otomatis berdasarkan lokasi (API MyQuran)
- **Doa Collection** - Kumpulan doa Ramadhan lengkap dengan Arab, Latin, dan terjemahan
- **Activity Tracker** - Todo list aktivitas Ramadhan dengan localStorage
- **Qibla Compass** - Kompas kiblat menggunakan geolocation dan gyroscope
- **Share Card** - Generate dan share countdown card ke sosial media
- **PWA Support** - Install sebagai aplikasi di home screen (Android & iOS)

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **PWA**: Service Worker + Manifest
- **API**: MyQuran API (Prayer Times), OpenStreetMap (Geocoding)

## 📱 Installation

### Development
```bash
npm install
npm run dev
```

Server akan berjalan di `http://localhost:3002`

### Production
```bash
npm run build
npm start
```

## 🎨 Design System

- **Primary Color**: Spanish Green (#019147)
- **Accent Colors**: Deep Saffron (#FF9822), Pink (#FF3B6D)
- **Font**: Inter
- **Theme**: Clean, modern, minimalist

## 📦 Project Structure

```
ramadhan-v2/
├── src/
│   ├── app/
│   │   ├── layout.tsx       # Root layout with PWA meta tags
│   │   ├── page.tsx         # Main page with routing
│   │   └── globals.css      # Global styles
│   ├── components/
│   │   ├── CalendarCard.tsx
│   │   ├── CountdownCard.tsx
│   │   ├── DigitalClock.tsx
│   │   ├── TiltedQuoteCard.tsx
│   │   ├── FloatingNavbar.tsx
│   │   ├── DoaSection.tsx
│   │   ├── TrackerSection.tsx
│   │   ├── QiblaSection.tsx
│   │   ├── ShareCard.tsx
│   │   └── InstallPrompt.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   ├── manifest.json        # PWA manifest
│   ├── sw.js               # Service worker
│   ├── icon-192.png        # App icon 192x192
│   └── icon-512.png        # App icon 512x512
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

### Prayer Times API
Menggunakan API dari MyQuran:
```
https://api.myquran.com/v2/sholat/jadwal/{city_id}/{year}/{month}/{date}
```

Mendukung 15 kota besar di Indonesia dengan auto-detect lokasi.

### Geolocation
- Prayer times: Auto-detect kota terdekat
- Qibla compass: Real-time location dan device orientation
- Fallback: Jakarta jika lokasi ditolak

## 📝 LocalStorage

Data yang tersimpan di browser:
- `ramadhan-todos`: Activity tracker todo list
- `pwa-prompt-dismissed`: Status install prompt

## 🎯 Browser Support

- Chrome/Edge (Android): Full support
- Safari (iOS): Full support (manual PWA install)
- Firefox: Full support
- Opera: Full support

## 📄 License

MIT License - Feel free to use for personal or commercial projects

## 👨‍💻 Author

Created with ❤️ for Ramadhan 1447H

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 📞 Support

For support, please open an issue in the GitHub repository.

---

**Ramadhan Mubarak! 🌙✨**
