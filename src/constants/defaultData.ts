import { CVData } from "../types/cv";

export const initialCVData: CVData = {
  name: "Daniel Thomson",
  contact:
    "testing@gmail.com | +62123433123 | linkedin.com/in/testing | github.com/testing",
  summary:
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatibus, mollitia. Repellat, similique necessitatibus, doloribus tempore ipsam iste nostrum velit voluptas, minus aut error. Aperiam, a? Soluta, sunt alias? Voluptatibus, iure.lorem. lorem  ipsum dolor sit, amet consectetur adipisicing elit.",
  education: [
    {
      title: "Undergraduate Student of Computer Science at BINUS University",
      date: "Sep 2022 – Jul 2026",
      subtitle: "Streaming Cyber Security",
      details:
        "- GPA: 3.95 / 4.0\n- Relevant Courses: Algorithm, Data Structure, Software Security, dll.",
    },
  ],
  experience: [
    {
      title: "PT Astra International Tbk",
      date: "Feb 2025 – Feb 2026",
      subtitle: "Software Engineer Internship",
      details:
        "- Developed and maintained applications based on business needs.\n- Performed bug fixing and troubleshooting.",
    },
  ],
  competitions: [
    {
      title: "HackFest 2024",
      date: "Jan 2024",
      subtitle: "Google Developer Student Clubs",
      details:
        "- Worked in a team to develop technological solutions, contributing ideas and collaborating to solve challenges.",
    },
  ],
  volunteers: [
    {
      title: "Mountain Fairy",
      date: "Nov 2023",
      subtitle: "",
      details:
        "- Participated in a tree-planting activity in Lembang, Bandung, as part of an environmental conservation effort.",
    },
  ],
  certifications: [
    {
      title: "The Complete 2024 Web Development Bootcamp (Udemy)",
      date: "Nov 2024",
      subtitle: "",
      details: "",
    },
  ],
  skills: {
    technical:
      "HTML, CSS, JavaScript, ReactJS, NextJS, Node.js, Express.js, PHP, Laravel, Git/GitHub.",
    soft: "Communication, Critical Thinking, Problem Solving, Team Work.",
  },
};
