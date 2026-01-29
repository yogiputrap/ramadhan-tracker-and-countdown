"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Doa {
  id: string;
  title: string;
  arabic: string;
  latin: string;
  translation: string;
  category: string;
}

const doaList: Doa[] = [
  {
    id: "1",
    title: "Doa Menyambut Ramadhan",
    arabic: "اَللّٰهُمَّ سَلِّمْنِيْ إِلَى رَمَضَانَ وَسَلِّمْ لِيْ رَمَضَانَ وَتَسَلَّمْهُ مِنِّيْ مُتَقَبَّلًا",
    latin: "Allahumma sallimnii ilaa ramadhaana wa sallim lii ramadhaana, wa tasallimhu minnii mutaqabbalan",
    translation: "Ya Allah, sampaikanlah aku ke bulan Ramadhan, sampaikan Ramadhan kepadaku, dan terimalah amal-amalku di bulan Ramadhan.",
    category: "Menyambut Ramadhan"
  },
  {
    id: "2",
    title: "Doa Melihat Hilal",
    arabic: "اَللّٰهُ أَكْبَرُ، اَللّٰهُمَّ أَهِلَّهُ عَلَيْنَا بِالْأَمْنِ وَالْإِيْمَانِ، وَالسَّلَامَةِ وَالْإِسْلَامِ، وَالتَّوْفِيْقِ لِمَا تُحِبُّ رَبَّنَا وَتَرْضَى",
    latin: "Allahu akbar, allahumma ahlilhu 'alainā bil-amni wal-īmāni, was-salāmati wal-islāmi, wat-taufīqi lima tuḥibbu rabbana wa tarḍā",
    translation: "Allah Maha Besar. Ya Allah, tampakkanlah bulan ini kepada kami dengan keamanan, keimanan, keselamatan, Islam, dan taufik untuk melakukan apa yang Engkau sukai dan ridhai.",
    category: "Menyambut Ramadhan"
  },
  {
    id: "3",
    title: "Niat Puasa Ramadhan",
    arabic: "نَوَيْتُ صَوْمَ غَدٍ عَنْ أَدَاءِ فَرْضِ شَهْرِ رَمَضَانَ هٰذِهِ السَّنَةِ لِلّٰهِ تَعَالَى",
    latin: "Nawaitu shauma ghadin 'an ada'i fardli syahri Ramadlâni hadzihis sanati lillahi ta'ala",
    translation: "Aku berniat puasa esok hari demi menunaikan kewajiban bulan Ramadhan tahun ini karena Allah ta'ala.",
    category: "Niat Puasa & Sahur"
  },
  {
    id: "4",
    title: "Niat Sahur",
    arabic: "نَوَيْتُ بِأَكْلِ هٰذَا الطَّعَامِ سُنَّةَ السَّحُوْرِ",
    latin: "Nawaitu bi akli haadza tha'aami sunnatan sahuri",
    translation: "Aku niat makan makanan ini sebagai sunnah sahur.",
    category: "Niat Puasa & Sahur"
  },
  {
    id: "5",
    title: "Doa Berbuka Puasa",
    arabic: "اَللّٰهُمَّ لَكَ صُمْتُ وَبِكَ آمَنْتُ وَعَلَى رِزْقِكَ أَفْطَرْتُ بِرَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِيْنَ",
    latin: "Allahumma laka shumtu wa bika aamantu wa 'ala rizqika aftartu birahmatika ya arhamarrahimin",
    translation: "Ya Allah, untuk-Mu aku berpuasa, dengan-Mu aku beriman, dan dengan rezeki-Mu aku berbuka, dengan rahmat-Mu wahai Zat yang paling penyayang.",
    category: "Berbuka Puasa"
  },
  {
    id: "6",
    title: "Doa Setelah Berbuka",
    arabic: "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوْقُ وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللّٰهُ",
    latin: "Dzahaba zhzhomaa u, wabtallatil 'uruuqu, wa tsabatal ajru insyaa Allahu",
    translation: "Telah hilang dahaga, urat-urat telah basah, dan pahala tetap insya Allah.",
    category: "Berbuka Puasa"
  },
  {
    id: "7",
    title: "Doa Lailatul Qadar",
    arabic: "اَللّٰهُمَّ إِنَّكَ عَفُوٌّ تُحِبُّ الْعَفْوَ فَاعْفُ عَنِّيْ",
    latin: "Allahumma innaka 'afuwwun tuhibbul 'afwa fa'fu 'anni",
    translation: "Ya Allah, sesungguhnya Engkau Maha Pemaaf, suka memaafkan, maka maafkanlah diriku.",
    category: "Lailatul Qadar"
  },
  {
    id: "8",
    title: "Doa Malam Ramadhan",
    arabic: "اَللّٰهُمَّ إِنَّا نَسْأَلُكَ رِضَاكَ وَالْجَنَّةَ، وَنَعُوْذُ بِكَ مِنْ سَخَطِكَ وَالنَّارِ",
    latin: "Allahumma innā nas aluka ridhooka wal jannata, wa na'uudzubika min sakhothika wannaar",
    translation: "Ya Allah, kami memohon keridhaan-Mu dan surga, dan berlindung kepada-Mu dari murka-Mu dan neraka.",
    category: "Lailatul Qadar"
  },
  {
    id: "9",
    title: "Doa Setelah Witir",
    arabic: "سُبْحَانَ الْمَلِكِ الْقُدُّوْسِ",
    latin: "Subhaanal malikil qudduus",
    translation: "Maha Suci Tuhan Yang Maha Suci (dibaca 3x).",
    category: "Setelah Tarawih"
  },
  {
    id: "10",
    title: "Doa Setelah Salat Tarawih",
    arabic: "رَبَّنَا تَقَبَّلْ مِنَّا إِنَّكَ أَنْتَ السَّمِيْعُ الْعَلِيْمُ وَتُبْ عَلَيْنَا إِنَّكَ أَنْتَ التَّوَّابُ الرَّحِيْمُ",
    latin: "Rabbana taqabbal minna innaka antas-sami'ul 'alim wa tub 'alayna innaka antat-tawwabur-rahim",
    translation: "Ya Tuhan kami, terimalah amal kami, sesungguhnya Engkau Maha Mendengar lagi Maha Mengetahui, dan terimalah taubat kami, sesungguhnya Engkau Maha Penerima Taubat lagi Maha Penyayang.",
    category: "Setelah Tarawih"
  }
];

const categories = [
  "Semua",
  "Menyambut Ramadhan",
  "Niat Puasa & Sahur",
  "Berbuka Puasa",
  "Lailatul Qadar",
  "Setelah Tarawih"
];

export default function DoaSection() {
  const [selectedCategory, setSelectedCategory] = useState("Semua");

  const filteredDoas = selectedCategory === "Semua" 
    ? doaList 
    : doaList.filter(doa => doa.category === selectedCategory);

  return (
    <div className="min-h-screen p-4 md:p-8 lg:p-16 pb-32">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 md:mb-4">
            Kumpulan Doa Ramadhan
          </h1>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
            Doa-doa penting untuk menyambut dan menjalani bulan suci Ramadhan dengan penuh berkah
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-6 md:mb-8"
        >
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 md:px-5 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary-green text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-gray-100 shadow-md"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Doa Cards */}
        <div className="space-y-4 md:space-y-6">
          {filteredDoas.map((doa, index) => (
            <motion.div
              key={doa.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300"
            >
              {/* Category Badge */}
              <div className="flex items-start justify-between mb-4 md:mb-6">
                <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-primary-green/10 text-primary-green rounded-full text-xs md:text-sm font-semibold">
                  {doa.category}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">
                {doa.title}
              </h3>

              {/* Arabic Text */}
              <div className="mb-4 md:mb-6 p-4 md:p-6 bg-gradient-to-br from-primary-green/5 to-accent-orange/5 rounded-xl md:rounded-2xl">
                <p className="text-right text-xl md:text-2xl lg:text-3xl leading-loose md:leading-loose text-gray-900 font-arabic">
                  {doa.arabic}
                </p>
              </div>

              {/* Latin Text */}
              <div className="mb-3 md:mb-4 p-3 md:p-4 bg-gray-50 rounded-xl">
                <p className="text-sm md:text-base text-gray-700 italic leading-relaxed">
                  {doa.latin}
                </p>
              </div>

              {/* Translation */}
              <div className="flex items-start gap-2 md:gap-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-5 h-5 md:w-6 md:h-6 text-primary-green" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs md:text-sm font-semibold text-gray-500 mb-1">Artinya:</p>
                  <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                    {doa.translation}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDoas.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 md:py-16"
          >
            <p className="text-gray-500 text-sm md:text-base">
              Tidak ada doa dalam kategori ini
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
