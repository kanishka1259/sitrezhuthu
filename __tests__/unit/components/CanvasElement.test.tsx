/**
 * __tests__/unit/components/CanvasElement.test.tsx
 *
 * Tests for the CanvasElement component that renders each
 * draggable/resizable element on the Custom Design canvas.
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CanvasElement } from '@/components/canvas/CanvasElement';
import { usePortfolioStore } from '@/store/usePortfolioStore';
import type { CustomElement } from '@/store/usePortfolioStore';

// Helper to build a base element
function makeEl(overrides: Partial<CustomElement> = {}): CustomElement {
  return {
    id: 'el_test_1',
    type: 'text',
    x: 100,
    y: 150,
    width: 200,
    height: 60,
    content: 'Test Element',
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    zIndex: 10,
    opacity: 1,
    rotation: 0,
    ...overrides,
  };
}

function renderEl(el: CustomElement, isSelected = false) {
  return render(
    <CanvasElement
      el={el}
      isSelected={isSelected}
      snapToGrid={false}
      gridSize={20}
    />
  );
}

// ─── Text element rendering ───────────────────────────────────────────────────
describe('CanvasElement – text type', () => {
  it('renders text content', () => {
    renderEl(makeEl({ content: 'Hello World' }));
    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('is hidden when el.hidden is true', () => {
    const { container } = renderEl(makeEl({ hidden: true }));
    expect(container.firstChild).toBeNull();
  });

  it('shows "Double-click to edit" placeholder when content is empty', () => {
    renderEl(makeEl({ content: '' }));
    expect(screen.getByText('Double-click to edit')).toBeInTheDocument();
  });

  it('switches to textarea on double-click', async () => {
    const user = userEvent.setup();
    renderEl(makeEl({ content: 'Click me' }));
    const textDiv = screen.getByText('Click me');
    await user.dblClick(textDiv);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('updates content when typing in textarea (editing mode)', async () => {
    const updateFn = jest.fn();
    jest.spyOn(usePortfolioStore.getState(), 'updateCustomElement').mockImplementation(updateFn);

    const user = userEvent.setup();
    renderEl(makeEl({ content: 'Edit me' }));
    await user.dblClick(screen.getByText('Edit me'));
    const textarea = screen.getByRole('textbox');
    await user.clear(textarea);
    await user.type(textarea, 'New text');
    // updateCustomElement should have been called during typing
    expect(updateFn).toHaveBeenCalled();
  });
});

// ─── Button element rendering ─────────────────────────────────────────────────
describe('CanvasElement – button type', () => {
  it('renders button content', () => {
    renderEl(makeEl({ type: 'button', content: 'Subscribe', bgColor: '#6366f1' }));
    expect(screen.getByText('Subscribe')).toBeInTheDocument();
  });

  it('shows editable input on double-click', async () => {
    const user = userEvent.setup();
    renderEl(makeEl({ type: 'button', content: 'Click Me' }));
    await user.dblClick(screen.getByText('Click Me'));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });
});

// ─── Image element rendering ──────────────────────────────────────────────────
describe('CanvasElement – image type', () => {
  it('renders img tag with correct src', () => {
    renderEl(makeEl({
      type: 'image',
      src: 'https://example.com/photo.jpg',
      width: 200,
      height: 180,
    }));
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://example.com/photo.jpg');
  });
});

// ─── Shape elements ───────────────────────────────────────────────────────────
describe('CanvasElement – shape types', () => {
  it('renders circle shape as a div', () => {
    const { container } = renderEl(makeEl({
      type: 'shape',
      shapeType: 'circle',
      bgColor: '#6366f1',
      width: 100,
      height: 100,
    }));
    // Should not throw and should render something
    expect(container.firstChild).not.toBeNull();
  });

  it('renders triangle as zero-width div with borders', () => {
    const { container } = renderEl(makeEl({
      type: 'shape',
      shapeType: 'triangle',
      color: '#ec4899',
      width: 80,
      height: 80,
    }));
    expect(container.firstChild).not.toBeNull();
  });

  it('renders star as unicode char', () => {
    renderEl(makeEl({
      type: 'shape',
      shapeType: 'star',
      color: '#f59e0b',
      width: 60,
      height: 60,
    }));
    expect(screen.getByText('★')).toBeInTheDocument();
  });
});

// ─── Selection visual cue ─────────────────────────────────────────────────────
describe('CanvasElement – selection', () => {
  it('shows resize handle when selected', () => {
    const { container } = renderEl(makeEl(), true);
    // The resize handle is the bottom-right corner div
    const handles = container.querySelectorAll('[style*="nwse-resize"]');
    expect(handles.length).toBeGreaterThan(0);
  });

  it('shows rotation handle when selected', () => {
    const { container } = renderEl(makeEl(), true);
    const rotHandle = container.querySelector('[title="Drag to rotate"]');
    expect(rotHandle).toBeInTheDocument();
  });

  it('does NOT show handles when not selected', () => {
    const { container } = renderEl(makeEl(), false);
    const handles = container.querySelectorAll('[style*="nwse-resize"]');
    expect(handles.length).toBe(0);
  });
});

// ─── Locked element ───────────────────────────────────────────────────────────
describe('CanvasElement – locked', () => {
  it('cursor is not-allowed when locked', () => {
    const { container } = renderEl(makeEl({ locked: true }));
    const el = container.firstChild as HTMLElement;
    expect(el.style.cursor).toBe('not-allowed');
  });

  it('does not show resize handle when locked + selected', () => {
    const { container } = renderEl(makeEl({ locked: true }), true);
    const handles = container.querySelectorAll('[style*="nwse-resize"]');
    expect(handles.length).toBe(0);
  });
});

// ─── Context menu ─────────────────────────────────────────────────────────────
describe('CanvasElement – context menu', () => {
  it('shows context menu on right-click', () => {
    renderEl(makeEl({ content: 'RightClick me' }));
    // Find the outer element wrapper
    const wrapper = screen.getByText('RightClick me').closest('[style]');
    fireEvent.contextMenu(wrapper!);
    expect(screen.getByText('Duplicate')).toBeInTheDocument();
    expect(screen.getByText('Delete')).toBeInTheDocument();
  });

  it('calls duplicateCustomElement from context menu', () => {
    const dupFn = jest.fn();
    jest.spyOn(usePortfolioStore.getState(), 'duplicateCustomElement').mockImplementation(dupFn);
    renderEl(makeEl({ id: 'el_ctx', content: 'CTX' }));
    const wrapper = screen.getByText('CTX').closest('[style]');
    fireEvent.contextMenu(wrapper!);
    fireEvent.click(screen.getByText('Duplicate'));
    expect(dupFn).toHaveBeenCalledWith('el_ctx');
  });
});
