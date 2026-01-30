# Kalkulator Zakat & Fidyah

## Overview

Fitur Kalkulator Zakat & Fidyah membantu pengguna menghitung kewajiban zakat dan fidyah sesuai dengan ketentuan syariat Islam. Fitur ini menggantikan menu Qibla di aplikasi.

## Fitur Utama

### 1. Zakat Fitrah
Zakat yang wajib dikeluarkan oleh setiap muslim menjelang Idul Fitri.

**Input:**
- Jumlah Anggota Keluarga
- Harga Beras per Orang (default: Rp47.000)

**Rumus:**
```
Total Zakat Fitrah = Jumlah Anggota × Harga Beras
```

**Standar:**
- Setara 2,5 kg atau 3,5 liter beras per orang
- BAZNAS 2025: Rp47.000 (Jabodetabek)
- Dapat disesuaikan dengan harga beras lokal

**Waktu Pembayaran:**
- **Wajib**: Sebelum Shalat Idul Fitri
- **Afdal (Paling Utama)**: Sesudah Shalat Subuh di hari raya
- **Mubah (Boleh)**: Sejak awal bulan Ramadan

**Dalil:**
> "Dan dirikanlah shalat, tunaikanlah zakat dan ruku'lah beserta orang-orang yang ruku'."
> 
> — QS. Al-Baqarah: 43

---

### 2. Zakat Mal (Harta)
Zakat yang dikeluarkan dari harta yang telah mencapai nisab dan haul (1 tahun).

**Input:**
- Total Harta/Penghasilan per Tahun
- Harga Emas per Gram (default: Rp1.200.000)

**Nisab:**
- Setara 85 gram emas
- Contoh: Jika harga emas Rp1.200.000/gram, maka nisab = Rp102.000.000

**Rumus:**
```
Nisab = Harga Emas × 85 gram
Zakat Mal = Total Harta × 2,5% (jika harta ≥ nisab)
```

**Syarat:**
- Harta telah mencapai nisab (85 gram emas)
- Telah dimiliki selama 1 tahun (haul)
- Harta produktif dan berkembang

**Dalil:**
> "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka..."
> 
> — QS. At-Taubah: 103

---

### 3. Fidyah
Denda bagi yang tidak mampu berpuasa karena uzur yang permanen.

**Input:**
- Jumlah Hari Hutang Puasa
- Besaran Fidyah per Hari (default: Rp50.000)

**Rumus:**
```
Total Fidyah = Jumlah Hari × Besaran Fidyah
```

**Standar:**
- Setara memberi makan 1 orang miskin per hari
- BAZNAS 2025: Rp45.000 - Rp60.000 per hari
- Dapat disesuaikan dengan kondisi lokal

**Siapa yang Wajib Membayar Fidyah?**
- Orang tua yang sangat lemah
- Orang sakit yang tidak ada harapan sembuh
- Ibu hamil/menyusui yang khawatir pada janin/bayi

**Dalil:**
> "Dan wajib bagi orang-orang yang berat menjalankannya (jika mereka tidak berpuasa) membayar fidyah, yaitu memberi makan seorang miskin."
> 
> — QS. Al-Baqarah: 184

---

## 8 Golongan Penerima Zakat (Asnaf)

Berdasarkan QS. At-Taubah: 60, zakat hanya boleh diberikan kepada 8 golongan:

1. **Fakir**: Tidak memiliki harta dan tenaga untuk memenuhi kebutuhan
2. **Miskin**: Memiliki harta/tenaga namun tidak cukup untuk kebutuhan
3. **Amil**: Panitia/pengurus zakat
4. **Mualaf**: Orang yang baru masuk Islam
5. **Riqab**: Budak yang ingin memerdekakan diri
6. **Gharim**: Orang yang berutang untuk kebaikan
7. **Fisabilillah**: Orang yang berjuang di jalan Allah
8. **Ibnu Sabil**: Musafir yang kehabisan bekal

**Dalil:**
> "Sesungguhnya zakat-zakat itu, hanyalah untuk orang-orang fakir, orang-orang miskin, pengurus-pengurus zakat, para mu'allaf yang dibujuk hatinya, untuk (memerdekakan) budak, orang-orang yang berhutang, untuk jalan Allah dan untuk mereka yang sedang dalam perjalanan..."
> 
> — QS. At-Taubah: 60

---

## Implementasi Teknis

### Component: `ZakatSection.tsx`

**State Management:**
```typescript
// Zakat Fitrah
const [jumlahAnggota, setJumlahAnggota] = useState<number>(1);
const [hargaBeras, setHargaBeras] = useState<number>(47000);

// Zakat Mal
const [totalHarta, setTotalHarta] = useState<number>(0);
const [hargaEmas, setHargaEmas] = useState<number>(1200000);

// Fidyah
const [jumlahHari, setJumlahHari] = useState<number>(1);
const [besaranFidyah, setBesaranFidyah] = useState<number>(50000);
```

**Calculations:**
```typescript
// Zakat Fitrah
const zakatFitrah = jumlahAnggota * hargaBeras;

// Zakat Mal
const nisab = hargaEmas * 85;
const zakatMal = totalHarta >= nisab ? totalHarta * 0.025 : 0;

// Fidyah
const totalFidyah = jumlahHari * besaranFidyah;
```

**Format Currency:**
```typescript
const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};
```

---

## UI/UX Features

### 1. Tab Navigation
- 3 tabs: Zakat Fitrah, Zakat Mal, Fidyah
- Active tab dengan background hijau
- Smooth transition antar tab

### 2. Input Fields
- Number input dengan validation
- Default values sesuai standar BAZNAS 2025
- Helper text untuk panduan pengguna

### 3. Result Display
- Large, prominent display untuk hasil perhitungan
- Format Rupiah yang jelas
- Breakdown perhitungan

### 4. Information Cards
- Waktu pembayaran (untuk Zakat Fitrah)
- Nisab checker (untuk Zakat Mal)
- Syarat pembayaran (untuk Fidyah)
- Dalil Al-Quran untuk setiap jenis zakat

### 5. 8 Golongan Penerima
- Grid layout responsive
- Deskripsi singkat untuk setiap golongan
- Dalil QS. At-Taubah: 60

---

## Referensi

### Sumber Hukum:
- Al-Quran: Al-Baqarah (43, 184), At-Taubah (60, 103)
- Hadits Nabi Muhammad SAW
- Fatwa MUI tentang Zakat

### Standar Perhitungan:
- BAZNAS (Badan Amil Zakat Nasional) 2025
- Harga emas: Antam/Pegadaian
- Harga beras: Pasar lokal

### Update Berkala:
- Harga emas: Update setiap bulan
- Harga beras: Update sesuai kondisi pasar
- Besaran fidyah: Update setiap tahun

---

## Testing

### Test Cases:

**Zakat Fitrah:**
```
Input: 4 anggota, Rp47.000/orang
Expected: Rp188.000
```

**Zakat Mal:**
```
Input: Rp100.000.000, Emas Rp1.200.000/gram
Nisab: Rp102.000.000
Expected: Rp0 (belum mencapai nisab)

Input: Rp150.000.000, Emas Rp1.200.000/gram
Nisab: Rp102.000.000
Expected: Rp3.750.000 (2,5% dari Rp150.000.000)
```

**Fidyah:**
```
Input: 5 hari, Rp50.000/hari
Expected: Rp250.000
```

---

## Future Enhancements

1. **Integrasi Payment Gateway**
   - Bayar zakat langsung dari aplikasi
   - Integrasi dengan BAZNAS/LAZ

2. **Reminder System**
   - Notifikasi waktu pembayaran zakat fitrah
   - Reminder haul untuk zakat mal

3. **History & Tracking**
   - Simpan riwayat pembayaran zakat
   - Export laporan tahunan

4. **Kalkulator Tambahan**
   - Zakat Profesi
   - Zakat Perdagangan
   - Zakat Pertanian

5. **Lokalisasi**
   - Auto-detect harga emas lokal
   - Auto-detect harga beras lokal
   - Multi-currency support

---

## Notes

- Semua perhitungan menggunakan standar BAZNAS 2025
- Harga dapat disesuaikan dengan kondisi lokal
- Konsultasikan dengan ulama/amil zakat untuk kasus khusus
- Fitur ini bersifat edukatif dan membantu perhitungan
- Pembayaran zakat tetap harus melalui amil/lembaga resmi

