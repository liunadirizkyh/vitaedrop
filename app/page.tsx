"use client";

import { motion } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";

// Tambahkan deklarasi agar TypeScript tidak error memanggil window.snap
declare global {
  interface Window {
    snap: any;
  }
}

export default function Home() {
  // ==============================
  // 1. STATE UNTUK GENERATOR CV
  // ==============================
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState({
    name: "LIUNADI RIZKY HIDAYAT",
    contact:
      "liunadi.hidayat@gmail.com | +6281224656654 | linkedin.com/in/liunadirizkyh | github.com/liunadirizkyh",
    summary:
      "As an undergraduate student in Computer Science, I am deeply passionate about technology advancement and have developed expertise in various programming languages. I have a strong interest in software development and cyber security, which drives my commitment to building secure and innovative solutions.",
    education: [
      {
        title: "Undergraduate Student of Computer Science at BINUS University",
        date: "Sep 2022 – Jul 2026",
        subtitle: "Streaming Cyber Security",
        details:
          "- GPA: 3.80 / 4.0\n- Relevant Courses: Algorithm, Data Structure, Software Security, dll.",
      },
    ],
    experience: [
      {
        title: "PT Astra International Tbk - AstraWorld",
        date: "Feb 2025 – Feb 2026",
        subtitle: "Software Engineer Internship",
        details:
          "- Developed and maintained applications based on business needs.\n- Performed bug fixing and troubleshooting.",
      },
    ],
    skills: {
      technical:
        "HTML, CSS, JavaScript, ReactJS, NextJS, Node.js, Express.js, PHP, Laravel, Git/GitHub.",
      soft: "Communication, Critical Thinking, Problem Solving, Team Work.",
    },
  });

  const cvRef = useRef<HTMLDivElement>(null);

  // Logic Print ke PDF
  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `CV_${cvData.name.replace(/\s+/g, "_")}`,
  });

  // ==========================================
  // 2. MIDTRANS INTEGRATION
  // ==========================================

  useEffect(() => {
    // Memuat script Snap Midtrans
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
    const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";

    const script = document.createElement("script");
    script.src = snapScript;
    script.setAttribute("data-client-key", clientKey);
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // MENGGUNAKAN PATH /api/payment SESUAI STRUKTUR FOLDER KAMU
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: `CV-${Date.now()}`,
          gross_amount: 15000,
          customer_name: cvData.name,
        }),
      });

      // Cek jika response bukan JSON (mencegah error <!DOCTYPE)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error(
          "Server tidak memberikan respon JSON. Pastikan API Route sudah benar.",
        );
      }

      const data = await response.json();

      if (data.token) {
        window.snap.pay(data.token, {
          onSuccess: function (result: any) {
            handlePrint();
            setIsLoading(false);
          },
          onPending: function () {
            alert("Selesaikan pembayaran anda.");
            setIsLoading(false);
          },
          onError: function () {
            alert("Pembayaran Gagal.");
            setIsLoading(false);
          },
          onClose: function () {
            alert("Anda menutup pembayaran.");
            setIsLoading(false);
          },
        });
      } else {
        alert("Gagal mengambil token. Cek terminal Next.js kamu.");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Terjadi kesalahan sistem. Cek console browser.");
      setIsLoading(false);
    }
  };

  // ==========================================
  // 3. HANDLERS (LOGIC INPUT)
  // ==========================================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCvData({ ...cvData, [e.target.name]: e.target.value });
  };

  const handleSkillChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "technical" | "soft",
  ) => {
    setCvData({
      ...cvData,
      skills: { ...cvData.skills, [type]: e.target.value },
    });
  };

  const handleArrayChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    type: "education" | "experience",
  ) => {
    const newArray = [...cvData[type]];
    newArray[index] = { ...newArray[index], [e.target.name]: e.target.value };
    setCvData({ ...cvData, [type]: newArray });
  };

  const addArrayItem = (type: "education" | "experience") => {
    setCvData({
      ...cvData,
      [type]: [
        ...cvData[type],
        { title: "", date: "", subtitle: "", details: "" },
      ],
    });
  };

  const removeArrayItem = (index: number, type: "education" | "experience") => {
    const newArray = [...cvData[type]];
    newArray.splice(index, 1);
    setCvData({ ...cvData, [type]: newArray });
  };

  const customEasing: [number, number, number, number] = [0.16, 1, 0.3, 1];

  // ==========================================
  // RENDER VIEW 1: LANDING PAGE
  // ==========================================
  if (!isGenerating) {
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

        {/* Top Left: ATS Feature Widget */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: customEasing }}
          className="absolute top-6 left-6 md:top-8 md:left-16 bg-white border border-gray-200 p-4 rounded-2xl shadow-xl w-48 z-20 md:block"
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
          <p className="text-sm font-black uppercase text-black">
            High-Res PDF
          </p>
        </motion.div>

        {/* Bottom Left: Real-time Status */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: customEasing }}
          className="absolute bottom-6 left-6 md:bottom-8 md:left-16 bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm z-20 flex items-center gap-2"
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
              <br className="hidden md:block" /> Designed for speed, privacy,
              and success.
            </motion.p>
          </div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: customEasing }}
            onClick={() => setIsGenerating(true)}
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

  // ==========================================
  // RENDER VIEW 2: CV GENERATOR
  // ==========================================
  return (
    <main className="min-h-screen flex flex-col xl:flex-row bg-zinc-50 font-sans selection:bg-black selection:text-white">
      {/* LEFT: Form Input Section */}
      <section className="w-full xl:w-[40%] bg-white border-r border-zinc-200 p-8 h-screen overflow-y-auto custom-scrollbar shadow-xl z-10 relative">
        <div className="max-w-md mx-auto pb-10">
          <button
            onClick={() => setIsGenerating(false)}
            className="text-gray-500 hover:text-black text-[10px] uppercase tracking-widest font-bold mb-8 flex items-center transition-colors cursor-pointer"
          >
            &larr; Back
          </button>
          <h1 className="text-3xl font-black tracking-tighter uppercase mb-2 text-gray-900">
            Setup CV
          </h1>
          <p className="text-gray-400 font-medium text-xs uppercase tracking-wider mb-8">
            Update details below, results appear realtime.
          </p>

          <form className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-bold text-black border-b border-gray-200 pb-2 uppercase tracking-widest text-xs">
                Personal Info
              </h3>
              <InputField
                label="Full Name"
                name="name"
                value={cvData.name}
                onChange={handleChange}
              />
              <TextAreaField
                label="Contact (Separate with |)"
                name="contact"
                value={cvData.contact}
                onChange={handleChange}
                rows={2}
              />
              <TextAreaField
                label="Executive Summary"
                name="summary"
                value={cvData.summary}
                onChange={handleChange}
                rows={5}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-black border-b border-gray-200 pb-2 uppercase tracking-widest text-xs">
                Education
              </h3>
              {cvData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#fafafa] border border-gray-200 rounded-xl space-y-4 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "education")}
                    className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Remove
                  </button>
                  <InputField
                    label="School / University"
                    name="title"
                    value={edu.title}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "education")
                    }
                  />
                  <InputField
                    label="Date"
                    name="date"
                    value={edu.date}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "education")
                    }
                  />
                  <InputField
                    label="Major / Degree"
                    name="subtitle"
                    value={edu.subtitle}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "education")
                    }
                  />
                  <TextAreaField
                    label="Details (GPA, Courses, etc.)"
                    name="details"
                    value={edu.details}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "education")
                    }
                    rows={3}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("education")}
                className="w-full py-3 border border-gray-300 text-black rounded-xl hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                + Add Education
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-black border-b border-gray-200 pb-2 uppercase tracking-widest text-xs">
                Experience
              </h3>
              {cvData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="p-5 bg-[#fafafa] border border-gray-200 rounded-xl space-y-4 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "experience")}
                    className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Remove
                  </button>
                  <InputField
                    label="Company Name"
                    name="title"
                    value={exp.title}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "experience")
                    }
                  />
                  <InputField
                    label="Date"
                    name="date"
                    value={exp.date}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "experience")
                    }
                  />
                  <InputField
                    label="Role / Position"
                    name="subtitle"
                    value={exp.subtitle}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "experience")
                    }
                  />
                  <TextAreaField
                    label="Job Description"
                    name="details"
                    value={exp.details}
                    onChange={(e: any) =>
                      handleArrayChange(e, index, "experience")
                    }
                    rows={4}
                  />
                </div>
              ))}
              <button
                type="button"
                onClick={() => addArrayItem("experience")}
                className="w-full py-3 border border-gray-300 text-black rounded-xl hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
              >
                + Add Experience
              </button>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-black border-b border-gray-200 pb-2 uppercase tracking-widest text-xs">
                Skills
              </h3>
              <TextAreaField
                label="Technical Skills"
                value={cvData.skills.technical}
                onChange={(e: any) => handleSkillChange(e, "technical")}
                rows={3}
              />
              <TextAreaField
                label="Soft Skills"
                value={cvData.skills.soft}
                onChange={(e: any) => handleSkillChange(e, "soft")}
                rows={2}
              />
            </div>

            {/* TOMBOL BAYAR & DOWNLOAD */}
            <div className="pt-6">
              <button
                type="button"
                disabled={isLoading}
                onClick={handleCheckout}
                className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-black/20 cursor-pointer disabled:bg-gray-400 disabled:cursor-wait"
              >
                Download PDF
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* RIGHT: Live Preview Section */}
      <section className="w-full xl:w-[60%] bg-[#e5e5e5] p-8 flex justify-center items-start h-screen overflow-y-auto">
        <div
          ref={cvRef}
          className="bg-white shadow-2xl print:shadow-none mx-auto min-h-[297mm] print:min-h-0 print:w-[210mm]"
          style={{ width: "210mm", padding: "12mm 15mm" }}
        >
          <div
            className="text-black text-[10.5pt] leading-[1.4]"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            <div className="text-center mb-5">
              <h1 className="text-[14pt] font-bold uppercase tracking-wide">
                {cvData.name}
              </h1>
              <p className="mt-[2px]">{cvData.contact}</p>
            </div>
            {cvData.summary && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">
                  Executive Summary
                </h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                <p className="text-justify whitespace-pre-wrap">
                  {cvData.summary}
                </p>
              </div>
            )}
            {cvData.education.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">Education</h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                {cvData.education.map((edu, index) => (
                  <div key={index} className="mb-[6px]">
                    <div className="flex justify-between font-bold">
                      <span>{edu.title}</span>
                      <span>{edu.date}</span>
                    </div>
                    <div>{edu.subtitle}</div>
                    <div className="whitespace-pre-wrap ml-4">
                      {edu.details}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {cvData.experience.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">
                  Working Experiences
                </h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                {cvData.experience.map((exp, index) => (
                  <div key={index} className="mb-[6px]">
                    <div className="flex justify-between font-bold">
                      <span>{exp.title}</span>
                      <span>{exp.date}</span>
                    </div>
                    <div>{exp.subtitle}</div>
                    <div className="whitespace-pre-wrap ml-4">
                      {exp.details}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {(cvData.skills.technical || cvData.skills.soft) && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">Skills</h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                {cvData.skills.technical && (
                  <div>
                    <span className="font-bold">Technical: </span>{" "}
                    {cvData.skills.technical}
                  </div>
                )}
                {cvData.skills.soft && (
                  <div className="mt-[2px]">
                    <span className="font-bold">Soft: </span>{" "}
                    {cvData.skills.soft}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// Components
const InputField = ({ label, name, value, onChange }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black outline-none transition-all rounded-xl text-sm text-black"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, rows }: any) => (
  <div className="space-y-1.5">
    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
      {label}
    </label>
    <textarea
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 bg-white border border-gray-200 focus:border-black outline-none transition-all rounded-xl resize-none text-sm text-black"
    />
  </div>
);
