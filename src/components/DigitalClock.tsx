"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface DigitalClockProps {
  value: string;
}

const Pixel = ({ active }: { active: boolean }) => (
  <div
    className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-sm transition-all duration-300 ${
      active ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" : "bg-gray-700"
    }`}
  />
);

const DigitDisplay = ({ digit }: { digit: string }) => {
  const patterns: { [key: string]: boolean[][] } = {
    "0": [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ],
    "1": [
      [false, false, true, false, false],
      [false, true, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, true, true, true, false],
    ],
    "2": [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
    ],
    "3": [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ],
    "4": [
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
    ],
    "5": [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ],
    "6": [
      [true, true, true, true, true],
      [true, false, false, false, false],
      [true, false, false, false, false],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ],
    "7": [
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [false, false, false, true, false],
      [false, false, true, false, false],
      [false, true, false, false, false],
      [true, false, false, false, false],
    ],
    "8": [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
    ],
    "9": [
      [true, true, true, true, true],
      [true, false, false, false, true],
      [true, false, false, false, true],
      [true, true, true, true, true],
      [false, false, false, false, true],
      [false, false, false, false, true],
      [true, true, true, true, true],
    ],
    ":": [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
  };

  const pattern = patterns[digit] || patterns["0"];

  return (
    <div className="flex flex-col gap-0.5">
      {pattern.map((row, i) => (
        <div key={i} className="flex gap-0.5">
          {row.map((active, j) => (
            <Pixel key={j} active={active} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default function DigitalClock({ value }: DigitalClockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-black rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-card"
    >
      <div className="flex gap-2 md:gap-3 items-center justify-center">
        {value.split("").map((char, index) => (
          <DigitDisplay key={index} digit={char} />
        ))}
      </div>
    </motion.div>
  );
}
