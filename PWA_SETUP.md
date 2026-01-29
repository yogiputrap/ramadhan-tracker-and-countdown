# Progressive Web App (PWA) Setup

Aplikasi Ramadhan 1447H sekarang sudah menjadi Progressive Web App yang bisa diinstall di mobile device!

## Fitur PWA yang Sudah Diimplementasi

### ✅ 1. Manifest.json
- Nama aplikasi: "Ramadhan 1447H Countdown"
- Short name: "Ramadhan 1447H"
- Theme color: #019147 (Primary Green)
- Display mode: standalone (fullscreen tanpa browser UI)
- Icons: 192x192 dan 512x512 PNG

### ✅ 2. Service Worker
- Caching strategy: Network first, fallback to cache
- Offline support untuk halaman yang sudah dikunjungi
- Auto-update cache saat ada perubahan

### ✅ 3. Install Prompt Component
- **Android/Chrome**: Menampilkan prompt install otomatis
- **iOS/Safari**: Menampilkan instruksi manual untuk "Add to Home Screen"
- Prompt muncul 3 detik setelah halaman load
- Bisa dismiss dan tidak akan muncul lagi (tersimpan di localStorage)

### ✅ 4. Meta Tags
- Apple Web App capable
- Theme color untuk status bar
- Viewport configuration untuk mobile
- Apple touch icon

## Cara Install di Mobile

### Android (Chrome/Edge)
1. Buka website di Chrome/Edge
2. Tunggu beberapa detik, akan muncul popup "Install Aplikasi"
3. Klik tombol "Install"
4. Aplikasi akan muncul di home screen

### iOS (Safari)
1. Buka website di Safari
2. Tap tombol Share (kotak dengan panah ke atas)
3. Scroll dan pilih "Add to Home Screen"
4. Tap "Add"
5. Aplikasi akan muncul di home screen

## Testing PWA

### Local Testing
1. Buka Chrome DevTools (F12)
2. Pergi ke tab "Application"
3. Check:
   - Manifest: Pastikan semua field terisi
   - Service Workers: Pastikan status "activated and running"
   - Icons: Pastikan icon 192x192 dan 512x512 ada

### Lighthouse Audit
1. Buka Chrome DevTools
2. Pergi ke tab "Lighthouse"
3. Select "Progressive Web App"
4. Click "Generate report"
5. Target score: 90+ untuk PWA

## Features yang Bekerja Offline
- Home page dengan countdown
- Calendar view
- Quotes (yang sudah di-cache)
- Todo list (tersimpan di localStorage)

## Features yang Butuh Internet
- Prayer times API
- Qibla compass (butuh geolocation)
- Reverse geocoding untuk nama lokasi

## Troubleshooting

### Install prompt tidak muncul?
- Pastikan menggunakan HTTPS (atau localhost untuk development)
- Clear browser cache dan reload
- Check console untuk error
- Pastikan manifest.json dan service worker ter-load dengan benar

### iOS tidak bisa install?
- iOS hanya support install via Safari
- Tidak ada auto-prompt di iOS, harus manual via Share button
- Pastikan sudah add meta tag apple-mobile-web-app-capable

### Service worker tidak update?
- Hard refresh (Ctrl+Shift+R atau Cmd+Shift+R)
- Unregister service worker di DevTools > Application > Service Workers
- Clear cache dan reload

## Production Deployment

Untuk production, pastikan:
1. ✅ HTTPS enabled (required untuk PWA)
2. ✅ Manifest.json accessible di root
3. ✅ Service worker registered
4. ✅ Icons tersedia di public folder
5. ✅ Meta tags lengkap di layout.tsx

## Next Steps (Optional Improvements)

- [ ] Add push notifications untuk reminder sholat
- [ ] Add background sync untuk offline todo updates
- [ ] Add app shortcuts di manifest
- [ ] Add share target untuk share dari app lain
- [ ] Optimize caching strategy per route
- [ ] Add update notification saat ada versi baru
