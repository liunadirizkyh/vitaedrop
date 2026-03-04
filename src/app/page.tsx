"use client";

import React, { useRef, useState, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import LandingPage from "../components/LandingPage";
import CVForm from "../components/CVForm";
import CVPreview from "../components/CVPreview";
import { initialCVData } from "../constants/defaultData";
import { CVData } from "../types/cv";

declare global {
  interface Window {
    snap: any;
  }
}

export default function Home() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cvData, setCvData] = useState<CVData>(initialCVData);

  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `CV_${cvData.name.replace(/\s+/g, "_")}`,
    pageStyle: `
      @page {
        size: A4 portrait;
        margin: 0 !important;
      }
      @media print {
        html, body {
          height: initial !important;
          overflow: initial !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }
      }
    `,
  });

  useEffect(() => {
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
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_id: `CV-${Date.now()}`,
          gross_amount: 15000,
          customer_name: cvData.name,
        }),
      });

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

  if (!isGenerating) {
    return <LandingPage onStart={() => setIsGenerating(true)} />;
  }

  return (
    <main className="min-h-screen flex flex-col xl:flex-row bg-zinc-50 font-sans selection:bg-black selection:text-white">
      <CVForm
        cvData={cvData}
        setCvData={setCvData}
        onBack={() => setIsGenerating(false)}
        onCheckout={handleCheckout}
        isLoading={isLoading}
      />

      <CVPreview cvData={cvData} ref={cvRef} />
    </main>
  );
}
