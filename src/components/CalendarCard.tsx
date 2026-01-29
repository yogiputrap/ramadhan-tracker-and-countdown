"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CalendarCardProps {
  delay?: number;
}

export default function CalendarCard({ delay = 0 }: CalendarCardProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  useEffect(() => {
    // Update time every minute to keep it current
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  // Get Jakarta time
  const jakartaDate = new Date(currentDate.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dayNames = ["S", "M", "T", "W", "T", "F", "S"];
  
  const month = monthNames[jakartaDate.getMonth()];
  const year = jakartaDate.getFullYear();
  const today = jakartaDate.getDate();
  
  // Calculate which week contains today
  const firstDayOfMonth = new Date(jakartaDate.getFullYear(), jakartaDate.getMonth(), 1);
  const startingDayOfWeek = firstDayOfMonth.getDay(); // 0 = Sunday
  
  // Calculate which week row today falls in
  const todayPosition = startingDayOfWeek + today - 1;
  const weekRow = Math.floor(todayPosition / 7);
  
  // Calculate the start day for the week containing today
  const weekStartDay = (weekRow * 7) - startingDayOfWeek + 1;
  
  // Create array of 7 days for the week containing today
  const displayDays = [];
  for (let i = 0; i < 7; i++) {
    const day = weekStartDay + i;
    const lastDayOfMonth = new Date(jakartaDate.getFullYear(), jakartaDate.getMonth() + 1, 0).getDate();
    
    if (day >= 1 && day <= lastDayOfMonth) {
      displayDays.push(day);
    } else {
      displayDays.push(null);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-black text-white rounded-2xl md:rounded-3xl p-5 md:p-6 shadow-card"
    >
      <div className="text-center mb-3 md:mb-4">
        <p className="text-base md:text-lg font-semibold">{today} {month} {year}</p>
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 md:gap-2 mb-2 md:mb-3">
        {dayNames.map((day, i) => (
          <div key={i} className="text-center text-gray-500 text-xs font-medium">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1.5 md:gap-2">
        {displayDays.map((day, index) => (
          <div
            key={index}
            className={`text-center py-1.5 md:py-2 rounded-lg text-xs md:text-sm ${
              day === today
                ? "bg-accent-pink text-white font-bold"
                : day === null
                ? "text-transparent"
                : "text-gray-400"
            }`}
          >
            {day || "-"}
          </div>
        ))}
      </div>
      
      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-800">
        <div className="space-y-2 md:space-y-3">
          <div className="bg-white/10 rounded-xl p-2.5 md:p-3">
            <p className="text-xs md:text-sm font-semibold mb-0.5 md:mb-1">Ramadhan 1447H</p>
            <p className="text-xs text-gray-400">18 Feb - 19 Mar 2026</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
