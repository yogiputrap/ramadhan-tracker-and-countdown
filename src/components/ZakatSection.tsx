"use client";

import { useState, useEffect } from "react";

type CalculatorType = "fitrah" | "mal" | "fidyah";

export default function ZakatSection() {
  const [activeCalculator, setActiveCalculator] = useState<CalculatorType>("fitrah");
  
  // Zakat Fitrah State
  const [jumlahAnggota, setJumlahAnggota] = useState<number>(1);
  const [hargaBeras, setHargaBeras] = useState<number>(47000);
  
  // Zakat Mal State
  const [totalHarta, setTotalHarta] = useState<number>(0);
  const [hargaEmas, setHargaEmas] = useState<number>(1200000); // per gram
  
  // Fidyah State
  const [jumlahHari, setJumlahHari] = useState<number>(1);
  const [besaranFidyah, setBesaranFidyah] = useState<number>(50000);
  
  // Calculations
  const zakatFitrah = jumlahAnggota * hargaBeras;
  const nisab = hargaEmas * 85; // 85 gram emas
  const zakatMal = totalHarta >= nisab ? totalHarta * 0.025 : 0;
  const totalFidyah = jumlahHari * besaranFidyah;
  
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="min-h-screen p-4 md:p-8 lg:p-16 pb-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8 opacity-0 animate-[fadeIn_0.3s_ease-out_forwards]">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Kalkulator Zakat & Fidyah
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Hitung zakat fitrah, zakat mal, dan fidyah dengan mudah sesuai ketentuan syariat
          </p>
        </div>

        {/* Calculator Type Selector */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 bg-white p-2 rounded-2xl shadow-md opacity-0 animate-[fadeIn_0.3s_ease-out_0.1s_forwards]">
          <button
            onClick={() => setActiveCalculator("fitrah")}
            className={`py-3 md:py-4 px-3 md:px-6 rounded-xl font-semibold text-xs md:text-base transition-all duration-200 ${
              activeCalculator === "fitrah"
                ? "bg-primary-green text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Zakat Fitrah
          </button>
          <button
            onClick={() => setActiveCalculator("mal")}
            className={`py-3 md:py-4 px-3 md:px-6 rounded-xl font-semibold text-xs md:text-base transition-all duration-200 ${
              activeCalculator === "mal"
                ? "bg-primary-green text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Zakat Mal
          </button>
          <button
            onClick={() => setActiveCalculator("fidyah")}
            className={`py-3 md:py-4 px-3 md:px-6 rounded-xl font-semibold text-xs md:text-base transition-all duration-200 ${
              activeCalculator === "fidyah"
                ? "bg-primary-green text-white shadow-lg"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            Fidyah
          </button>
        </div>

        {/* Calculator Content */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 opacity-0 animate-[fadeIn_0.3s_ease-out_0.2s_forwards]">
          {activeCalculator === "fitrah" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Zakat Fitrah</h2>
                <p className="text-gray-600 text-sm">
                  Zakat yang wajib dikeluarkan oleh setiap muslim menjelang Idul Fitri
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah Anggota Keluarga
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={jumlahAnggota}
                    onChange={(e) => setJumlahAnggota(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga Beras per Orang (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={hargaBeras}
                    onChange={(e) => setHargaBeras(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Setara 2,5 kg atau 3,5 liter beras. Default: Rp47.000 (BAZNAS 2025)
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-primary-green/10 to-primary-green/5 rounded-xl p-6 border-2 border-primary-green/20">
                <p className="text-sm font-semibold text-gray-700 mb-2">Total Zakat Fitrah</p>
                <p className="text-4xl font-bold text-primary-green">{formatRupiah(zakatFitrah)}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {jumlahAnggota} orang × {formatRupiah(hargaBeras)}
                </p>
              </div>

              {/* Info Waktu */}
              <div className="bg-accent-orange/10 rounded-xl p-4 border border-accent-orange/20">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Waktu Pembayaran
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• <strong>Wajib:</strong> Sebelum Shalat Idul Fitri</li>
                  <li>• <strong>Afdal:</strong> Sesudah Subuh hari raya</li>
                  <li>• <strong>Mubah:</strong> Sejak awal Ramadan</li>
                </ul>
              </div>

              {/* Dalil */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Dalil</h3>
                <p className="text-sm text-gray-700 italic mb-2">
                  "Dan dirikanlah shalat, tunaikanlah zakat dan ruku'lah beserta orang-orang yang ruku'."
                </p>
                <p className="text-xs text-gray-600">— QS. Al-Baqarah: 43</p>
              </div>
            </div>
          )}

          {activeCalculator === "mal" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Zakat Mal (Harta)</h2>
                <p className="text-gray-600 text-sm">
                  Zakat yang dikeluarkan dari harta yang telah mencapai nisab dan haul
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Total Harta/Penghasilan per Tahun (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="100000"
                    value={totalHarta}
                    onChange={(e) => setTotalHarta(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none text-lg"
                    placeholder="Contoh: 100000000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Harga Emas per Gram (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="10000"
                    value={hargaEmas}
                    onChange={(e) => setHargaEmas(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Nisab: 85 gram emas = {formatRupiah(nisab)}
                  </p>
                </div>
              </div>

              {/* Nisab Check */}
              <div className={`rounded-xl p-4 border-2 ${
                totalHarta >= nisab 
                  ? "bg-primary-green/10 border-primary-green/20" 
                  : "bg-gray-50 border-gray-200"
              }`}>
                <p className="text-sm font-semibold mb-1">
                  {totalHarta >= nisab ? "✓ Harta Anda Sudah Mencapai Nisab" : "✗ Harta Belum Mencapai Nisab"}
                </p>
                <p className="text-xs text-gray-600">
                  {totalHarta >= nisab 
                    ? "Anda wajib mengeluarkan zakat mal sebesar 2,5%" 
                    : "Zakat mal belum wajib karena belum mencapai nisab"}
                </p>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-primary-green/10 to-primary-green/5 rounded-xl p-6 border-2 border-primary-green/20">
                <p className="text-sm font-semibold text-gray-700 mb-2">Total Zakat Mal</p>
                <p className="text-4xl font-bold text-primary-green">{formatRupiah(zakatMal)}</p>
                {totalHarta >= nisab && (
                  <p className="text-xs text-gray-600 mt-2">
                    {formatRupiah(totalHarta)} × 2,5%
                  </p>
                )}
              </div>

              {/* Dalil */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Dalil</h3>
                <p className="text-sm text-gray-700 italic mb-2">
                  "Ambillah zakat dari sebagian harta mereka, dengan zakat itu kamu membersihkan dan mensucikan mereka..."
                </p>
                <p className="text-xs text-gray-600">— QS. At-Taubah: 103</p>
              </div>
            </div>
          )}

          {activeCalculator === "fidyah" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Fidyah</h2>
                <p className="text-gray-600 text-sm">
                  Denda bagi yang tidak mampu berpuasa karena uzur yang permanen
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Jumlah Hari Hutang Puasa
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="30"
                    value={jumlahHari}
                    onChange={(e) => setJumlahHari(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none text-lg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Besaran Fidyah per Hari (Rp)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="5000"
                    value={besaranFidyah}
                    onChange={(e) => setBesaranFidyah(Number(e.target.value))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary-green focus:outline-none text-lg"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Setara memberi makan 1 orang miskin. Default: Rp50.000 (BAZNAS 2025)
                  </p>
                </div>
              </div>

              {/* Result */}
              <div className="bg-gradient-to-br from-primary-green/10 to-primary-green/5 rounded-xl p-6 border-2 border-primary-green/20">
                <p className="text-sm font-semibold text-gray-700 mb-2">Total Fidyah</p>
                <p className="text-4xl font-bold text-primary-green">{formatRupiah(totalFidyah)}</p>
                <p className="text-xs text-gray-600 mt-2">
                  {jumlahHari} hari × {formatRupiah(besaranFidyah)}
                </p>
              </div>

              {/* Info */}
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Siapa yang Wajib Membayar Fidyah?
                </h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Orang tua yang sangat lemah</li>
                  <li>• Orang sakit yang tidak ada harapan sembuh</li>
                  <li>• Ibu hamil/menyusui yang khawatir pada janin/bayi</li>
                </ul>
              </div>

              {/* Dalil */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">Dalil</h3>
                <p className="text-sm text-gray-700 italic mb-2">
                  "Dan wajib bagi orang-orang yang berat menjalankannya (jika mereka tidak berpuasa) membayar fidyah, yaitu memberi makan seorang miskin."
                </p>
                <p className="text-xs text-gray-600">— QS. Al-Baqarah: 184</p>
              </div>
            </div>
          )}
        </div>

        {/* Penerima Zakat (8 Golongan) */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 opacity-0 animate-[fadeIn_0.3s_ease-out_0.3s_forwards]">
          <h2 className="text-xl font-bold text-gray-900 mb-4">8 Golongan Penerima Zakat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              { name: "Fakir", desc: "Tidak memiliki harta dan tenaga untuk memenuhi kebutuhan" },
              { name: "Miskin", desc: "Memiliki harta/tenaga namun tidak cukup untuk kebutuhan" },
              { name: "Amil", desc: "Panitia/pengurus zakat" },
              { name: "Mualaf", desc: "Orang yang baru masuk Islam" },
              { name: "Riqab", desc: "Budak yang ingin memerdekakan diri" },
              { name: "Gharim", desc: "Orang yang berutang untuk kebaikan" },
              { name: "Fisabilillah", desc: "Orang yang berjuang di jalan Allah" },
              { name: "Ibnu Sabil", desc: "Musafir yang kehabisan bekal" },
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <p className="font-semibold text-gray-900 text-sm">{index + 1}. {item.name}</p>
                <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-200">
            <p className="text-sm text-gray-700 italic mb-2">
              "Sesungguhnya zakat-zakat itu, hanyalah untuk orang-orang fakir, orang-orang miskin, pengurus-pengurus zakat, para mu'allaf yang dibujuk hatinya, untuk (memerdekakan) budak, orang-orang yang berhutang, untuk jalan Allah dan untuk mereka yang sedang dalam perjalanan..."
            </p>
            <p className="text-xs text-gray-600">— QS. At-Taubah: 60</p>
          </div>
        </div>
      </div>
    </main>
  );
}
