"use client";

import { useEffect, useState } from "react";
import DigitalClock from "@/components/DigitalClock";
import CountdownCard from "@/components/CountdownCard";
import CalendarCard from "@/components/CalendarCard";
import TiltedQuoteCard from "@/components/TiltedQuoteCard";
import FloatingNavbar from "@/components/FloatingNavbar";
import DoaSection from "@/components/DoaSection";
import TrackerSection from "@/components/TrackerSection";
import ShareCard from "@/components/ShareCard";
import QiblaSection from "@/components/QiblaSection";
import InstallPrompt from "@/components/InstallPrompt";

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("home");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Get current time in Jakarta timezone
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
      const ramadanDate = new Date("2026-02-18T00:00:00");
      
      // Convert Ramadan date to Jakarta timezone
      const ramadanJakarta = new Date(ramadanDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
      
      const difference = ramadanJakarta.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, "0");
  const clockValue = `${formatTime(timeLeft.hours)}:${formatTime(timeLeft.minutes)}:${formatTime(timeLeft.seconds)}`;

  return (
    <>
      {activeMenu === "home" ? (
        <main className="min-h-screen p-4 md:p-8 lg:p-16 pb-32">
          <div className="max-w-7xl mx-auto space-y-4 md:space-y-6">
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Calendar Card */}
              <CalendarCard delay={0.1} />
              
              {/* Main Countdown Card */}
              <div className="lg:col-span-2">
                <CountdownCard
                  title="Ramadhan 1447H"
                  subtitle="Menuju bulan penuh berkah"
                  days={timeLeft.days}
                  date="18 Februari 2026"
                  delay={0.2}
                />
              </div>
            </div>
            
            {/* Digital Clock */}
            <DigitalClock value={clockValue} />
            
            {/* Tilted Quote Card */}
            <TiltedQuoteCard />
            
            {/* Share Card */}
            <ShareCard days={timeLeft.days} />
            
            {/* Footer */}
            <div className="text-center pt-4 md:pt-8 pb-4">
              <p className="text-gray-600 text-xs md:text-sm">
                Dibuat dengan ❤️ untuk menyambut Ramadhan 1447H
              </p>
            </div>
          </div>
        </main>
      ) : activeMenu === "doa" ? (
        <DoaSection />
      ) : activeMenu === "tracker" ? (
        <TrackerSection />
      ) : activeMenu === "qibla" ? (
        <QiblaSection />
      ) : (
        <main className="min-h-screen p-4 md:p-8 lg:p-16 pb-32">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-20">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Berita Ramadhan
              </h2>
              <p className="text-gray-600">Segera hadir...</p>
            </div>
          </div>
        </main>
      )}
      
      {/* Floating Navbar */}
      <FloatingNavbar activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      
      {/* Install Prompt */}
      <InstallPrompt />
    </>
  );
}
