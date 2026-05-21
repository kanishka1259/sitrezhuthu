'use client';
import { useRef, useState } from 'react';
import { usePortfolioStore, CustomElement } from '@/store/usePortfolioStore';
import { Trash2, Copy, Upload } from 'lucide-react';

interface CanvasElementProps {
  el: CustomElement;
  isSelected: boolean;
  snapToGrid: boolean;
  gridSize: number;
}

function snapVal(v: number, grid: number, snap: boolean) {
  return snap ? Math.round(v / grid) * grid : v;
}

function ContextMenu({ x, y, onClose, onDuplicate, onDelete }: { x: number; y: number; onClose: () => void; onDuplicate: () => void; onDelete: () => void }) {
  return (
    <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 9998 }} onClick={onClose} />
      <div style={{ position: 'fixed', left: x, top: y, zIndex: 9999, background: 'rgba(15,15,20,0.97)', border: '1px solid rgba(61,170,122,0.1)', borderRadius: 10, padding: '4px', minWidth: 140, boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}>
        {[
          { label: 'Duplicate', icon: <Copy size={13}/>, action: onDuplicate },
          { label: 'Delete', icon: <Trash2 size={13}/>, action: onDelete, danger: true },
        ].map(item => (
          <button key={item.label} onClick={() => { item.action(); onClose(); }}
            style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '7px 10px', background: 'none', border: 'none', borderRadius: 7, cursor: 'pointer', fontSize: '0.78rem', fontWeight: 500, color: item.danger ? '#ef4444' : '#cbd5e1', textAlign: 'left' }}
            onMouseEnter={e => (e.currentTarget.style.background = item.danger ? 'rgba(239,68,68,0.1)' : 'rgba(61,170,122,0.07)')}
            onMouseLeave={e => e.currentTarget.style.background  = 'none'}>
            {item.icon} {item.label}
          </button>
        ))}
      </div>
    </>
  );
}

export function CanvasElement({ el, isSelected, snapToGrid, gridSize }: CanvasElementProps) {
  const { updateCustomElement, setSelectedElementId, removeCustomElement, duplicateCustomElement } = usePortfolioStore();
  const [editing, setEditing] = useState(false);
  const [ctxMenu, setCtxMenu] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);
  const dragStartPos = useRef({ x: 0, y: 0, elX: 0, elY: 0 });
  const isDragging = useRef(false);
  const imgInputRef = useRef<HTMLInputElement>(null);

  if (el.hidden) return null;

  const hover = el.hoverEffect;
  const borderStr = el.borderWidth ? `${el.borderWidth}px ${el.borderStyle || 'solid'} ${el.borderColor || 'transparent'}` : 'none';

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    left: el.x,
    top: el.y,
    width: el.width,
    height: el.height,
    opacity: (isHovered && hover?.opacity != null) ? hover.opacity : (el.opacity ?? 1),
    transform: `rotate(${el.rotation || 0}deg) scale(${isHovered && hover?.scale ? hover.scale : 1})`,
    zIndex: el.zIndex || 10,
    cursor: el.locked ? 'not-allowed' : (editing ? 'text' : 'grab'),
    outline: isSelected ? `2px solid #3DAA7A` : (isHovered && !editing ? '1px solid rgba(99,102,241,0.3)' : 'none'),
    outlineOffset: 2,
    boxSizing: 'border-box',
    transition: 'transform 0.15s, opacity 0.15s, outline 0.1s',
    userSelect: editing ? 'auto' : 'none',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    if (el.locked) return;
    if (editing) return;
    e.stopPropagation();
    setSelectedElementId(el.id);
    isDragging.current = false;
    dragStartPos.current = { x: e.clientX, y: e.clientY, elX: el.x, elY: el.y };
    const onMove = (me: PointerEvent) => {
      const dx = me.clientX - dragStartPos.current.x;
      const dy = me.clientY - dragStartPos.current.y;
      if (Math.abs(dx) > 3 || Math.abs(dy) > 3) isDragging.current = true;
      if (isDragging.current) {
        updateCustomElement(el.id, {
          x: snapVal(dragStartPos.current.elX + dx, gridSize, snapToGrid),
          y: snapVal(dragStartPos.current.elY + dy, gridSize, snapToGrid),
        });
      }
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCtxMenu({ x: e.clientX, y: e.clientY });
  };

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        updateCustomElement(el.id, { src: ev.target.result as string });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const renderContent = () => {
    if (el.type === 'text') {
      const textStyle: React.CSSProperties = {
        width: '100%', height: '100%', color: el.color || '#f1f5f9',
        fontSize: el.fontSize || 24, fontWeight: el.fontWeight || '600',
        fontFamily: el.fontFamily || 'Inter', fontStyle: el.fontStyle || 'normal',
        textDecoration: el.textDecoration || 'none', letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : undefined,
        lineHeight: el.lineHeight || 1.4, textAlign: el.textAlign || 'left',
        background: el.bgGradient || el.bgColor || 'transparent',
        borderRadius: el.borderRadius || 0, border: borderStr,
        boxShadow: (isHovered && hover?.shadow) ? hover.shadow : el.shadow,
        padding: el.padding ? `${el.padding}px` : '4px 8px',
      };
      if (editing) {
        return (
          <textarea
            autoFocus
            value={el.content || ''}
            onChange={e2 => updateCustomElement(el.id, { content: e2.target.value })}
            onBlur={() => setEditing(false)}
            onClick={e2 => e2.stopPropagation()}
            style={{ ...textStyle, resize: 'none', outline: 'none', border: 'none', background: 'transparent', width: '100%', height: '100%', fontFamily: el.fontFamily || 'Inter', boxSizing: 'border-box', cursor: 'text', display: 'block', whiteSpace: 'pre-wrap' }}
          />
        );
      }
      return (
        <div onDoubleClick={() => setEditing(true)} style={{ ...textStyle, width: '100%', minHeight: 20, whiteSpace: 'pre-wrap', overflow: 'hidden' }}>
          {el.content || 'Double-click to edit'}
        </div>
      );
    }

    if (el.type === 'button') {
      const bg = isHovered && hover?.bgColor ? hover.bgColor : (el.bgGradient || el.bgColor || '#3DAA7A');
      return (
        <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: bg, color: (isHovered && hover?.color) || el.color || '#3DAA7A', fontSize: el.fontSize || 15, fontWeight: el.fontWeight || '600', fontFamily: el.fontFamily || 'Inter', borderRadius: el.borderRadius || 8, border: borderStr, boxShadow: el.shadow, padding: el.padding ? `${el.padding}px` : '8px 20px', cursor: 'pointer', letterSpacing: el.letterSpacing ? `${el.letterSpacing}px` : undefined }}>
          {editing ? (
            <input autoFocus value={el.content || ''} onChange={e2 => updateCustomElement(el.id, { content: e2.target.value })} onBlur={() => setEditing(false)} onClick={e2 => e2.stopPropagation()} style={{ background: 'transparent', border: 'none', outline: 'none', color: 'inherit', fontSize: 'inherit', fontWeight: 'inherit', fontFamily: 'inherit', textAlign: 'center', width: '100%' }} />
          ) : <span onDoubleClick={() => setEditing(true)}>{el.content || 'Button'}</span>}
        </div>
      );
    }

    if (el.type === 'image') {
      return (
        <div
          style={{ width: '100%', height: '100%', position: 'relative' }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
        >
          <input
            ref={imgInputRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageFileChange}
          />
          {el.src ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={el.src}
              alt=""
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: el.objectFit || 'cover', borderRadius: el.borderRadius || 0, border: borderStr, boxShadow: el.shadow, display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'rgba(99,102,241,0.1)', border: '2px dashed rgba(99,102,241,0.4)', borderRadius: el.borderRadius || 0, gap: 8, color: '#3DAA7A' }}>
              <Upload size={24} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Click to upload</span>
            </div>
          )}
          {/* Upload overlay on hover (only when selected) */}
          {isSelected && imgHovered && el.src && (
            <div
              onClick={e => { e.stopPropagation(); imgInputRef.current?.click(); }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6, borderRadius: el.borderRadius || 0, cursor: 'pointer', color: '#3DAA7A' }}
            >
              <Upload size={20} />
              <span style={{ fontSize: '0.72rem', fontWeight: 600 }}>Replace Image</span>
            </div>
          )}
          {/* Click area when no src */}
          {!el.src && (
            <div
              onClick={e => { e.stopPropagation(); imgInputRef.current?.click(); }}
              style={{ position: 'absolute', inset: 0, cursor: 'pointer' }}
            />
          )}
        </div>
      );
    }

    if (el.type === 'shape') {
      if (el.shapeType === 'triangle') {
        const sz = Math.min(el.width || 80, el.height || 80);
        return <div style={{ width: 0, height: 0, borderLeft: `${sz/2}px solid transparent`, borderRight: `${sz/2}px solid transparent`, borderBottom: `${sz}px solid ${el.color || el.bgColor || '#3DAA7A'}` }} />;
      }
      if (el.shapeType === 'star') {
        return <div style={{ fontSize: Math.min(el.width || 60, el.height || 60) * 0.85, lineHeight: 1, color: el.color || el.bgColor || '#3DAA7A', textShadow: el.shadow }}>★</div>;
      }
      if (el.shapeType === 'diamond') {
        return <div style={{ width: (el.width || 80) * 0.7, height: (el.height || 80) * 0.7, background: el.bgGradient || el.bgColor || el.color || '#3DAA7A', transform: 'rotate(45deg)', borderRadius: el.borderRadius || 4, boxShadow: el.shadow }} />;
      }
      if (el.shapeType === 'pentagon') {
        return (
          <svg width={el.width || 80} height={el.height || 80} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
            <polygon points="50,5 95,35 80,90 20,90 5,35" fill={el.bgColor || el.color || '#3DAA7A'} stroke={el.borderColor || 'none'} strokeWidth={el.borderWidth || 0} />
          </svg>
        );
      }
      if (el.shapeType === 'hexagon') {
        return (
          <svg width={el.width || 80} height={el.height || 80} viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
            <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" fill={el.bgColor || el.color || '#3DAA7A'} stroke={el.borderColor || 'none'} strokeWidth={el.borderWidth || 0} />
          </svg>
        );
      }
      // circle or square
      return <div style={{ width: '100%', height: '100%', background: el.bgGradient || el.bgColor || '#3DAA7A', borderRadius: el.shapeType === 'circle' ? '50%' : (el.borderRadius || 0), border: borderStr, boxShadow: el.shadow }} />;
    }

    if (el.type === 'section') {
      return (
        <div style={{ width: '100%', height: '100%', background: el.bgGradient || el.bgColor || 'rgba(61,170,122,0.03)', borderRadius: el.borderRadius || 12, border: borderStr, boxShadow: el.shadow, padding: el.padding ? `${el.padding}px` : 0, position: 'relative', overflow: 'hidden' }}>
          {el.content && (
            <div style={{ position: 'absolute', top: 12, left: 16, color: el.color || 'rgba(61,170,122,0.4)', fontSize: el.fontSize || 13, fontWeight: el.fontWeight || '600', fontFamily: el.fontFamily || 'Inter' }}>{el.content}</div>
          )}
        </div>
      );
    }

    if (el.type === 'divider') {
      return <div style={{ width: '100%', height: el.height || 2, background: el.bgGradient || el.bgColor || 'rgba(61,170,122,0.1)', borderRadius: el.borderRadius || 0 }} />;
    }

    return null;
  };

  return (
    <>
      {ctxMenu && <ContextMenu x={ctxMenu.x} y={ctxMenu.y} onClose={() => setCtxMenu(null)} onDuplicate={() => duplicateCustomElement(el.id)} onDelete={() => removeCustomElement(el.id)} />}
      <div
        style={baseStyle}
        onPointerDown={handlePointerDown}
        onContextMenu={handleContextMenu}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {renderContent()}

        {/* Resize handle: bottom-right */}
        {isSelected && !el.locked && (
          <div
            onPointerDown={e => {
              e.stopPropagation();
              const startX = e.clientX, startY = e.clientY;
              const startW = el.width || 100, startH = el.height || 60;
              const onMove = (me: PointerEvent) => {
                updateCustomElement(el.id, {
                  width: Math.max(20, snapVal(startW + me.clientX - startX, gridSize, snapToGrid)),
                  height: Math.max(20, snapVal(startH + me.clientY - startY, gridSize, snapToGrid)),
                });
              };
              const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
              window.addEventListener('pointermove', onMove);
              window.addEventListener('pointerup', onUp);
            }}
            style={{ position: 'absolute', bottom: -5, right: -5, width: 12, height: 12, background: '#3DAA7A', borderRadius: 2, cursor: 'nwse-resize', border: '2px solid #fff', zIndex: 1000 }}
          />
        )}

        {/* Resize handle: right-center (width only) */}
        {isSelected && !el.locked && (
          <div
            onPointerDown={e => {
              e.stopPropagation();
              const startX = e.clientX;
              const startW = el.width || 100;
              const onMove = (me: PointerEvent) => {
                updateCustomElement(el.id, { width: Math.max(20, snapVal(startW + me.clientX - startX, gridSize, snapToGrid)) });
              };
              const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
              window.addEventListener('pointermove', onMove);
              window.addEventListener('pointerup', onUp);
            }}
            style={{ position: 'absolute', right: -5, top: '50%', transform: 'translateY(-50%)', width: 10, height: 20, background: '#3DAA7A', borderRadius: 3, cursor: 'ew-resize', border: '2px solid #fff', zIndex: 1000 }}
          />
        )}

        {/* Resize handle: bottom-center (height only) */}
        {isSelected && !el.locked && (
          <div
            onPointerDown={e => {
              e.stopPropagation();
              const startY = e.clientY;
              const startH = el.height || 60;
              const onMove = (me: PointerEvent) => {
                updateCustomElement(el.id, { height: Math.max(20, snapVal(startH + me.clientY - startY, gridSize, snapToGrid)) });
              };
              const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
              window.addEventListener('pointermove', onMove);
              window.addEventListener('pointerup', onUp);
            }}
            style={{ position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)', width: 20, height: 10, background: '#3DAA7A', borderRadius: 3, cursor: 'ns-resize', border: '2px solid #fff', zIndex: 1000 }}
          />
        )}

        {/* Rotation handle */}
        {isSelected && !el.locked && (
          <div
            title="Drag to rotate"
            onPointerDown={e => {
              e.stopPropagation();
              // Get element center in page coords
              const rect = e.currentTarget.parentElement!.getBoundingClientRect();
              const cx = rect.left + rect.width / 2;
              const cy = rect.top + rect.height / 2;
              const onMove = (me: PointerEvent) => {
                const angle = Math.atan2(me.clientY - cy, me.clientX - cx) * (180 / Math.PI) + 90;
                updateCustomElement(el.id, { rotation: Math.round(angle) });
              };
              const onUp = () => { window.removeEventListener('pointermove', onMove); window.removeEventListener('pointerup', onUp); };
              window.addEventListener('pointermove', onMove);
              window.addEventListener('pointerup', onUp);
            }}
            style={{ position: 'absolute', top: -22, left: '50%', transform: 'translateX(-50%)', width: 12, height: 12, background: '#3DAA7A', borderRadius: '50%', cursor: 'crosshair', border: '2px solid #fff', zIndex: 1000 }}
          />
        )}

        {/* Lock badge */}
        {el.locked && (
          <div style={{ position: 'absolute', top: -8, right: -8, width: 16, height: 16, background: '#3DAA7A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', zIndex: 200 }}>🔒</div>
        )}
      </div>
    </>
  );
}
