import React, { forwardRef } from "react";
import { CVData } from "../types/cv";

interface CVPreviewProps {
  cvData: CVData;
}

const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(
  ({ cvData }, ref) => {
    return (
      <section className="w-full xl:w-[60%] bg-[#e5e5e5] p-4 xl:p-8 flex justify-start xl:justify-center items-start h-auto xl:h-screen overflow-x-auto xl:overflow-y-auto">
        <div
          ref={ref}
          className="bg-white shadow-2xl print:shadow-none min-w-[210mm] min-h-[297mm] print:min-h-0 print:min-w-0 print:w-[210mm] shrink-0 xl:mx-auto"
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
                    <div className="flex justify-between">
                      <span className="font-bold">{edu.title}</span>
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
                    <div className="flex justify-between">
                      <span className="font-bold">{exp.title}</span>
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

            {cvData.competitions.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">
                  Competition Experiences
                </h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                {cvData.competitions.map((comp, index) => (
                  <div key={index} className="mb-[6px]">
                    <div className="flex justify-between">
                      <span className="font-bold">{comp.title}</span>
                      <span>{comp.date}</span>
                    </div>
                    {comp.subtitle && <div>{comp.subtitle}</div>}
                    {comp.details && (
                      <div className="whitespace-pre-wrap ml-4">
                        {comp.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {cvData.volunteers.length > 0 && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">
                  Volunteer Experiences
                </h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                {cvData.volunteers.map((vol, index) => (
                  <div key={index} className="mb-[6px]">
                    <div className="flex justify-between">
                      <span className="font-bold">{vol.title}</span>
                      <span>{vol.date}</span>
                    </div>
                    {vol.subtitle && <div>{vol.subtitle}</div>}
                    {vol.details && (
                      <div className="whitespace-pre-wrap ml-4">
                        {vol.details}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {cvData.certifications.length > 0 && (
              <div className="mb-4">
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
    );
  },
);

CVPreview.displayName = "CVPreview";

export default CVPreview;
