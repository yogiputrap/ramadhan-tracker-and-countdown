# Countdown Calculation Documentation

## Tanggal Ramadhan 1447H

### Penetapan Resmi:
- **Muhammadiyah**: 18 Februari 2026 (sudah ditetapkan)
- **Kemenag**: 19 Februari 2026 (perkiraan, menunggu rukyatul hilal)

### Tanggal yang Digunakan:
Aplikasi ini menggunakan **18 Februari 2026** (Muhammadiyah) sebagai tanggal target countdown.

## Perhitungan Countdown

### Logika Perhitungan:
```javascript
const now = new Date(); // Current time
const ramadanDate = new Date(2026, 1, 18, 0, 0, 0); // 18 Feb 2026, 00:00:00
// Note: Month is 0-indexed (0=Jan, 1=Feb, 2=Mar, etc.)

// Calculate exact time difference in milliseconds
const difference = ramadanDate.getTime() - now.getTime();

// Convert to days, hours, minutes, seconds
days = Math.floor(difference / (1000 * 60 * 60 * 24))
hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
minutes = Math.floor((difference / 1000 / 60) % 60)
seconds = Math.floor((difference / 1000) % 60)
```

### Mengapa Menggunakan Exact Time Counting?
1. **Akurat**: Menghitung waktu eksak hingga detik
2. **Real-time**: Countdown berjalan secara real-time
3. **Presisi**: Menampilkan sisa waktu yang tepat
4. **Standar**: Sesuai dengan countdown timer pada umumnya
5. **Timezone-aware**: Otomatis menggunakan timezone browser user
6. **Leap year safe**: JavaScript otomatis handle tahun kabisat

### Verifikasi Perhitungan:

**Dari 30 Januari 2026 00:00:00 ke 18 Februari 2026 00:00:00:**
- Total waktu: 19 hari, 0 jam, 0 menit, 0 detik
- Dalam milidetik: 19 × 24 × 60 × 60 × 1000 = 1,641,600,000 ms

**Dari 30 Januari 2026 03:39:33 ke 18 Februari 2026 00:00:00:**
- Total waktu: 18 hari, 20 jam, 20 menit, 27 detik
- Ini sesuai dengan referensi yang diberikan ✅

**Breakdown:**
- Sisa waktu di Jan 30: 20 jam 20 menit 27 detik (dari 03:39:33 ke 00:00:00)
- Hari penuh: 17 hari (Jan 31 - Feb 16)
- Total: 18 hari + 20 jam + 20 menit + 27 detik ✅

**Tahun Kabisat Check:**
- 2026 ÷ 4 = 506.5 (bukan kelipatan 4)
- 2026 BUKAN tahun kabisat
- Februari 2026 = 28 hari ✅

## Testing

### Manual Test:
```javascript
// Test dari 29 Januari 2026
const testDate = new Date(2026, 0, 29, 0, 0, 0); // 29 Jan 2026, 00:00:00
const ramadanDate = new Date(2026, 1, 18, 0, 0, 0); // 18 Feb 2026, 00:00:00

const diff = ramadanDate - testDate;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));

console.log(days); // Should be 20 days
```

### Expected Results (Exact Time Counting):
- **30 Jan 2026 00:00:00**: 19 hari, 0 jam, 0 menit, 0 detik ✅
- **30 Jan 2026 03:39:33**: 18 hari, 20 jam, 20 menit, 27 detik ✅
- **30 Jan 2026 12:00:00**: 18 hari, 12 jam, 0 menit, 0 detik ✅
- **31 Jan 2026 00:00:00**: 18 hari, 0 jam, 0 menit, 0 detik ✅
- **1 Feb 2026 00:00:00**: 17 hari, 0 jam, 0 menit, 0 detik ✅
- **17 Feb 2026 00:00:00**: 1 hari, 0 jam, 0 menit, 0 detik ✅
- **18 Feb 2026 00:00:00**: 0 hari, 0 jam, 0 menit, 0 detik (Ramadhan dimulai!) ✅

**Catatan**: Dengan exact time counting, countdown berjalan secara real-time dan menampilkan sisa waktu yang tepat hingga detik.

## Update Tanggal (Jika Diperlukan)

Jika Kemenag menetapkan tanggal berbeda (19 Februari 2026), update di:

### 1. src/app/page.tsx
```javascript
const ramadanDate = new Date(2026, 1, 19, 0, 0, 0); // 19 February 2026
```

### 2. src/app/page.tsx (display)
```javascript
date="19 Februari 2026"
```

### 3. src/components/ShareCard.tsx
```javascript
<p className="text-base md:text-xl font-semibold text-gray-800">19 Februari 2026</p>
```

## Notes

- **Days/Hours/Minutes/Seconds**: Semua menggunakan exact time countdown (real-time)
- Countdown menampilkan sisa waktu yang tepat hingga detik
- Countdown menggunakan waktu lokal browser user
- Update otomatis setiap detik
- Jika countdown selesai (difference < 0), akan menampilkan 0
- Tidak perlu konversi timezone manual karena Date object handle otomatis
- Contoh: Dari 30 Jan 2026 03:39:33 akan menampilkan "18 hari, 20 jam, 20 menit, 27 detik"

## Perbedaan Calendar Day vs Exact Time Counting

### Exact Time Counting (Implementasi Saat Ini):
- Jan 30, 2026 00:00:00 → 19 hari, 0 jam, 0 menit, 0 detik
- Jan 30, 2026 03:39:33 → 18 hari, 20 jam, 20 menit, 27 detik
- Jan 30, 2026 12:00:00 → 18 hari, 12 jam, 0 menit, 0 detik
- Jan 31, 2026 00:00:00 → 18 hari, 0 jam, 0 menit, 0 detik

### Calendar Day Counting (Implementasi Alternatif):
- Jan 30, 2026 00:00 → 19 hari
- Jan 30, 2026 12:00 → 19 hari (tetap)
- Jan 30, 2026 23:59 → 19 hari (tetap)
- Jan 31, 2026 00:00 → 18 hari (berubah di tengah malam)

**Kesimpulan**: Exact time counting lebih akurat dan presisi, menampilkan sisa waktu yang tepat hingga detik.

## References

- [JavaScript Date Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [Leap Year Calculation](https://en.wikipedia.org/wiki/Leap_year)
- Penetapan Ramadhan Muhammadiyah 1447H
