"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const menuItems = [
  {
    id: "home",
    label: "Home",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    id: "doa",
    label: "Doa",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    id: "tracker",
    label: "Tracker",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "zakat",
    label: "Zakat",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
];

interface FloatingNavbarProps {
  activeMenu: string;
  onMenuChange: (menu: string) => void;
}

export default function FloatingNavbar({ activeMenu, onMenuChange }: FloatingNavbarProps) {

  return (
    <div className="fixed bottom-4 md:bottom-6 left-0 right-0 z-50 flex justify-center px-4">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-full shadow-2xl border border-gray-200/50 px-2 py-2.5 md:px-4 md:py-3">
          <div className="flex items-center justify-around gap-1">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => onMenuChange(item.id)}
                className={`relative flex flex-col items-center justify-center px-3 py-1.5 md:px-4 md:py-2 rounded-xl transition-all duration-300 min-w-[60px] md:min-w-[70px] ${
                  activeMenu === item.id
                    ? "text-primary-green"
                    : "text-gray-400 hover:text-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Active background */}
                {activeMenu === item.id && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-primary-green/10 rounded-xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                {/* Icon */}
                <div className="relative z-10 mb-0.5">
                  {item.icon}
                </div>
                
                {/* Label */}
                <span className="relative z-10 text-[10px] md:text-xs font-medium whitespace-nowrap">
                  {item.label}
                </span>
                
                {/* Active indicator dot */}
                {activeMenu === item.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-0.5 md:-top-1 left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-primary-green rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Shadow effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900/10 to-transparent blur-xl rounded-full" />
      </motion.div>
    </div>
  );
}

