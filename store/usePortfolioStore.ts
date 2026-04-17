'use client';

import { create } from 'zustand';

export interface Project {
  title: string;
  description: string;
  github: string;
  live: string;
  proficiency?: number;
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Contact {
  email: string;
  linkedin: string;
  github: string;
  twitter: string;
}

export interface PortfolioStore {
  name: string;
  bio: string;
  avatar: string;
  skills: string[];
  projects: Project[];
  education: Education[];
  contact: Contact;
  template: 'minimal' | 'cards' | 'dark';

  // Actions
  setField: (key: keyof Omit<PortfolioStore, keyof { setField: any; addProject: any; updateProject: any; removeProject: any; addSkill: any; removeSkill: any; setTemplate: any; loadFromDB: any; }>, value: any) => void;
  addProject: () => void;
  updateProject: (index: number, field: keyof Project, value: string | number) => void;
  removeProject: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setTemplate: (template: 'minimal' | 'cards' | 'dark') => void;
  loadFromDB: (data: Partial<PortfolioStore>) => void;
  updateContact: (field: keyof Contact, value: string) => void;
  addEducation: () => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  removeEducation: (index: number) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  name: '',
  bio: '',
  avatar: '',
  skills: [],
  projects: [],
  education: [],
  contact: { email: '', linkedin: '', github: '', twitter: '' },
  template: 'minimal',

  setField: (key, value) => set({ [key]: value } as any),

  addProject: () =>
    set((state) => ({
      projects: [...state.projects, { title: '', description: '', github: '', live: '', proficiency: 50 }],
    })),

  updateProject: (index, field, value) =>
    set((state) => {
      const updated = [...state.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { projects: updated };
    }),

  removeProject: (index) =>
    set((state) => ({
      projects: state.projects.filter((_, i) => i !== index),
    })),

  addSkill: (skill) =>
    set((state) => ({
      skills: [...new Set([...state.skills, skill])],
    })),

  removeSkill: (skill) =>
    set((state) => ({
      skills: state.skills.filter((s) => s !== skill),
    })),

  setTemplate: (template) => set({ template }),

  updateContact: (field, value) =>
    set((state) => ({
      contact: { ...state.contact, [field]: value },
    })),

  addEducation: () =>
    set((state) => ({
      education: [...state.education, { institution: '', degree: '', year: '' }],
    })),

  updateEducation: (index, field, value) =>
    set((state) => {
      const updated = [...state.education];
      updated[index] = { ...updated[index], [field]: value };
      return { education: updated };
    }),

  removeEducation: (index) =>
    set((state) => ({
      education: state.education.filter((_, i) => i !== index),
    })),

  loadFromDB: (data) => set(data),
}));
