"use client";

import React from "react";

export function HeroIllustration() {
  return (
    <div className="relative w-36 h-24 sm:w-44 sm:h-28 md:w-48 md:h-28 flex items-center justify-center select-none pointer-events-none">
      {/* Background Soft Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-blue-500/15 to-transparent rounded-full blur-xl -z-10" />

      {/* Circular Exchange Arrows */}
      <div className="absolute inset-0 flex items-center justify-center">
        <svg
          viewBox="0 0 160 160"
          className="w-24 h-24 sm:w-28 sm:h-28 text-primary-500/90 dark:text-primary-400 animate-spin-slow"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          {/* Top Arc with Arrow */}
          <path
            d="M 40 50 A 46 46 0 0 1 120 50"
            strokeDasharray="4 2"
            opacity="0.25"
          />
          <path
            d="M 55 35 A 48 48 0 0 1 115 35"
            className="text-primary-500"
            strokeWidth="3.5"
          />
          <polygon
            points="114,28 126,36 114,44"
            fill="currentColor"
            stroke="none"
          />

          {/* Bottom Arc with Arrow */}
          <path
            d="M 120 110 A 46 46 0 0 1 40 110"
            strokeDasharray="4 2"
            opacity="0.25"
          />
          <path
            d="M 105 125 A 48 48 0 0 1 45 125"
            className="text-primary-500"
            strokeWidth="3.5"
          />
          <polygon
            points="46,132 34,124 46,116"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      </div>

      {/* Left Card: Cyrillic 'Я' */}
      <div className="absolute left-1 sm:left-2 top-2 sm:top-2 w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-md flex items-center justify-center -rotate-6">
        <span className="font-sans text-xl sm:text-2xl font-black text-slate-800 dark:text-white">
          Я
        </span>
        <span className="absolute bottom-1 text-[7px] sm:text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Кирилл
        </span>
      </div>

      {/* Right Card: Latin 'A' */}
      <div className="absolute right-1 sm:right-2 bottom-1 sm:bottom-1 w-12 h-14 sm:w-14 sm:h-16 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/90 dark:border-slate-700 shadow-md flex items-center justify-center rotate-6">
        <span className="font-sans text-xl sm:text-2xl font-black text-primary-600 dark:text-primary-400">
          A
        </span>
        <span className="absolute bottom-1 text-[7px] sm:text-[8px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Lotin
        </span>
      </div>
    </div>
  );
}
