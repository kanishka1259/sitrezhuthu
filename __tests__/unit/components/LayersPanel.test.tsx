/**
 * __tests__/unit/components/LayersPanel.test.tsx
 *
 * Tests for the Layers panel — lists elements, allows visibility/lock toggle.
 */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { LayersPanel } from '@/components/canvas/LayersPanel';
import { usePortfolioStore } from '@/store/usePortfolioStore';

function seedStore(elements: any[] = []) {
  usePortfolioStore.setState({
    customElements: elements,
    selectedElementId: null,
  });
}

afterEach(() => {
  usePortfolioStore.setState({
    customElements: [],
    selectedElementId: null,
  });
});

describe('LayersPanel', () => {
  it('shows "No elements yet" when canvas is empty', () => {
    seedStore([]);
    render(<LayersPanel />);
    expect(screen.getByText('No elements yet')).toBeInTheDocument();
  });

  it('renders layer count in header', () => {
    seedStore([
      { id: 'a', type: 'text', content: 'Hello', x: 0, y: 0, zIndex: 1 },
      { id: 'b', type: 'button', content: 'Btn', x: 100, y: 100, zIndex: 2 },
    ]);
    render(<LayersPanel />);
    expect(screen.getByText('Layers (2)')).toBeInTheDocument();
  });

  it('renders element label text', () => {
    seedStore([{ id: 'el1', type: 'text', content: 'My Heading', x: 0, y: 0, zIndex: 1 }]);
    render(<LayersPanel />);
    expect(screen.getByText(/My Heading/)).toBeInTheDocument();
  });

  it('shows shape type in parentheses for shape elements', () => {
    seedStore([{ id: 'sh1', type: 'shape', shapeType: 'circle', x: 0, y: 0, zIndex: 1 }]);
    render(<LayersPanel />);
    expect(screen.getByText(/\(circle\)/)).toBeInTheDocument();
  });

  it('clicking a layer selects it', () => {
    const setSelected = jest.fn();
    jest.spyOn(usePortfolioStore.getState(), 'setSelectedElementId').mockImplementation(setSelected);
    seedStore([{ id: 'el2', type: 'text', content: 'Click me', x: 0, y: 0, zIndex: 1 }]);
    render(<LayersPanel />);
    fireEvent.click(screen.getByText(/Click me/));
    expect(setSelected).toHaveBeenCalledWith('el2');
  });

  it('toggle hide button calls updateCustomElement', () => {
    const updateFn = jest.fn();
    jest.spyOn(usePortfolioStore.getState(), 'updateCustomElement').mockImplementation(updateFn);
    seedStore([{ id: 'vis1', type: 'text', content: 'Visible', x: 0, y: 0, zIndex: 1, hidden: false }]);
    render(<LayersPanel />);
    // The hide button has title 'Hide'
    fireEvent.click(screen.getByTitle('Hide'));
    expect(updateFn).toHaveBeenCalledWith('vis1', { hidden: true });
  });

  it('toggle lock button calls updateCustomElement', () => {
    const updateFn = jest.fn();
    jest.spyOn(usePortfolioStore.getState(), 'updateCustomElement').mockImplementation(updateFn);
    seedStore([{ id: 'lk1', type: 'text', content: 'Lockable', x: 0, y: 0, zIndex: 1, locked: false }]);
    render(<LayersPanel />);
    fireEvent.click(screen.getByTitle('Lock'));
    expect(updateFn).toHaveBeenCalledWith('lk1', { locked: true });
  });

  it('delete button calls removeCustomElement', () => {
    const removeFn = jest.fn();
    jest.spyOn(usePortfolioStore.getState(), 'removeCustomElement').mockImplementation(removeFn);
    seedStore([{ id: 'del1', type: 'text', content: 'Delete me', x: 0, y: 0, zIndex: 1 }]);
    render(<LayersPanel />);
    fireEvent.click(screen.getByTitle('Delete'));
    expect(removeFn).toHaveBeenCalledWith('del1');
  });

  it('layers are sorted by zIndex descending', () => {
    seedStore([
      { id: 'low', type: 'text', content: 'Low z', x: 0, y: 0, zIndex: 1 },
      { id: 'high', type: 'text', content: 'High z', x: 0, y: 0, zIndex: 99 },
    ]);
    render(<LayersPanel />);
    const items = screen.getAllByText(/Low z|High z/);
    expect(items[0]).toHaveTextContent('High z');
    expect(items[1]).toHaveTextContent('Low z');
  });
});
