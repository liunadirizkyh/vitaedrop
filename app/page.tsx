"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";

export default function Home() {
  const [cvData, setCvData] = useState({
    name: "LIUNADI RIZKY HIDAYAT",
    contact:
      "liunadi.hidayat@gmail.com | +6281224656654 | linkedin.com/in/liunadirizkyh | github.com/liunadirizkyh",
    summary:
      "As an undergraduate student in Computer Science, I am deeply passionate about technology advancement and have developed expertise in various programming languages. I have a strong interest in software development and cyber security, which drives my commitment to building secure and innovative solutions. I am eager to leverage my skills and enthusiasm to contribute effectively in the field of computer science. My dedication to learning and exploring new things motivates me to continually enhance my knowledge and capabilities.",
    education: [
      {
        title: "Undergraduate Student of Computer Science at BINUS University",
        date: "Sep 2022 – Jul 2026",
        subtitle: "Streaming Cyber Security",
        details:
          "- GPA: 3.80 / 4.0\n- Relevant Courses: Algorithm and Programming, Analysis Design and Algorithm, Data Structure, Database Technology, Mobile Penetration Testing, Network Penetration Testing, Object Oriented Programming, Server and Administration, Software Engineering, Software Security, etc.",
      },
      {
        title: "High School Diploma at SMAN 1 CIAMIS",
        date: "Jun 2019 – Jul 2022",
        subtitle: "Major Science and Mathematics",
        details:
          "- GPA: 98.53 / 100.00\n- Activities and Societies: Music Club Coordinator & Participant in Music Competitions",
      },
    ],
    experience: [
      {
        title: "PT Astra International Tbk - AstraWorld",
        date: "Feb 2025 – Feb 2026",
        subtitle: "Software Engineer Internship",
        details:
          "- Developed and maintained applications based on business needs to ensure optimal functionality and performance.\n- Analyzed and documented user requirements to align technical solutions with business objectives.\n- Performed bug fixing and troubleshooting to improve application stability and user experience.",
      },
      {
        title: "PT Bank Mandiri Tbk",
        date: "May 2024 – Jun 2024",
        subtitle:
          "Project-Based Virtual Intern: Mobile Apps Developer x Rakamin Academy",
        details:
          "- Developed a mobile app using Kotlin and Android Studio, focusing on API fetching functionality.\n- Completed the project efficiently within a short timeframe, applying effective problem-solving skills.\n- Acquired theoretical knowledge in iOS development, Git, MVVM architecture, and other.",
      },
    ],
    skills: {
      technical:
        "HTML, CSS, JavaScript, ReactJS, NextJS, Node.js, Express.js, PHP, Laravel, Git/GitHub.",
      soft: "Communication, Critical Thinking, Problem Solving, Team Work, Time Management.",
    },
  });

  const cvRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: cvRef,
    documentTitle: `CV_${cvData.name.replace(/\s+/g, "_")}`,
  });

  // Handler Basic
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setCvData({ ...cvData, [e.target.name]: e.target.value });
  };

  // Handler Skills
  const handleSkillChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    type: "technical" | "soft",
  ) => {
    setCvData({
      ...cvData,
      skills: { ...cvData.skills, [type]: e.target.value },
    });
  };

  // Handler Array (Education & Experience)
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

  return (
    <main className="min-h-screen flex flex-col xl:flex-row bg-zinc-50 font-sans">
      {/* LEFT: Form Input Section (Dibuat jadi 40%) */}
      <section className="w-full xl:w-[40%] bg-white border-r border-zinc-200 p-8 h-screen overflow-y-auto custom-scrollbar shadow-xl z-10 relative">
        <div className="max-w-md mx-auto pb-10">
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 text-zinc-900">
            VitaeDrop
          </h1>
          <p className="text-zinc-500 mb-8 text-sm">
            Update your details here, results appear in real-time.
          </p>

          <form className="space-y-8">
            {/* Bagian Identitas */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-800 border-b pb-1">
                Personal Information
              </h3>
              <InputField
                label="Full Name"
                name="name"
                value={cvData.name}
                onChange={handleChange}
              />
              <TextAreaField
                label="Contact Details (Separate with | )"
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

            {/* Bagian Education */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-800 border-b pb-1">
                Education
              </h3>
              {cvData.education.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-zinc-50 border border-zinc-200 rounded-md space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "education")}
                    className="absolute top-2 right-2 text-xs text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Delete
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
                    label="Date (e.g., Sep 2022 - Jul 2026)"
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
                className="w-full py-2 border-2 border-dashed border-zinc-300 text-zinc-600 rounded-md hover:bg-zinc-50 hover:border-zinc-400 transition-all text-sm font-semibold cursor-pointer"
              >
                + Add Education
              </button>
            </div>

            {/* Bagian Experience */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-800 border-b pb-1">
                Working Experience
              </h3>
              {cvData.experience.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 bg-zinc-50 border border-zinc-200 rounded-md space-y-3 relative group"
                >
                  <button
                    type="button"
                    onClick={() => removeArrayItem(index, "experience")}
                    className="absolute top-2 right-2 text-xs text-red-500 font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    Delete
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
                    label="Date (e.g., Feb 2025 - Feb 2026)"
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
                    label="Details (Job Description)"
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
                className="w-full py-2 border-2 border-dashed border-zinc-300 text-zinc-600 rounded-md hover:bg-zinc-50 hover:border-zinc-400 transition-all text-sm font-semibold cursor-pointer"
              >
                + Add Experience
              </button>
            </div>

            {/* Bagian Skills */}
            <div className="space-y-4">
              <h3 className="font-bold text-zinc-800 border-b pb-1">Skills</h3>
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

            {/* Tombol Download (Dipindah ke dalam form, di paling bawah) */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handlePrint}
                className="w-full bg-zinc-900 text-white font-medium py-4 rounded-md hover:bg-zinc-800 transition-colors shadow-lg cursor-pointer"
              >
                Download
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* RIGHT: Live Preview Section (Dibuat jadi 60%) */}
      <section className="w-full xl:w-[60%] bg-zinc-300 p-8 flex justify-center items-start h-screen overflow-y-auto">
        <div
          ref={cvRef}
          className="bg-white shadow-2xl print:shadow-none mx-auto min-h-[297mm] print:min-h-0 print:w-[210mm]"
          style={{ width: "210mm", padding: "12mm 15mm" }}
        >
          <div
            className="text-black text-[10.5pt] leading-[1.4]"
            style={{ fontFamily: '"Times New Roman", Times, serif' }}
          >
            {/* HEADER */}
            <div className="text-center mb-5">
              <h1 className="text-[14pt] font-bold uppercase tracking-wide">
                {cvData.name}
              </h1>
              <p className="mt-[2px]">{cvData.contact}</p>
            </div>

            {/* EXECUTIVE SUMMARY */}
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

            {/* EDUCATION */}
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

            {/* WORKING EXPERIENCES */}
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

            {/* SKILLS */}
            {(cvData.skills.technical || cvData.skills.soft) && (
              <div className="mb-4">
                <h2 className="text-[11pt] font-bold uppercase">Skills</h2>
                <hr className="border-black border-t-[1.5px] mt-[2px] mb-[4px]" />
                {cvData.skills.technical && (
                  <div>
                    <span className="font-bold">Technical Skill: </span>{" "}
                    {cvData.skills.technical}
                  </div>
                )}
                {cvData.skills.soft && (
                  <div className="mt-[2px]">
                    <span className="font-bold">Soft Skill: </span>{" "}
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

const InputField = ({ label, name, value, onChange }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
      {label}
    </label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-white border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all rounded-md text-sm text-zinc-800"
    />
  </div>
);

const TextAreaField = ({ label, name, value, onChange, rows }: any) => (
  <div className="space-y-1">
    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
      {label}
    </label>
    <textarea
      name={name}
      rows={rows}
      value={value}
      onChange={onChange}
      className="w-full px-3 py-2 bg-white border border-zinc-200 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900 outline-none transition-all rounded-md resize-none text-sm text-zinc-800"
    />
  </div>
);
