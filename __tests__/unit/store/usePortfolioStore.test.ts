/**
 * __tests__/unit/store/usePortfolioStore.test.ts
 *
 * Unit tests for the Zustand portfolio store — the source of truth
 * for the canvas editor state.
 */
import { act } from 'react';
import { usePortfolioStore } from '@/store/usePortfolioStore';

// Reset store between tests
beforeEach(() => {
  usePortfolioStore.setState({
    name: '',
    slug: '',
    isPublic: true,
    bio: '',
    avatar: '',
    skills: [],
    projects: [],
    education: [],
    contact: { email: '', linkedin: '', github: '', twitter: '' },
    template: 'minimal',
    templateStyles: { ...require('@/store/usePortfolioStore').TEMPLATE_DEFAULTS['minimal'] },
    canvasPositions: {},
    customElements: [],
    selectedElementId: null,
    _history: [],
    _historyIndex: -1,
  });
});

// ─── setField ────────────────────────────────────────────────────────────────
describe('setField', () => {
  it('updates name', () => {
    usePortfolioStore.getState().setField('name', 'Alex Rivera');
    expect(usePortfolioStore.getState().name).toBe('Alex Rivera');
  });

  it('updates isPublic to false', () => {
    usePortfolioStore.getState().setField('isPublic', false);
    expect(usePortfolioStore.getState().isPublic).toBe(false);
  });
});

// ─── addCustomElement ─────────────────────────────────────────────────────────
describe('addCustomElement', () => {
  it('adds a text element with a unique id', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 100, y: 200, content: 'Hello', zIndex: 10 });
    const els = usePortfolioStore.getState().customElements;
    expect(els).toHaveLength(1);
    expect(els[0].type).toBe('text');
    expect(els[0].content).toBe('Hello');
    expect(els[0].id).toMatch(/^el_/);
  });

  it('adds multiple elements keeping them all', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'First', zIndex: 1 });
    store.addCustomElement({ type: 'button', x: 100, y: 100, content: 'Click', zIndex: 2 });
    store.addCustomElement({ type: 'shape', x: 200, y: 200, shapeType: 'circle', zIndex: 3 });
    expect(usePortfolioStore.getState().customElements).toHaveLength(3);
  });

  it('assigns unique ids to each element', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'A', zIndex: 1 });
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'B', zIndex: 2 });
    const [a, b] = usePortfolioStore.getState().customElements;
    expect(a.id).not.toBe(b.id);
  });
});

// ─── updateCustomElement ──────────────────────────────────────────────────────
describe('updateCustomElement', () => {
  it('updates only the specified element', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'Original', zIndex: 1 });
    store.addCustomElement({ type: 'text', x: 100, y: 0, content: 'Other', zIndex: 2 });
    const [el1, el2] = usePortfolioStore.getState().customElements;

    store.updateCustomElement(el1.id, { content: 'Updated', fontSize: 32 });

    const updated = usePortfolioStore.getState().customElements;
    expect(updated.find(e => e.id === el1.id)?.content).toBe('Updated');
    expect(updated.find(e => e.id === el1.id)?.fontSize).toBe(32);
    // Other element untouched
    expect(updated.find(e => e.id === el2.id)?.content).toBe('Other');
  });

  it('updates position correctly', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'button', x: 0, y: 0, content: 'Btn', zIndex: 1 });
    const [el] = usePortfolioStore.getState().customElements;
    store.updateCustomElement(el.id, { x: 350, y: 450 });
    const updated = usePortfolioStore.getState().customElements[0];
    expect(updated.x).toBe(350);
    expect(updated.y).toBe(450);
  });
});

// ─── removeCustomElement ──────────────────────────────────────────────────────
describe('removeCustomElement', () => {
  it('removes the correct element', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'A', zIndex: 1 });
    store.addCustomElement({ type: 'text', x: 100, y: 0, content: 'B', zIndex: 2 });
    const [a, b] = usePortfolioStore.getState().customElements;

    store.removeCustomElement(a.id);
    const remaining = usePortfolioStore.getState().customElements;
    expect(remaining).toHaveLength(1);
    expect(remaining[0].id).toBe(b.id);
  });

  it('clears selectedElementId when selected element is deleted', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'X', zIndex: 1 });
    const [el] = usePortfolioStore.getState().customElements;
    store.setSelectedElementId(el.id);
    store.removeCustomElement(el.id);
    expect(usePortfolioStore.getState().selectedElementId).toBeNull();
  });
});

// ─── duplicateCustomElement ───────────────────────────────────────────────────
describe('duplicateCustomElement', () => {
  it('creates a copy offset by 24px', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 100, y: 200, content: 'Original', zIndex: 5 });
    const [original] = usePortfolioStore.getState().customElements;
    store.duplicateCustomElement(original.id);
    const els = usePortfolioStore.getState().customElements;
    expect(els).toHaveLength(2);
    const copy = els[1];
    expect(copy.id).not.toBe(original.id);
    expect(copy.content).toBe('Original');
    expect(copy.x).toBe(124);
    expect(copy.y).toBe(224);
  });

  it('selects the duplicated element', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'button', x: 0, y: 0, content: 'Btn', zIndex: 1 });
    const [el] = usePortfolioStore.getState().customElements;
    store.duplicateCustomElement(el.id);
    const selectedId = usePortfolioStore.getState().selectedElementId;
    const copy = usePortfolioStore.getState().customElements[1];
    expect(selectedId).toBe(copy.id);
  });
});

// ─── reorderCustomElement ─────────────────────────────────────────────────────
describe('reorderCustomElement', () => {
  it('bring to front increases zIndex above max', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'A', zIndex: 5 });
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'B', zIndex: 10 });
    const [a] = usePortfolioStore.getState().customElements;
    store.reorderCustomElement(a.id, 'front');
    const updated = usePortfolioStore.getState().customElements.find(e => e.id === a.id);
    expect(updated!.zIndex).toBe(11); // max was 10, so front = 11
  });

  it('send to back decreases zIndex below min', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'A', zIndex: 5 });
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'B', zIndex: 10 });
    const [, b] = usePortfolioStore.getState().customElements;
    store.reorderCustomElement(b.id, 'back');
    const updated = usePortfolioStore.getState().customElements.find(e => e.id === b.id);
    expect(updated!.zIndex).toBe(4); // min was 5, so back = 4
  });
});

// ─── undo / redo ──────────────────────────────────────────────────────────────
describe('undo / redo', () => {
  it('undo reverses addCustomElement', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'Hello', zIndex: 1 });
    expect(usePortfolioStore.getState().customElements).toHaveLength(1);
    store.undo();
    expect(usePortfolioStore.getState().customElements).toHaveLength(0);
  });

  it('redo re-applies after undo', () => {
    const store = usePortfolioStore.getState();
    store.addCustomElement({ type: 'text', x: 0, y: 0, content: 'Hello', zIndex: 1 });
    store.undo();
    store.redo();
    expect(usePortfolioStore.getState().customElements).toHaveLength(1);
  });

  it('undo does nothing when history is empty', () => {
    const store = usePortfolioStore.getState();
    expect(() => store.undo()).not.toThrow();
    expect(usePortfolioStore.getState().customElements).toHaveLength(0);
  });
});

// ─── skills ───────────────────────────────────────────────────────────────────
describe('skills', () => {
  it('adds a skill', () => {
    usePortfolioStore.getState().addSkill('TypeScript');
    expect(usePortfolioStore.getState().skills).toContain('TypeScript');
  });

  it('does not add duplicate skills', () => {
    const store = usePortfolioStore.getState();
    store.addSkill('React');
    store.addSkill('React');
    expect(usePortfolioStore.getState().skills.filter(s => s === 'React')).toHaveLength(1);
  });

  it('removes a skill', () => {
    const store = usePortfolioStore.getState();
    store.addSkill('Node');
    store.removeSkill('Node');
    expect(usePortfolioStore.getState().skills).not.toContain('Node');
  });
});

// ─── projects ─────────────────────────────────────────────────────────────────
describe('projects', () => {
  it('adds a blank project', () => {
    usePortfolioStore.getState().addProject();
    expect(usePortfolioStore.getState().projects).toHaveLength(1);
  });

  it('updates a project field', () => {
    const store = usePortfolioStore.getState();
    store.addProject();
    store.updateProject(0, 'title', 'My App');
    expect(usePortfolioStore.getState().projects[0].title).toBe('My App');
  });

  it('removes a project', () => {
    const store = usePortfolioStore.getState();
    store.addProject();
    store.addProject();
    store.removeProject(0);
    expect(usePortfolioStore.getState().projects).toHaveLength(1);
  });
});

// ─── setTemplate ──────────────────────────────────────────────────────────────
describe('setTemplate', () => {
  it('switches template and resets styles to defaults', () => {
    const store = usePortfolioStore.getState();
    store.setTemplate('dark');
    const state = usePortfolioStore.getState();
    expect(state.template).toBe('dark');
    expect(state.templateStyles.bgColor).toBe('#060612');
  });

  it('custom template has dark canvas defaults', () => {
    usePortfolioStore.getState().setTemplate('custom');
    const state = usePortfolioStore.getState();
    expect(state.templateStyles.bgColor).toBe('#0f0f13');
  });
});
