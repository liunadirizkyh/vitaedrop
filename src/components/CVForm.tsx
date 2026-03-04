"use client";

import React from "react";
import InputField from "./ui/InputField";
import TextAreaField from "./ui/TextAreaField";
import { CVData } from "../types/cv";

interface CVFormProps {
  cvData: CVData;
  setCvData: React.Dispatch<React.SetStateAction<CVData>>;
  onBack: () => void;
  onCheckout: () => void;
  isLoading: boolean;
}

type ArrayFieldType =
  | "education"
  | "experience"
  | "competitions"
  | "volunteers"
  | "certifications";

export default function CVForm({
  cvData,
  setCvData,
  onBack,
  onCheckout,
  isLoading,
}: CVFormProps) {
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
    type: ArrayFieldType,
  ) => {
    const newArray = [...cvData[type]] as any;
    newArray[index] = { ...newArray[index], [e.target.name]: e.target.value };
    setCvData({ ...cvData, [type]: newArray });
  };

  const addArrayItem = (type: ArrayFieldType) => {
    setCvData({
      ...cvData,
      [type]: [
        ...cvData[type],
        { title: "", date: "", subtitle: "", details: "" },
      ],
    });
  };

  const removeArrayItem = (index: number, type: ArrayFieldType) => {
    const newArray = [...cvData[type]];
    newArray.splice(index, 1);
    setCvData({ ...cvData, [type]: newArray });
  };

  return (
    <section className="w-full xl:w-[40%] bg-white border-r border-zinc-200 p-6 xl:p-8 h-auto xl:h-screen xl:overflow-y-auto custom-scrollbar shadow-xl z-10 relative">
      <div className="max-w-md mx-auto pb-10">
        <button
          onClick={onBack}
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
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold hover:text-red-700 transition-colors cursor-pointer"
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
              Working Experience
            </h3>
            {cvData.experience.map((exp, index) => (
              <div
                key={index}
                className="p-5 bg-[#fafafa] border border-gray-200 rounded-xl space-y-4 relative group"
              >
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, "experience")}
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold hover:text-red-700 transition-colors cursor-pointer"
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
              Competition Experiences
            </h3>
            {cvData.competitions.map((comp, index) => (
              <div
                key={index}
                className="p-5 bg-[#fafafa] border border-gray-200 rounded-xl space-y-4 relative group"
              >
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, "competitions")}
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold hover:text-red-700 transition-colors cursor-pointer"
                >
                  Remove
                </button>
                <InputField
                  label="Competition Name"
                  name="title"
                  value={comp.title}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "competitions")
                  }
                />
                <InputField
                  label="Date"
                  name="date"
                  value={comp.date}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "competitions")
                  }
                />
                <InputField
                  label="Organizer / Host"
                  name="subtitle"
                  value={comp.subtitle}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "competitions")
                  }
                />
                <TextAreaField
                  label="Details & Achievements"
                  name="details"
                  value={comp.details}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "competitions")
                  }
                  rows={4}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("competitions")}
              className="w-full py-3 border border-gray-300 text-black rounded-xl hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              + Add Competition
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-black border-b border-gray-200 pb-2 uppercase tracking-widest text-xs">
              Volunteer Experiences
            </h3>
            {cvData.volunteers.map((vol, index) => (
              <div
                key={index}
                className="p-5 bg-[#fafafa] border border-gray-200 rounded-xl space-y-4 relative group"
              >
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, "volunteers")}
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold hover:text-red-700 transition-colors cursor-pointer"
                >
                  Remove
                </button>
                <InputField
                  label="Program Name"
                  name="title"
                  value={vol.title}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "volunteers")
                  }
                />
                <InputField
                  label="Date"
                  name="date"
                  value={vol.date}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "volunteers")
                  }
                />
                <InputField
                  label="Organizer (Optional)"
                  name="subtitle"
                  value={vol.subtitle}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "volunteers")
                  }
                />
                <TextAreaField
                  label="Activity Details"
                  name="details"
                  value={vol.details}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "volunteers")
                  }
                  rows={4}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("volunteers")}
              className="w-full py-3 border border-gray-300 text-black rounded-xl hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              + Add Volunteer
            </button>
          </div>

          <div className="space-y-4">
            <h3 className="font-bold text-black border-b border-gray-200 pb-2 uppercase tracking-widest text-xs">
              Certification & Trainning
            </h3>
            {cvData.certifications.map((cert, index) => (
              <div
                key={index}
                className="p-5 bg-[#fafafa] border border-gray-200 rounded-xl space-y-4 relative group"
              >
                <button
                  type="button"
                  onClick={() => removeArrayItem(index, "certifications")}
                  className="absolute top-4 right-4 text-[10px] uppercase tracking-widest text-red-500 font-bold hover:text-red-700 transition-colors cursor-pointer"
                >
                  Remove
                </button>
                <InputField
                  label="Certification Title (+ Issuer)"
                  name="title"
                  value={cert.title}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "certifications")
                  }
                />
                <InputField
                  label="Date"
                  name="date"
                  value={cert.date}
                  onChange={(e: any) =>
                    handleArrayChange(e, index, "certifications")
                  }
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem("certifications")}
              className="w-full py-3 border border-gray-300 text-black rounded-xl hover:bg-black hover:text-white transition-all text-xs font-bold uppercase tracking-widest cursor-pointer"
            >
              + Add Certification
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

          <div className="pt-6">
            <div className="mb-4 p-4 bg-gray-100 border border-gray-200 rounded-xl text-gray-600 text-[11px] md:text-xs text-center font-medium leading-relaxed">
              For optimal ATS-friendly results without browser watermarks,
              please download via Desktop/Laptop.
            </div>
            <button
              type="button"
              disabled={isLoading}
              onClick={onCheckout}
              className="w-full bg-black text-white font-bold uppercase tracking-widest py-4 rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-black/20 cursor-pointer disabled:bg-gray-400 disabled:cursor-wait"
            >
              Download PDF
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
