export interface Education {
  title: string;
  date: string;
  subtitle: string;
  details: string;
}

export interface Experience {
  title: string;
  date: string;
  subtitle: string;
  details: string;
}

export interface Competition {
  title: string;
  date: string;
  subtitle: string;
  details: string;
}

export interface Volunteer {
  title: string;
  date: string;
  subtitle: string;
  details: string;
}

export interface Certification {
  title: string;
  date: string;
  subtitle: string;
  details: string;
}

export interface Skills {
  technical: string;
  soft: string;
}

export interface CVData {
  name: string;
  contact: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  competitions: Competition[];
  volunteers: Volunteer[];
  certifications: Certification[];
  skills: Skills;
}
