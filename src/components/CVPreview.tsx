import React, { forwardRef, useEffect, useRef, useState } from "react";
import { CVData } from "../types/cv";

interface CVPreviewProps {
  cvData: CVData;
}

const CVContent = ({ cvData }: { cvData: CVData }) => (
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
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
        <h2 className="text-[11pt] font-bold uppercase">Executive Summary</h2>
        <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
        <p className="text-justify whitespace-pre-wrap">{cvData.summary}</p>
      </div>
    )}

    {cvData.education.length > 0 && (
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
        <h2 className="text-[11pt] font-bold uppercase">Education</h2>
        <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
        {cvData.education.map((edu, index) => (
          <div key={index} className="mb-[6px] break-inside-avoid" style={{ breakInside: "avoid" }}>
            <div className="flex justify-between">
              <span className="font-bold">{edu.title}</span>
              <span>{edu.date}</span>
            </div>
            <div>{edu.subtitle}</div>
            <div className="whitespace-pre-wrap ml-4">{edu.details}</div>
          </div>
        ))}
      </div>
    )}

    {cvData.experience.length > 0 && (
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
        <h2 className="text-[11pt] font-bold uppercase">Working Experiences</h2>
        <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
        {cvData.experience.map((exp, index) => (
          <div key={index} className="mb-[6px] break-inside-avoid" style={{ breakInside: "avoid" }}>
            <div className="flex justify-between">
              <span className="font-bold">{exp.title}</span>
              <span>{exp.date}</span>
            </div>
            <div>{exp.subtitle}</div>
            <div className="whitespace-pre-wrap ml-4">{exp.details}</div>
          </div>
        ))}
      </div>
    )}

    {cvData.competitions.length > 0 && (
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
        <h2 className="text-[11pt] font-bold uppercase">
          Competition Experiences
        </h2>
        <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
        {cvData.competitions.map((comp, index) => (
          <div key={index} className="mb-[6px] break-inside-avoid" style={{ breakInside: "avoid" }}>
            <div className="flex justify-between">
              <span className="font-bold">{comp.title}</span>
              <span>{comp.date}</span>
            </div>
            {comp.subtitle && <div>{comp.subtitle}</div>}
            {comp.details && (
              <div className="whitespace-pre-wrap ml-4">{comp.details}</div>
            )}
          </div>
        ))}
      </div>
    )}

    {cvData.volunteers.length > 0 && (
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
        <h2 className="text-[11pt] font-bold uppercase">
          Volunteer Experiences
        </h2>
        <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
        {cvData.volunteers.map((vol, index) => (
          <div key={index} className="mb-[6px] break-inside-avoid" style={{ breakInside: "avoid" }}>
            <div className="flex justify-between">
              <span className="font-bold">{vol.title}</span>
              <span>{vol.date}</span>
            </div>
            {vol.subtitle && <div>{vol.subtitle}</div>}
            {vol.details && (
              <div className="whitespace-pre-wrap ml-4">{vol.details}</div>
            )}
          </div>
        ))}
      </div>
    )}

    {cvData.certifications.length > 0 && (
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
        <h2 className="text-[11pt] font-bold uppercase">
          Certification & Trainning
        </h2>
        <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
        {cvData.certifications.map((cert, index) => (
          <div key={index} className="flex justify-between mb-[2px]">
            <span>- {cert.title}</span>
            <span>{cert.date}</span>
          </div>
        ))}
      </div>
    )}

    {(cvData.skills.technical || cvData.skills.soft) && (
      <div className="mb-4 break-inside-avoid" style={{ breakInside: "avoid" }}>
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
            <span className="font-bold">Soft: </span> {cvData.skills.soft}
          </div>
        )}
      </div>
    )}
  </div>
);

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ cvData }, outerRef) => {
    const [pages, setPages] = useState(1);
    const measureRef = useRef<HTMLDivElement>(null);

    const A4_WIDTH_MM = 210;
    const A4_HEIGHT_MM = 297;
    const MARGIN_V_MM = 12; // top and bottom margin
    const MARGIN_H_MM = 15; // left and right margin
    const CONTENT_WIDTH_MM = A4_WIDTH_MM - MARGIN_H_MM * 2; // 180mm
    const CONTENT_HEIGHT_MM = A4_HEIGHT_MM - MARGIN_V_MM * 2; // 273mm
    const GAP_MM = MARGIN_H_MM * 2; // 30mm (to match the margins when sliding)

    useEffect(() => {
      // Use a timeout to ensure fonts are loaded and DOM is fully laid out
      const timer = setTimeout(() => {
        if (!measureRef.current) return;
        // The most foolproof way: measure the total unstructured vertical height
        // and divide by the height of one A4 content window (273mm).
        const contentHeightPx = (measureRef.current.scrollHeight);
        const pageHeightPx = (CONTENT_HEIGHT_MM * 96) / 25.4;
        
        // Use a 30px epsilon to ignore subpixel line-height/margin overflow on the very last line
        const newPages = Math.max(1, Math.ceil((contentHeightPx - 30) / pageHeightPx));
        setPages(newPages);
      }, 100);

      // We also observe changes in height/content
      if (!measureRef.current) return () => clearTimeout(timer);
      const ro = new ResizeObserver((entries) => {
        for (const entry of entries) {
           const contentHeightPx = entry.target.scrollHeight;
           const pageHeightPx = (CONTENT_HEIGHT_MM * 96) / 25.4;
           // Generous 30px cut off to prevent blank pages from floating point/font bounding box issues
           const newPages = Math.max(1, Math.ceil((contentHeightPx - 30) / pageHeightPx));
           setPages(newPages);
        }
      });
      ro.observe(measureRef.current);

      return () => {
        clearTimeout(timer);
        ro.disconnect();
      };
    }, [cvData]);

    return (
      <section className="w-full xl:w-[60%] bg-[#e5e5e5] p-4 xl:p-8 flex flex-col items-center xl:items-center justify-start h-auto xl:h-screen overflow-x-auto xl:overflow-y-auto">
        {/* Invisible container to measure the natural linear height */}
        <div
          className="absolute opacity-0 pointer-events-none overflow-visible"
          style={{ width: `${CONTENT_WIDTH_MM}mm`, zIndex: -10, left: "-9999px", top: 0 }}
        >
          <div ref={measureRef} style={{ paddingBottom: '1px' }}>
            <CVContent cvData={cvData} />
          </div>
        </div>

        {/* The wrapper passed to react-to-print */}
        <div ref={outerRef} className="shrink-0 flex flex-col gap-8 print:block print:gap-0">
          
          {/* === SCREEN & PRINT VIEW (Paged UI) === */}
          <div className="flex flex-col gap-8 print:gap-0 items-center">
            {Array.from({ length: pages }).map((_, i) => (
              <div
                key={i}
                className="bg-white shadow-2xl print:shadow-none relative shrink-0 box-border overflow-hidden print:border-none print:m-0"
                style={{
                  width: `${A4_WIDTH_MM}mm`,
                  height: `${A4_HEIGHT_MM}mm`,
                  padding: `${MARGIN_V_MM}mm ${MARGIN_H_MM}mm`,
                  pageBreakAfter: i < pages - 1 ? "always" : "auto",
                  breakAfter: i < pages - 1 ? "page" : "auto",
                }}
              >
                {/* Visual Window */}
                <div className="relative w-full h-full">
                  {/* Sliding Column Container */}
                  <div
                    className="absolute"
                    style={{
                      columnWidth: `${CONTENT_WIDTH_MM}mm`,
                      columnGap: `${GAP_MM}mm`,
                      height: `${CONTENT_HEIGHT_MM}mm`,
                      columnFill: "auto",
                      transform: `translateX(-${i * (CONTENT_WIDTH_MM + GAP_MM)}mm)`,
                    }}
                  >
                    <CVContent cvData={cvData} />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    );
  },
);

CVPreview.displayName = "CVPreview";

export default CVPreview;
