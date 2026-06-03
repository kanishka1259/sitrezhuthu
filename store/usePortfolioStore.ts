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
  isCanvasFullScreen: boolean;
  setIsCanvasFullScreen: (value: boolean) => void;
  // History for undo/redo
  _history: CustomElement[][];
  _historyIndex: number;

  setField: <K extends keyof PortfolioData>(key: K, value: PortfolioData[K]) => void;
  addProject: () => void;
  updateProject: (index: number, field: keyof Project, value: string | number) => void;
  removeProject: (index: number) => void;
  addSkill: (skill: string) => void;
  removeSkill: (skill: string) => void;
  setTemplate: (template: TemplateId) => void;
  setTemplateStyle: <K extends keyof TemplateStyles>(key: K, value: TemplateStyles[K]) => void;
  setTemplateStyles: (styles: Partial<TemplateStyles>) => void;
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
  allowedEmails: [],
};



export const usePortfolioStore = create<PortfolioStore>((set, get) => ({
  ...INITIAL_STATE,
  selectedElementId: null,
  isCanvasFullScreen: false,
  setIsCanvasFullScreen: (value: boolean) => set({ isCanvasFullScreen: value }),
  _history: [],
  _historyIndex: -1,

  setField: (key, value) =>
    set((state) => {
      const nextState: any = { [key]: value };
      if (state.template === 'custom') {
        if (key === 'name') {
          nextState.customElements = state.customElements.map((el) =>
            el.linkedField === 'name' ? { ...el, content: String(value) } : el
          );
        } else if (key === 'bio') {
          nextState.customElements = state.customElements.map((el) =>
            el.linkedField === 'bio' ? { ...el, content: String(value) } : el
          );
        } else if (key === 'avatar') {
          nextState.customElements = state.customElements.map((el) =>
            el.linkedField === 'avatar' ? { ...el, src: String(value) } : el
          );
        }
      }
      return nextState;
    }),

  addProject: () =>
    set((state) => ({
      projects: [...state.projects, { title: '', description: '', github: '', live: '', proficiency: 50 }],
    })),

  updateProject: (index, field, value) =>
    set((state) => {
      const updated = [...state.projects];
      updated[index] = { ...updated[index], [field]: value };
      
      let nextCustomElements = state.customElements;
      if (state.template === 'custom') {
        nextCustomElements = state.customElements.map((el) => {
          if (el.linkedField === 'project' && el.linkedIndex === index && el.linkedSubField === field) {
            if (field === 'title' || field === 'description') {
              return { ...el, content: String(value) };
            } else if (field === 'live' || field === 'github') {
              return { ...el, clickTarget: String(value), href: String(value) };
            }
          }
          return el;
        });
      }
      return { projects: updated, customElements: nextCustomElements };
    }),

  removeProject: (index) =>
    set((state) => {
      const nextProjects = state.projects.filter((_, i) => i !== index);
      let nextCustomElements = state.customElements;
      if (state.template === 'custom') {
        nextCustomElements = state.customElements
          .filter((el) => !(el.linkedField === 'project' && el.linkedIndex === index))
          .map((el) => {
            if (el.linkedField === 'project' && typeof el.linkedIndex === 'number' && el.linkedIndex > index) {
              return { ...el, linkedIndex: el.linkedIndex - 1 };
            }
            return el;
          });
      }
      return { projects: nextProjects, customElements: nextCustomElements };
    }),

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

  setTemplateStyles: (styles) =>
    set((state) => ({
      templateStyles: { ...state.templateStyles, ...styles },
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
      if (newHistory.length === 0) {
        newHistory.push([]);
      }
      newHistory.push(snapshot);
      return { 
        _history: newHistory.slice(-50), 
        _historyIndex: Math.min(newHistory.length - 1, 49) 
      };
    }),

  addCustomElement: (element) => {
    set((state) => ({
      customElements: [...state.customElements, { ...element, id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 11)}` }],
    }));
    get().pushHistory();
  },

  removeCustomElement: (id) => {
    set((state) => ({
      customElements: state.customElements.filter((el) => el.id !== id),
      selectedElementId: state.selectedElementId === id ? null : state.selectedElementId,
    }));
    get().pushHistory();
  },

  updateCustomElement: (id, updates) =>
    set((state) => {
      const nextElements = state.customElements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      );

      const el = nextElements.find((e) => e.id === id);
      if (!el || state.template !== 'custom') {
        return { customElements: nextElements };
      }

      const nextState: any = { customElements: nextElements };

      if (el.linkedField === 'name' && typeof updates.content === 'string') {
        nextState.name = updates.content;
      } else if (el.linkedField === 'bio' && typeof updates.content === 'string') {
        nextState.bio = updates.content;
      } else if (el.linkedField === 'avatar' && typeof updates.src === 'string') {
        nextState.avatar = updates.src;
      } else if (el.linkedField === 'project' && typeof el.linkedIndex === 'number') {
        const idx = el.linkedIndex;
        if (state.projects[idx]) {
          const updatedProjects = [...state.projects];
          if (el.linkedSubField === 'title' && typeof updates.content === 'string') {
            updatedProjects[idx] = { ...updatedProjects[idx], title: updates.content };
            nextState.projects = updatedProjects;
          } else if (el.linkedSubField === 'description' && typeof updates.content === 'string') {
            updatedProjects[idx] = { ...updatedProjects[idx], description: updates.content };
            nextState.projects = updatedProjects;
          } else if ((el.linkedSubField === 'live' || el.linkedSubField === 'github') && typeof updates.clickTarget === 'string') {
            updatedProjects[idx] = { ...updatedProjects[idx], [el.linkedSubField]: updates.clickTarget };
            nextState.projects = updatedProjects;
          }
        }
      } else if (el.linkedField === 'education' && typeof el.linkedIndex === 'number' && typeof updates.content === 'string') {
        const lines = updates.content.split('\n');
        const degreeLine = lines[0] || '';
        const degree = degreeLine.replace(/^🎓\s*/, '').trim();
        const instYearLine = lines[1] || '';
        const parts = instYearLine.split('·');
        const institution = (parts[0] || '').trim();
        const year = (parts[1] || '').trim();

        const idx = el.linkedIndex;
        if (state.education[idx]) {
          const updatedEdu = [...state.education];
          updatedEdu[idx] = {
            ...updatedEdu[idx],
            degree,
            institution,
            year,
          };
          nextState.education = updatedEdu;
        }
      } else if (el.linkedField === 'contact' && el.linkedSubField) {
        const field = el.linkedSubField as keyof Contact;
        if (typeof updates.clickTarget === 'string') {
          let val = updates.clickTarget;
          if (field === 'email' && val.startsWith('mailto:')) {
            val = val.substring(7);
          }
          nextState.contact = {
            ...state.contact,
            [field]: val,
          };
        }
      }

      return nextState;
    }),

  duplicateCustomElement: (id) => {
    set((state) => {
      const el = state.customElements.find((e) => e.id === id);
      if (!el) return {};
      const newEl = { ...el, id: `el_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`, x: el.x + 24, y: el.y + 24 };
      return { customElements: [...state.customElements, newEl], selectedElementId: newEl.id };
    });
    get().pushHistory();
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
    set((state) => {
      const nextContact = { ...state.contact, [field]: value };
      let nextCustomElements = state.customElements;
      if (state.template === 'custom') {
        nextCustomElements = state.customElements.map((el) => {
          if (el.linkedField === 'contact' && el.linkedSubField === field) {
            const clickTarget = field === 'email' ? (value ? `mailto:${value}` : '') : value;
            return {
              ...el,
              clickTarget: clickTarget,
              href: clickTarget,
            };
          }
          return el;
        });
      }
      return { contact: nextContact, customElements: nextCustomElements };
    }),

  addEducation: () =>
    set((state) => ({
      education: [...state.education, { institution: '', degree: '', year: '' }],
    })),

  updateEducation: (index, field, value) =>
    set((state) => {
      const updated = [...state.education];
      updated[index] = { ...updated[index], [field]: value };
      
      let nextCustomElements = state.customElements;
      if (state.template === 'custom') {
        const edu = updated[index];
        const formattedText = `🎓 ${edu.degree || ''}\n${edu.institution || ''} · ${edu.year || ''}`;
        nextCustomElements = state.customElements.map((el) => {
          if (el.linkedField === 'education' && el.linkedIndex === index) {
            return { ...el, content: formattedText };
          }
          return el;
        });
      }
      return { education: updated, customElements: nextCustomElements };
    }),

  removeEducation: (index) =>
    set((state) => {
      const nextEducation = state.education.filter((_, i) => i !== index);
      let nextCustomElements = state.customElements;
      if (state.template === 'custom') {
        nextCustomElements = state.customElements
          .filter((el) => !(el.linkedField === 'education' && el.linkedIndex === index))
          .map((el) => {
            if (el.linkedField === 'education' && typeof el.linkedIndex === 'number' && el.linkedIndex > index) {
              return { ...el, linkedIndex: el.linkedIndex - 1 };
            }
            return el;
          });
      }
      return { education: nextEducation, customElements: nextCustomElements };
    }),

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
    isCanvasFullScreen: false,
    _history: [],
    _historyIndex: -1,
  }),
}));
