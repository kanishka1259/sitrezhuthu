'use client';

import { create } from 'zustand';
import { type TemplateId, type TemplateStyles, TEMPLATE_DEFAULTS } from '@/lib/config/templates';
export { type TemplateId, type TemplateStyles, TEMPLATE_DEFAULTS };
import { 
  Project, 
  Education, 
  Contact, 
  CustomElement, 
  PortfolioData 
} from '@/types/portfolio';
export type { CustomElement };

export interface PortfolioStore extends PortfolioData {
  selectedElementId: string | null;
  // History for undo/redo
  _history: CustomElement[][];
  _historyIndex: number;

  // Actions
  setField: (key: keyof PortfolioData, value: any) => void;
  addProject: () => void;
  updateProject: (index: number, field: keyof Project, value: string | number) => void;
  removeProject: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setTemplate: (template: TemplateId) => void;
  setTemplateStyle: (key: keyof TemplateStyles, value: any) => void;
  resetTemplateStyles: () => void;
  updateCanvasPosition: (id: string, x: number, y: number) => void;
  addCustomElement: (element: Omit<CustomElement, 'id'>) => void;
  removeCustomElement: (id: string) => void;
  updateCustomElement: (id: string, updates: Partial<CustomElement>) => void;
  duplicateCustomElement: (id: string) => void;
  reorderCustomElement: (id: string, direction: 'forward' | 'backward' | 'front' | 'back') => void;
  setSelectedElementId: (id: string | null) => void;
  loadFromDB: (data: Partial<PortfolioData>) => void;
  updateContact: (field: keyof Contact, value: string) => void;
  addEducation: () => void;
  updateEducation: (index: number, field: keyof Education, value: string) => void;
  removeEducation: (index: number) => void;
  undo: () => void;
  redo: () => void;
  pushHistory: () => void;
  reset: () => void;
}

const INITIAL_STATE: PortfolioData = {
  _id: undefined,
  name: '',
  username: '',
  slug: '',
  isPublic: true,
  bio: '',
  avatar: '',
  skills: [],
  projects: [],
  education: [],
  contact: { email: '', linkedin: '', github: '', twitter: '' },
  template: 'minimal',
  templateStyles: { ...TEMPLATE_DEFAULTS['minimal'] },
  canvasPositions: {},
  customElements: [],
};

export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  ...INITIAL_STATE,
  selectedElementId: null,
  _history: [],
  _historyIndex: -1,

  setField: (key, value) => set((state) => ({ ...state, [key]: value })),

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

  setTemplate: (template) =>
    set({
      template,
      templateStyles: { ...(TEMPLATE_DEFAULTS[template] ?? TEMPLATE_DEFAULTS['minimal']) },
    }),

  setTemplateStyle: (key, value) =>
    set((state) => ({
      templateStyles: { ...state.templateStyles, [key]: value },
    })),

  resetTemplateStyles: () =>
    set((state) => ({
      templateStyles: { ...(TEMPLATE_DEFAULTS[state.template] ?? TEMPLATE_DEFAULTS['minimal']) },
    })),

  updateCanvasPosition: (id, x, y) =>
    set((state) => ({
      canvasPositions: { ...state.canvasPositions, [id]: { x, y } },
    })),

  pushHistory: () =>
    set((state) => {
      // Optimization: use structuredClone if available, or shallow map for elements
      const snapshot = state.customElements.map(el => ({ ...el }));
      const newHistory = state._history.slice(0, state._historyIndex + 1);
      newHistory.push(snapshot);
      return { 
        _history: newHistory.slice(-50), 
        _historyIndex: Math.min(newHistory.length - 1, 49) 
      };
    }),

  addCustomElement: (element) => {
    get().pushHistory();
    set((state) => ({
      customElements: [...state.customElements, { ...element, id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 11)}` }],
    }));
  },

  removeCustomElement: (id) => {
    get().pushHistory();
    set((state) => ({
      customElements: state.customElements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    }));
  },

  updateCustomElement: (id, updates) =>
    set((state) => ({
      customElements: state.customElements.map((el) => (el.id === id ? { ...el, ...updates } : el)),
    })),

  duplicateCustomElement: (id) => {
    get().pushHistory();
    set((state) => {
      const el = state.customElements.find((e) => e.id === id);
      if (!el) return {};
      const newEl = { ...el, id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`, x: el.x + 24, y: el.y + 24 };
      return { customElements: [...state.customElements, newEl], selectedElementId: newEl.id };
    });
  },

  reorderCustomElement: (id, direction) =>
    set((state) => {
      const els = [...state.customElements];
      const idx = els.findIndex((e) => e.id === id);
      if (idx === -1) return {};
      
      const zIndices = els.map((e) => e.zIndex || 0);
      const maxZ = Math.max(...zIndices, 0);
      const minZ = Math.min(...zIndices, 10);
      
      const el = els[idx];
      let newZ = el.zIndex || 10;
      
      if (direction === 'front') newZ = maxZ + 1;
      else if (direction === 'back') newZ = Math.max(1, minZ - 1);
      else if (direction === 'forward') newZ = (el.zIndex || 10) + 1;
      else if (direction === 'backward') newZ = Math.max(1, (el.zIndex || 10) - 1);
      
      return { customElements: els.map((e) => (e.id === id ? { ...e, zIndex: newZ } : e)) };
    }),

  setSelectedElementId: (id) => set({ selectedElementId: id }),

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

  undo: () =>
    set((state) => {
      if (state._historyIndex < 0) return {};
      const newIndex = state._historyIndex - 1;
      const els = newIndex >= 0 ? state._history[newIndex].map(el => ({ ...el })) : [];
      return { customElements: els, _historyIndex: newIndex };
    }),

  redo: () =>
    set((state) => {
      if (state._historyIndex >= state._history.length - 1) return {};
      const newIndex = state._historyIndex + 1;
      const els = state._history[newIndex].map(el => ({ ...el }));
      return { customElements: els, _historyIndex: newIndex };
    }),

  loadFromDB: (data) => set((state) => ({ ...state, ...data })),
  
  reset: () => set({
    ...INITIAL_STATE,
    selectedElementId: null,
    _history: [],
    _historyIndex: -1,
  }),
}));
