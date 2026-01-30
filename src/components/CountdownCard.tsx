"use client";

import { motion } from "framer-motion";

interface CountdownCardProps {
  title: string;
  subtitle: string;
  days: number;
  date: string;
  delay?: number;
}

export default function CountdownCard({
  title,
  subtitle,
  days,
  date,
  delay = 0,
}: CountdownCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-card hover:shadow-card-hover transition-shadow duration-300 h-full flex flex-col justify-between"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-gray-500 text-xs md:text-sm mb-1">{subtitle}</p>
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 break-words">{title}</h3>
        </div>
        <div className="bg-primary-green text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap flex-shrink-0">
          {date}
        </div>
      </div>
      
      <div className="text-center flex-1 flex items-center justify-center py-4">
        <p className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900">
          In {days} days
        </p>
      </div>
    </motion.div>
  );
}
