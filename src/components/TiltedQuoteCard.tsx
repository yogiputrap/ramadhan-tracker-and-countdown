"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const islamicQuotes = [
  {
    text: "Ramadhan adalah bulan penuh berkah. Persiapkan hatimu untuk menyambutnya dengan penuh keikhlasan.",
    author: "Hadits Riwayat Bukhari"
  },
  {
    text: "Barangsiapa berpuasa Ramadhan karena iman dan mengharap pahala, maka diampuni dosanya yang telah lalu.",
    author: "HR. Bukhari & Muslim"
  },
  {
    text: "Ramadhan bukan hanya tentang menahan lapar dan haus, tapi juga menahan hawa nafsu dan amarah.",
    author: "Nasihat Ulama"
  },
  {
    text: "Persiapkan dirimu dengan istighfar, agar Ramadhan menjadi bulan pengampunan bagimu.",
    author: "Mutiara Hikmah"
  },
  {
    text: "Ramadhan adalah bulan Al-Quran. Mulailah membiasakan diri membaca sejak sekarang.",
    author: "Nasihat Salaf"
  },
  {
    text: "Jangan tunggu Ramadhan untuk berbuat baik. Mulailah dari hari ini, niscaya Ramadhan akan lebih bermakna.",
    author: "Mutiara Hikmah"
  },
  {
    text: "Ramadhan mengajarkan kita untuk bersyukur atas nikmat yang selama ini kita miliki.",
    author: "Renungan Iman"
  },
  {
    text: "Persiapkan fisik dan mental untuk beribadah maksimal di bulan Ramadhan yang penuh berkah.",
    author: "Nasihat Bijak"
  },
  {
    text: "Ramadhan adalah momentum untuk memperbaiki hubungan dengan Allah dan sesama manusia.",
    author: "Mutiara Dakwah"
  },
  {
    text: "Setiap hari adalah anugerah untuk mendekatkan diri kepada-Nya. Manfaatkan dengan sebaik-baiknya.",
    author: "Renungan Harian"
  },
  {
    text: "Puasa bukan hanya menahan lapar, tapi melatih jiwa untuk mengendalikan diri dari segala yang dilarang Allah.",
    author: "Hikmah Ramadhan"
  },
  {
    text: "Di bulan Ramadhan, pintu surga dibuka, pintu neraka ditutup, dan setan dibelenggu. Manfaatkan kesempatan emas ini.",
    author: "HR. Bukhari & Muslim"
  },
  {
    text: "Ramadhan adalah bulan kesabaran, dan pahala kesabaran adalah surga.",
    author: "HR. Ibnu Khuzaimah"
  },
  {
    text: "Perbanyak sedekah menjelang Ramadhan, karena sedekah dapat menghapus dosa seperti air memadamkan api.",
    author: "HR. Tirmidzi"
  },
  {
    text: "Siapa yang memberi makan orang yang berpuasa, maka baginya pahala seperti pahala orang yang berpuasa.",
    author: "HR. Tirmidzi"
  },
  {
    text: "Ramadhan adalah bulan untuk memperbanyak tilawah Al-Quran dan tadabbur maknanya.",
    author: "Sunnah Rasulullah"
  },
  {
    text: "Jaga lisanmu di bulan Ramadhan, karena lisan yang tidak terjaga dapat merusak pahala puasa.",
    author: "Nasihat Ulama"
  },
  {
    text: "Ramadhan adalah waktu untuk introspeksi diri dan memperbaiki akhlak kepada sesama.",
    author: "Mutiara Hikmah"
  },
  {
    text: "Manfaatkan sepertiga malam terakhir Ramadhan untuk berdoa, karena itulah waktu mustajab.",
    author: "Sunnah Nabi"
  },
  {
    text: "Carilah Lailatul Qadr di 10 malam terakhir Ramadhan, malam yang lebih baik dari seribu bulan.",
    author: "QS. Al-Qadr"
  },
  {
    text: "Ramadhan mengajarkan kita empati kepada yang lapar dan yang kekurangan.",
    author: "Hikmah Puasa"
  },
  {
    text: "Perbanyak istighfar dan taubat menjelang Ramadhan, agar kita menyambutnya dengan hati yang bersih.",
    author: "Nasihat Salaf"
  },
  {
    text: "Ramadhan adalah bulan untuk meningkatkan kualitas ibadah dan mendekatkan diri kepada Allah.",
    author: "Mutiara Dakwah"
  },
  {
    text: "Jangan sia-siakan Ramadhan dengan hal-hal yang tidak bermanfaat. Manfaatkan setiap detiknya untuk beribadah.",
    author: "Nasihat Bijak"
  },
  {
    text: "Ramadhan adalah kesempatan untuk mengubah kebiasaan buruk menjadi kebiasaan baik.",
    author: "Renungan Iman"
  },
  {
    text: "Bersihkan hati dari dengki, iri, dan sifat buruk lainnya sebelum Ramadhan tiba.",
    author: "Mutiara Hikmah"
  },
  {
    text: "Ramadhan adalah bulan untuk memperkuat silaturahmi dan memaafkan kesalahan orang lain.",
    author: "Sunnah Nabi"
  },
  {
    text: "Persiapkan diri dengan memperbanyak ibadah sunnah sebelum Ramadhan, agar terbiasa saat Ramadhan tiba.",
    author: "Nasihat Ulama"
  },
  {
    text: "Ramadhan adalah momentum untuk meraih ampunan Allah. Jangan lewatkan kesempatan ini.",
    author: "Hikmah Ramadhan"
  },
  {
    text: "Niatkan puasa Ramadhan karena Allah semata, bukan karena tradisi atau ikut-ikutan.",
    author: "Mutiara Iman"
  },
];

export default function TiltedQuoteCard() {
  const [quote, setQuote] = useState(islamicQuotes[0]);

  useEffect(() => {
    // Get quote based on day of year
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
    );
    const quoteIndex = dayOfYear % islamicQuotes.length;
    setQuote(islamicQuotes[quoteIndex]);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="relative"
    >
      {/* Background decorative element */}
      <div className="absolute -inset-4 bg-gradient-to-br from-primary-green/20 to-accent-orange/20 rounded-3xl blur-2xl opacity-50" />
      
      {/* Main card with tilt effect */}
      <div className="relative transform hover:scale-[1.02] transition-transform duration-300">
        <div className="bg-gradient-to-br from-primary-green to-primary-green/90 rounded-3xl p-8 md:p-10 shadow-card hover:shadow-card-hover transition-shadow duration-300 transform rotate-[-0.5deg]">
          {/* Decorative corner elements */}
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-white/20 rounded-tr-2xl" />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-white/20 rounded-bl-2xl" />
          
          {/* Quote icon */}
          <div className="mb-6">
            <svg
              className="w-12 h-12 text-white/30"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 17h3l2-4V7H5v6h3zm8 0h3l2-4V7h-6v6h3z" />
            </svg>
          </div>
          
          {/* Quote text */}
          <blockquote className="relative z-10">
            <p className="text-white text-xl md:text-2xl font-medium leading-relaxed mb-6">
              "{quote.text}"
            </p>
            <footer className="flex items-center justify-between">
              <cite className="text-white/80 text-sm md:text-base not-italic font-medium">
                — {quote.author}
              </cite>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Quote Hari Ini</span>
              </div>
            </footer>
          </blockquote>
          
          {/* Decorative pattern */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
