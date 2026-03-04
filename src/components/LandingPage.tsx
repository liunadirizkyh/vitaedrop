"use client";

import { motion } from "framer-motion";
import React from "react";

interface LandingPageProps {
  onStart: () => void;
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  return (
    <div className="h-screen w-screen bg-[#fafafa] text-gray-900 font-sans overflow-hidden relative flex items-center justify-center selection:bg-black selection:text-white">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      ></div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden opacity-[0.02]">
        <h1 className="text-[25vw] font-black tracking-tighter uppercase whitespace-nowrap">
          VITAE
        </h1>
      </div>

      {/* 2. FLOATING WIDGETS (Bento Box Elements) */}

      {/* Top Left: ATS Feature Widget (Tanpa Card/Border) */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5, ease: customEasing }}
        className="absolute top-6 left-6 md:top-8 md:left-16 w-48 z-20 md:block"
      >
        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">
          Optimization
        </p>
        <p className="text-sm font-black uppercase">ATS Friendly</p>
        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.5, duration: 1 }}
            className="h-full bg-black rounded-full"
          ></motion.div>
        </div>
      </motion.div>

      {/* Top Right: Output Format */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: customEasing }}
        className="absolute top-6 right-6 md:top-8 md:right-16 text-right z-20 md:block"
      >
        <svg
          className="w-10 h-10 ml-auto mb-2 text-black opacity-20"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          ></path>
        </svg>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          Export Format
        </p>
        <p className="text-sm font-black uppercase text-black">High-Res PDF</p>
      </motion.div>

      {/* Bottom Left: Real-time Status (Tanpa Card/Border) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: customEasing }}
        className="absolute bottom-6 left-6 md:bottom-8 md:left-16 z-20 flex items-center gap-2"
      >
        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
        <p className="text-[10px] font-bold uppercase tracking-widest">
          Live Sync Active
        </p>
      </motion.div>

      {/* Bottom Right: Contact & Collaboration */}
      <motion.a
        href="mailto:liunadi.hidayat@gmail.com?subject=Hello Liunadi! Let's Collaborate"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8, ease: customEasing }}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-16 flex items-center gap-3 z-20 group cursor-pointer"
      >
        <div className="flex flex-col items-end">
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-black transition-colors text-right">
            Need Help
          </p>
          <p className="text-[8px] font-medium text-gray-400 group-hover:text-gray-600 transition-colors text-right">
            liunadi.hidayat@gmail.com
          </p>
        </div>
        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse group-hover:scale-125 transition-transform"></div>
      </motion.a>

      {/* 3. MAIN CENTRAL HERO */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: customEasing, delay: 0.2 }}
        className="relative z-30 w-full max-w-4xl px-6 flex flex-col items-center"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <motion.img
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, ease: "easeInOut", repeat: Infinity }}
          src="/vitaedrop.png"
          alt="VitaeDrop Logo"
          className="w-full max-w-[600px] h-auto object-contain drop-shadow-2xl mb-8 relative z-10"
        />
        <div className="overflow-hidden mb-12 text-center flex flex-col items-center">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: customEasing, delay: 0.8 }}
            className="text-sm md:text-xl font-black uppercase tracking-[0.4em] text-black mb-3"
          >
            Professional Generator
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xs md:text-sm text-gray-500 font-medium tracking-widest max-w-lg leading-relaxed uppercase"
          >
            Craft your perfect resume with real-time sync.{" "}
            <br className="hidden md:block" /> Designed for speed, privacy, and
            success.
          </motion.p>
        </div>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: customEasing }}
          onClick={onStart}
          className="group relative overflow-hidden bg-black text-white py-5 px-14 shadow-2xl hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          style={{ borderRadius: "2px" }}
        >
          <span className="relative z-10 flex items-center gap-4 text-xs md:text-sm font-black uppercase tracking-[0.2em]">
            Start Building
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <div className="absolute inset-0 h-full w-full translate-y-full transition-all duration-300 group-hover:translate-y-0 group-hover:bg-blue-600 z-0"></div>
        </motion.button>
      </motion.div>
    </div>
  );
}
